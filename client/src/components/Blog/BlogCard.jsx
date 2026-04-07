import { useSelector } from "react-redux";
import { trimSentence } from "../../utils/TextUtility";
import { useNavigate } from "react-router";
import PostedBySection from "./PostedBySection";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";

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

  console.log(blog);

  return (
    <Col>
      <Card
        className="m-2 shadow-sm h-100" /* role="button" onClick={handleOnClick} */
      >
        <Card.Img
          variant="top"
          src={blog?.image?.url}
          className="h-50"
          alt="image"
          loading="lazy"
        />
        <Card.Body className="pb-1">
          <Card.Title role="button" onClick={handleOnClick}>
            {trimSentence(blog.title, 20)}
          </Card.Title>
          <Card.Text>
            {trimSentence(blog.description, 20)}
            {blog?.Comments?.length ? (
              <small className="d-block">
                No. of comments : {blog.Comments.length}
              </small>
            ) : (
              ""
            )}
            <div>
              <Badge
                pill
                className="border border-primary bg-transparent text-primary"
              >
                {blog?.Category?.name}
              </Badge>
            </div>
          </Card.Text>
          <PostedBySection
            blog={blog}
            isLoggedinUser={isLoggedinUser}
            showUserProfile={false}
          />
        </Card.Body>
      </Card>
    </Col>
  );
}
