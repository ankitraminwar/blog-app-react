import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { deleteBlog, getMyBlogs } from "../services_graphqlApp/blog.connect"

const MyBlogPage = (props) => {

    const [blogs, setBlogs] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        loadBlogs()
    }, [])

    const loadBlogs = async () => {
        const result = await getMyBlogs()
        if (result.data) {
            //console.log(result.data.allblogs)
            setBlogs(result.data.blogs)
        }
    }

    const delBlog = async (id) => {
        const result = await deleteBlog(id)
        loadBlogs()
    }

    return <div className="container_b">
    <h1 className="header">My Blog</h1>
    {blogs.map((blog) => {
        const { id, blogTitle, blogContent, blogTags } = blog
        return (
            <div className="card m-3" style={{ width: '100%', margin: 'auto', height: 'auto' }}>
                <div className="card-body">
                    <h5 className="card-title">{blogTitle}</h5>
                    <p className="border btn-outline-primary m-2 p-2" style={{ width: '100px' }}>{blogTags}</p>
                    <p className="card-text">{blogContent}</p>
                </div>
                <div style={{float:'right'}}>
                    <a href={`/createOrUpdate-blog/${id}`} className="btn btn-sm m-2 btn-outline-primary">Update Blog</a>
                    <button onClick={() => delBlog(id)} className="btn btn-sm m-2 btn-outline-primary">Delete Blog</button>
                </div>
            </div>
        )
    })}

</div>
}

export default MyBlogPage