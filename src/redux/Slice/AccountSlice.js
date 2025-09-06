// src/redux/accountsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllAccounts, createAccount } from "../../api/AccountsApi";

// ✅ Async thunks (for API calls)
export const fetchAccounts = createAsyncThunk(
  "accounts/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllAccounts();
      return response.data; // backend response
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const addAccount = createAsyncThunk(
  "accounts/add",
  async (accountData, { rejectWithValue }) => {
    try {
      const response = await createAccount(accountData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Slice
const accountsSlice = createSlice({
  name: "accounts",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchAccounts
      .addCase(fetchAccounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // addAccount
      .addCase(addAccount.fulfilled, (state, action) => {
        state.list.push(action.payload);
      });
  },
});

export const accountsReducer = accountsSlice.reducer;
