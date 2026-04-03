import { useGetAllBlogsQuery } from "../../store/services/blogApiSlice";
import BlogCard from "./BlogCard";

export default function Blogs() {
  const { data, isLoading, error } = useGetAllBlogsQuery();

  if (isLoading) return <h4>Loading...</h4>;
  if (error) return <h4>Something went wrong!</h4>;

  return (
    <div className="d-flex flex-column w-100 mx-5">
      <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 row-cols-xxl-4 g-4">
        {data.blogs &&
          data.blogs.map((blog) => {
            return <BlogCard key={blog.blogId} blog={blog} />;
          })}
      </div>
    </div>
  );
}
