import { forwardRef } from "react";
import { Post } from "../types";

interface PostItemProps {
  post: Post;
}

const PostItem = forwardRef<HTMLDivElement, PostItemProps>(({ post }, ref) => {
  return (
    <article className="post-item" data-post-id={post.id} ref={ref}>
      <div className="post-header">
        <div className="post-author">{post.author}</div>
        <div className="post-timestamp">{post.timestamp}</div>
      </div>

      <div className="post-content">{post.content}</div>

      {post.image && (
        <div className="post-image">
          <img src={post.image} alt="Post content" loading="lazy" />
        </div>
      )}

      <div className="post-footer">
        <div className="post-likes">❤️ {post.likes}</div>
        <div className="post-actions">
          <button>Like</button>
          <button>Comment</button>
          <button>Share</button>
        </div>
      </div>
    </article>
  );
});

PostItem.displayName = "PostItem";

export default PostItem;
