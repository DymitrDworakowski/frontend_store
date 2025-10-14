import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postComment } from "../api/comments";
import style from "./AddComment.module.css";
import Loader from "./Loader";
import { toast } from 'react-toastify';

function AddComment({ token, product }) {
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      setContent("");
      queryClient.invalidateQueries(["comments", product]);
    },
    onError: (error) => {
      toast.error(`Failed to add comment: ${error.message}`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    mutation.mutate({ token, product, text: content.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className={style.commentForm}>
      <div className={style.formGroup}>
        <textarea
          className={style.textarea}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your comment..."
          rows="3"
          required
          disabled={mutation.isLoading}
          maxLength={300}
        />
        <div className={style.footer}>
          <span className={style.charCount}>
            {content.length}/300
          </span>
          <button
            type="submit"
            className={style.submitButton}
            disabled={mutation.isLoading || !content.trim()}
          >
            {mutation.isLoading ? (
              <Loader size={16} />
            ) : (
              "Post"
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

export default AddComment;