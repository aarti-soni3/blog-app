import { useState } from "react";
import BlogCard from "./BlogCard";
import Pagination from "react-bootstrap/Pagination";
import Form from "react-bootstrap/Form";
import BlogCardPlaceHolder from "./BlogCardPlaceHolder";

export default function Blogs({ blogs, isLoading, error }) {
  const [blogsPerPage, setBlogsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * blogsPerPage;
  const endIndex = startIndex + blogsPerPage;
  const currentBlogs = blogs?.slice(startIndex, endIndex);
  const totalBlogs = blogs?.length;
  const totalPages = Math.ceil(totalBlogs / blogsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading)
    return (
      <>
        <div className="d-flex flex-column">
          <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 row-cols-xxl-4 g-4">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => {
              return <BlogCardPlaceHolder key={num} />;
            })}
          </div>
        </div>
      </>
    );

  if (error) return <h4 className="text-center">Something went wrong!</h4>;

  return (
    <div className="d-flex flex-column">
      <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 row-cols-xxl-4 g-4 ">
        {currentBlogs && currentBlogs.length > 0 ? (
          currentBlogs.map((blog) => {
            return <BlogCard key={blog.blogId} blog={blog} />;
          })
        ) : (
          <h4 className="text-center">No blogs available!</h4>
        )}
      </div>

      <section className="ms-auto d-flex gap-3 align-items-end">
        <div className="d-flex flex-row">
          <Form.Select
            className="h-50"
            value={blogsPerPage}
            onChange={(e) => {
              const count = parseInt(e.target.value);
              setBlogsPerPage(count);
              paginate(1);
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </Form.Select>
        </div>
        <Pagination className="mt-5 m-0" data-bs-theme="light">
          <Pagination.First
            onClick={() => {
              paginate(1);
            }}
          />
          <Pagination.Prev
            onClick={() => {
              setCurrentPage((prev) => Math.max(prev - 1, 1));
            }}
          />
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => {
            return (
              <Pagination.Item
                key={num}
                active={num === currentPage}
                onClick={() => {
                  paginate(num);
                }}
              >
                {num}
              </Pagination.Item>
            );
          })}
          <Pagination.Next
            onClick={() => {
              setCurrentPage((prev) => Math.min(prev + 1, totalPages));
            }}
          />
          <Pagination.Last
            onClick={() => {
              paginate(totalPages);
            }}
          />
          {/* <Pagination.Ellipsis /> */}
        </Pagination>
      </section>
    </div>
  );
}
