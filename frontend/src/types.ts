export interface Post {
  id: number;
  content: string;
  author: string;
  timestamp: string;
  upvotes: number;
  comments: Comment[];
}

export interface Comment {
  content: string;
  author: string;
  timestamp: string;
}

export interface NewPost {
  content: string;
  author: string;
}

export interface NewComment {
  post_id: number;
  content: string;
  author: string;
}
