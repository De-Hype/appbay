import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseURL } from "../utils";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (
    {
      page = 1,
      limit = 10,
      role,
      joined,
    }: {
      page: number;
      limit: number;
      role?: string;
      joined?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const params = new URLSearchParams();
      params.append("page", page.toString());
      params.append("limit", limit.toString());

      if (role) params.append("role", role);
      if (joined) params.append("joined", joined);

      const response = await axios.get(`${BaseURL}/users?${params.toString()}`);
      return response.data; 
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  location: string;
  createdAt: string;
  updatedAt: string;
};

type InitialStateType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  users: any; 
  loading: boolean;
  error: string | null;
  selectedUser: User | null;
};

const initialState: InitialStateType = {
  users: [],
  error: null,
  loading: false,
  selectedUser: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,

  reducers: {
    setSelectedUser: (state, action: PayloadAction<User>) => {
      state.selectedUser = action.payload;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.selectedUser) {
        state.selectedUser = { ...state.selectedUser, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.users = action.payload.data; 
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.users = [];
        state.error = action.payload as string; 
      });
  },
});
export const { setSelectedUser, updateUser } = usersSlice.actions;
export default usersSlice.reducer;
