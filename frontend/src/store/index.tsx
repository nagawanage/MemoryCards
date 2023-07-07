import { create } from "zustand";

type EditedWord = {
  id: string;
  title: string | null;
};
type LoginUser = {
  id: string | undefined;
  email: string | undefined;
};
type State = {
  editedWord: EditedWord;
  updateEditedWord: (payload: EditedWord) => void;
  resetEditedWord: () => void;
  loginUser: LoginUser;
  updateLoginUser: (payload: LoginUser) => void;
  resetLoginUser: () => void;
};

const useStore = create<State>((set) => ({
  editedWord: { id: "", title: "" },
  updateEditedWord: (payload) =>
    set({
      editedWord: payload,
    }),
  resetEditedWord: () => set({ editedWord: { id: "", title: "" } }),
  loginUser: { id: "", email: "" },
  updateLoginUser: (payload) =>
    set({
      loginUser: payload,
    }),
  resetLoginUser: () => set({ loginUser: { id: "", email: "" } }),
}));
export default useStore;
