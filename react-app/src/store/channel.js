import { csrfFetch} from "./csrf"


const GET_CHANNEL_USERS = "GET_CHANNEL_USERS";


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
