import { useQuery } from "@tanstack/react-query";
import { fetchComments } from "../api/comments";

function Comments({ productId }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["comments", productId],
    queryFn: () => fetchComments(productId),
    enabled: !!productId,
  });
  if (isLoading) return <div>Loading comments...</div>;
  if (error) return <div>Error loading comments: {error.message}</div>;

  return (
    <div>
      <h3>Comments</h3>
      {data.length === 0 && <p>No comments yet.</p>}
      <ul>
        {data.map((comment) => (
          <li key={comment.id}>
            <p>{comment.user.username}</p>
            {comment.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Comments;
