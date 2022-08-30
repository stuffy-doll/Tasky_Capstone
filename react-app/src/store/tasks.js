const GET_TASKS = 'get/getTasks';
const GET_USER_TASKS = 'get/getUserTasks';
const GET_LABEL_TASKS = 'get/getLabelTasks';
const POST_TASK = 'post/postTask';
const UPDATE_TASK = 'update/updateTask';
const DELETE_TASK = 'delete/deleteTask';

const getT = (payload) => ({
  type: GET_TASKS,
  payload
});

const getUT = (payload) => ({
  type: GET_USER_TASKS,
  payload
});

const getLT = (payload) => ({
  type: GET_LABEL_TASKS,
  payload
});

const postT = (payload) => ({
  type: POST_TASK,
  payload
});

const putT = (payload) => ({
  type: UPDATE_TASK,
  payload
});

const deleteT = (payload) => ({
  type: DELETE_TASK,
  payload
})

export const getTasks = (projectId) => async dispatch => {
  const res = await fetch(`/api/projects/tasks/${projectId}`);
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

export const getLabelTasks = (labelId) => async dispatch => {
  const res = await fetch(`/api/projects/labels/tasks/${labelId}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(getLT(data));
    return data;
  } else {
    return {
      "Message": "Unsuccessful"
    };
  };
};

export const getUserTasks = (userId) => async dispatch => {
  const res = await fetch(`/api/projects/tasks/user/${userId}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(getUT(data));
    return res;
  } else {
    return {
      "Message": "Unsuccessful"
    };
  };
};

export const postTask = (payload) => async dispatch => {
  console.log(payload);
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

export const deleteTask = (taskId) => async dispatch => {
  const res = await fetch(`/api/projects/tasks/${taskId}/delete`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(deleteT(data));
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
      newState = {}
      action.payload.tasks.forEach(task => newState[task.id] = task)
      return newState
    case GET_USER_TASKS:
      newState = {}
      action.payload.uTasks.forEach(task => newState[task.id] = task)
      return newState
    case GET_LABEL_TASKS:
      newState = {}
      action.payload.tasks.forEach(task => newState[task.id] = task)
      return newState;
    case POST_TASK:
      newState[action.payload.id] = action.payload;
      return newState
    case UPDATE_TASK:
      newState[action.payload.id] = action.payload;
      return newState
    case DELETE_TASK:
      delete newState[action.payload.id]
      return newState
    default:
      return state
  };
};

export default taskReducer;
