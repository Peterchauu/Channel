from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import json

app = FastAPI(title="Channel - Reddit-like API")

# CORS configuration to allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],  # React dev servers
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data models
class Post(BaseModel):
    id: Optional[int] = None
    content: str
    author: str
    timestamp: Optional[datetime] = None
    upvotes: int = 0
    comments: List[dict] = []

class Comment(BaseModel):
    post_id: int
    content: str
    author: str

# In-memory storage (replace with database later)
posts_db: List[Post] = []
post_id_counter = 0

# WebSocket connection manager
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: dict):
        for connection in self.active_connections:
            try:
                await connection.send_json(message)
            except:
                pass

manager = ConnectionManager()

# REST API Endpoints
@app.get("/")
async def root():
    return {"message": "Channel API - Reddit-like posting system"}

@app.get("/posts", response_model=List[Post])
async def get_posts():
    """Get all posts, sorted by newest first"""
    return sorted(posts_db, key=lambda x: x.timestamp, reverse=True)

@app.post("/posts", response_model=Post)
async def create_post(post: Post):
    """Create a new post"""
    global post_id_counter
    post_id_counter += 1
    post.id = post_id_counter
    post.timestamp = datetime.now()
    posts_db.append(post)
    
    # Broadcast to all connected WebSocket clients
    await manager.broadcast({
        "type": "NEW_POST",
        "data": post.dict()
    })
    
    return post

@app.post("/posts/{post_id}/upvote")
async def upvote_post(post_id: int):
    """Upvote a post"""
    for post in posts_db:
        if post.id == post_id:
            post.upvotes += 1
            await manager.broadcast({
                "type": "POST_UPDATED",
                "data": post.dict()
            })
            return post
    return {"error": "Post not found"}

@app.post("/posts/{post_id}/comments", response_model=Post)
async def add_comment(post_id: int, comment: Comment):
    """Add a comment to a post"""
    for post in posts_db:
        if post.id == post_id:
            comment_data = {
                "content": comment.content,
                "author": comment.author,
                "timestamp": datetime.now().isoformat()
            }
            post.comments.append(comment_data)
            await manager.broadcast({
                "type": "POST_UPDATED",
                "data": post.dict()
            })
            return post
    return {"error": "Post not found"}

# WebSocket endpoint for real-time updates
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    """WebSocket connection for real-time updates"""
    await manager.connect(websocket)
    try:
        while True:
            # Keep connection alive and receive messages
            data = await websocket.receive_text()
            # Echo back or handle client messages if needed
            await websocket.send_json({"type": "CONNECTED", "message": "WebSocket connected"})
    except WebSocketDisconnect:
        manager.disconnect(websocket)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
