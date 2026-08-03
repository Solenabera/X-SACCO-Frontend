import React, { useEffect, useState } from 'react'
import {
    CForm,
    CFormInput,
    CButton,
    CRow,
    CCol,
    CAlert,
    CFormSelect,
    CInputGroup,
    CInputGroupText
} from '@coreui/react'
import { useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup';
import userSchema from '../../../yup/userSchema';
import useApiFetch from '../../../hooks/useAPIFetch';

const Step3_UserInfo = ({ email, onBack, onSuccess }) => {
    const {
        register,
        handleSubmit,
        formState: { errors: errorsUserForm },
        watch,
    } = useForm({
        resolver: yupResolver(userSchema),
        defaultValues: {
            'Email': email
        }
    });

    const role = watch('RoleID')

    const { data, isLoading, errors, fetchData,
    } = useApiFetch({ url: 'register_user', method: 'POST' }, false)

    useEffect(()=>{
        if (!isLoading && data) {
            onSuccess(role)
        }
    }, [isLoading, data])

    const handleSubmitForm = (data) => {
        fetchData({
            data: {
                firstName: data?.FirstName,
                middleName: data?.MiddleName,
                lastName: data?.LastName,
                username: data?.Username,
                password: data?.Password,
                emailAddress: data?.Email,
                phoneNumber: `+251${data?.PhoneNumber}`,
                roleID: data?.RoleID,
            }
        })
    }

    return (
        <CForm onSubmit={handleSubmit(handleSubmitForm)}>
            <h5>Step 3: Enter User Info</h5>

            <CCol className='mb-3'>
                <CFormInput placeholder="First Name" {...register('FirstName')} autoFocus />
                {errorsUserForm?.FirstName && <p className='text-danger'>{errorsUserForm?.FirstName?.message}</p>}
            </CCol>

            <CCol className='mb-3'>
                <CFormInput placeholder="Middle Name" {...register('MiddleName')} />
                {errorsUserForm?.MiddleName && <p className='text-danger'>{errorsUserForm?.MiddleName?.message}</p>}
            </CCol>

            <CCol className='mb-3'>
                <CFormInput placeholder="Last Name" {...register('LastName')} />
                {errorsUserForm?.LastName && <p className='text-danger'>{errorsUserForm?.LastName?.message}</p>}
            </CCol>

            <CCol className='mb-3'>
                <CFormInput placeholder="Username" {...register('Username')} />
                {errorsUserForm?.Username && <p className='text-danger'>{errorsUserForm?.Username?.message}</p>}
            </CCol>

            <CCol className='mb-3'>
                <CFormInput type="password" placeholder="Password" {...register('Password')} required/>
                {errorsUserForm?.Password && <p className='text-danger'>{errorsUserForm?.Password?.message}</p>}
            </CCol>

            <CCol className='mb-3'>
                <CFormInput type="password" placeholder="Confirm Password" {...register('ConfirmPassword')} required/>
                {errorsUserForm?.ConfirmPassword && <p className='text-danger'>{errorsUserForm?.ConfirmPassword?.message}</p>}
            </CCol>

            <CCol className='mb-3'>
                <CInputGroup>
                    <CInputGroupText>+251</CInputGroupText>
                    <CFormInput type='number' placeholder="Phone Number" {...register('PhoneNumber')} />
                </CInputGroup>
                {errorsUserForm?.PhoneNumber && <p className='text-danger'>{errorsUserForm?.PhoneNumber?.message}</p>}
            </CCol>

            <CCol className='mb-3'>
                <CFormSelect {...register('RoleID')}>
                    <option value="">-- Select Role --</option>
                    <option value="RoleID_02">Supplier</option>
                    <option value="RoleID_03">Purchaser</option>
                    <option value="RoleID_04">Consultant</option>
                </CFormSelect>
                {errorsUserForm?.RoleID && <p className='text-danger'>{errorsUserForm?.RoleID?.message}</p>}
            </CCol>

            {errors?.details && <CAlert color="danger">{errors?.details?.response?.data?.message}</CAlert>}

            <CRow>
                <CCol>
                    <CButton color="secondary" onClick={onBack} className="w-100" disabled={isLoading}>
                        Back
                    </CButton>
                </CCol>
                <CCol>
                    <CButton type="submit" color="primary" className="w-100" disabled={isLoading}>
                        {isLoading ? 'Submitting...' : 'Continue'}
                    </CButton>
                </CCol>
            </CRow>
        </CForm>
    )
}

export default Step3_UserInfo
