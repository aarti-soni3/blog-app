import Comment from "./Comment";
import CreateComment from "./CreateComment";
import Stack from "react-bootstrap/Stack";

//main comment section
export default function CommentSection({ user, blogId, comments }) {
  return (
    <>
      {comments.length > 0 ? <h3>Comments</h3> : <></>}
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
