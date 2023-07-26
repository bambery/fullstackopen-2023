import { useState } from 'react'

const Blog = ({blog, updateBlog}) => {
    const [showDetails, setShowDetails] = useState(true)

    const showBlogDetails = { display: showDetails ? '' : 'none' }

    const blogStyle = {
        padding: '5px',
        border: 'solid',
        borderWidth: '1px',
        borderRadius: '5px',
        marginBottom: 5
    }

    const incrementLikes = (event) => {
        event.preventDefault()
        const updatedBlog = {
            ...blog,
            likes: blog.likes + 1
        }

        updateBlog(updatedBlog)
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
                </div>
            </div>
        </div>
    )
}

export default Blog
