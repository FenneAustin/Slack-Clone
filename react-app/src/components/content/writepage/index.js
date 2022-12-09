import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import UserSearch from './UserSearch/UserSearch.js';
import { getListOfUsers } from '../../../store/workspaceinfo.js';
import "./index.css"


const WritePage = () => {

    const dispatch = useDispatch();

    const users = useSelector(state => state.workspaceinfo.users);
    const workspaceId = useSelector(state => state.ui.workspaceId);
    const [loaded, setLoaded] = useState(false);


    useEffect(async () => {
        await dispatch(getListOfUsers(workspaceId));
        setLoaded(true)
    }, [workspaceId, dispatch]);


    return (
      <div className="content-container-write">
            {loaded &&
            <UserSearch users={users}/> }

            <div className="helpful-txt-start-convo">From here, you can start a chat with any teammate. Not seeing the right person in the list above? Add people</div>
      </div>
    );
}

export default WritePage;
