import { useGetAllBlogsQuery } from "../store/services/blogApiSlice";
import Blogs from "./Blog/Blogs";

export default function Home() {
  const { data: blogs, isLoading, error } = useGetAllBlogsQuery();

  if (isLoading) return <h4>Loading...</h4>;
  if (error) return <h4>Something went wrong!</h4>;

  return (
    <div className="d-flex flex-column w-100 mx-5">
      <h1 className="text-center">Blogs</h1>
      <Blogs blogs={blogs.blogs} />
    </div>
  );
}
