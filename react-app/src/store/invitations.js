import { csrfFetch} from "./csrf";



const GET_INVITATIONS = "GET_INVITATIONS";
const CREATE_INVITATION = "CREATE_INVITATION";
const ACCEPT_INVITATION = "ACCEPT_INVITATION";
const DELETE_INVITATION = "DELETE_INVITATION";


const getInvitations = (invitations) => {
    return {
        type: GET_INVITATIONS,
        invitations,
    };
};

const createInvitation = (invitation) => {
    return {
        type: CREATE_INVITATION,
        invitation,
    };
}

const deleteInvitation = (invitationId) => {
    return {
        type: DELETE_INVITATION,
        invitationId,
    };
}

const acceptInvitation = (invitation) => {
    return {
        type: ACCEPT_INVITATION,
        invitation,
    };
}

export const getAllInvitations = () => async (dispatch) => {
    const res = await csrfFetch(`/api/invitations/me`);

    if (res.ok) {
        const data = await res.json();
        dispatch(getInvitations(data.invitations));
    }
}

// accept a invitation
export const acceptAnInvitation = (invitationId) => async (dispatch) => {
    const res = await csrfFetch(`/api/invitations/${invitationId}/accept`, {
        method: "POST",
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(acceptInvitation(data.invitation));
}
}

export const createNewInvitation = (email, workspaceId) => async (dispatch) => {
    const res = await csrfFetch(`/api/invitations/${workspaceId}/send/${email}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(createInvitation(data.invitation));
    }
}



export const deleteInvitationById = (invitationId) => async (dispatch) => {
    const res = await csrfFetch(`/api/invitations/${invitationId}`, {
        method: "DELETE",
    });

    if (res.ok) {
        dispatch(deleteInvitation(invitationId));
    }
}




const initialState = {};

const invitationsReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_INVITATIONS:
            let redoState = {};
            if (action.invitations)
                action.invitations.forEach((invitation) => (redoState[invitation.id] = invitation));
            return redoState;
        case CREATE_INVITATION:
            newState[action.invitation.id] = action.invitation;
            return newState;
        case DELETE_INVITATION:
            delete newState[action.invitationId];
            return newState;
        case ACCEPT_INVITATION:
            delete newState[action.invitation.id];
            return newState;
        default:
            return state;
    }
}

export default invitationsReducer;
