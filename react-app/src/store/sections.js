const GET_SECTIONS = 'get/getSections';
const POST_SECTION = 'post/postSection';

const getS = (payload) => ({
  type: GET_SECTIONS,
  payload
});

const postS = (payload) => ({
  type: POST_SECTION,
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

export const postSection = (payload) => async dispatch => {
  const res = await fetch(`/api/projects/sections/new`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(postS(data));
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
    case POST_SECTION:
      newState[action.payload.id] = action.payload
      return newState
    default:
      return state
  };
};

export default sectionReducer;
