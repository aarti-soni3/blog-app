import Comment from "./Comment";
import CreateComment from "./CreateComment";
import Stack from "react-bootstrap/Stack";

export default function CommentSection({ user, blogId, comments }) {
  return (
    <>
      <br />
      <h3>Comments</h3>
      <br />
      {user && <CreateComment blogId={blogId} />}

      <Stack gap={3}>
        {comments &&
          comments.map((comment) => {
            return (
              <Comment
                key={comment.commentId}
                blogId={blogId}
                comment={comment}
              />
            );
          })}
      </Stack>
    </>
  );
}
