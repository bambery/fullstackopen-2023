import { useState } from "react";
import { useDispatch } from "react-redux";
import { appendBlog } from "../reducers/blogReducer";
import { newNotification, newError } from "../reducers/notificationReducer";
import blogService from "../services/blogs";

const BlogForm = ({ toggleForm }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newBlog = await blogService.create({
        title,
        author,
        url,
      });
      dispatch(
        newNotification(
          `New blog: "${newBlog.title}" by ${newBlog.author} added`,
        ),
      );
      dispatch(appendBlog(newBlog));

      setTitle("");
      setAuthor("");
      setUrl("");
      toggleForm();
    } catch (exception) {
      exception.response?.data?.error
        ? dispatch(newError(exception.response.data.error))
        : dispatch(newError(exception));
    }
  };

  return (
    <div>
      <h1>create new</h1>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            type="text"
            value={title}
            aria-label="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            aria-label="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            aria-label="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
