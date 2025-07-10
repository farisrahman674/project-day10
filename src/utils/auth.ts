// src/utils/auth.ts
const TOKEN_KEY = "token";

export const login = () => {
  localStorage.setItem(TOKEN_KEY, "TokenIsValid");
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isLoggedIn = (): boolean => {
  return localStorage.getItem(TOKEN_KEY) === "TokenIsValid";
};
