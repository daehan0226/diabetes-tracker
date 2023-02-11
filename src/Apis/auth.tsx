import { AuthProvider } from "../@types";
import axios from "axios";

const authLogin = async (provider: AuthProvider, token: string) => {
  try {
    const result = await axios.post(
      `${process.env.REACT_APP_API}/auth/${[provider]}`,
      null,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log(result);
    localStorage.setItem("token", result.data.accessToken);
    return await checkLogin();
  } catch {
    return false;
  }
};

const checkLogin = async () => {
  try {
    const token = localStorage.getItem("token");
    const result = await axios.post(
      `${process.env.REACT_APP_API}/auth/me`,
      null,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log(result);
    return result.data.userId;
  } catch (e) {
    console.log(e);
  }
};

export { authLogin };
