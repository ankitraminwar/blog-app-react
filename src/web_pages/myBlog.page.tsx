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
            setBlogs(result.data.blogs.reverse())
        }
    }

    const delBlog = async (id) => {
        const result = await deleteBlog(id)
        loadBlogs()
    }

    const homePage = () => {
        navigate('/Home')
    }

    return <div className="container_b">
    <h1 className="header">My Blog</h1>
    <div className="downPos">
    <button className="btn btn-sm btn-primary m-2" onClick={homePage}>Home</button>
    </div>
    {blogs.map((blog) => {
        const { id, blogTitle, blogContent, blogTags } = blog
        return (
            <div className="card border-secondary m-3" style={{ width: '100%', margin: 'auto', height: 'auto' }}>
                <div className="card-body">
                    <h5 className="card-title text-primary">{blogTitle}</h5>
                    <p className="border btn-outline-primary m-2 p-2" style={{ width: '100px' }}>{blogTags}</p>
                    <p className="card-text">{blogContent}</p>
                </div>
                <div style={{float:'right'}}>
                    <a href={`/Update-blog/${id}`} className="btn btn-sm m-2 btn-outline-warning">Update Blog</a>
                    <button onClick={() => delBlog(id)} className="btn btn-sm m-2 btn-outline-danger">Delete Blog</button>
                </div>
            </div>
        )
    })}

</div>
}

export default MyBlogPage