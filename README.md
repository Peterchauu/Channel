# Channel - Reddit-like Posting Platform

A full-stack application with Python FastAPI backend and React TypeScript frontend, featuring real-time updates via WebSockets.

-------------------------------------------

## Collaborators

Peter Chau | Peterchauu.github.io  
Diego Gomez |

-------------------------------------------

## Tech Stack

**Backend:**
- Python 3.9+
- FastAPI (REST API + WebSockets)
- Uvicorn (ASGI server)
- Pydantic (data validation)

**Frontend:**
- React 18
- TypeScript
- Axios (HTTP client)
- WebSocket (real-time updates)

## Features

- ✅ Create posts with username
- ✅ Upvote posts
- ✅ Add comments to posts
- ✅ Real-time updates via WebSockets
- ✅ Reddit-like dark theme UI

## Setup Instructions

### Backend Setup

1. Create and activate virtual environment:
```bash
cd Channel
python -m venv venv
venv\Scripts\activate  # Windows
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Run the backend server:
```bash
cd backend
python main.py
```

Backend will run on `http://localhost:8000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install Node.js dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

Frontend will run on `http://localhost:3000`

## Project Structure

```
Channel/
├── backend/
│   ├── main.py              # FastAPI server with WebSocket support
│   └── __init__.py
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Post.tsx     # Individual post component
│   │   │   ├── Post.css
│   │   │   ├── CreatePost.tsx
│   │   │   └── CreatePost.css
│   │   ├── App.tsx          # Main React component
│   │   ├── App.css
│   │   ├── index.tsx        # React entry point
│   │   ├── api.ts           # API and WebSocket client
│   │   └── types.ts         # TypeScript interfaces
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   └── tsconfig.json
├── requirements.txt
├── .gitignore
└── README.md
```

## API Endpoints

- `GET /` - API root
- `GET /posts` - Get all posts
- `POST /posts` - Create a new post
- `POST /posts/{post_id}/upvote` - Upvote a post
- `POST /posts/{post_id}/comments` - Add a comment
- `WS /ws` - WebSocket connection for real-time updates

## Usage

1. Start both backend and frontend servers
2. Open `http://localhost:3000` in your browser
3. Enter a username and create a post
4. Upvote posts and add comments
5. Open multiple browser windows to see real-time updates

## Development Notes

- Posts are stored in memory (will reset on server restart)
- WebSocket automatically reconnects on disconnection
- CORS is configured for local development
- TypeScript provides type safety across the frontend

## Future Enhancements

- [ ] Add user authentication
- [ ] Persistent database storage
- [ ] Downvote functionality
- [ ] Sort posts by hot/new/top
- [ ] User profiles
- [ ] Image/media uploads
- [ ] Search functionality
- [ ] SSL/TLS encryption for production

## License

MIT

