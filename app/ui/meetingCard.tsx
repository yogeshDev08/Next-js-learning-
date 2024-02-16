import React from 'react';
import { Tbooking } from '../types';
import { Button } from '@/app/ui/button';
import { deleteBookingApi } from '../api/conferenceApis';

type TMeetingCardProps = {
  meetingEvent: Tbooking
  handleEditValue: (values: any) => void
  handleGetUser: () => void
  userIndividualId?: string
  setindUserId?: (id: string) => void
  handleGetAllBooking?: () => void
};

const MeetingCard: React.FC<TMeetingCardProps> = (props) => {
  const { date, event, startTime, endTime, roomId, _id } = props.meetingEvent;

  const handleDeleteMeeting = async () => {
    const meetingId = _id?.toString() ?? ""
    await deleteBookingApi(meetingId, props?.userIndividualId)
    props.handleGetUser()
    props?.handleGetAllBooking && props?.handleGetAllBooking()
  }

  const handleEdit = () => {
    if (props?.setindUserId) {
      props?.setindUserId(props?.userIndividualId ?? "");
    } props.handleEditValue(props.meetingEvent) }

  return (
    <div className="flex justify-between group hover:bg-orange-900 p-3 h-24 my-5 w-[999px] rounded-lg border-l-2 border-l-orange-500 bg-gradient-to-r from-slate-900 to-orange-300/20 px-5 shadow-2xl">
      <div>
        <div>
          <span className='text-white me-20'>{`Meeting Room: ${roomId}`}</span>
          <span className='text-white me-10'>{`Date: ${date} Start: ${startTime} to ${endTime}`}</span>
        </div>
        <div>
          <span className='text-white me-10'>{`Event: ${event}`}</span>
        </div>
      </div>

      <div className='flex justify-end'>
        <Button className=" w-20 flex justify-center ms-10 active:bg-white-400/60 bg-white/20 hover:bg-slate-600 group-hover:!block" onClick={handleEdit}>
          <span>Edit</span>
        </Button>
        <Button className=" w-20 flex justify-center ms-10 active:bg-white-400/60 bg-white/20 hover:bg-slate-600 group-hover:!block" onClick={handleDeleteMeeting}>
          <span>Delete</span>
        </Button>
      </div>
    </div>
  );
};

export default MeetingCard;