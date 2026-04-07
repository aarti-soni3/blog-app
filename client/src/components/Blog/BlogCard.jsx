import { useSelector } from "react-redux";
import { trimSentence } from "../../utils/TextUtility";
import { useNavigate } from "react-router";
import PostedBySection from "./PostedBySection";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Placeholder from "react-bootstrap/Placeholder";
import { useState } from "react";

export default function BlogCard({ blog }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [isBroken, setIsBroken] = useState(false);

  const handleOnClick = () => {
    navigate(`/blogs/${blog.blogId}`);
  };

  let isLoggedinUser;
  if (user) {
    isLoggedinUser = user.userId === blog?.User?.userId;
  }

  const handleError = () => {
    setIsBroken(true);
  };

  return (
    <Col>
      <Card
        className="m-2 shadow-sm h-100" /* role="button" onClick={handleOnClick} */
        style={{ maxHeight: "400px" }}
      >
        {isBroken ? (
          <Placeholder xs={12} style={{ height: "200px" }} />
        ) : (
          <Card.Img
            variant="top"
            src={blog?.image?.url}
            onError={handleError}
            className="w-100 h-50 object-fit-cover"
            alt="image"
            loading="lazy"
          />
        )}

        <Card.Body className="d-flex flex-column gap-2">
          <Card.Title role="button" onClick={handleOnClick}>
            {trimSentence(blog.title, 20)}
          </Card.Title>

          <Card.Text as={"div"}>
            {trimSentence(blog.description, 20)}

            <div>
              <Badge
                as="div"
                pill
                className="border border-primary bg-transparent text-primary"
              >
                {blog?.Category?.name}
              </Badge>
            </div>

            <div className="my-3">
              <PostedBySection
                blog={blog}
                isLoggedinUser={isLoggedinUser}
                showUserProfile={false}
              />

              {blog?.Comments?.length ? (
                <small className="d-block text-body-secondary">
                  No. of comments : {blog.Comments.length}
                </small>
              ) : (
                ""
              )}
            </div>

          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}
