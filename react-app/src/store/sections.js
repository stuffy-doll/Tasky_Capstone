const GET_SECTIONS = 'get/getSections';
const POST_SECTION = 'post/postSection';
const UPDATE_SECTION = 'put/updateSection';
const DELETE_SECTION = 'delete/deleteSection';

const getS = (payload) => ({
  type: GET_SECTIONS,
  payload
});

const postS = (payload) => ({
  type: POST_SECTION,
  payload
});

const putS = (payload) => ({
  type: UPDATE_SECTION,
  payload
});

const deleteS = (payload) => ({
  type: DELETE_SECTION,
  payload
})

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

export const updateSection = (payload) => async dispatch => {
  const res = await fetch(`/api/projects/sections/update`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(putS(data));
    return data;
  } else {
    return {
      "Message": "Unsuccessful"
    };
  };
};

export const deleteSection = (sectionId) => async dispatch => {
  const res = await fetch(`/api/projects/sections/${sectionId}/delete`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(deleteS(data));
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
    case UPDATE_SECTION:
      newState[action.payload.id] = action.payload
      return newState
    case DELETE_SECTION:
      delete newState[action.payload.id]
      return newState
    default:
      return state
  };
};

export default sectionReducer;
