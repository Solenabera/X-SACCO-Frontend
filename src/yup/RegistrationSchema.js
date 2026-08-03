import * as yup from 'yup';

export const userPersonalInfoSchema = yup.object().shape({
    FirstName: yup.string().required('First Name is required.'),
    MiddleName: yup.string().required('Middle Name is required.'),
    LastName: yup.string().required('Last Name is required.'),
    FAN: yup.string().required('Fayda ID is required.').length(16, 'Fayda ID must be exactly 16 characters.'),
    Email: yup.string().email('Enter a valid email address.').required('Email is required.'),
    BirthDate: yup.string().required('Birth Date is required.'),
    Gender: yup.string().required('Gender is required.'),
    Password: yup.string().required('Password is required.'),
    ConfirmPassword: yup.string()
        .oneOf([yup.ref('Password'), null], 'Confirmation password does not match.')
        .required('Confirm Password is required.'),
});

export const userAddressSchema = yup.object().shape({
    Region: yup.string().required('Region is required.'),
    Zone: yup.string().required('Zone is required.'),
    Wereda: yup.string().required('Woreda is required.'),
});

// module.exports = { userPersonalInfoSchema, userAddressSchema };