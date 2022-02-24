import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ISampleState {
    counter: number;
    message: string;
}

const initialState: ISampleState = {
    counter: 0,
    message: ""
};

export const sampleSlice = createSlice({
    name: "sample",
    initialState,
    reducers: {
        incremented: (state) => {
            state.counter++;
        },
        decremented: (state) => {
            state.counter--;
        },
        changeByAmount: (state, action: PayloadAction<number>) => {
            state.counter += action.payload;
        },
        fetchMessage: (state, action: PayloadAction<string>) => {
            state.message = action.payload;
        }
    }
});

export const { incremented, decremented, changeByAmount, fetchMessage } = sampleSlice.actions;

export default sampleSlice.reducer;