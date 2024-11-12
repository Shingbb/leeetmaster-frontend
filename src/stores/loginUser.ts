import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DEFAULT_USER } from "@/constants/user";

/**
 * 登录用户全局状态
 */
export const loginUserSlice = createSlice({
  name: "loginUser",
  initialState: DEFAULT_USER,
  reducers: {
    setLoginUser: (state, action: PayloadAction<API.LoginUserVO>) => {
      return {
        ...action.payload,
      };
    },
    logoutUser: (state) => {
      return {
        ...DEFAULT_USER,
      };
    },
  },
});

// 修改状态
export const { setLoginUser, logoutUser } = loginUserSlice.actions;

export default loginUserSlice.reducer;
