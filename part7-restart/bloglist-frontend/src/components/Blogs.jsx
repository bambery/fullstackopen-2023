import { useRef } from 'react';
import BlogForm from "./BlogForm";
import BlogList from './BlogList';
import Toggleable from "./Toggleable";

const Blogs = () => {
  const blogFormRef = useRef();

  return (
    <>
      <Toggleable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm toggleForm={() => blogFormRef.current.toggleVisibility()} />
      </Toggleable>
      <BlogList />
    </>
  )
}

export default Blogs;
