import * as yup from 'yup';

const document = yup.object().shape({
    _id: yup.string(),
    document: yup
        .mixed()
        .required('Document is required.')
        .test(
            'fileSize',
            "Please choose a file with size less than 10MB.",
            (file) => file && file[0] ? file[0].size <= 10 * 1024 * 1024 : false
        ),
    documentTitle: yup.string().required('Document title is required.'),
    documentType: yup.string()
        .required('Document type is required.'),
    documentDescription: yup.string(),
});

export default document;