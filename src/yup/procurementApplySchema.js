import * as yup from 'yup';

const procurementApply = yup.object()
    .shape({
        _id: yup.string(),
        tenderID: yup.string(),

        company: yup.string().required('Company is required.'),

        experience: yup.number().default(0).typeError('Enter a valid number.'),
        deliverySchedule: yup.string().required('Delivery schedule is required.'),

        documents: yup.array().of(
            yup.object().shape({
                _id: yup.string(),
                docID: yup.string(),
                name: yup.string().required('Name is required.'),
                document: yup
                    .mixed()
                    .required('Document is required.')
                    .when('docID', {
                        is: (val) => !val,
                        then: (procurement) => procurement.test(
                            'fileSize',
                            "Please choose a file with size less than 10MB.",
                            (file) => file && file[0] ? file[0].size <= 10 * 1024 * 1024 : false
                        )
                    })
                ,
            })),

        products: yup.array().of(
            yup.object().shape({
                _id: yup.string(),
                quantity: yup.number().typeError('Quantity is required.').required('Quantity is required.'),
                deliverable: yup.string().required('Delivery location is required.'),
                deliveryDate: yup.string().required('Delivery date is required.'),
                price: yup
                    .number()
                    .typeError('Price is required.')
                    .required('Price is required.')
                    .test(
                        'priceCheck',
                        "Enter you price for this product.",
                        (value) => value ? value > 0 : false
                    ),
            })),

        services: yup.array().of(
            yup.object().shape({
                _id: yup.string(),
                price: yup
                    .number()
                    .typeError('Price is required.')
                    .required('Price is required.')
                    .test(
                        'priceCheck',
                        "Enter you price for this service.",
                        (value) => value ? value > 0 : false
                    ),
            })
        )
    })
    .test(
        "productsOrServices",
        "Add atleast 1 product or service.",
        (fields) => { return fields && (fields?.products?.length ?? 0) + (fields?.services?.length ?? 0) > 0 }
    );

export default procurementApply;