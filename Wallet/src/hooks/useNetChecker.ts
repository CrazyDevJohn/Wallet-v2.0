import { create } from "zustand";

interface UseLoaderProp {
  isConnected: boolean;
  setIsConnected: (value: boolean) => void;
}

const useNetChecker = create<UseLoaderProp>((set) => ({
  isConnected: true,
  setIsConnected: (value) => {
    set({ isConnected: value });
  },
}));

export default useNetChecker;
