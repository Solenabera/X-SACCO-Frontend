import * as yup from 'yup';

const userSchema = yup.object().shape({
    UserID: yup.string(),
    FirstName: yup.string().required('First Name is required.'),
    MiddleName: yup.string().required('Middle Name is required.'),
    LastName: yup.string().required('Last Name is required.'),
    Username: yup.string().required('Username is required.'),
    Password: yup.string(),
    ConfirmPassword: yup.string()
        .test('is-same', 'Confimation password does not match.', function (value) {
            const { Password } = this.parent
            return Password === value
        }),
    Email: yup.string().required('Email is required.'),
    PhoneNumber: yup.string()
        .matches(/^[0-9]+$/, "Enter a valid phone number.")
        .required('Phone number is required.')
        .test(
            'number-length',
            'Provide a valid Phone Number',
            (value) => { return String(value).length === 9 },
        )
        .test(
            'first-digit',
            'Provide a valid Phone Number',
            (value) => { return String(value).startsWith('9') || String(value).startsWith('7') },
        ),
    RoleID: yup.string().required('Role is required.'),
});

export default userSchema;