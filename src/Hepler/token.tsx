import jwt_decode from "jwt-decode";

interface Token {
  name: string;
  email: string;
  exp: number;
  sub: string;
}

export const isTokenValid = (): boolean => {
  const token = localStorage.getItem("token");
  if (token) {
    const decoded: Token = jwt_decode(token);
    if (decoded.exp < new Date().getTime() / 1000) {
      return false;
    }
    return true;
  }
  return false;
};

export const getEmail = (): string => {
  const token = localStorage.getItem("token");
  if (token) {
    const decoded: Token = jwt_decode(token);
    if (decoded.exp < new Date().getTime() / 1000) {
      return "";
    }
    return decoded.email;
  }
  return "";
};

export const deleteToken = () => {
  localStorage.removeItem("token");
};
