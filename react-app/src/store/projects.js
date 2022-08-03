const GET_PROJECTS = 'get/getProjects';

const get = (payload) => ({
  type: GET_PROJECTS,
  payload
});

export const getProjects = (userId) => async dispatch => {
  const res = await fetch(`/api/projects/${userId}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(get(data));
    console.log("DATA:: ", data)
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
    default:
      return state
  };
};

export default projectReducer;
