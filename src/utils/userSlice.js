import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      name: "",
      email: "",
      uid: "",
    },
  },
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state, action) => {
      console.log(action.payload, "hhhhh");
      state.user = { name: "", email: "", uid: "" };
    },
  },
});

export const { updateUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
