import { useParams } from "react-router";
import { useGetBlogQuery } from "../../store/services/blogApiSlice";
import { useSelector } from "react-redux";
import PostedBySection from "./PostedBySection";

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
          <PostedBySection
            username={blog.User?.username}
            isLoggedinUser={isLoggedinUser}
            showUserProfile={true}
          />
          {/* <div className="card-text d-flex gap-1 ">
            <div className="rounded-circle py-1 px-3 m-1 bg-secondary fs-5 border">
              {trimSentence(blog.User?.username, 1, false)}
            </div>
            <Stack direction="horizontal" gap={2}>
              <p className="text-body my-auto fs-6">
                posted by {isLoggedinUser ? "You" : blog.User?.username}
              </p>
              {isLoggedinUser && (
                <p className="ms-4 my-0">
                  <Button variant="outline-primary m-1 my-2" size="sm">
                    Edit
                  </Button>
                  <Button variant="outline-danger m-1 my-2" size="sm">
                    Delete
                  </Button>
                </p>
              )}
            </Stack>
          </div> */}
          <br />
          <img
            src={blog.image}
            className="card-img-top w-50 h-100 rounded"
            alt="image"
            loading="lazy"
          />
          <div className="card-body mt-5">
            <p className="card-text"> {blog.description} </p>
          </div>
        </div>
      </div>
    </>
  );
}
