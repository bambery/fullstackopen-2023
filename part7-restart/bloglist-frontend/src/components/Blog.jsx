import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { removeBlog, updateBlog } from '../reducers/blogReducer'
import { newNotification, newError } from '../reducers/notificationReducer'
import blogService from '../services/blogs'

const Blog = ({ blog, userIsAuthor }) => {
    const [showDetails, setShowDetails] = useState(false)
  const dispatch = useDispatch()

  const showBlogDetails = { display: showDetails ? '' : 'none' }

  const blogStyle = {
    padding: '5px',
    border: 'solid',
    borderWidth: '1px',
    borderRadius: '5px',
    marginBottom: 5
  }

  const incrementLikes = async () => {
    const updatedBlogObj = {
      ...blog,
      likes: blog.likes + 1
    }

    try {
      const updatedBlog = await blogService.update(updatedBlogObj);
      await blogService.update(updatedBlog);
      dispatch(updateBlog(updatedBlog));
    } catch (exception) {
      exception.response?.data?.error
        ? dispatch(newError(exception.response.data.error))
        : dispatch(newError(exception));
    }
  }

  const deleteBlog = async () => {
    if (window.confirm(`Remove blog: "${blog.title}" by ${blog.author}?`)){
      try {
        await blogService.remove(blog.id);
        dispatch(removeBlog(blog.id));
        dispatch(newNotification(`"${blog.title}" by ${blog.author} deleted`));
      } catch (exception) {
        console.log(exception);
        exception.response?.data?.error
          ? dispatch(newError(exception.response.data.error))
        : dispatch(newError(exception));
      }
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} by {blog.author}
        <button className='inline-right-button' onClick = {() => setShowDetails(!showDetails)}>{showDetails ? 'hide' : 'view'}</button>
        <div style={showBlogDetails}>
          <div>
            <a href={`${blog.url}`}>{blog.url}</a>
          </div>
          <div>
                        likes: {blog.likes}
                        <button className='inline-right-button' onClick={incrementLikes}>like</button>
                    </div>
                    <div>
                        {blog.user.name}
                    </div>
                    {userIsAuthor && <button onClick={deleteBlog} >remove</button>}
                </div>
            </div>
        </div>
    )
}

export default Blog
