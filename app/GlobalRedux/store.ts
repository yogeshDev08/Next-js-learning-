import { configureStore } from '@reduxjs/toolkit'
import { userCredSlice } from './Features/userCred'
import {meetingRoomSlice} from './Features/meetingRoomSlice'
import {bookingSlice} from './Features/bookingSlice'

export const store = configureStore({
  reducer: {
    userCred: userCredSlice.reducer,
    meetingRooms: meetingRoomSlice.reducer,
    bookings: bookingSlice.reducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch