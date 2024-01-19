import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Blog from "./Blog";
import blogService from "../services/blogs";
import { setBlogs } from "../reducers/blogReducer";

const BlogList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(setBlogs(blogs)));
  }, [dispatch]);

  const blogs = useSelector(state => state.blogs)
  const loggedIn = useSelector(state => state.loggedIn)

  return(
    <div className="blog-list">
      {blogs
          .toSorted((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              userIsAuthor={blog.user.username === loggedIn.username}
            />
          ))}
    </div>
  )
}

export default BlogList
