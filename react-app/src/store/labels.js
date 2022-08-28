const GET_LABELS = 'get/getLabels';

const getL = (payload) => ({
  type: GET_LABELS,
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
  }
}

const labelReducer = (state = {}, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_LABELS:
      action.payload.labels.forEach(label => newState[label.id] = label)
      return newState;
    default:
      return state;
  }
}

export default labelReducer;
