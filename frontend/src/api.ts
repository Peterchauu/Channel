import axios from 'axios';
import { Post, NewPost, NewComment } from './types';

const API_BASE_URL = 'http://localhost:8000';

export const api = {
  // Get all posts
  getPosts: async (): Promise<Post[]> => {
    const response = await axios.get(`${API_BASE_URL}/posts`);
    return response.data;
  },

  // Create a new post
  createPost: async (post: NewPost): Promise<Post> => {
    const response = await axios.post(`${API_BASE_URL}/posts`, post);
    return response.data;
  },

  // Upvote a post
  upvotePost: async (postId: number): Promise<Post> => {
    const response = await axios.post(`${API_BASE_URL}/posts/${postId}/upvote`);
    return response.data;
  },

  // Add a comment to a post
  addComment: async (comment: NewComment): Promise<Post> => {
    const response = await axios.post(
      `${API_BASE_URL}/posts/${comment.post_id}/comments`,
      comment
    );
    return response.data;
  },
};

// WebSocket connection
export const createWebSocket = (onMessage: (data: any) => void): WebSocket => {
  const ws = new WebSocket('ws://localhost:8000/ws');

  ws.onopen = () => {
    console.log('WebSocket connected');
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage(data);
  };

  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  ws.onclose = () => {
    console.log('WebSocket disconnected');
  };

  return ws;
};
