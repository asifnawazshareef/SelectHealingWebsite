import { Outlet } from "react-router";
import Header from "./Header";
import ChatButton from "../ChatButton";

const AppLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <ChatButton />
    </>
  );
};

export default AppLayout;
