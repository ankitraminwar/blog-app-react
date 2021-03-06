import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    blogById, createOrUpdateBlog,
} from "../services_graphqlApp/blog.connect";

const UpdateBlog = (props: any) => {
    const [blog, setBlog] = useState(
        { blogTitle: "", blogContent: "", blogTags: "" }
    );

    const { blogTitle, blogContent, blogTags } = blog
    const onInptchange = (e) => {
        setBlog({ ...blog, [e.target.name]: e.target.value })
    };

    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        loadBlogs();
    }, []);

    const loadBlogs = async () => {
        if (id !== null) {
            const result = await blogById(id);
            console.log(result);
            if (result) {
                setBlog(result.data.getBlogById);
            }
        }
    };

    const onUpdate = async () => {
        const result = await createOrUpdateBlog(blogTitle, blogContent, blogTags, id);
        if (result) {
        navigate('/my-blogs')
        }
    }



    return (
        <div className="container_b">
            <h1 className="header">Update Blog</h1>

            <div className="form">
                <div className="mb-3">
                    <label className="form-label">Blog Title</label>
                    <input
                        name="blogTitle"
                        value={blogTitle}
                        onChange={(e) => {
                            onInptchange(e);
                        }}
                        type="text"
                        className="form-control"
                    />{" "}
                </div>

                <div className="mb-3">
                    <label className="form-label">Blog Content</label>
                    <textarea
                        name="blogContent"
                        value={blogContent}
                        onChange={(e) => {
                            onInptchange(e);
                        }}
                        rows={5}
                        className="form-control"
                    ></textarea>
                </div>

                <div className="mb-3">
                    <label className="form-label">Blog Tags</label>
                    <input
                        name="blogTags"
                        value={blogTags}
                        onChange={(e) => {
                            onInptchange(e);
                        }}
                        type="text"
                        className="form-control"
                        readOnly
                    />{" "}
                </div>

                <div className="header mb-3 m-2">
                    <button onClick={onUpdate} className="btn btn-primary">
                        Update
                    </button>
                    <Link
                        to="/my-blogs"
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

export default UpdateBlog;
