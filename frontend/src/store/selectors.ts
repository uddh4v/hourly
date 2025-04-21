import { RootState } from "./store";

export const selectUserId = (state: RootState) => state.userId.userId;
export const selectedUserData = (state: RootState) => state.user.user;
export const userAuthenticated = (state: RootState) =>
  state.user.isAuthenticated;
