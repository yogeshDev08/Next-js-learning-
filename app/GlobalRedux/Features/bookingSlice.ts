'use client'

import { TAllUserBooking, TBookingState, Tbooking } from '@/app/types'
import { createSlice } from '@reduxjs/toolkit'

const initialState: TBookingState = {
userBookings: [],
allBooking: []
}

export const bookingSlice = createSlice({
  name: 'meetingRoom',
  initialState,
  reducers: {
    setUserBooking:(state: TBookingState, action: {payload:Tbooking[] }) => {
      state.userBookings = action.payload
    },
    setAllBooking: (state: TBookingState, action: {payload:TAllUserBooking[] }) => {
      state.allBooking = action.payload
    }
  },
})

export const { setUserBooking, setAllBooking } = bookingSlice.actions

export default bookingSlice.reducer