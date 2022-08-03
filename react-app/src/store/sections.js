const GET_SECTIONS = 'get/getSections';

const getS = (payload) => ({
  type: GET_SECTIONS,
  payload
});

export const getSections = (projectId) => async dispatch => {
  const res = await fetch(`/api/projects/sections/${projectId}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(getS(data));
    return data;
  } else {
    return {
      "Message": "Unsuccessful"
    };
  };
};

const sectionReducer = (state = {}, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_SECTIONS:
      action.payload.sections.forEach(section => newState[section.id] = section)
      return newState
    default:
      return state
  };
};

export default sectionReducer;
