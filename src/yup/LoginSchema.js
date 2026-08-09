import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    phoneNumber: yup
        .string()
        .required('Phone Number is required.')
        .length(9, 'Phone number must be exactly 9 digits.'),
    password: yup.string().required('Password is required.'),
});