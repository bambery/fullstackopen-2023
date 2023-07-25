import { useState } from 'react'

const Blog = ({blog}) => {
    const [showDetails, setShowDetails] = useState(false)

    const showBlogDetails = { display: showDetails ? '' : 'none' }

    const blogStyle = {
        padding: '5px',
        border: 'solid',
        borderWidth: '1px',
        borderRadius: '5px',
        marginBottom: 5
    }

    return (
        <div style={blogStyle}>
            <div>
                {blog.title} by {blog.author}
                <button onClick = {() => setShowDetails(!showDetails)}>{showDetails ? 'view' : 'hide'}</button>
                <div style={showBlogDetails}>
                    <div>
                        {blog.url}
                    </div>
                    <div>
                        likes: {blog.likes}
                        <button>like</button>
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
