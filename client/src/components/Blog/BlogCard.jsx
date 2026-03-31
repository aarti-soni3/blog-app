import { useSelector } from "react-redux";
import { trimSentence } from "../../utils/TextUtility";
import { useNavigate } from "react-router";
import Button from "react-bootstrap/esm/Button";
import PostedBySection from "./PostedBySection";

export default function BlogCard({ blog }) {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const handleOnClick = () => {
    navigate(`/blogs/${blog.blogId}`);
  };

  let isLoggedinUser;
  if (user) {
    isLoggedinUser = user.userId === blog?.User?.userId;
  }

  return (
    <div className="col" role="button" onClick={handleOnClick}>
      <div className="card m-2 shadow-sm h-100">
        <img
          src={blog?.image}
          className="card-img-top"
          alt="image"
          loading="lazy"
        />
        <div className="card-body">
          <h5 className="card-title">{trimSentence(blog.title)}</h5>
          <p className="card-text ">{trimSentence(blog.description, 80)}</p>
          <PostedBySection
            username={blog.User?.username}
            isLoggedinUser={isLoggedinUser}
            showUserProfile={false}
          />
          {/* <div className="card-text d-flex align-items-center">
            <small className="text-body-secondary">
              posted by {isLoggedinUser ? "You" : blog?.User?.username}
            </small>
            {isLoggedinUser && (
              <div className="ms-auto">
                <Button variant="outline-primary m-1 my-2 " size="sm">
                  Edit
                </Button>
                <Button variant="outline-danger m-1 my-2" size="sm">
                  Delete
                </Button>
              </div>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
}
