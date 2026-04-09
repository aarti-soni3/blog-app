import { trimSentence } from "../../utils/TextUtility";
import Button from "react-bootstrap/esm/Button";
import UpdateBlogModal from "./UpdateBlogModal";
import DeleteBlogModal from "./DeleteBlogModal";
import { useState } from "react";

export default function PostedBySection({
  blog,
  isLoggedinUser,
  showUserProfile,
}) {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const closeUpdateModal = () => {
    setShowUpdateModal(false);
  };
  const openUpdateModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowUpdateModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };
  const openDeleteModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDeleteModal(true);
  };

  const postedBy = () => {
    return <>posted by {isLoggedinUser ? <b>you</b> : blog.User?.username}</>;
  };

  const mainContainer = showUserProfile
    ? "card-text d-flex gap-1"
    : "justify-content-between";

  const buttonStyle = showUserProfile ? "ms-4 my-0" : "ms-auto";
  return (
    <>
      <div className={mainContainer}>
        {/* show round shape profile view */}
        {showUserProfile && (
          <div className="rounded-circle py-1 px-3 m-1 bg-secondary fs-5 border">
            {trimSentence(blog?.User?.username, 1, false)}
          </div>
        )}

        <div className="card-text d-flex align-items-center gap-2">
          {showUserProfile ? (
            <p className="text-body my-auto fs-6">{postedBy()}</p>
          ) : (
            <small className="text-body">{postedBy()}</small>
          )}
          {isLoggedinUser && (
            <div className={buttonStyle}>
              <Button
                variant="outline-primary"
                className="ms-2"
                size="sm"
                onClick={openUpdateModal}
              >
                Edit
              </Button>
              <Button
                variant="outline-danger"
                className="ms-2"
                size="sm"
                onClick={openDeleteModal}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      </div>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <UpdateBlogModal
          blog={blog}
          handleClose={closeUpdateModal}
          show={showUpdateModal}
        />
        <DeleteBlogModal
          blog={blog}
          handleClose={closeDeleteModal}
          show={showDeleteModal}
        />
      </div>
    </>
  );
}
