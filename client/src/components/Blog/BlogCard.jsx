import { useSelector } from "react-redux";
import { trimSentence } from "../../utils/TextUtility";
import { useNavigate } from "react-router";
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
    <div className="col">
      <div
        className="card m-2 shadow-sm h-100"
        role="button"
        onClick={handleOnClick}
      >
        <img
          src={blog?.image?.url}
          className="card-img-top"
          alt="image"
          loading="lazy"
        />
        <div className="card-body">
          <h5 className="card-text link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">
            {trimSentence(blog.title)}
          </h5>
          <p className="card-text ">{trimSentence(blog.description, 70)}</p>
          <PostedBySection
            blog={blog}
            isLoggedinUser={isLoggedinUser}
            showUserProfile={false}
          />
        </div>
      </div>
    </div>
  );
}
