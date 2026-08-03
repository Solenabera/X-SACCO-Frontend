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
import {userAddressSchema} from '../../../yup/RegistrationSchema';

const Step3_UserAddress = ({ onBack, onSuccess }) => {
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ 
        resolver: yupResolver(userAddressSchema),
        mode: 'onTouched'
    });

    const onSubmit = (data) => {
        onSuccess(data);
    };

    return (
        <CForm onSubmit={handleSubmit(onSubmit)}>
            <h5 className="mb-4 text-center">Address Information</h5>

            <CCol className='mb-4'>
                <CFormSelect {...register('Region')} aria-label="Select Region">
                    <option value="">-- Select Region --</option>
                    <option value="Addis Ababa">Addis Ababa</option>
                    <option value="Oromia">Oromia</option>
                </CFormSelect>
                {errors.Region && <small className='text-danger'>{errors.Region.message}</small>}
            </CCol>

            <CCol className='mb-4'>
                <CFormInput placeholder="Zone" {...register('Zone')} autoFocus />
                {errors.Zone && <small className='text-danger'>{errors.Zone.message}</small>}
            </CCol>

            <CCol className='mb-4'>
                <CFormInput placeholder="Wereda" {...register('Wereda')} />
                {errors.Wereda && <small className='text-danger'>{errors.Wereda.message}</small>}
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