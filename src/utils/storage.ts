export const storage = {
  getToken: () => localStorage.getItem("token"),
  getRefreshToken: () => localStorage.getItem("refreshToken"),
  setRefreshToken: (token: string) => localStorage.setItem("refreshToken", token),
  setToken: (token: string) => localStorage.setItem("token", token),
  clear: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  },
};
