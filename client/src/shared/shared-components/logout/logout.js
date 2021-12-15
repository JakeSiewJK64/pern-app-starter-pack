import { toast } from "react-toastify";

const LogoutFunction = ({ setAuth }) => {
  setAuth(false);
  localStorage.removeItem("token");
  toast.success("Logged Out Successfully!");
};

export default LogoutFunction;
