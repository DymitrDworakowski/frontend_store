import client, { authHeader } from "./client";

export async function fetchComments({ token, productId }) {
  try {
    const res = await client.get(`/comments?productId=${productId}`, {
      headers: authHeader(token),
    });
    return res.data;
  } catch (err) {
    throw new Error(err?.response?.data?.message || "Failed to fetch comments");
  }
}
export async function postComment({ token, productId, content }) {
  try {
    const res = await client.post(
      `/comments`,
      { productId, content },
      { headers: authHeader(token) }
    );
    return res.data;
  } catch (err) {
    throw new Error(err?.response?.data?.message || "Failed to post comment");
  }
}
