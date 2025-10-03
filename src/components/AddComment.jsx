import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postComment } from "../api/comments";
import style from "./AddComment.module.css";
import Loader from "./Loader";

function AddComment({ token, productId }) { 
    const [content, setContent] = useState("");
    const queryClient = useQueryClient();
    
    const mutation = useMutation({
        mutationFn: postComment,
        onSuccess: () => {
            alert("Comment added successfully!");
            setContent("");
            queryClient.invalidateQueries(["comments", productId]);
        },
        onError: (error) => {
            alert(`Failed to add comment: ${error.message}`);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!content.trim()) return alert("Comment content cannot be empty");
        mutation.mutate({ token, productId, text: content.trim() });
    }

    return (
        <div className={style.commentContainer}>
            <h3 className={style.title}>Add a Comment</h3>
            <form onSubmit={handleSubmit} className={style.commentForm}>
                <div className={style.formGroup}>
                    <textarea
                        className={style.textarea}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Share your thoughts about this product..."
                        rows="4"
                        required
                        disabled={mutation.isLoading}
                        maxLength={500}
                    />
                    <div className={style.charCount}>
                        {content.length}/500
                    </div>
                </div>
                <button 
                    type="submit" 
                    className={style.submitButton} 
                    disabled={mutation.isLoading || !content.trim()}
                >
                    {mutation.isLoading ? (
                        <>
                            <Loader size={16} />
                            Posting Comment...
                        </>
                    ) : (
                        <>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M12 19V5M5 12l7-7 7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Post Comment
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}

export default AddComment;