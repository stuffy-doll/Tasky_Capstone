const CommentsModal = ({ project, comments, setShowComments }) => {

  return (
    <div className='comments-modal'>
      <div className='comments-header'>
        <h2>Comments</h2>
      </div>
      <div className='comments-view'>
        {comments.map(comment => (
          <div className='comment-slot' key={comment.id}>{comment.content}</div>
        ))}
      </div>
      <button onClick={setShowComments(false)}>X</button>
    </div>
  );
};

export default CommentsModal;
