import { useState } from "react";
import { useSelector } from "react-redux";
import { trimSentence } from "../../utils/TextUtility";
import Button from "react-bootstrap/Button";
import UpdateCommentModal from "./UpdateCommentModal";
import DeleteCommentModal from "./DeleteCommentModal";

export default function Comment({ blogId, comment }) {
  const { user } = useSelector((state) => state.auth);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const openUpdateModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowUpdateModal(true);
  };

  const openDeleteModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDeleteModal(true);
  };

  const closeUpdateModal = () => setShowUpdateModal(false);
  const closeDeleteModal = () => setShowDeleteModal(false);

  let isLoggedinUser;
  if (user) isLoggedinUser = user.userId === comment?.User?.userId;

  return (
    <>
      <div className="container-md d-flex flex-column border border-dark-subtle rounded p-2">
        <div className="d-flex gap-2 m-0">
          <p className="rounded-circle py-1 px-3 m-1 bg-secondary fs-5 border">
            {trimSentence(comment?.User?.username, 1, false)}
          </p>
          <b className="text-body my-auto fs-6">{comment?.User?.username}</b>

          {isLoggedinUser && (
            <div className="ms-auto">
              <Button
                variant="outline-primary m-1 my-2"
                size="sm"
                onClick={openUpdateModal}
              >
                Edit
              </Button>
              <Button
                variant="outline-danger m-1 my-2"
                size="sm"
                onClick={openDeleteModal}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="ms-5 ps-2">
          <p className="m-0 mb-1">{comment?.description}</p>
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <UpdateCommentModal
            blogId={blogId}
            comment={comment}
            show={showUpdateModal}
            handleClose={closeUpdateModal}
          />
          <DeleteCommentModal
            blogId={blogId}
            commentId={comment.commentId}
            show={showDeleteModal}
            handleClose={closeDeleteModal}
            commentDescription={comment?.description}
          />
        </div>
      </div>
    </>
  );
}
