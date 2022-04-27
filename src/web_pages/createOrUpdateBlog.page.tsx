import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createOrUpdateBlog } from "../services_graphqlApp/blog.connect";

const CreateOrUpdateBlog = (props: any) => {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogTags, setBlogTags] = useState("");
  const [blogContent, setBlogContent] = useState("");

  const navigate = useNavigate();

  const onCreateUpdateBlog = async () => {
    if (blogTitle.length === 0) {
      alert("set blog title");
    } else if (blogContent.length === 0) {
      alert("set blog content");
    } else {
      const result = await createOrUpdateBlog(blogTitle, blogContent, blogTags);
      if (result) {
        navigate("/Home");
      } else {
        alert("invalid username or password");
      }
    }
  };

  return (
    <div className="container_b">
      <h1 className="header">Create Or Update Blog</h1>

      <div className="form">
        <div className="mb-3">
          <label className="form-label">Blog Title</label>
          <input
            value={blogTitle}
            onChange={(e) => {
              setBlogTitle(e.target.value);
            }}
            type="text"
            className="form-control"
          />{" "}
        </div>

        <div className="mb-3">
          <label className="form-label">Blog Content</label>
          <textarea
            onChange={(e) => {
              setBlogContent(e.target.value);
            }}
            rows={5}
            className="form-control"
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Blog Tags</label>
          <button
            className="btn btn-sm btn-primary m-2"
            value={"FOOD"}
            onClick={(e) => {
              setBlogTags("FOOD");
            }}
          >
            FOOD
          </button>

          <button
            className="btn btn-sm btn-info m-2"
            value={"SPORTS"}
            onClick={(e) => {
              setBlogTags("SPORTS");
            }}
          >
            SPORTS
          </button>
          <button
            className="btn btn-sm btn-warning m-2"
            value={"TRAVEL"}
            onClick={(e) => {
              setBlogTags("TRAVEL");
            }}
          >
            SPORTS
          </button>

          <button
            className="btn btn-sm btn-secondary m-2"
            value={"NEWS"}
            onClick={(e) => {
              setBlogTags("NEWS");
            }}
          >
            NEWS
          </button>
          <button
            className="btn btn-sm btn-success m-2"
            value={"FINANCE"}
            onClick={(e) => {
              setBlogTags("FINANCE");
            }}
          >
            NEWS
          </button>
        </div>

        <div className="header mb-3 m-2">
          <button onClick={onCreateUpdateBlog} className="btn btn-primary">
            Create Or Update Blog
          </button>
          <Link
            to="/Home"
            style={{ marginLeft: "10px" }}
            className="btn btn-info"
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateOrUpdateBlog;
