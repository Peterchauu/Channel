import React from 'react';
import { Post as PostType } from '../types';
import './Post.css';

interface PostProps {
  post: PostType;
  onUpvote: (postId: number) => void;
  onComment: (postId: number, content: string, author: string) => void;
}

const Post: React.FC<PostProps> = ({ post, onUpvote, onComment }) => {
  const [commentContent, setCommentContent] = React.useState('');
  const [commentAuthor, setCommentAuthor] = React.useState('');
  const [showCommentForm, setShowCommentForm] = React.useState(false);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentContent.trim() && commentAuthor.trim()) {
      onComment(post.id, commentContent, commentAuthor);
      setCommentContent('');
      setCommentAuthor('');
      setShowCommentForm(false);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <div className="post">
      <div className="post-header">
        <span className="post-author">u/{post.author}</span>
        <span className="post-time">{formatTimestamp(post.timestamp)}</span>
      </div>
      
      <div className="post-content">{post.content}</div>
      
      <div className="post-actions">
        <button onClick={() => onUpvote(post.id)} className="upvote-btn">
          ▲ {post.upvotes}
        </button>
        <button onClick={() => setShowCommentForm(!showCommentForm)} className="comment-btn">
          💬 {post.comments.length} Comments
        </button>
      </div>

      {showCommentForm && (
        <form onSubmit={handleSubmitComment} className="comment-form">
          <input
            type="text"
            placeholder="Your username"
            value={commentAuthor}
            onChange={(e) => setCommentAuthor(e.target.value)}
            className="comment-author-input"
          />
          <textarea
            placeholder="Add a comment..."
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            className="comment-input"
          />
          <button type="submit" className="submit-comment-btn">Post Comment</button>
        </form>
      )}

      {post.comments.length > 0 && (
        <div className="comments-section">
          {post.comments.map((comment, index) => (
            <div key={index} className="comment">
              <span className="comment-author">u/{comment.author}</span>
              <span className="comment-content">{comment.content}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Post;
