import { csrfFetch } from "./csrf";

const GET_LIST_OF_USERS = "/workspace/users";


export const setWorkspaceUsers = (users) => {
    return {
        type: GET_LIST_OF_USERS,
        users,
    };
};


// get a list of all users in a workspace by workspace id
export const getListOfUsers = (workspaceId) => async (dispatch) => {

    const res = await csrfFetch(`/api/workspaces/${workspaceId}/users`);

    if (res.ok) {
        const data = await res.json();
        dispatch(setWorkspaceUsers(data.users));
    }
};




const initialState = { users: {}};
export default function workspaceInfoReducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case GET_LIST_OF_USERS:
        action.users.forEach((user) => (newState.users[user.id] = user));
        return newState;
    default:
      return state;
  }
}
