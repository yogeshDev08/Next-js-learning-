'use client'

import React, { useEffect, useState } from 'react';
import MeetingCard from '@/app/ui/meetingCard';
import SlotDrawer from '@/app/ui/userForm';
import { Drawer } from '@mui/material';
import { Button } from '@/app/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/GlobalRedux/store';
import { getAllBooking, getUserDetails } from '@/app/api/conferenceApis';
import { setAllBooking, setUserBooking } from '@/app/GlobalRedux/Features/bookingSlice';
import { TAllUserBooking, Tbooking } from '@/app/types';
import { setUserDetails } from '@/app/GlobalRedux/Features/userCred';

const initalState = {
  date: '',
  event: '',
  startTime: '',
  endTime: '',
  roomId: '',
  _id: ''
}

const Page = () => {

  const { bookings, userCred } = useSelector((state: RootState) => state)
  const { userBookings, allBooking } = bookings
  const { isAdmin } = userCred.userCredentials

  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)
  const [editData, setEditData] = useState(initalState)
  const [method, setMethod] = useState('add')
  const [indUserId, setindUserId] = useState('')

  const handleGetUser = () => {
    const handleAsync = async () => {
      const resp = await getUserDetails()
      if (resp.data) {
        dispatch(setUserBooking(resp.data.booking))
        dispatch(setUserDetails(resp.data))
      }
    }
    handleAsync()
  }

  const handleGetAllBooking = () => {
    const handleAsync = async () => {
      const resp = await getAllBooking()

      if (resp.data) {

        dispatch(setAllBooking(resp.data))

      }

    }
    handleAsync()
    
  }
  useEffect(() => {

    handleGetUser();

    if (isAdmin) handleGetAllBooking()

  }, [open, isAdmin])


  const id = window.location.search.split('?')?.[1]
  const toggle = () => setOpen((preValue) => !preValue)

  const handleEditValue = (values: any) => {

    setMethod('update')
    setEditData(values)
    toggle()

  }

  const handleAddValue = () => {

    setMethod('add')
    setEditData(initalState)
    toggle()

  }

  return (
    <div className="px-10">
      <div className='flex justify-start items-baseline w-full'>
        <span className="text-3xl font-semibold text-white">Meetings</span>
        <Button className=" w-52 flex justify-center ms-10 active:bg-white-400/60 bg-white/20 hover:bg-slate-600 group-hover:!block" onClick={toggle}>
          <span>+ Book Conference Room</span>
        </Button>
      </div>
      {!isAdmin && userBookings.map((meetingEvent: Tbooking, index: number) => {
        if (meetingEvent.roomId == id) {
          return (
            <MeetingCard meetingEvent={meetingEvent} key={index} handleEditValue={handleEditValue} handleGetUser={handleGetUser} />
          )
        }
      })}
      {isAdmin && allBooking?.map((usersMeetings: TAllUserBooking, index: number) => {
        return <>
          {usersMeetings.booking.length > 0 && usersMeetings.booking.map((userMeeting, index) => {
            if (userMeeting.roomId == id) {
              return <MeetingCard meetingEvent={userMeeting} key={index} handleEditValue={handleEditValue} handleGetUser={handleGetUser} userIndividualId={usersMeetings?._id} setindUserId={setindUserId} handleGetAllBooking={handleGetAllBooking}/>
            }
          })}
        </>
      })}
      <Drawer anchor="right" open={open} onClose={toggle}>
        <SlotDrawer editData={editData} handleDrawerClose={handleAddValue} id={id + ""} method={method} indUserId={indUserId}/>
      </Drawer>
    </div>
  );
};

export default Page;
