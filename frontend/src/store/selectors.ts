import { RootState } from "./store";

export const getUserId = (state: RootState) => state.userId.userId;
export const getSelectedUserData = (state: RootState) => state.user.user;
export const isUserAuthenticated = (state: RootState) => state.user.isAuthenticated;