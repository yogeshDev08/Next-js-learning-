'use client'

import { TRoom, TRoomState } from '@/app/types'
import { createSlice } from '@reduxjs/toolkit'

const initialState: TRoomState = {
    roomsList: []
}

export const meetingRoomSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setMeetingRooms:(state: TRoomState, action: {payload: TRoom[] }) => {
      state.roomsList = action.payload
    }
  },
})

export const { setMeetingRooms } = meetingRoomSlice.actions

export default meetingRoomSlice.reducer