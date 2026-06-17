import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
    name: string;
}

const initialState: UserState = {
    name: "user"
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload
        },

        clearName: state => {
            state.name = ""
        }
    }
})

export const { setName, clearName } = userSlice.actions;

export default userSlice.reducer;