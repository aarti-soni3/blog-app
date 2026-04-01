import Comment from "./Comment";
import CreateComment from "./CreateComment";
import Stack from "react-bootstrap/Stack";

export default function CommentSection({ blogId, comments }) {
  console.log(comments);
  return (
    <>
      <br />
      <h3>Comments</h3>
      <br />
      <CreateComment blogId={blogId} />

      <Stack gap={3}>
        {comments &&
          comments.map((comment) => {
            return (
              <Comment
                key={comment.commentId}
                comment={comment}
              />
            );
          })}
      </Stack>
    </>
  );
}
