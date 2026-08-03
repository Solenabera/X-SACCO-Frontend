import * as yup from 'yup';

const passwordSchema = yup.object().shape({
    newPassword: yup.string()
        .required('Provide a new password.')
        .test('is-same', 'Please enter a different password from your current.', function (value) {
            const { currentPassword } = this.parent
            return currentPassword !== value
        }),
    confirmPassword: yup.string()
        .required('Confirm your new password.')
        .test('is-same', 'Confimation password does not match.', function (value) {
            const { newPassword } = this.parent
            return newPassword === value
        }),
    currentPassword: yup.string().required('Provide current password.'),
});

export default passwordSchema;