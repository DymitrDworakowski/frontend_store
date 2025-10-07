import client, { authHeader } from "./client";

export async function fetchComments(productId) {
  try {
    const res = await client.get(`/comments/${productId}`, {});
    return res.data;
  } catch (err) {
    throw new Error(err?.response?.data?.message || "Failed to fetch comments");
  }
}
export async function postComment({ token, product, text }) {
  try {
    const res = await client.post(
      `/comments`,
      { product, text },
      { headers: authHeader(token) }
    );
    return res.data;
  } catch (err) {
    throw new Error(err?.response?.data?.message || "Failed to post comment");
  }
}
