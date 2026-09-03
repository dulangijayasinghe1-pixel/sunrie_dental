import { create } from "zustand";

const useAuthStore = create((set) => ({
  token: localStorage.getItem("token"),
  user: JSON.parse(localStorage.getItem("user")) || null,

  login: (loginResponse) => {
    localStorage.setItem("token", loginResponse.token);

    const user = {
      email: loginResponse.email,
      name: loginResponse.name,
      role: loginResponse.role,
    };

    localStorage.setItem("user", JSON.stringify(user));

    set({
      token: loginResponse.token,
      user: user,
    });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    set({
      token: null,
      user: null,
    });
  },
}));

export default useAuthStore;