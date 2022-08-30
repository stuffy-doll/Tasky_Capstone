const GET_ALL_TASKS = 'getALL/getAllTasks';
const GET_ALL_SECTIONS = 'getALL/getAllSections';

const allTasks = (payload) => ({
  type: GET_ALL_TASKS,
  payload
});

const allSections = (payload) => ({
  type: GET_ALL_SECTIONS,
  payload
});

const unsuccessful = { "Message": "Unsuccessful" };

export const getAllSections = (userId) => async dispatch => {
  console.log("THUNK", userId)
  const res = await fetch(`/api/projects/sections/user/${userId}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(allSections(data));
    return data;
  } else {
    return unsuccessful;
  };
};

const allReducer = (state = {}, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_ALL_SECTIONS:
      action.payload.allSections.forEach(section => newState[section.id] = section)
      return newState;
    default:
      return state;
  };
};

export default allReducer;
