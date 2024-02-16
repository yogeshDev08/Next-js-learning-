'use client'

import { TAuthState, TUser } from '@/app/types'
import { createSlice } from '@reduxjs/toolkit'

const initialState: TAuthState = {
userCredentials : {
    username: '',
    isAdmin: false,
    id: ''
  }
}

export const userCredSlice = createSlice({
  name: 'meetingRoom',
  initialState,
  reducers: {
    setUserDetails:(state: TAuthState, action: {payload:TUser }) => {
      state.userCredentials.username = action.payload.username
      state.userCredentials.isAdmin = action.payload.isAdmin
      state.userCredentials.id = action.payload._id ?? ""
    }
  },
})

export const { setUserDetails } = userCredSlice.actions

export default userCredSlice.reducer