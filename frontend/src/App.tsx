import React, { useEffect, useState, useRef } from 'react';
import { Post as PostType } from './types';
import { api, createWebSocket } from './api';
import Post from './components/Post';
import CreatePost from './components/CreatePost';
import './App.css';

const App: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const wsRef = useRef<WebSocket | null>(null);

  // Load initial posts
  useEffect(() => {
    loadPosts();
  }, []);

  // Setup WebSocket connection
  useEffect(() => {
    wsRef.current = createWebSocket((data) => {
      if (data.type === 'NEW_POST' || data.type === 'POST_UPDATED') {
        loadPosts(); // Refresh posts when updates come in
      }
    });

    return () => {
      wsRef.current?.close();
    };
  }, []);

  const loadPosts = async () => {
    try {
      const fetchedPosts = await api.getPosts();
      setPosts(fetchedPosts);
      setLoading(false);
    } catch (error) {
      console.error('Error loading posts:', error);
      setLoading(false);
    }
  };

  const handleCreatePost = async (content: string, author: string) => {
    try {
      await api.createPost({ content, author });
      await loadPosts(); // Refresh posts
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleUpvote = async (postId: number) => {
    try {
      await api.upvotePost(postId);
      await loadPosts(); // Refresh posts
    } catch (error) {
      console.error('Error upvoting post:', error);
    }
  };

  const handleComment = async (postId: number, content: string, author: string) => {
    try {
      await api.addComment({ post_id: postId, content, author });
      await loadPosts(); // Refresh posts
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  if (loading) {
    return (
      <div className="app">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Channel</h1>
        <p className="tagline">A Reddit-like posting platform</p>
      </header>

      <main className="app-main">
        <CreatePost onCreatePost={handleCreatePost} />

        <div className="posts-feed">
          {posts.length === 0 ? (
            <div className="no-posts">
              No posts yet. Be the first to post something!
            </div>
          ) : (
            posts.map((post) => (
              <Post
                key={post.id}
                post={post}
                onUpvote={handleUpvote}
                onComment={handleComment}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
