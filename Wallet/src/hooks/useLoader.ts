import { create } from "zustand";

interface UseLoaderProp {
  isLoading: boolean;
  loadingMessage: string;
  setIsLoading: (value: boolean, text?:string) => void;
}

const useLoader = create<UseLoaderProp>((set) => ({
  isLoading: false,
  loadingMessage: "",
  setIsLoading: (value: boolean, text: string = "Please wait!"): void => {
    set({ loadingMessage: text, isLoading: value });
  },
}));

export default useLoader;
