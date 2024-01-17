import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    removeBlog(state, action) {
      const id = action.payload;
      return state.filter(blog => blog.id !== id)
    }
  }
});

export const { appendBlog, removeBlog, setBlogs } = blogSlice.actions

export default blogSlice.reducer
