import * as yup from 'yup';

const buildProductSchema = (fields) => {
    const attributeShape = {}
    fields?.forEach(field => {
        if (!field?.name) return;

        let validator;
        switch (field.dataType) {
            case 'string':
                validator = yup.string()
                    .transform((v) => (v === "" ? undefined : v))
                break
            case 'number':
                validator = yup.number()
                    .transform((v, ov) => (ov === "" ? undefined : v))
                    .typeError('Please enter a number.')
                break;
            case 'email':
                validator = yup.string()
                validator = validator.email('Invalid email.')
                break;
            case 'file':
                validator = yup.mixed();
                validator = validator.test('fileSize', 'Max size 10MB', (file) =>
                    file && file[0] ? file[0].size <= 10 * 1024 * 1024 : !field?.required)
                break;
            default:
                validator = yup.string()
                break;
        }

        if (field.isMandatory) validator = validator.required('Input is required.');
        attributeShape[field?.name] = validator.meta({ id: field?.id })
    });

    const shape = {
        _id: yup.string(),
        productTypeIDLevelOne: yup
            .string()
            .transform((v) => (v === "" ? undefined : v))
            .required('Product type is required.'),
        productTypeIDLevelTwo: yup
            .string()
            .transform((v) => (v === "" ? undefined : v))
            .required('Product type is required.'),
        companyID: yup
            .string()
            .transform((v) => (v === "" ? undefined : v))
            .required('Company is required.'),
        quantity: yup
            .number()
            .transform((v, ov) => (ov === "" ? undefined : v))
            .required('Quantity is required.'),
        price: yup
            .number()
            .transform((v, ov) => (ov === "" ? undefined : v))
            .required('Price is required.'),
        existingImages: yup.array().of(
            yup.object().shape({
                _id: yup.string(),
                imageURL: yup.string(),
            })
        ),
        selectedImages: yup
            .mixed()
            .required('Document is required.')
            .test(
                'fileSize',
                "Please choose a file with size less than 10MB.",
                (files) => files ? Array.from(files).every((file) => { return file.size <= 10 * 1024 * 1024 }) : true
            ),
        attributes: yup.object().shape(attributeShape),
    }

    return yup.object().shape(shape)
        .test(
            'maxFiles',
            "You can only add 4 files.",
            (fields) => { return fields && (Array.from(fields?.selectedImages ?? {}).length) + (fields?.existingImages?.length ?? 0) <= 4 }
        )
        .test(
            'maxFiles',
            "Add atleast 1 file.",
            (fields) => { return fields && (Array.from(fields?.selectedImages ?? {}).length) + (fields?.existingImages?.length ?? 0) >= 1 }
        );
}

export default buildProductSchema;