import { csrfFetch } from "./csrf";

const GET_CUR_CHANNELS = "GET_CUR_CHANNELS";
const CREATE_CHANNEL = "CREATE_CHANNEL";
const UPDATE_CHANNEL = "UPDATE_CHANNEL";
const DELETE_CHANNEL = "DELETE_CHANNEL";

const getWorkspaceChannels = (channels) => {
  return {
    type: GET_CUR_CHANNELS,
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

export const getAllWorkspaceChannels = (workspaceId) => async (dispatch) => {
  const res = await csrfFetch(`/api/channels/${workspaceId}`);

  if (res.ok) {
    const data = await res.json();
    console.log(data)
    dispatch(getWorkspaceChannels(data.channels));
  }
};

export const createNewChannel = (channel) => async (dispatch) => {
  const { workspaceId, name } = channel;

  const res = await csrfFetch(`/api/channels/${workspaceId}/create`, {
    method: "POST",
    body: JSON.stringify({
      workspaceId,
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

export const deleteAWorkspace = (channelId) => async (dispatch) => {
  const res = await csrfFetch(`/api/workspaces/${channelId}`, {
    method: "DELETE",
  });

  const response = await res.json();
  if (res.status === 200) {
    dispatch(deleteChannel(channelId));
  }
  return response;
};

const initialState = {};
export default function channelsReducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case GET_CUR_CHANNELS:
      let redoState = {}
      if (action.channels)
        action.channels.forEach(
          (channel) => (redoState[channel.id] = channel)
        );
      return redoState;
    case CREATE_CHANNEL:
      newState[action.channel.id] = action.channel;
      return newState;
    case UPDATE_CHANNEL:
      newState[action.channel.id] = action.channel;
      return newState;
    case DELETE_CHANNEL:
      delete newState[action.channelId];
      return newState;
    default:
      return state;
  }
}
