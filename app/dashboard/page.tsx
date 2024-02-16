'use client'
import { useDispatch, useSelector } from 'react-redux';
import RoomCard from '../ui/roomCard';
import React, { useCallback, useEffect } from 'react';
import { RootState } from '../GlobalRedux/store';
import { addMeetingRoomAPI, getmeetingRoomAPI } from '../api/conferenceApis';
import { setMeetingRooms } from '../GlobalRedux/Features/meetingRoomSlice';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation'
import { TRoom } from '../types';

const Page = () => {

  const { meetingRooms, userCred } = useSelector((state: RootState) => state)
  const router = useRouter()

  const dispatch = useDispatch()

  const meetingRoom = useCallback(async () => {

    const res = await getmeetingRoomAPI()

    dispatch(setMeetingRooms(res.data))

  }, [dispatch])

  useEffect(() => { meetingRoom() }, [meetingRoom])

  const handleAddRoom = async () => {

    await addMeetingRoomAPI(meetingRooms.roomsList.length + 1)

    const res = await getmeetingRoomAPI()

    dispatch(setMeetingRooms(res.data)) 

  }

  const handleLogout = () => { localStorage.clear(); router.push("/login") }

  return (
    <div>
      <div className='flex justify-end w-full px-10' onClick={handleLogout}>
        <Button>Logout</Button>
      </div>
      <div className='flex flex-wrap'>
        {meetingRooms.roomsList.map((room:TRoom, index: number) => <RoomCard meetingRoom={meetingRoom} room={room} showDelete={userCred.userCredentials?.isAdmin} title={room.roomName} status={room.status} key={index} index={Number(room.roomId)} />)}
        {userCred.userCredentials?.isAdmin && <Button className="flex justify-center mt-5 active:bg-white-400/60 bg-white/20 hover:bg-slate-600 group-hover:!block" onClick={handleAddRoom}>
          <span>+</span>
        </Button>
        }
      </div>
    </div>
  );
}

export default Page