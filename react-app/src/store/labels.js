const GET_LABELS = 'get/getLabels';
const GET_TASK_LABELS = 'get/getTaskLabels';
const POST_LABEL = 'post/postLabel';
const PUT_LABEL = 'put/updateLabel';

const getL = (payload) => ({
  type: GET_LABELS,
  payload
});

const getTL = (payload) => ({
  type: GET_TASK_LABELS,
  payload
});

const postL = (payload) => ({
  type: POST_LABEL,
  payload
});

const putL = (payload) => ({
  type: PUT_LABEL,
  payload
});

const unsuccessful = {
  "Message": "Unsuccessful"
}

export const getLabels = (userId) => async dispatch => {
  const res = await fetch(`/api/projects/labels/${userId}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(getL(data));
    return data;
  } else {
    return unsuccessful;
  };
};

export const getTasklabels = (taskId) => async dispatch => {
  const res = await fetch(`/api/projects/tasks/labels/${taskId}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(getTL(data));
    return data;
  } else {
    return unsuccessful;
  };
};

export const postLabel = (payload) => async dispatch => {
  const res = await fetch(`/api/projects/labels/new`, {
    method: 'POST',
    headers: { "Content-Type": 'application/json' },
    body: JSON.stringify(payload)
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(postL(data));
    return data;
  } else {
    return unsuccessful;
  };
};

export const updateLabel = (payload) => async dispatch => {
  const labelId = payload.id;
  const res = await fetch(`/api/projects/labels/${labelId}/update`, {
    method: 'PUT',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(putL(data));
    return data;
  } else {
    return unsuccessful;
  };
};

const labelReducer = (state = {}, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_LABELS:
      action.payload.labels.forEach(label => newState[label.id] = label)
      return newState;
    case GET_TASK_LABELS:
      newState = {}
      action.payload.labels.forEach(label => newState[label.id] = label)
      return newState;
    case POST_LABEL:
      newState[action.payload.id] = action.payload
      return newState;
    case PUT_LABEL:
      newState[action.payload.id] = action.payload
      return newState;
    default:
      return state;
  }
}

export default labelReducer;
