
export const JOIN_ROOM = "socket/JOIN_ROOM";
export const LEAVE_ROOM = "socket/LEAVE_ROOM";

// selectors
export const socketRoomSelector = (state) => state.socket.room;


// Join room action creator
export const joinRoom = (data) => ({
  type: JOIN_ROOM,
  payload: data,
});

// Leave room action creator
export const leaveRoom = () => ({
  type: LEAVE_ROOM,
});

export const joinRoomThunk = (data, socket) => async (dispatch) => {
    dispatch(joinRoom(data));
    socket.emit("join", data);
};

export const leaveRoomThunk = (data, socket) => async (dispatch) => {
    dispatch(leaveRoom());
    socket.emit("leave", data);
};


const initialState = {
  room: null,
};

export default function roomReducer(state = initialState, action) {
  const newState = { ...state };
  const payload = action.payload;

  switch (action.type) {
    case JOIN_ROOM:
      newState.room = payload;
      break;

    case LEAVE_ROOM:
      newState.room = null;
      break;

    default:
      break;
  }

  return newState;
}
