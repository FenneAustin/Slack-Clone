export const SET_WORKSPACE = "ui/SHOW_SERVER";

export const CLEAR_WORKSPACE = "ui/CLEAR_SERVER";
export const SET_CHAT_ID = "ui/SET_CHAT";
export const CLEAR_CHAT_ID = "ui/CLEAR_CHAT";
export const SET_CHANNEL_ID = "ui/SET_CHANNEL_ID";
export const CLEAR_CHANNEL_ID = "ui/CLEAR_CHANNEL_ID";
export const SHOW_ALL_CHANNELS = "ui/SHOW_ALL_CHANNELS";
export const HIDE_ALL_CHANNELS = "ui/HIDE_ALL_CHANNELS";

// selectors
export const uiWorkspaceIdSelector = (state) => state.ui.workspaceId;
export const uiChatIdSelector = (state) => state.ui.chatId;
export const uiChannelSelector = (state) => state.ui.channelId;
export const uiShowAllChannelsSelector = (state) => state.ui.showAllChannels;

// select workspace action creator
export const setWorkspace = (workspaceId) => ({
  type: SET_WORKSPACE,
  payload: workspaceId,
});

// leave workspace ui action creator
export const clearWorkspace = () => ({
  type: CLEAR_WORKSPACE,
});

// show chat action creator
export const setChatId = (chatId) => ({
  type: SET_CHAT_ID,
  payload: chatId,
});

// leave chat ui action creator
export const clearChatId = () => ({
  type: CLEAR_CHAT_ID,
});

// show channel action creator
export const showAllChannels = () => ({
  type: SHOW_ALL_CHANNELS,
})

// hide channel action creator
export const hideAllChannels = () => ({
  type: HIDE_ALL_CHANNELS,
})


// set channel ui action creator
export const setWorkspaceChannelId = (channelId) => ({
  type: SET_CHANNEL_ID,
  payload:  channelId ,
});

// leave channel ui action creator
export const clearWorkspaceChannelId = () => ({
  type: CLEAR_CHANNEL_ID,
});


const initialState = {
  workspaceId: null,
  chatId: null,
  channelId: null,
  showAllChannels: false,
};

export default function uiReducer(state = initialState, action) {
  const newState = { ...state };
  const payload = action.payload;

  switch (action.type) {
    case SET_WORKSPACE:
      newState.workspaceId = payload;
      break;

    case CLEAR_WORKSPACE:
      newState.workspaceId = null;
      break;

    case SET_CHAT_ID:
      newState.chatId = payload;
      break;

    case CLEAR_CHAT_ID:
      newState.chatId = null;
      break;

    case SET_CHANNEL_ID:
      newState.channelId = payload;
      break;

    case CLEAR_CHANNEL_ID:
      newState.channelId = null;
      break;

    case SHOW_ALL_CHANNELS:
      newState.showAllChannels = true;
      break;

    case HIDE_ALL_CHANNELS:
      newState.showAllChannels = false;
      break;

    default:
      break;
  }

  return newState;
}
