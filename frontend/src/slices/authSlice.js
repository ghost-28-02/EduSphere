import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
    signupData: null,
    loading: false
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setToken(state, value){
            state.token = value.payload;
            localStorage.setItem("token", state.token);
        },
        setSignupData(state, value){
            state.signupData = value.payload;
        },
        setLoading(state, value){
            state.loading = value.payload;
        }
    },
})

export const { setToken, setSignupData, setLoading } = authSlice.actions;
export default authSlice.reducer;