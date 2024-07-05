import * as yup from 'yup';

export const FormValidationSchema = {
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  bookingDate: yup.date().min(new Date(), 'Booking date must be in the future').required('Booking date is required'),
  comment: yup.string().max(200, 'Comment must be less than 200 characters'),
};
