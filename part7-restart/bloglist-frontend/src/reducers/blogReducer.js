import { createSlice } from "@reduxjs/toolkit";
import { newNotification, newError } from "../reducers/notificationReducer";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blog",
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    removeBlog(state, action) {
      const id = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload;
      return state.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog,
      );
    },
  },
});

export const incrementLikes = (blog) => {
  return async (dispatch) => {
    const updatedBlogObj = {
      ...blog,
      likes: blog.likes + 1,
    };

    try {
      const updatedBlog = await blogService.update(updatedBlogObj);
      await blogService.update(updatedBlog);
      dispatch(updateBlog(updatedBlog));
    } catch (exception) {
      exception.response?.data?.error
        ? dispatch(newError(exception.response.data.error))
        : dispatch(newError(exception));
    }
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    if (window.confirm(`Remove blog: "${blog.title}" by ${blog.author}?`)) {
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
  };
};

export const { appendBlog, removeBlog, setBlogs, updateBlog } =
  blogSlice.actions;

export default blogSlice.reducer;
