import { useDispatch, useSelector } from "react-redux";
import { incrementLikes, deleteBlog } from "../reducers/blogReducer";
import { useMatch } from "react-router-dom";

const Blog = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector(store => store.loggedInUser);
  const blogs = useSelector(store => store.blogs)

  const match = useMatch('/blogs/:id/');
  const blog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null

  const userIsAuthor = () => {
    return blog.user.id === loggedIn.id;
  }

  const handleLikeClick = () => {
    dispatch(incrementLikes(blog));
  };

  const handleDeleteClick = () => {
    dispatch(deleteBlog(blog));
  };

  // if this url is loaded directly without first hitting the main page, then the data needs to be fetched first from the App component. The page should load after that is done.
  if (!blog) {
    return <div>Loading...</div>
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
        {userIsAuthor && (
          <button onClick={handleDeleteClick}>remove</button>
        )}
      </div>
    </div>
  );
};

export default Blog;
