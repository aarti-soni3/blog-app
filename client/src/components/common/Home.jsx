import Blogs from "../Blog/Blogs";
import Form from "react-bootstrap/Form";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetAllBlogsQuery } from "../../store/services/blogApiSlice";
import { useSelector } from "react-redux";
import useFilteredBlogs from "../Blog/useFilteredBlogs";

export default function Home() {
  const { user } = useSelector((state) => state.auth);
  const { data, isLoading, error } = useGetAllBlogsQuery();

  const { filteredBlogs, filter, setFilter } = useFilteredBlogs({ data, user });

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
        <Blogs blogs={filteredBlogs} isLoading={isLoading} error={error} />
      </div>
    </>
  );
}
