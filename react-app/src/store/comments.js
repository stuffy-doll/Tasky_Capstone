const GET_COMMENTS = 'get/getComments';

const getC = (payload) => ({
  type: GET_COMMENTS,
  payload
});

const unsuccessful = { "Message": "Unsuccessful" }

export const getComments = (userId) => async dispatch => {
  const res = await fetch(`/api/projects/comments/${userId}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(getC(data));
    return data;
  } else {
    return unsuccessful;
  };
};

const commentsReducer = (state = {}, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_COMMENTS:
      newState = {}
      action.payload.comments.forEach(comment => newState[comment.id] = comment)
      return newState
    default:
      return state;
  };
};

export default commentsReducer
