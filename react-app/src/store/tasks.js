const GET_TASKS = 'get/getTasks';

const getT = (payload) => ({
  type: GET_TASKS,
  payload
});

export const getTasks = (sectionId) => async dispatch => {
  const res = await fetch(`/api/projects/tasks/${sectionId}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(getT(data));
    return res;
  } else {
    return {
      "Message": "Unsuccessful"
    };
  };
};

const taskReducer = (state = {}, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_TASKS:
      action.payload.tasks.forEach(task => newState[task.id] = task)
      return newState
    default:
      return state
  };
};

export default taskReducer;
