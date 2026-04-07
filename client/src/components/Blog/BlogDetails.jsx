import { useParams } from "react-router";
import { useGetBlogQuery } from "../../store/services/blogApiSlice";
import { useSelector } from "react-redux";
import PostedBySection from "./PostedBySection";
import Image from "react-bootstrap/esm/Image";
import CommentSection from "../Comment/CommentSection";
import Badge from "react-bootstrap/Badge";
import Container from "react-bootstrap/Container";
import BlogDetailPlaceHolder from "./BlogDetailPlaceHolder";

export default function BlogDetails() {
  const id = useParams("id");
  const { data, isLoading, error } = useGetBlogQuery(id.id);
  const { user } = useSelector((state) => state.auth);

  if (isLoading) return <BlogDetailPlaceHolder />;
  if (error) return <p>{error.message}</p>;

  const blog = data.blog;
  let isLoggedinUser;

  if (user) {
    isLoggedinUser = blog.User.userId === user.userId;
  }

  return (
    <>
      <Container>
        <div className="m-4">
          <h3 className="card-title">{blog.title}</h3>
          <div>
            <PostedBySection
              blog={blog}
              isLoggedinUser={isLoggedinUser}
              showUserProfile={true}
            />
          </div>
          <Badge
            pill
            className="border border-primary bg-transparent text-primary mb-4 mt-2"
          >
            {blog?.Category?.name}
          </Badge>
          <br />
          {blog.image && (
            <Image
              className="card-img-top w-50 h-100 rounded"
              alt="image"
              src={blog?.image?.url}
              loading="lazy"
              thumbnail
            />
          )}
          <div className="card-body mt-5">
            <p className="card-text" style={{ whiteSpace: "pre-wrap" }}>
              {blog.description}
            </p>
          </div>
        </div>

        <CommentSection
          user={user}
          blogId={blog.blogId}
          comments={blog?.Comments}
        />
      </Container>
    </>
  );
}
