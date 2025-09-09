import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, logoutUser } from "./authAPI";

export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const data = await loginUser(email, password);
            return data;
        } catch (err) {
            return rejectWithValue(err.message || "Login failed");
        }
    }
);

export const logout = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            const data = await logoutUser();
            return data;
        } catch (err) {
            return rejectWithValue(err.message || "Logout failed");
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: null,
        email: null,
        loading: false,
        error: null,
        isAuthenticated: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user || null;
                state.token = action.payload.token || null;
                
                state.email = action.payload.user?.email || null; 
                state.isAuthenticated = true;
                // Restored your original logic for saving to localStorage
                if (state.user) {
                    localStorage.setItem("user", JSON.stringify(state));
                    localStorage.setItem("email", state.email);
                }
                if (state.token) {
                    localStorage.setItem("token", state.token);
                }
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Login failed";
            })
            .addCase(logout.pending, (state) => {
                state.loading = true;
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
                state.error = null;
                
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                localStorage.removeItem("email");
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Logout failed";
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
                
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                localStorage.removeItem("email");
            });
    },
});

export default authSlice.reducer;