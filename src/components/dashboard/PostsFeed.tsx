import React from "react";
import { Post, ConnectionSpeed } from "../types";
import PostItem from "./PostItem";

interface PostsFeedProps {
  posts: Post[];
  loading: boolean;
  hasMore: boolean;
  connectionSpeed: ConnectionSpeed;
  lastPostRef: (node: HTMLDivElement) => void;
}

const PostsFeed: React.FC<PostsFeedProps> = ({
  posts,
  loading,
  hasMore,
  connectionSpeed,
  lastPostRef,
}) => {
  return (
    <main className="posts-feed">
      {posts.map((post, index) => (
        <PostItem
          key={post.id}
          post={post}
          ref={index === posts.length - 1 ? lastPostRef : null}
        />
      ))}

      {loading && (
        <div className="loading-indicator">
          <div className="loading-spinner"></div>
          <p>Loading {connectionSpeed === "fast" ? "10" : "5"} more posts...</p>
        </div>
      )}

      {!hasMore && (
        <div className="end-message">
          🎉 You've reached the end! Time for a break?
        </div>
      )}
    </main>
  );
};

export default PostsFeed;
