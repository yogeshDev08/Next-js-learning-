
import axios from 'axios'

const BASE_URL = "http://localhost:8000/"

export const getUserDetails = async () => {

    const userId = localStorage.getItem('token')

    try {
        const response = await axios.get(BASE_URL + `user?userId=${userId}`)

        if (response.status === 200) {
            
            return response.data
        }

    } catch (error) {

    console.log("🚀 ~ meetingRoom ~ error:", error)

    }
}

export const getmeetingRoomAPI = async () => {

    try {
        const response = await axios.get(BASE_URL + "rooms")

        if (response.status === 200) {
            
            return response.data
        }

    } catch (error) {

    console.log("🚀 ~ meetingRoom ~ error:", error)

    }
}

export const addMeetingRoomAPI = async (id: number) => {

    const meetingRoom = {
        roomName: '',
        roomId: '',
        status: true
    }

    meetingRoom.roomName = `Meeting Room ${id}`
    meetingRoom.roomId = id + ""

    try {
        const response = await axios.post(BASE_URL + "rooms", meetingRoom)

        if (response.status === 200) {
            
            return response.data
        }

    } catch (error) {

    console.log("🚀 ~ meetingRoom ~ error:", error)

    }
}

export const deletemeetingRoomAPI = async (roomId: string) => {

    try {
        const response = await axios.delete(BASE_URL + `rooms?id=${roomId}`)

        if (response.status === 200) {
            return response.data
        }

    } catch (error) {

    console.log("🚀 ~ meetingRoom ~ error:", error)

    }
}

export const updateBooking = async (data: any, method: string, indUserId?: string) => {

    const userId = localStorage.getItem('token')

    if (method === 'add') {

        try {
            const response = await axios.post(BASE_URL + `meetings?userId=${userId}`, data)
    
            if (response.status === 200) {
                
                alert(response.data.message)
                return response.data
            }
    
        } catch (error) {
    
        console.log("🚀 ~ meetingRoom ~ error:", error)
    
        }
    } else if (method === 'update') {
        try {
            const response = await axios.put(BASE_URL + `meetings?userId=${indUserId ? indUserId : userId}`, data)
    
            if (response.status === 200) {
                alert(response.data.message)
                return response.data
            }
    
        } catch (error) {
    
        console.log("🚀 ~ meetingRoom ~ error:", error)
    
        }

    }    
}

export const deleteBookingApi = async (meetingId: string, userIndividualId?:string) => {

    const userId = localStorage.getItem('token')

    try {
        const response = await axios.delete(BASE_URL + `meetings?bookingId=${meetingId}&userId=${userIndividualId ?? userId}`)

        if (response.status === 200) {
            
            return response.data
        }

    } catch (error) {

    console.log("🚀 ~ meetingRoom ~ error:", error)

    }
}

export const getAllBooking = async () => {

    const userId = localStorage.getItem('token')

    try {
        const response = await axios.get(BASE_URL + `allBookings?userId=${userId}`)

        if (response.status === 200) {
            return response.data
        }

    } catch (error) {

    console.log("🚀 ~ meetingRoom ~ error:", error)

    }
}