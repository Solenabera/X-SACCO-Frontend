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

const Step2_UserPersonalInfo = ({ personalInfo = {}, onBack, onSuccess }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(userPersonalInfoSchema),
        mode: 'onTouched',
        defaultValues: personalInfo,
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
                    <CFormInput placeholder="First Name" {...register('firstName')} autoFocus />
                    {errors.firstName && <small className='text-danger'>{errors.firstName.message}</small>}
                </CCol>

                <CCol md={6} className='mb-3'>
                    <CFormInput placeholder="Middle Name" {...register('middleName')} />
                    {errors.middleName && <small className='text-danger'>{errors.middleName.message}</small>}
                </CCol>
            </CRow>

            <CRow>
                <CCol md={6} className='mb-3'>
                    <CFormInput placeholder="Last Name" {...register('lastName')} />
                    {errors.lastName && <small className='text-danger'>{errors.lastName.message}</small>}
                </CCol>

                <CCol md={6} className='mb-3'>
                    <CFormInput placeholder="Fayda ID (FAN)" {...register('nationalId')} />
                    {errors.nationalId && <small className='text-danger'>{errors.nationalId.message}</small>}
                </CCol>
            </CRow>

            <CRow>
                <CCol md={12} className='mb-3'>
                    <CFormInput type="email" placeholder="Email Address" {...register('email')} />
                    {errors.email && <small className='text-danger'>{errors.email.message}</small>}
                </CCol>
            </CRow>

            <CRow>
                <CCol md={6} className='mb-3'>
                    <CFormInput type="date" placeholder="Birth Date" {...register('birthDate')} />
                    {errors.birthDate && <small className='text-danger'>{errors.birthDate.message}</small>}
                </CCol>

                <CCol md={6} className='mb-3'>
                    <CFormSelect {...register('gender')}>
                        <option value="">-- Select Gender --</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </CFormSelect>
                    {errors.gender && <small className='text-danger'>{errors.gender.message}</small>}
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
                            {...register('password')}
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
                    {errors.password && <small className='text-danger'>{errors.password.message}</small>}
                </CCol>

                <CCol md={6} className='mb-3'>
                    <CInputGroup>
                        <CInputGroupText className="bg-light text-primary" style={{ width: '48px', justifyContent: 'center' }}>
                            *
                        </CInputGroupText>
                        <CFormInput
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Confirm Password"
                            {...register('confirmPassword')}
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
                    {errors.confirmPassword && <small className='text-danger'>{errors.confirmPassword.message}</small>}
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