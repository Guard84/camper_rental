import * as yup from 'yup';

export const FormValidationSchema = {
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  bookingDate: yup.date().required('Booking date is required').nullable(),
  comment: yup.string().max(200, 'Comment must be less than 200 characters'),
};
