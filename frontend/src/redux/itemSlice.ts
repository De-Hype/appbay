import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseURL } from "../utils";

export const fetchItems = createAsyncThunk(
  "items/fetchItems",
  async (
    {
      page = 1,
      limit = 10,
      
    }: {
      page: number;
      limit: number;
     
    },
    { rejectWithValue }
  ) => {
    try {
      const params = new URLSearchParams();
      params.append("page", page.toString());
      params.append("limit", limit.toString());

      const response = await axios.get(`${BaseURL}/items?${params.toString()}`);
      return response.data; 
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export type Item = {
  id: number;
  name:string;
  description:string;
  price:number;
  createdAt: string;
  updatedAt: string;
};

type InitialStateType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any; 
  loading: boolean;
  error: string | null;
  selectedItem: Item | null;
};

const initialState: InitialStateType = {
  items: [],
  error: null,
  loading: false,
  selectedItem: null,
};

const itemsSlice = createSlice({
  name: "items",
  initialState,

  reducers: {
    setSelectedItem: (state, action: PayloadAction<Item>) => {
      state.selectedItem = action.payload;
    },
    updateItem: (state, action: PayloadAction<Partial<Item>>) => {
      if (state.selectedItem) {
        state.selectedItem = { ...state.selectedItem, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload.data; 
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.items = [];
        state.error = action.payload as string; 
      });
  },
});
export const { setSelectedItem, updateItem } = itemsSlice.actions;
export default itemsSlice.reducer;
