import * as yup from 'yup';

const company = yup.object().shape({
    _id: yup.string(),
    email: yup.string(),
    companyName: yup.string().required('Company name is required.'),
    registrationNumber: yup.string().required('Registration number is required.'),
    tinNumber: yup.number()
        .typeError("Enter a valid TIN.")
        .required('TIN is required.'),
    licenseNumber: yup.string().required('License number is required.'),
    phoneNumber: yup.string()
        .matches(/^[0-9]+$/, "Provide a valid Phone Number.")
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
    website: yup.string(),
    sector: yup.string().required('Sector is required.'),
    establishedYear: yup.string().required('Established year is required.'),
    address: yup.string().required('Address is required.'),
    city: yup.string().required('City is required.'),
    region: yup.string().required('Region is required.'),
    users: yup.array().of(
        yup.object().shape({
            _id: yup.string(),
            email: yup.string().required("Email is required."),
            role: yup.string().required("Role is required.")
        })
    ),
    documents: yup.array().of(
        yup.object().shape({
            _id: yup.string(),
            name: yup.string().required('Document name is required.'),
            document: yup.mixed()
                .required('Document is required.')
                .test(
                    'fileSize',
                    "Please choose a file with size less than 10MB.",
                    (files) => files ? Array.from(files).every((file) => { return file.size <= 10 * 1024 * 1024 }) : true
                )
        })
    )
});

export default company;