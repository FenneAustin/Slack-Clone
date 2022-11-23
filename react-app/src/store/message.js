import { csrfFetch } from "./csrf";

const GET_CUR_MESSAGES = "GET_CUR_MESSAGES";
const CREATE_MESSAGE = "CREATE_MESSAGE";
const UPDATE_MESSAGE = "UPDATE_MESSAGE";
const DELETE_MESSAGE = "DELETE_MESSAGE";

const getMessages = (messages) => {
  return {
    type: GET_CUR_MESSAGES,
    messages,
  };
};

const createMessage = (message) => {
  return {
    type: CREATE_MESSAGE,
    message,
  };
};

const updateMessage = (message) => {
  return {
    type: UPDATE_MESSAGE,
    message,
  };
};

const deleteMessage = (messageId) => {
  return {
    type: DELETE_MESSAGE,
    messageId,
  };
};

export const getAllDMMessages = (chatId) => async (dispatch) => {
  const res = await csrfFetch(`/api/messages/chats/${chatId}`);

  if (res.ok) {
    const data = await res.json();
    dispatch(getMessages(data.messages));
  }
};

export const getAllChannelMessages = (channelId) => async (dispatch) => {
  const res = await csrfFetch(`/api/messages/channel/${channelId}`);

  if (res.ok) {
    const data = await res.json();
    dispatch(getMessages(data.messages));
  }
};

const initialState = {};
export default function messagesReducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case GET_CUR_MESSAGES:
      let redoState = {};
      if (action.channels)
        action.messages.forEach((message) => (redoState[message.id] = message));
      return redoState;
    case CREATE_MESSAGE:
      newState[action.message.id] = action.message;
      return newState;
    case UPDATE_MESSAGE:
      newState[action.channel.id] = action.channel;
      return newState;
    case DELETE_MESSAGE:
      delete newState[action.messageId];
      return newState;
    default:
      return state;
  }
}
