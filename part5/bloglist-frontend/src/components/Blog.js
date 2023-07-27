import { useState } from 'react'

const Blog = ({ blog, handleUpdateBlog, handleDeleteBlog }) => {
    const [showDetails, setShowDetails] = useState(false)

    const showBlogDetails = { display: showDetails ? '' : 'none' }

    const isBlogCreator = blog.user.username === JSON.parse(window.localStorage.getItem('loggedBlogappUser')).username

    const blogStyle = {
        padding: '5px',
        border: 'solid',
        borderWidth: '1px',
        borderRadius: '5px',
        marginBottom: 5
    }

    const incrementLikes = () => {
        const updatedBlog = {
            ...blog,
            likes: blog.likes + 1
        }

        handleUpdateBlog(updatedBlog)
    }

    const deleteBlog = () => {
        if (window.confirm(`Remove blog: "${blog.title}" by ${blog.author}?`)){
            handleDeleteBlog(blog.id)
        }
    }

    return (
        <div style={blogStyle}>
            <div>
                {blog.title} by {blog.author}
                <button className='inline-right-button' onClick = {() => setShowDetails(!showDetails)}>{showDetails ? 'hide' : 'view'}</button>
                <div style={showBlogDetails}>
                    <div>
                        {blog.url}
                    </div>
                    <div>
                        likes: {blog.likes}
                        <button className='inline-right-button' onClick={incrementLikes}>like</button>
                    </div>
                    <div>
                        {blog.user.name}
                    </div>
                    {isBlogCreator && <button onClick={deleteBlog} >remove</button>}
                </div>
            </div>
        </div>
    )
}

export default Blog
