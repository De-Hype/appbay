import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BaseURL } from '../utils';



export const fetchUsers = createAsyncThunk('users/fetchUsers', async ({ page=1, limit=1}: { page: number; limit: number }) => {
  const response = await axios.get(`${BaseURL}/users?page=${page}&limit=${limit}`)
    
  return response;
});

type initialStateType={
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    users: any,
    loading: boolean,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any,
}
const initialState:initialStateType={
    users:[],
    error:null,
    loading:false
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data.data;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
