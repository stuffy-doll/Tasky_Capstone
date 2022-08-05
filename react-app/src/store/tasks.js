const GET_TASKS = 'get/getTasks';
const POST_TASK = 'post/postTask';
const UPDATE_TASK = 'update/updateTask'

const getT = (payload) => ({
  type: GET_TASKS,
  payload
});

const postT = (payload) => ({
  type: POST_TASK,
  payload
})

const putT = (payload) => ({
  type: UPDATE_TASK,
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

export const postTask = (payload) => async dispatch => {
  const res = await fetch(`/api/projects/tasks/new`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(postT(data));
    return data;
  } else {
    return {
      "Message": "Unsuccessful"
    };
  };
};

export const updateTask = (payload) => async dispatch => {
  const res = await fetch(`/api/projects/tasks/${payload.task_id}/update`, {
    method: 'PUT',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(putT(data));
    return data;
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
    case POST_TASK:
      newState[action.payload.id] = action.payload;
      return newState
    case UPDATE_TASK:
      newState[action.payload.id] = action.payload;
      return newState
    default:
      return state
  };
};

export default taskReducer;
