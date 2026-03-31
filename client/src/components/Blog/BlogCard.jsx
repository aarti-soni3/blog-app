import { useSelector } from "react-redux";
import { trimSentence } from "../../utils/TextUtility";
import { useNavigate } from "react-router";

export default function BlogCard({ blog }) {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const handleOnClick = () => {
    navigate(`/blogs/${blog.blogId}`);
  };

  let isLoggedinUser;
  if (user) {
    isLoggedinUser = user.userId === blog?.User?.userId;
    console.log(isLoggedinUser)
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
          <p className="card-text">
            <small className="text-body-secondary">
              posted by {isLoggedinUser ? "You" : blog?.User?.username}
            </small>
          </p>
        </div>
      </div>
    </div>
  );
}
