import { csrfFetch} from "./csrf"


const GET_CUR_CHANNNELS_INFO = "GET_CUR_CHANNELS_INFO";


const getCurChannelsInfo = (info) => ({
    type: GET_CUR_CHANNNELS_INFO,
    payload: info
})

export const getCurChannelsInfoThunk = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/channels/${id}`);
    const data = await res.json();
    dispatch(getCurChannelsInfo(data))
}

const initialState = {
    users: null,
    channelId: null,
    description: null,
    name: null,
}

const channelsReducer = (state = initialState, action) => {
    let newState = {...state}
    switch (action.type) {
        case GET_CUR_CHANNNELS_INFO:
            newState = action.payload;
            return newState;
        default:
            return state;
    }
}
