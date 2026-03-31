import { trimSentence } from "../../utils/TextUtility";
import Button from "react-bootstrap/esm/Button";

export default function PostedBySection({
  username,
  isLoggedinUser,
  showUserProfile,
}) {
  const postedBy = () => {
    return <>posted by {isLoggedinUser ? "You" : username}</>;
  };

  const mainContainer = showUserProfile
    ? "card-text d-flex gap-1"
    : "justify-content-between";

  const buttonStyle = showUserProfile ? "ms-4 my-0" : "ms-auto";

  return (
    <>
      <div className={mainContainer}>
        {showUserProfile && (
          <div className="rounded-circle py-1 px-3 m-1 bg-secondary fs-5 border">
            {trimSentence(username, 1, false)}
          </div>
        )}

        <div className="card-text d-flex align-items-center gap-2">
          {showUserProfile ? (
            <p className="text-body my-auto fs-6">{postedBy()}</p>
          ) : (
            <small className="text-body-secondary">{postedBy()}</small>
          )}
          {isLoggedinUser && (
            <div className={buttonStyle}>
              <Button variant="outline-primary m-1 my-2" size="sm">
                Edit
              </Button>
              <Button variant="outline-danger m-1 my-2" size="sm">
                Delete
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
