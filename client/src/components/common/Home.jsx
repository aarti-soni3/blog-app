import Blogs from "../Blog/Blogs";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <>
      <div className="w-100 mx-5">
        <div className="d-flex justify-content-end">
          <div className="input-group mb-2 w-auto">
            <span className="input-group-text">
              <FontAwesomeIcon icon={faFilter} />
            </span>
            <Form.Select>
              <option value="1">All Blogs</option>
              <option value="2">My Blogs</option>
              <option value="3">Others Blogs</option>
              <option value="3">Post commented by me</option>
            </Form.Select>
          </div>
        </div>
        <Blogs />
      </div>
    </>
  );
}
