import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface actionState {
  activeUserId: string | null;
  showModalUser:boolean;
  showModalItem:boolean
}

const initialState: actionState = {
  activeUserId: null,
  showModalItem:false,
  showModalUser:false
};

const actionSlice = createSlice({
  name: "action",
  initialState,
  reducers: {
    toggleMenu: (state, action: PayloadAction<string | null>) => {
      const userId = action.payload;
      state.activeUserId = state.activeUserId === userId ? null : userId; 
    },
    toggleModal: (state, action: PayloadAction<boolean>) => {
        state.showModalUser = action.payload;
      },
      toggleModalItem: (state, action: PayloadAction<boolean>) => {
        state.showModalItem = action.payload;
      },
  },
});

export const { toggleMenu, toggleModal, toggleModalItem } = actionSlice.actions;
export default actionSlice.reducer;
