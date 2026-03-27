import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorageData, removeLocalStorageData, setLocalStorageData } from "../../utils/localStorageUtility";
import authApiSlice from "../services/authApiSlice";

const getTokenFromLocalStorage = () => {
    return getLocalStorageData(import.meta.env.VITE_ACCESSTOKEN_STORAGEKEY)
}

const initialState = {
    user: null,
    accessToken: getTokenFromLocalStorage() || null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        //reducer actions 
        setCredentials: (state, { payload }) => {
            state.accessToken = payload.accessToken;
            state.user = payload.user;
            setLocalStorageData(import.meta.env.VITE_ACCESSTOKEN_STORAGEKEY, payload.accessToken)
            setLocalStorageData(import.meta.env.VITE_REFRESHTOKEN_STORAGEKEY, payload.refreshToken)
        },
        logout: (state) => {
            state.accessToken = null;
            state.user = null;
            removeLocalStorageData(import.meta.env.VITE_ACCESSTOKEN_STORAGEKEY);
            removeLocalStorageData(import.meta.env.VITE_REFRESHTOKEN_STORAGEKEY);
        }
    },
    extraReducers: (builder) => {
        // called when access user endpoint fulfills
        builder.addMatcher(
            authApiSlice.endpoints.accessUser.matchFulfilled,
            (state, { payload }) => {
                state.user = payload.user;
            }
        );
    }
})

export const { logout, setCredentials } = authSlice.actions;

export default authSlice;