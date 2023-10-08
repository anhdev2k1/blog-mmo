import { UserToken } from "@/models/user.type";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// Define a type for the slice state
interface UserState {
  user: UserToken;
}

// Define the initial state using that type
const initialState: UserState = {
    user: {
        email: "",
        id: "",
        username: ""
    },
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    getUser: (state, action: PayloadAction<UserToken>) => {
      state.user = action.payload;
    },
  },
});

export const { getUser } =
  userSlice.actions;
export default userSlice.reducer;
