import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import {
  createOrUpdateBlog,
} from "../services_graphqlApp/blog.connect";

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
          <input
            onChange={(e) => {
              setBlogTags(e.target.value);
            }}
            type="text"
            className="form-control"
          />{" "}
          {/*<div className="m-3 p-2">
                        <input onChange={(e) => {
                            setBlogTags(e.target.value)
                        }} type="radio" value="NEWS" name="blogTags" /> NEWS
                        <input onChange={(e) => {
                            setBlogTags(e.target.value)
                        }} type="radio" value="SPORTS" name="blogTags" /> SPORTS
                        <input onChange={(e) => {
                            setBlogTags(e.target.value)
                        }} type="radio" value="FINANCE" name="blogTags" /> FINANCE
                        <input onChange={(e) => {
                            setBlogTags(e.target.value)
                        }} type="radio" value="FOOD" name="blogTags" /> FOOD
                        <input onChange={(e) => {
                            setBlogTags(e.target.value)
                        }} type="radio" value="TRAVEL" name="blogTags" /> TRAVEL
                    </div>*/}
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
