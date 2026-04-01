import { trimSentence } from "../../utils/TextUtility";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";

export default function Comment({ comment }) {
  const { user } = useSelector((state) => state.auth);

  let isLoggedinUser;
  if (user) isLoggedinUser = user.userId === comment?.User?.userId;

  return (
    <>
      <div className="container-md d-flex flex-column border border-dark-subtle rounded p-2">
        <div className="d-flex gap-2 m-0">
          <p className="rounded-circle py-1 px-3 m-1 bg-secondary fs-5 border">
            {trimSentence(comment?.User?.username, 1, false)}
          </p>
          <b className="text-body my-auto fs-6">{comment.User.username}</b>

          {isLoggedinUser && (
            <div className="ms-auto">
              <Button
                variant="outline-primary m-1 my-2"
                size="sm"
                // onClick={openUpdateModal}
              >
                Edit
              </Button>
              <Button
                variant="outline-danger m-1 my-2"
                size="sm"
                // onClick={openDeleteModal}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="ms-5 ps-2">
          <p className="m-0 mb-1">{comment.description}</p>
        </div>
      </div>
    </>
  );
}
