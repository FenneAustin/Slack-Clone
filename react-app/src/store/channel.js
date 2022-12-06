import { csrfFetch} from "./csrf"


const GET_CHANNEL_USERS = "GET_CHANNEL_USERS";
const ADD_CHANNEL_USER = "ADD_CHANNEL_USER";

export const addChannelUser = (user) => ({
    type: ADD_CHANNEL_USER,
    payload: user
})


const getChannelUsers = (users) => ({
    type: GET_CHANNEL_USERS,
    payload: users
})

export const getChannelUsersList = (channelId) => async (dispatch) => {
    const res = await csrfFetch(`/api/channels/${channelId}/users`);


    if (res.ok) {
    const data = await res.json();
    dispatch(getChannelUsers(data))
    }
}

// add a user to a channel by channel id and user id
export const addChannelUserToChannel = (channelId, userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/channels/${channelId}/add/${userId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId,
            channelId
        })
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(addChannelUser(data))
    }
}


const initialState = {
    users: null,
    channelId: null,
    description: null,
    name: null,
}

export default function channelReducer(state = initialState, action){
    let newState = {...state}
    switch (action.type) {
        case GET_CHANNEL_USERS:
            newState.users = action.payload.channel_members;
            return newState;
        default:
            return state;
    }
}
