import { trimSentence } from "../../utils/TextUtility";

export default function BlogCard({ blog }) {
  return (
    <div className="col ">
      <div className="card m-2 shadow-sm">
        <img
          src="https://images.unsplash.com/photo-1623612374192-bb28178ed476?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="card-img-top"
          alt="image"
          loading="lazy"
        />
        <div className="card-body">
          <h5 className="card-title">{trimSentence(blog.title)}</h5>
          <p className="card-text">{trimSentence(blog.description,100)}</p>
          <p className="card-text">
            <small className="text-body-secondary">{blog.user_id}</small>
          </p>
        </div>
      </div>
    </div>
  );
}
