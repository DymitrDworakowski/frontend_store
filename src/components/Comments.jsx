import { useQuery } from "@tanstack/react-query";
import { fetchComments } from "../api/comments";

function Comments({ token, productId }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["comments", productId],
    queryFn: () => fetchComments({ token,productId }),
    enabled: !!productId,
  });
  if (isLoading) return <div>Loading comments...</div>;
  if (error) return <div>Error loading comments: {error.message}</div>;
  console.log(data);
  return <div>Comments for product {productId}</div>;
}
export default Comments;
