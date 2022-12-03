import { csrfFetch } from "./csrf";

const GET_CUR_CHANNELS = "GET_CUR_CHANNELS";
const CREATE_CHANNEL = "CREATE_CHANNEL";
const UPDATE_CHANNEL = "UPDATE_CHANNEL";
const DELETE_CHANNEL = "DELETE_CHANNEL";
const GET_CUR_USER_CHANNELS = "GET_CUR_USER_CHANNELS";
const LEAVE_CHANNEL = "LEAVE_CHANNEL";
const JOIN_CHANNEL = "JOIN_CHANNEL";

const getWorkspaceChannels = (channels) => {
  return {
    type: GET_CUR_CHANNELS,
    channels,
  };
};

const getCurrentUserChannels = (channels) => {
  console.log(channels)
  return {
    type: GET_CUR_USER_CHANNELS,
    channels,
  };
};

const createChannel = (channel) => {
  return {
    type: CREATE_CHANNEL,
    channel,
  };
};

const updateChannel = (channel) => {
  return {
    type: UPDATE_CHANNEL,
    channel,
  };
};

const deleteChannel = (channelId) => {
  return {
    type: DELETE_CHANNEL,
    channelId,
  };
};

const leaveAChannel = (channelId) => {
  return {
    type: LEAVE_CHANNEL,
    channelId,
  };
};

// join a channel
const joinAChannel = (channelId) => {
  return {
    type: JOIN_CHANNEL,
    channelId,
  };
};

export const getAllWorkspaceChannels = (workspaceId) => async (dispatch) => {
  const res = await csrfFetch(`/api/channels/${workspaceId}`);

  if (res.ok) {
    const data = await res.json();
    console.log(data)
    dispatch(getWorkspaceChannels(data.channels));
  }
};

// get all channels the current user is a member of
export const getAllUserChannels = (workspace_id) => async (dispatch) => {
  const res = await csrfFetch(`/api/channels/${workspace_id}/user`);

  if (res.ok) {
    const data = await res.json();
    dispatch(getCurrentUserChannels(data.channels));
  }
};

export const createNewChannel = (channel) => async (dispatch) => {
  const { workspace_Id, name } = channel;

  const res = await csrfFetch(`/api/channels/${workspace_Id}/create`, {
    method: "POST",
    body: JSON.stringify({
      workspace_Id,
      name,
    }),
  });

  if (res.ok) {
    const newChannel = await res.json();
    dispatch(createChannel(newChannel));
  }

  return res;
};

export const editChannel = (channel, id) => async (dispatch) => {
  const res = await csrfFetch(`/api/channels/${id}`, {
    method: "PUT",
    body: JSON.stringify(channel),
  });
  if (res.ok) {
    const updatedChannel = await res.json();
    dispatch(updateChannel(updatedChannel));
    return res;
  }
};

export const removeChannel = (channelId) => async (dispatch) => {
  const res = await csrfFetch(`/api/channels/${channelId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(deleteChannel(channelId));
  }
};

// leave a channel
export const leaveChannel = (channelId) => async (dispatch) => {
  const res = await csrfFetch(`/api/channels/${channelId}/leave`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(leaveAChannel(channelId));
  }
};


// join a channel
export const joinChannel = (channelId) => async (dispatch) => {
  const res = await csrfFetch(`/api/channels/${channelId}/join`, {
    method: "POST",
  });

  if (res.ok) {
    dispatch(joinAChannel(channelId));
  }
};



const initialState = {
  usersChannels: { 1: { id: 1, name: "general" } }
};
export default function channelsReducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case GET_CUR_CHANNELS:
      let redoState = {}
      if (action.channels)
        action.channels.forEach(
          (channel) => (redoState[channel.id] = channel)
        );
        redoState.usersChannels = newState.usersChannels
      return redoState;
    case CREATE_CHANNEL:
      newState[action.channel.id] = action.channel;
      newState.usersChannels = {...newState.usersChannels, [action.channel.id]: action.channel}
      return newState;
    case UPDATE_CHANNEL:
      newState[action.channel.id] = action.channel;
      return newState;
    case DELETE_CHANNEL:
      delete newState[action.channelId];
      return newState;
    case JOIN_CHANNEL:
      newState.usersChannels = {...newState.usersChannels, [action.channelId]: newState[action.channelId]}
      return newState;
    case GET_CUR_USER_CHANNELS:
      if(action.channels){
           newState.usersChannels = {}
        action.channels.forEach(
          (channel) => (newState.usersChannels[channel.id] = channel)
        );

      }
      return newState;
    case LEAVE_CHANNEL:
      delete newState.usersChannels[action.channelId];
    default:
      return state;
  }
}
