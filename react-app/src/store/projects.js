const GET_PROJECTS = 'get/getProjects';
const POST_PROJECT = 'post/postProject';

const getP = (payload) => ({
  type: GET_PROJECTS,
  payload
});

const postP = (payload) => ({
  type: POST_PROJECT,
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

const projectReducer = (state = {}, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_PROJECTS:
      action.payload.projects.forEach(project => newState[project.id] = project)
      return newState
    case POST_PROJECT:
      newState[action.payload.id] = action.payload
      return newState
    default:
      return state
  };
};

export default projectReducer;
