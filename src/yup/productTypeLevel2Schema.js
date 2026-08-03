import * as yup from 'yup';

const productTypeLevelTwo = yup.object().shape({
    _id: yup.string(),
    productTypeID: yup.string().required('Product Type is required.'),
    unit: yup.string()
        .transform((v) => (v === "" ? undefined : v))
        .required('Unit is required.'),
    productName: yup.string().required('Product Name is required'),
    attributeFields: yup.array().of(
        yup.object().shape({
            _id: yup.string(),
            name: yup.string().required('Attribute name is required.'),
            isMandatory: yup.boolean().default(false),
            dataType: yup.string(),
        })
    ).min(1, 'Atleast One Attribute is required.')
});

export default productTypeLevelTwo;