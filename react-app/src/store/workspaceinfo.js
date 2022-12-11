import { csrfFetch } from "./csrf";

const GET_LIST_OF_USERS = "/workspace/users";
const CLEAR_LIST_OF_USERS = "/workspace/users/clear";
const GET_ALL_PENDING_WORKSPACE_INVITATIONS = "/workspace/invitations/all/pending";
const CLEAR_LIST_OF_INVIIATIONS = "/workspace/invitations/clear";
const REMOVE_INVITATION = "/workspace/invitations/remove";
const REMOVE_USER = "/workspace/users/remove";


export const setWorkspaceUsers = (users) => {
    return {
        type: GET_LIST_OF_USERS,
        users,
    };
};

export const removeInvitation = (invitationId) => {
    return {
        type: REMOVE_INVITATION,
        invitationId,
    };
};

export const removeUser = (userId) => {
    return {
        type: REMOVE_USER,
        userId,
    };
};

export const setAllPendingWorkspaceInvitations = (invitations) => {
    return {
        type: GET_ALL_PENDING_WORKSPACE_INVITATIONS,
        invitations,
    };
};

export const clearWorkspaceUsers = () => {
    return {
        type: CLEAR_LIST_OF_USERS,
    };
};

export const clearWorkspaceInvitations = () => {
    return {
        type: CLEAR_LIST_OF_INVIIATIONS,
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

// get a list of all pending invitations for a workspace by workspace id
export const getAllPendingWorkspaceInvitations = (workspaceId) => async (dispatch) => {

    const res = await csrfFetch(`/api/invitations/${workspaceId}/invitations`);

    if (res.ok) {
        const data = await res.json();
        dispatch(setAllPendingWorkspaceInvitations(data.invitations));
    }
};


// remove a pending invitation by invitation id
export const removePendingWorkspaceInvitation = (invitationId) => async (dispatch) => {

    const res = await csrfFetch(`/api/invitations/${invitationId}/delete`, {
        method: "DELETE",
    });

    if (res.ok) {
        dispatch(removeInvitation(invitationId));
    }
};

// remove a user from workspace by workspace id and user id
export const removeUserFromWorkspace = (workspaceId, userId) => async (dispatch) => {

    const res = await csrfFetch(`/api/workspaces/${workspaceId}/users/${userId}/remove`, {
        method: "DELETE",
    });

    if (res.ok) {
        dispatch(removeUser(userId));

    }
};




const initialState = { users: [], workspaceInvites: []};
export default function workspaceInfoReducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case GET_LIST_OF_USERS:
        action.users.forEach((user) => (newState.users[user.id] = user));
        return newState;
    case CLEAR_LIST_OF_USERS:
        newState.users = []
        return newState;
    case GET_ALL_PENDING_WORKSPACE_INVITATIONS:
        action.invitations.forEach((invitation) => (newState.workspaceInvites[invitation.id] = invitation));
        return newState;
    case CLEAR_LIST_OF_INVIIATIONS:
        newState.workspaceInvites = []
        return newState;
    case REMOVE_INVITATION:
        newState.workspaceInvites = newState.workspaceInvites.filter((invitation) => invitation.id !== action.invitationId)
        return newState;
    case REMOVE_USER:
        newState.users = newState.users.filter((user) => user.id !== action.userId)
        return newState;
    default:
      return state;
  }
}
