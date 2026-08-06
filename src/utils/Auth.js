const USERNAME = "admin";
const PASSWORD = "admin123";

export const login = (username, password) => {
  if (username === USERNAME && password === PASSWORD) {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", username);
    return true;
  }

  return false;
};

export const logout = () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("username");
};

export const isAuthenticated = () => {
  return localStorage.getItem("isLoggedIn") === "true";
};

export const getUsername = () => {
  return localStorage.getItem("username");
};