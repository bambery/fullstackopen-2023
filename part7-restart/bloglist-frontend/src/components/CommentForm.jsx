import { useField } from "../hooks/";
//import { addComment } from '../reducers/commentReducer';

const CommentForm = ({ blogId, handleNewComment }) => {
  const comment = useField("text");

  //move up to parent for appending new comment to state
  const handleSubmit = async (e) => {
    e.preventDefault();
    handleNewComment({
      content: comment.value,
      blogId: blogId
    });
    comment.onReset();
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input {...comment} />
        <button type="submit">add comment</button>
      </div>
    </form>
  )
}

export default CommentForm;
