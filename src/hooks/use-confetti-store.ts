import { create } from "zustand";
type ConfettiStoreType = {
  isOpen: boolean;
  opOpn: () => void;
  onClose: () => void;
};

export const useConfettiStore = create<ConfettiStoreType>((set) => ({
  isOpen: false,
  opOpn: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
