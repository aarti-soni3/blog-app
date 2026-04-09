import Blogs from "../Blog/Blogs";
import Form from "react-bootstrap/Form";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetAllBlogsQuery } from "../../store/services/blogApiSlice";
import { useSelector } from "react-redux";
import useFilteredBlogs from "../Blog/useFilteredBlogs";
import { useMemo } from "react";
import { findWordFromSentence } from "../../utils/TextUtility";

export default function Home({ searchText }) {
  const { user } = useSelector((state) => state.auth);

  // getting all blogs
  const { data, isLoading, error } = useGetAllBlogsQuery();

  //filter blogs by filter state
  const { filteredBlogs, filter, setFilter } = useFilteredBlogs({ data, user });

  // search filtered blogs
  const foundBlogs = useMemo(() => {
    if (!searchText) return filteredBlogs;

    const blogs = filteredBlogs.filter((blog) => {
      return findWordFromSentence(searchText, blog.title);
    });

    return blogs;
  }, [searchText, filteredBlogs]);

  return (
    <>
      <div className="w-100 mx-5">
        {user && (
          <div className="d-flex justify-content-end">
            <div className="input-group mb-2 w-auto">
              <span className="input-group-text">
                <FontAwesomeIcon icon={faFilter} />
              </span>
              <Form.Select
                value={filter}
                onChange={(e) => {
                  setFilter(e.target.value);
                }}
              >
                <option value="all">All Blogs</option>
                <option value="my">My Blogs</option>
                <option value="other">Others Blogs</option>
                <option value="commentedByMe">Post commented by me</option>
              </Form.Select>
            </div>
          </div>
        )}

        {/* set filter as key for refresh when changes*/}
        <Blogs
          key={filter}
          blogs={foundBlogs}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </>
  );
}
