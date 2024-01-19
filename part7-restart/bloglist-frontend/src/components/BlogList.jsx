import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BlogList = () => {
  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.blogs);
  const loggedIn = useSelector((state) => state.loggedIn);

  const blogStyle = {
    padding: "5px",
    border: "solid",
    borderWidth: "1px",
    borderRadius: "5px",
    marginBottom: 5,
  };

  return (
    <div className="blog-list">
      {blogs
        .toSorted((a, b) => b.likes - a.likes)
        .map((blog) => (
          <div style={blogStyle} key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} by {blog.author}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default BlogList;
