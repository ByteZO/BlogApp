import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../Auth/Auth";
import { logOut } from "../../Store/AuthSlice";

const LogOutBtn = () => {
  const dispatch = useDispatch();
  const logOutHandeler = () => {
    authService.logOut().then(() => {
      dispatch(logOut());
    });
  };

  return (
    <button
      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={logOutHandeler}
    >
      LogOut
    </button>
  );
};

export default LogOutBtn;
