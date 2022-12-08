import { csrfFetch } from "./csrf";


const GET_USER_WORKSPACES = "GET_USER_WORKSPACES";
const CREATE_WORKSPACE = "CREATE_WORKSPACE";
const UPDATE_WORKSPACE = "UPDATE_WORKSPACE";
const DELETE_WORKSPACE = "DELETE_WORKSPACE";



const getUserWorkspaces = (workspaces) => {
    return {
        type: GET_USER_WORKSPACES,
        workspaces,
    }
}

const createWorkspace = (workspace) => {
  console.log(workspace)
    return {
        type: CREATE_WORKSPACE,
        workspace,
    }
}

const updateWorkspace = (workspace) => {
    return {
        type: UPDATE_WORKSPACE,
        workspace,
    }
}

const deleteWorkspace = (workspaceId) => {
  return {
    type: DELETE_WORKSPACE,
    workspaceId,
  };
};


export const getAllUserWorkspaces = () => async (dispatch) =>{
    const res = await csrfFetch('/api/workspaces/me/');

    if(res.ok) {
        const data = await res.json();
        dispatch(getUserWorkspaces(data.workspaces))
    }
}

export const createNewWorkspace = (workspace) => async (dispatch) => {
  const {ownerId, name } = workspace;

  const res = await csrfFetch("/api/workspaces/", {
    method: "POST",
    body: JSON.stringify({
      ownerId,
      name
    })
  })

  if (res.ok) {
    const newWorkspace = await res.json();
    dispatch(createWorkspace(newWorkspace.workspace))
    return newWorkspace.workspace.id;
  }


}

export const editWorkspace = (workspace, id) => async (dispatch) => {
    const res = await csrfFetch(`/api/workspaces/${id}/edit`, {
      method: 'PUT',
      body: JSON.stringify(workspace)
    })
    if (res.ok){
      const updatedWorkspace = await res.json();
      dispatch(updateWorkspace(updatedWorkspace))
      return res;
    }
}

export const deleteAWorkspace = (workspaceId) => async (dispatch) => {
  const res = await csrfFetch(`/api/workspaces/${workspaceId}`,{
    method: "DELETE",
  });

  const response = await res.json();
  if(res.status === 200) {
    dispatch(deleteWorkspace(workspaceId))
  }
  return response;
}



const initialState = {};
export default function workspaceReducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case GET_USER_WORKSPACES:
      if (action.workspaces) {
      action.workspaces.forEach((workspace) => (newState[workspace.id] = workspace));
      }
      return newState;
    case CREATE_WORKSPACE:
      newState[action.workspace.id] = action.workspace;
      return newState;
    case UPDATE_WORKSPACE:
      newState[action.workspace.id] = action.workspace;
      return newState;
    case DELETE_WORKSPACE:
      delete newState[action.workspaceId];
      return newState;
    default:
      return state;
  }
}
