const GET_PROJECTS = 'get/getProjects';
const POST_PROJECT = 'post/postProject';
const UPDATE_PROJECT = 'update/updateProject';
const DELETE_PROJECT = 'delete/deleteProject';

const getP = (payload) => ({
  type: GET_PROJECTS,
  payload
});

const postP = (payload) => ({
  type: POST_PROJECT,
  payload
});

const updateP = (payload) => ({
  type: UPDATE_PROJECT,
  payload
});

const deleteP = (payload) => ({
  type: DELETE_PROJECT,
  payload
});

export const getProjects = (userId) => async dispatch => {
  const res = await fetch(`/api/projects/${userId}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(getP(data));
    return data;
  } else {
    return {
      "Message": "Unsuccessful"
    };
  };
};

export const postProject = (payload) => async dispatch => {
  const res = await fetch(`/api/projects/new`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(postP(data));
    return data;
  } else {
    return {
      "Message": "Unsuccessful"
    };
  };
};

export const updateProject = (payload) => async dispatch => {
  const res = await fetch(`/api/projects/${payload.project_id}/update`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(updateP(data));
    return data;
  } else {
    return {
      "Message": "Unsuccessful"
    };
  };
};

export const deleteProject = (projectId) => async dispatch => {
  const res = await fetch(`/api/projects/${projectId}/delete`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(deleteP(data));
    return data;
  } else {
    return {
      "Message": "Unsuccessful"
    };
  };
};

const projectReducer = (state = {}, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_PROJECTS:
      newState = {}
      action.payload.projects.forEach(project => newState[project.id] = project)
      return newState
    case POST_PROJECT:
      newState[action.payload.id] = action.payload
      return newState
    case UPDATE_PROJECT:
      newState[action.payload.id] = action.payload
      return newState
    case DELETE_PROJECT:
      delete newState[action.payload.id]
      return newState
    default:
      return state
  };
};

export default projectReducer;
