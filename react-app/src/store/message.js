import { csrfFetch } from "./csrf";

const GET_CUR_MESSAGES = "GET_CUR_MESSAGES";
const CREATE_MESSAGE = "CREATE_MESSAGE";
const UPDATE_MESSAGE = "UPDATE_MESSAGE";
const DELETE_MESSAGE = "DELETE_MESSAGE";
const CLEAR_MESSAGES = "CLEAR_MESSAGES";

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

export const clearMessages = () => {
  return {
    type: CLEAR_MESSAGES,
  };
}

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

//thunk to create a message
export const createNewMessage = (message) => async (dispatch) => {
  const res = await csrfFetch("/api/messages/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });

  if (res.ok) {
    const data = await res.json();
    console.log(data);
    dispatch(createMessage(data.message));
  } else {
    console.log("error");
  }
};

//thunk to update a message
export const updateExistingMessage = (messageId, message) => async (dispatch) => {
  const res = await csrfFetch(`/api/messages/edit/${messageId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(updateMessage(data.message));
  } else {
    console.log("error");
  }
};

//thunk to delete a message
export const deleteExistingMessage = (messageId) => async (dispatch) => {
  const res = await csrfFetch(`/api/messages/delete/${messageId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(deleteMessage(messageId));
  } else {
    console.log("error");
  }
};


const initialState = {};
export default function messagesReducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case GET_CUR_MESSAGES:
      let redoState = {};
      if (action.messages)
        action.messages.forEach((message) => (redoState[message.id] = message));
      return redoState;
    case CREATE_MESSAGE:
      newState[action.message.id] = action.message;
      return newState;
    case UPDATE_MESSAGE:
      newState[action.message.id] = action.message;
      return newState;
    case DELETE_MESSAGE:
      delete newState[action.messageId];
      return newState;
    case CLEAR_MESSAGES:
      newState = {};
      return newState;
    default:
      return state;
  }
}
