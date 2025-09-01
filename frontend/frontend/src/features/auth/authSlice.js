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

const storedUser = localStorage.getItem("user");
const parsedUser =
    storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;

const storedToken = localStorage.getItem("token");
const parsedToken =
    storedToken && storedToken !== "undefined" ? storedToken : null;

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: parsedUser,
        token: parsedToken,
        loading: false,
        error: null,
        isAuthenticated: !!parsedToken,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("token", action.payload.token);
        });
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        builder.addCase(logout.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(logout.fulfilled, (state) => {
            state.loading = false;
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        });
        builder.addCase(logout.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Logout failed";
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        });
    },
});

export default authSlice.reducer;
