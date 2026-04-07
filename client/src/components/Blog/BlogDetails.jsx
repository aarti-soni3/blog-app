import { useParams } from "react-router";
import { useGetBlogQuery } from "../../store/services/blogApiSlice";
import { useSelector } from "react-redux";
import PostedBySection from "./PostedBySection";
import Image from "react-bootstrap/esm/Image";
import CommentSection from "../Comment/CommentSection";
import Badge from "react-bootstrap/Badge";

export default function BlogDetails() {
  const id = useParams("id");
  const { data, isLoading, error } = useGetBlogQuery(id.id);
  const { user } = useSelector((state) => state.auth);

  if (isLoading) return <h4>Loading...</h4>;
  if (error) return <p>{error.message}</p>;

  const blog = data.blog;
  let isLoggedinUser;

  if (user) {
    isLoggedinUser = blog.User.userId === user.userId;
  }

  return (
    <>
      <div className="container-md">
        <div className="m-4">
          <h3 className="card-title">{blog.title}</h3>
          <div className="d-flex gap-2 align-items-center">

          <PostedBySection
            blog={blog}
            isLoggedinUser={isLoggedinUser}
            showUserProfile={true}
            />
          <Badge
            pill
            className="border border-primary bg-transparent text-primary"
            >
            {blog?.Category?.name}
          </Badge>
            </div>
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
      </div>
    </>
  );
}
