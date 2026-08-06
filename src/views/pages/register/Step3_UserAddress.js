import React from 'react'
import {
    CForm,
    CFormInput,
    CButton,
    CRow,
    CCol,
    CFormSelect,
} from '@coreui/react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { userAddressSchema } from '../../../yup/RegistrationSchema';

const Step3_UserAddress = ({ userAddress = {}, onBack, onSuccess }) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(userAddressSchema),
        mode: 'onTouched',
        defaultValues: userAddress,
    });

    const onSubmit = (data) => {
        onSuccess(data);
    };

    return (
        <CForm onSubmit={handleSubmit(onSubmit)}>
            <h5 className="mb-4 text-center">Address Information</h5>

            <CCol className='mb-4'>
                <CFormSelect defaultValue="Addis Ababa" {...register('region')} aria-label="Select Region">
                    <option value="" disabled>-- Select Region --</option>
                    <option value="Addis Ababa">Addis Ababa</option>
                    <option value="Oromia">Oromia</option>
                </CFormSelect>
                {errors.region && <small className='text-danger'>{errors.region.message}</small>}
            </CCol>

            <CCol className='mb-4'>
                <CFormInput placeholder="Zone" {...register('zone')} autoFocus />
                {errors.zone && <small className='text-danger'>{errors.zone.message}</small>}
            </CCol>

            <CCol className='mb-4'>
                <CFormInput placeholder="Wereda" {...register('wereda')} />
                {errors.wereda && <small className='text-danger'>{errors.wereda.message}</small>}
            </CCol>

            <CRow className="mt-4">
                <CCol xs={6}>
                    <CButton color="secondary" variant="outline" onClick={onBack} className="w-100">
                        Back
                    </CButton>
                </CCol>
                <CCol xs={6}>
                    <CButton type="submit" color="primary" className="w-100">
                        Continue
                    </CButton>
                </CCol>
            </CRow>
        </CForm>
    )
}

export default Step3_UserAddress