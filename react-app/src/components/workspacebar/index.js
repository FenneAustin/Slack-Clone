import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserWorkspaces } from "../../store/workspace";

const WorkspaceBar = () => {

const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getAllUserWorkspaces());
  }, [dispatch]);

  return <div>bar</div>;
};

export default WorkspaceBar;
