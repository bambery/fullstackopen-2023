import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { incrementLikes, deleteBlog } from "../reducers/blogReducer";
import { useMatch, useNavigate } from "react-router-dom";
import { newError } from "../reducers/notificationReducer";
import commentService from "../services/comments";
import CommentForm from "../components/CommentForm";

const Blog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedIn = useSelector((store) => store.loggedIn);
  const blogId = useMatch("/blogs/:id/").params.id;
  const blog = useSelector((store) => store.blogs.find((b) => b.id === blogId));
  const [comments, setComments] = useState([]);

  useEffect(() => {
    commentService
      .getBlogComments(blogId)
      .then((comments) => setComments(comments));
  }, [blogId]);

  //  const comments = useSelector(store => store.comments.find((c) => c.blogId === blogId))

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
  };

  const handleLikeClick = () => {
    dispatch(incrementLikes(blog));
  };

  const handleDeleteClick = () => {
    dispatch(deleteBlog(blog));
  };

  const handleNewComment = async (commentObj) => {
    try {
      const newComment = await commentService.create(commentObj);
      setComments(comments.concat(newComment));
    } catch (exception) {
      exception.response?.data?.error
        ? dispatch(newError(exception.response.data.error))
        : dispatch(newError(exception));
    }
  };
  //why do I need to have this when I have a check in useEffect?
  if (!blog) {
    return null;
  }

  return (
    <div>
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <div>
        <div>
          <a href={`${blog.url}`}>{blog.url}</a>
        </div>
        <div>
          likes: {blog.likes}
          <button className="inline-right-button" onClick={handleLikeClick}>
            like
          </button>
        </div>
        <div>added by {blog.user.name}</div>
        {userIsAuthor() && (
          <button onClick={handleDeleteClick}>delete blog</button>
        )}
      </div>
      <h3>comments</h3>
      <CommentForm blogId={blogId} handleNewComment={handleNewComment} />
      {comments.length === 0 ? (
        <div>no comments yet</div>
      ) : (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>{comment.content}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Blog;
