import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { getBlogs } from "../services_graphqlApp/blog.connect";
import { Dropdown, DropdownButton } from "react-bootstrap";

const BlogHomePage = (props) => {
  const [blogs, setBlogs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    const result = await getBlogs();
    if (result.data) {
      //console.log(result.data.allblogs)
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
      <div className="downPos">
        <DropdownButton id="dropdown-button" title={`${currentUser}`}>
          <Dropdown.Item onClick={profile}>Profile</Dropdown.Item>
          <Dropdown.Item onClick={myBlogs}>My Blogs</Dropdown.Item>
          <Dropdown.Item onClick={logOut}>Log Out</Dropdown.Item>
        </DropdownButton>
      </div>
      <h1 className="header">My Blog</h1>

      <Link
        to="/createOrUpdate-blog"
        className="btn btn-outline-primary"
        style={{ margin: "10px", boxSizing: "border-box", float: "left" }}
      >
        Create Blog
      </Link>

      {blogs.map((blog) => {
        const { id, blogTitle, blogContent, blogTags } = blog;
        return (
          <div
            className="card m-3"
            style={{ width: "100%", margin: "auto", height: "auto" }}
          >
            <div className="card-body">
              <h5 className="card-title">{blogTitle}</h5>
              <p
                className="border btn-outline-primary m-2 p-2"
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
