export type TUser = {
    username: string,
    isAdmin: boolean,
    id: string
    _id?:string
  }
  
  export type TAuthState = {
  userCredentials: TUser
  }
  

  export type TRoomState = {
    roomsList : TRoom[]
  }
  
  export type TRoom = {
      roomName: string
      roomId: string
      status: boolean
      _id: string
  }

export type TBookingState = {
  userBookings : Tbooking[]
  allBooking: TAllUserBooking[]
}

export type Tbooking = {
  date:string
  event: string
  startTime: string
  endTime: string
  _id?: string
  roomId: string
}
  
export type TAllUserBooking = {
  _id: string;
  booking: Tbooking[];
}