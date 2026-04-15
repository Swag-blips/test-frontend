import type { User } from "../types";

// Mock authentication service
export const authService = {
  login: async (username: string): Promise<User> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Math.random().toString(36).substr(2, 9),
          username,
          name: username,
        });
      }, 800);
    });
  },

  logout: async (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
  },
};
