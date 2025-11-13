import React from 'react';
import './CreatePost.css';

interface CreatePostProps {
  onCreatePost: (content: string, author: string) => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onCreatePost }) => {
  const [content, setContent] = React.useState('');
  const [author, setAuthor] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() && author.trim()) {
      onCreatePost(content, author);
      setContent('');
      setAuthor('');
    }
  };

  return (
    <div className="create-post">
      <h3>Create a Post</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your username"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="author-input"
          required
        />
        <textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="content-input"
          required
        />
        <button type="submit" className="submit-btn">Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
