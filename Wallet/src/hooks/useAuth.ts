import { User } from "@/type";

import { create } from "zustand";
import * as SecureStore from "expo-secure-store";

import axios from "axios";
import { AUTH_API } from "@/lib/env.local";

interface AuthResponse {
  status: "ok" | "failed";
  error?: string | null;
}

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  userId: string | null;
  user: User | null;
  register: (
    name: string,
    email: string,
    password: string,
  ) => Promise<AuthResponse>;
  login: (email: string, password: string) => Promise<AuthResponse>;
  getUser: () => Promise<AuthResponse & { user: User | null }>;
  logout: () => Promise<void>;
}

const useAuth = create<AuthState>((set) => ({
  token: null,
  isAuthenticated: false,
  userId: null,
  user: null,

  register: async (name, email, password) => {
    try {
      const response = await axios.post(
        `${AUTH_API}/register`,
        // register
        { name, email, password },
      );

      // Axios throws automatically on 4xx/5xx, so reaching here means 2xx success
      const userData = response.data.user;
      const token = response.data.token as string;

      set({
        isAuthenticated: true,
        userId: userData.id,
        user: userData,
        token: token,
      });

      if (token) await SecureStore.setItemAsync("Wallet_User_Token", token);

      return { status: "ok", error: null };
    } catch (error: any) {
      const message = error.response?.data?.message || error.message;
      return { status: "failed", error: message };
    }
  },

  login: async (email, password) => {
    try {
      const response = await axios.post(`${AUTH_API}/log-in`, {
        email,
        password,
      });

      const userData = response.data.user;
      const token = response.data.token;

      set({
        isAuthenticated: true,
        userId: userData.id,
        user: userData,
        token: token,
      });
      if (token) await SecureStore.setItemAsync("Wallet_User_Token", token);

      return { status: "ok", error: null };
    } catch (error: any) {
      const message = error.response?.data?.message || error.message;
      return { status: "failed", error: message };
    }
  },

  getUser: async () => {
    try {
      const token = await SecureStore.getItemAsync("Wallet_User_Token");
      console.log("bearer ", token);
      const response = await axios.get(
        `${AUTH_API}/get-user`,
        { headers: { token: `Bearer ${token}` } },
        // Note: Add { headers: { Authorization: `Bearer ${token}` } } here if using JWTs
      );

      const userData = response.data.user;
      console.log("user Data", userData);
      set({
        isAuthenticated: true,
        userId: userData.id,
        user: userData,
        token: token,
      });

      if (userData.id) return { status: "ok", user: userData, error: null };
      else return { status: "failed", user: null, error: null };
    } catch (error: any) {
      set({ isAuthenticated: false, userId: null, user: null });
      const message = error.response?.data?.message || error.message;
      return { status: "failed", user: null, error: message };
    }
  },

  logout: async () => {
    // Clear stored token here if applicable (e.g., )
    await SecureStore.deleteItemAsync("Wallet_User_Token");
    set({
      isAuthenticated: false,
      userId: null,
      user: null,
      token: null,
    });
  },
}));

export default useAuth;
