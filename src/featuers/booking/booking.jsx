import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    booking: JSON.parse(localStorage.getItem('booking')) || null
}

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        bookingDatas: (state, action) => {
            state.booking = action.payload
            localStorage.setItem('booking', JSON.stringify(action.payload))
        }
    }
})

export const { bookingDatas } = bookingSlice.actions

export default bookingSlice.reducer