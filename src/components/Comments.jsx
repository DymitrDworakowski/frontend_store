import { useQuery } from "@tanstack/react-query";
import { fetchComments } from "../api/comments";
import Loader from "./Loader";
import style from "./Comments.module.css";

function Comments({ productId }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["comments", productId],
    queryFn: () => fetchComments(productId),
    enabled: !!productId,
  });

  if (isLoading) {
    return (
      <div className={style.loadingContainer}>
        <Loader size={32} />
        <p className={style.loadingText}>Loading comments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={style.errorContainer}>
        <p className={style.errorMessage}>Error loading comments: {error.message}</p>
      </div>
    );
  }

  const comments = data || [];

  return (
    <div className={style.commentsContainer}>
      <div className={style.commentsHeader}>
        <h3 className={style.commentsTitle}>
          Comments ({comments.length})
        </h3>
      </div>
      
      {comments.length === 0 ? (
        <div className={style.emptyState}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" className={style.emptyIcon}>
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p className={style.emptyText}>No comments yet. Be the first to share your thoughts!</p>
        </div>
      ) : (
        <div className={style.commentsList}>
          {comments.map((comment) => (
            <div key={comment._id} className={style.commentItem}>
              <div className={style.commentHeader}>
                <div className={style.userInfo}>
                  <div className={style.avatar}>
                    {comment.user.username?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div className={style.userDetails}>
                    <p className={style.username}>{comment.user.username || 'Anonymous'}</p>
                    <p className={style.timestamp}>
                      {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : 'Recently'}
                    </p>
                  </div>
                </div>
              </div>
              <div className={style.commentContent}>
                <p className={style.commentText}>{comment.text || comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Comments;