import { csrfFetch } from "./csrf";

const GET_CUR_CHATS = "GET_CUR_CHATS";
const CREATE_CHAT = "CREATE_CHAT";
const DELETE_CHAT = "DELETE_CHAT";

const getWorkspaceChats = (chats) => {
  return {
    type: GET_CUR_CHATS,
    chats,
  };
};

const createChat = (chat) => {
  return {
    type: CREATE_CHAT,
    chat,
  };
};

const deleteChat = (chatId) => {
  return {
    type: DELETE_CHAT,
    chatId,
  };
};

export const createNewChat = (workspaceId, userId) => async (dispatch) => {
  const res = await csrfFetch(`/api/chats/${workspaceId}/${userId}`, {
    method: "POST",
    body: JSON.stringify({ userId }),
  });

  if (res.ok) {
    const data = await res.json();
    await dispatch(createChat(data.chat));
    return data.chat.id;
  }
};


export const getAllWorkspaceChats = (workspaceId) => async (dispatch) => {
  const res = await csrfFetch(`/api/chats/${workspaceId}/me`);

  if (res.ok) {
    const data = await res.json();
    dispatch(getWorkspaceChats(data.chats));
  }
};


const initialState = {};
export default function chatsReducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case GET_CUR_CHATS:
      let redoState = {};
      if (action.chats)
        action.chats.forEach((chat) => (redoState[chat.id] = chat));
      return redoState;
    case CREATE_CHAT:
      newState[action.chat.id] = action.chat;
      return newState;
    default:
      return state;
  }
}
