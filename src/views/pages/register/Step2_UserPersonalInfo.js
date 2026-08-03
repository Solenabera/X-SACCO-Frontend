import React, { useState } from 'react'
import {
    CForm,
    CFormInput,
    CButton,
    CRow,
    CCol,
    CFormSelect,
    CInputGroup,
    CInputGroupText,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilLockUnlocked } from '@coreui/icons'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { userPersonalInfoSchema } from '../../../yup/RegistrationSchema';

const Step2_UserPersonalInfo = ({ onBack, onSuccess }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ 
        resolver: yupResolver(userPersonalInfoSchema),
        mode: 'onTouched'
    });

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const onSubmit = (data) => {
        onSuccess(data);
    };

    return (
        <CForm onSubmit={handleSubmit(onSubmit)}>
            <h5 className="mb-4 text-center">Personal Information</h5>

            <CRow>
                <CCol md={6} className='mb-3'>
                    <CFormInput placeholder="First Name" {...register('FirstName')} autoFocus />
                    {errors.FirstName && <small className='text-danger'>{errors.FirstName.message}</small>}
                </CCol>

                <CCol md={6} className='mb-3'>
                    <CFormInput placeholder="Middle Name" {...register('MiddleName')} />
                    {errors.MiddleName && <small className='text-danger'>{errors.MiddleName.message}</small>}
                </CCol>
            </CRow>

            <CRow>
                <CCol md={6} className='mb-3'>
                    <CFormInput placeholder="Last Name" {...register('LastName')} />
                    {errors.LastName && <small className='text-danger'>{errors.LastName.message}</small>}
                </CCol>
                
                <CCol md={6} className='mb-3'>
                    <CFormInput placeholder="Fayda ID (FAN)" {...register('FAN')} />
                    {errors.FAN && <small className='text-danger'>{errors.FAN.message}</small>}
                </CCol>
            </CRow>

            <CRow>
                <CCol md={12} className='mb-3'>
                    <CFormInput type="email" placeholder="Email Address" {...register('Email')} />
                    {errors.Email && <small className='text-danger'>{errors.Email.message}</small>}
                </CCol>
            </CRow>

            <CRow>
                <CCol md={6} className='mb-3'>
                    <CFormInput type="date" placeholder="Birth Date" {...register('BirthDate')} />
                    {errors.BirthDate && <small className='text-danger'>{errors.BirthDate.message}</small>}
                </CCol>

                <CCol md={6} className='mb-3'>
                    <CFormSelect {...register('Gender')}>
                        <option value="">-- Select Gender --</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </CFormSelect>
                    {errors.Gender && <small className='text-danger'>{errors.Gender.message}</small>}
                </CCol>
            </CRow>

            <CRow>
                <CCol md={6} className='mb-3'>
                    <CInputGroup>
                        <CInputGroupText className="bg-light text-primary" style={{ width: '48px', justifyContent: 'center' }}>
                            *
                        </CInputGroupText>
                        <CFormInput
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            {...register('Password')}
                        />
                        <CInputGroupText
                            style={{ cursor: 'pointer', width: '48px', justifyContent: 'center', padding: '0.5rem' }}
                            onClick={() => setShowPassword(!showPassword)}
                            className="bg-light text-primary"
                        >
                            {showPassword ? (
                                <CIcon icon={cilLockUnlocked} size="lg" style={{ width: '20px', height: '20px' }} />
                            ) : (
                                <CIcon icon={cilLockLocked} size="lg" style={{ width: '20px', height: '20px' }} />
                            )}
                        </CInputGroupText>
                    </CInputGroup>
                    {errors.Password && <small className='text-danger'>{errors.Password.message}</small>}
                </CCol>

                <CCol md={6} className='mb-3'>
                    <CInputGroup>
                        <CInputGroupText className="bg-light text-primary" style={{ width: '48px', justifyContent: 'center' }}>
                            *
                        </CInputGroupText>
                        <CFormInput
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Confirm Password"
                            {...register('ConfirmPassword')}
                        />
                        <CInputGroupText
                            style={{ cursor: 'pointer', width: '48px', justifyContent: 'center', padding: '0.5rem' }}
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="bg-light text-primary"
                        >
                            {showConfirmPassword ? (
                                <CIcon icon={cilLockUnlocked} size="lg" style={{ width: '20px', height: '20px' }} />
                            ) : (
                                <CIcon icon={cilLockLocked} size="lg" style={{ width: '20px', height: '20px' }} />
                            )}
                        </CInputGroupText>
                    </CInputGroup>
                    {errors.ConfirmPassword && <small className='text-danger'>{errors.ConfirmPassword.message}</small>}
                </CCol>
            </CRow>

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

export default Step2_UserPersonalInfo