'use client'
import React from 'react'
import {
    Typography,
    Button,
    TextField,
    Grid,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updateBooking } from '../api/conferenceApis';
import { Tbooking } from '../types';

type TSlotDrawer = {
    handleDrawerClose: () => void
    editData: Tbooking
    method: string
    id: string
    indUserId?: string
}

const validationSchema = Yup.object({
    date: Yup.date().min(new Date(), 'Cannot select a previous date').required('Required'),
    startTime: Yup.string().required('Required'),
    endTime: Yup.string()
        .required('Required')
        .test('is-greater', 'End time must be greater than start time', function (value) {
            const { startTime } = this.parent;
            return value > startTime;
        }),
});

const SlotDrawer: React.FC<TSlotDrawer> = ({ handleDrawerClose, id, editData, method, indUserId }) => {
    
    const handleSubmit = async (values: any) => {

        await updateBooking({ ...values, roomId: id, bookingId: editData?._id ?? '' }, method, indUserId)
        
        handleDrawerClose()

    }

    const formik = useFormik({
        initialValues: {
            date: editData.date ?? new Date().toISOString().split('T')[0],
            startTime: editData.startTime,
            endTime: editData.endTime,
            event: editData.event
        },
        enableReinitialize: true,
        validationSchema,
        onSubmit: async (values) => {
            handleSubmit(values)
        },
    });

    return <div className="p-4" style={{ width: '600px' }}>
        <Typography variant="h6" component="div" className="mb-5">
            Add New Booking
        </Typography>

        <form onSubmit={formik.handleSubmit}>
            {/* Fields for Date, Start Time, and End Time */}
            <div className='my-5'>
                <TextField
                    label="Date"
                    type="date"
                    fullWidth
                    className="mb-3"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    {...formik.getFieldProps('date')}
                    error={formik.touched.date && Boolean(formik.errors.date)}
                    helperText={formik.touched.date && formik.errors.date}
                />
            </div>

            <div className='my-5'>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            label="Start Time"
                            type="time"
                            fullWidth
                            className="mb-3"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            {...formik.getFieldProps('startTime')}
                            error={formik.touched.startTime && Boolean(formik.errors.startTime)}
                            helperText={formik.touched.startTime && formik.errors.startTime}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="End Time"
                            type="time"
                            fullWidth
                            className="mb-3"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            {...formik.getFieldProps('endTime')}
                            error={formik.touched.endTime && Boolean(formik.errors.endTime)}
                            helperText={formik.touched.endTime && formik.errors.endTime}
                        />
                    </Grid>
                </Grid>
                <div className='my-5'>
                    <TextField
                        label="Event"
                        type="text"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        {...formik.getFieldProps('event')}
                        error={formik.touched.date && Boolean(formik.errors.event)}
                        helperText={formik.touched.date && formik.errors.event}
                    />
                </div>
            </div>

            {/* Save Button */}
            <Button className='!p-2 !rounded' variant="contained" color="primary" fullWidth type="submit">
                Save Booking
            </Button>
        </form>
    </div>
}

export default SlotDrawer