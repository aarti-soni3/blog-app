import BlogCard from "./BlogCard";

export default function Blogs({ blogs }) {
  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 row-cols-xxl-4 g-4">
      {blogs &&
        blogs.map((blog, id) => {
          return <BlogCard key={id} blog={blog} />;
        })}
    </div>
  );
}
