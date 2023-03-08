import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      name: "",
      email: "",
    },
  },
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state, action) => {
      console.log(action.payload, "hhhhh");
      state.user = { name: "", email: "" };
    },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
