import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { incrementLikes, deleteBlog } from "../reducers/blogReducer";
import { useMatch, useNavigate } from "react-router-dom";
import { newError } from '../reducers/notificationReducer';

const Blog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedIn = useSelector(store => store.loggedIn);
  const blogs = useSelector(store => store.blogs)
  const match = useMatch('/blogs/:id/');
  const blog = match
      ? blogs.find(blog => blog.id === match.params.id)
      : null

  // this does not work. If a resource does exist but hasn't been loaded yet, this will also trigger. I have played around with it and can't make it work.
  /*
  useEffect(() => {
    if (!blog){
      dispatch(newError("The blog you were attempting to access does not exist or has been deleted."));
      navigate("/");
    }
  }, [dispatch, navigate])
  */

  const userIsAuthor = () => {
    return blog.user.id === loggedIn.id;
  }

  const handleLikeClick = () => {
    dispatch(incrementLikes(blog));
  };

  const handleDeleteClick = () => {
    dispatch(deleteBlog(blog));
  };

  //why do I need to have this when I have a check in useEffect?
  if (!blog) {
    return null;
  }

  return (
    <div>
      <h2>{blog.title} by {blog.author}</h2>
      <div>
        <div>
          <a href={`${blog.url}`}>{blog.url}</a>
        </div>
        <div>
          likes: {blog.likes}
          <button
            className="inline-right-button"
            onClick={handleLikeClick}
          >
            like
          </button>
        </div>
        <div>added by {blog.user.name}</div>
        {userIsAuthor() && (
          <button onClick={handleDeleteClick}>delete blog</button>
        )}
      </div>
      <h3>comments</h3>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment.id}>
              {comment.content}
          </li>
          ))}
      </ul>
    </div>
  );
};

export default Blog;
