import React, { useState, useEffect } from 'react'
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
import { cilLockLocked, cilLockUnlocked, cilCheckCircle, cilXCircle } from '@coreui/icons'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { userPersonalInfoSchema } from '../../../yup/RegistrationSchema'

// Password strength rules configuration
const PASSWORD_RULES = [
    { id: 'length',    label: 'At least 8 characters',       test: (v) => v.length >= 8 },
    { id: 'uppercase', label: 'One uppercase letter (A–Z)',   test: (v) => /[A-Z]/.test(v) },
    { id: 'lowercase', label: 'One lowercase letter (a–z)',   test: (v) => /[a-z]/.test(v) },
    { id: 'number',    label: 'One number (0–9)',             test: (v) => /[0-9]/.test(v) },
    { id: 'special',   label: 'One special character (!@#…)', test: (v) => /[^A-Za-z0-9]/.test(v) },
]

const STRENGTH_META = [
    { label: 'Very Weak',   color: '#dc3545', width: '20%' },
    { label: 'Weak',        color: '#fd7e14', width: '40%' },
    { label: 'Fair',        color: '#ffc107', width: '60%' },
    { label: 'Strong',      color: '#20c997', width: '80%' },
    { label: 'Very Strong', color: '#198754', width: '100%' },
]

/* ─── Password Strength Checklist ─── */
const PasswordStrengthChecklist = ({ password }) => {
    const passed = PASSWORD_RULES.filter((r) => r.test(password)).length
    const meta   = STRENGTH_META[Math.max(0, passed - 1)]

    return (
        <div style={{
            background: 'linear-gradient(135deg, #f8fbff 0%, #eef5fb 100%)',
            border: '1px solid rgba(15,76,129,0.12)',
            borderRadius: '12px',
            padding: '14px 16px',
            marginTop: '8px',
        }}>
            {/* Strength label & bar */}
            <div className="d-flex justify-content-between align-items-center mb-1">
                <small style={{ fontWeight: 600, fontSize: '0.70rem', color: '#5a7a99', letterSpacing: '0.04em' }}>
                    PASSWORD STRENGTH
                </small>
                {password.length > 0 && (
                    <small style={{ fontWeight: 700, fontSize: '0.70rem', color: meta.color, transition: 'color 0.3s' }}>
                        {meta.label}
                    </small>
                )}
            </div>
            <div style={{ height: '6px', background: '#e2eaf3', borderRadius: '99px', overflow: 'hidden', marginBottom: '12px' }}>
                <div style={{
                    height: '100%',
                    width: password.length === 0 ? '0%' : meta.width,
                    background: meta.color,
                    borderRadius: '99px',
                    transition: 'width 0.45s cubic-bezier(0.4,0,0.2,1), background 0.35s ease',
                }} />
            </div>

            {/* Rules grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px 12px' }}>
                {PASSWORD_RULES.map((rule) => {
                    const ok = rule.test(password)
                    return (
                        <div key={rule.id} style={{
                            display: 'flex', alignItems: 'center', gap: '6px',
                            fontSize: '0.78rem',
                            color: ok ? '#198754' : '#8fa8bf',
                            fontWeight: ok ? 600 : 400,
                            transition: 'color 0.25s ease',
                        }}>
                            <CIcon
                                icon={ok ? cilCheckCircle : cilXCircle}
                                style={{
                                    width: '14px', height: '14px', flexShrink: 0,
                                    color: ok ? '#198754' : '#c5d8e8',
                                    transition: 'color 0.25s ease, transform 0.2s ease',
                                    transform: ok ? 'scale(1.1)' : 'scale(1)',
                                }}
                            />
                            {rule.label}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

/* ─── Main Step Component ─── */
const Step2_UserPersonalInfo = ({ personalInfo = {}, onBack, onSuccess }) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(userPersonalInfoSchema),
        mode: 'onTouched',
        defaultValues: personalInfo,
    })

    const [showPassword, setShowPassword]               = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [showChecklist, setShowChecklist]             = useState(false)

    const passwordValue = watch('password', '')

    useEffect(() => {
        if (passwordValue && passwordValue.length > 0) setShowChecklist(true)
    }, [passwordValue])

    const onSubmit = (data) => { onSuccess(data) }

    const eyeBtnStyle = {
        cursor: 'pointer',
        width: '44px',
        justifyContent: 'center',
        padding: '0.45rem',
        background: 'linear-gradient(135deg, #eef5fb, #ddeeff)',
        border: '1px solid rgba(15,76,129,0.15)',
        color: '#0f4c81',
    }

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

            {/* ── Password Fields ── */}
            <CRow>
                <CCol md={6} className='mb-1'>
                    <CInputGroup>
                        <CFormInput
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            {...register('password')}
                            onFocus={() => setShowChecklist(true)}
                        />
                        <CInputGroupText style={eyeBtnStyle} onClick={() => setShowPassword(!showPassword)} title={showPassword ? 'Hide' : 'Show'}>
                            <CIcon icon={showPassword ? cilLockUnlocked : cilLockLocked} style={{ width: '18px', height: '18px' }} />
                        </CInputGroupText>
                    </CInputGroup>
                    {errors.password && <small className='text-danger'>{errors.password.message}</small>}
                </CCol>

                <CCol md={6} className='mb-1'>
                    <CInputGroup>
                        <CFormInput
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Confirm Password"
                            {...register('confirmPassword')}
                        />
                        <CInputGroupText style={eyeBtnStyle} onClick={() => setShowConfirmPassword(!showConfirmPassword)} title={showConfirmPassword ? 'Hide' : 'Show'}>
                            <CIcon icon={showConfirmPassword ? cilLockUnlocked : cilLockLocked} style={{ width: '18px', height: '18px' }} />
                        </CInputGroupText>
                    </CInputGroup>
                    {errors.confirmPassword && <small className='text-danger'>{errors.confirmPassword.message}</small>}
                </CCol>
            </CRow>

            {/* ── Live Strength Checklist ── */}
            {showChecklist && (
                <CRow className="mb-2">
                    <CCol md={12}>
                        <PasswordStrengthChecklist password={passwordValue} />
                    </CCol>
                </CRow>
            )}

            <CRow className="mt-3">
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