import React from 'react';
import { Button } from './button';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation'
import { deletemeetingRoomAPI } from '../api/conferenceApis';
import { TRoom } from '../types';

type TRoomCardProps = {
  title: string;
  status: boolean;
  showDelete?: boolean;
  index?: number;
  room: TRoom
  meetingRoom: () => void
};

const RoomCard: React.FC<TRoomCardProps> = (props) => {

  const { title, status, showDelete = false, index = 1, room, meetingRoom } = props;
  const router = useRouter()

  const handleNavigate = () => { router.push(`/dashboard/meeting?${index}`) }

  const handleMeetingRoomDelete = async () => { 
    await deletemeetingRoomAPI(room.roomId); 
    meetingRoom() 
  }

  return (
    <div className="group m-5 h-40 w-72 rounded-lg border-l-2 border-l-orange-500 bg-slate-900 px-5 pt-3 shadow-2xl">
      <div className="mb-4 flex justify-between w-full">
        <span className="text-lg text-white">{title}</span>
        {showDelete &&
          <Button className='!p-1 h-7 bg-red-600/80 hover:bg-red-400' onClick={() => handleMeetingRoomDelete()}>
            Delete
          </Button>
        }
      </div>
      <div>
        <span className="text-lg text-white">
          Status: {status ? 'Available' : 'Not Available'}
        </span>
      </div>
      <Button className="mt-5 hidden active:bg-orange-400/60 bg-white/20 hover:bg-slate-600 group-hover:!block" onClick={handleNavigate}>
        <div className="flex">
          Checkout your Meetings
          <ArrowRightIcon className="ms-6 w-6 text-orange-500" />
        </div>
      </Button>
    </div>
  );
};

export default RoomCard;
