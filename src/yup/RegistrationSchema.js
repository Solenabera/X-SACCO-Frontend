import * as yup from 'yup';

export const userPersonalInfoSchema = yup.object().shape({
    firstName: yup.string().required('First Name is required.'),
    middleName: yup.string().required('Middle Name is required.'),
    lastName: yup.string().required('Last Name is required.'),
    nationalId: yup.string().required('Fayda ID is required.').length(16, 'Fayda ID must be exactly 16 characters.'),
    email: yup.string().email('Enter a valid email address.').required('Email is required.'),
    birthDate: yup.string().required('Birth Date is required.'),
    gender: yup.string().required('Gender is required.'),
    password: yup.string()
        .required('Password is required.')
        .min(8, 'Password must be at least 8 characters.')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter.')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter.')
        .matches(/[0-9]/, 'Password must contain at least one number.')
        .matches(/[^A-Za-z0-9]/, 'Password must contain at least one special character.'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Confirmation password does not match.')
        .required('Confirm Password is required.'),
});

export const userAddressSchema = yup.object().shape({
    region: yup.string().required('Region is required.'),
    zone: yup.string().required('Zone is required.'),
    wereda: yup.string().required('Woreda is required.'),
});

// module.exports = { userPersonalInfoSchema, userAddressSchema };