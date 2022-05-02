import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { getBlogs } from "../services_graphqlApp/blog.connect";
import { Dropdown, DropdownButton, Form } from "react-bootstrap";

const BlogHomePage = (props) => {
  const [blogs, setBlogs] = useState([]);
  const [blogInput, setBlogInput] = useState("");

  var blogTitle, blogTags;
  const getInState = () => {
    const value = "blogTitle";
    return value;
  };
  const [value, setValue] = useState(getInState);
  console.log(value);
  const filterChange = (e) => {
    setValue(e.target.value);
  };

  if (value === "blogTitle") {
    blogTitle = blogInput;
    blogTags = "";
  }
  if (value === "blogTags") {
    blogTitle = "";
    blogTags = blogInput;
  }

  const navigate = useNavigate();

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    const result = await getBlogs(blogTitle, blogTags);
    if (result.data) {
      setBlogs(result.data.allblogs.reverse());
    }
  };
  const currentUser = sessionStorage.getItem("email");
  const logOut = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("email");

    navigate("/");
  };

  const profile = () => {
    navigate("/profile");
  };

  const myBlogs = () => {
    navigate("/my-blogs");
  };

  return (
    <div className="container_b">
      <h1 className="header">Blogger Dash</h1>
      <div className="hearder" style={{ display: "inline" }}>
        <Form.Select
          id="filter"
          onChange={filterChange}
          className="btn btn-sm btn-primary m-2"
          style={{width:"10%"}}
        >
          <option>Filter</option>
          <option value="blogTitle">Blog Title</option>
          <option value="blogTags">Blog Tags</option>
        </Form.Select>
        <input
          type="text"
          name="search"
          onChange={(e) => {
            setBlogInput(e.target.value);
          }}
          className="form-control m-2"
          style={{ width: "45%", display: "inline" }}
          placeholder="Search by Blog Title or Filter"
        />

        <button
          className="btn btn-sm btn-primary btn-lg m-2"
          onClick={loadBlogs}
        >
          Search
        </button>
      </div>

      <div className="downPos">
        <DropdownButton id="dropdown-button" title={`${currentUser}`}>
          <Dropdown.Item onClick={profile}>Profile</Dropdown.Item>
          <Dropdown.Item onClick={myBlogs}>My Blogs</Dropdown.Item>
          <Dropdown.Item onClick={logOut}>Log Out</Dropdown.Item>
        </DropdownButton>
      </div>

      <Link
        to="/blogs/add"
        className="btn btn-outline-primary"
        style={{ margin: "10px", boxSizing: "border-box", float: "left" }}
      >
        Create Blog
      </Link>

      {blogs.map((blog) => {
        const { id, blogTitle, blogContent, blogTags } = blog;
        return (
          <div
            className="card border-secondary m-3"
            style={{ width: "100%", margin: "auto", height: "auto" }}
          >
            <div className="card-body">
              <h5 className="card-title text-primary" key={id}>
                {blogTitle}
              </h5>
              <p
                className="border btn btn-sm btn-primary m-2 p-2"
                style={{ width: "100px" }}
              >
                {blogTags}
              </p>
              <p className="card-text">{blogContent}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BlogHomePage;
