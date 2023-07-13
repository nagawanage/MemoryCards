import { create } from "zustand";

interface WordState {
  word: string;
  meaning: string;
  hint: string;
  note: string;
}

interface WordAction {
  // word
  updateWord: (value: string) => void;
  resetWord: () => void;
  // meaning
  updateMeaning: (value: string) => void;
  resetMeaning: () => void;
  // hint
  updateHint: (value: string) => void;
  resetHint: () => void;
  // note
  updateNote: (value: string) => void;
  resetNote: () => void;
}

export type WordStore = WordState & WordAction;

const useWordStore = create<WordStore>((set) => ({
  // word
  word: "",
  updateWord: (value) => {
    set(() => ({ word: value }));
  },
  resetWord: () => {
    set(() => ({ word: "" }));
  },
  // meaning
  meaning: "",
  updateMeaning: (value) => {
    set(() => ({ meaning: value }));
  },
  resetMeaning: () => {
    set(() => ({ meaning: "" }));
  },
  // hint
  hint: "",
  updateHint: (value) => {
    set(() => ({ hint: value }));
  },
  resetHint: () => {
    set(() => ({ hint: "" }));
  },
  // note
  note: "",
  updateNote: (value) => {
    set(() => ({ note: value }));
  },
  resetNote: () => {
    set(() => ({ note: "" }));
  },
}));

export default useWordStore;
