import React, { useState } from 'react'
import Step1_PhoneNumber from './Step1_PhoneNumber'
import Step2_UserPersonalInfo from './Step2_UserPersonalInfo'
import Step3_UserAddress from './Step3_UserAddress'
import Step4_UploadFaydaAndPersonalPhoto from './Step4_UploadFaydaAndPersonalPhoto'
import Step5_ThankYou from './Step5_ThankYou'

import { CCard, CCardBody, CCol, CContainer, CProgress, CRow } from '@coreui/react'
import PublicHeader from '../../../components/public/PublicHeader'
import PublicFooter from '../../../components/public/PublicFooter'

const RegisterStepper = () => {
    const [step, setStep] = useState(1)
    const [phoneNumber, setPhoneNumber] = useState('')
    const [personalInfo, setPersonalInfo] = useState({})
    const [userAddress, setUserAddress] = useState({})

    const numberOfSteps = 5;

    const nextStep = () => setStep((prev) => prev + 1)
    const prevStep = () => setStep((prev) => prev - 1)

    return (
        <div
            className="min-vh-100 d-flex flex-column"
            style={{
                background:
                    'linear-gradient(180deg, #f5f9ff 0%, #eef5ff 48%, #ffffff 100%)'
            }}
        >
            <PublicHeader />
            <div className="d-flex align-items-center py-4 flex-grow-1">
                <CContainer>
                    <CRow className="align-items-center g-4">
                        <CCol md={6} className="text-primary px-3 px-md-5">
                            <div className="mb-4 d-inline-flex align-items-center justify-content-center rounded-circle fw-bold text-white" style={{ width: '58px', height: '58px', backgroundColor: '#0f4c81' }}>
                                X
                            </div>
                            <h1 className="fw-bold mb-3" style={{ color: '#0f4c81' }}>X-SACCO</h1>
                            <p style={{ fontSize: '18px', color: '#34526b', maxWidth: '520px' }}>
                                Join a secure and modern financial platform built for seamless member registration,
                                savings coordination, and trusted service delivery.
                            </p>
                            <div style={{ marginTop: '25px', lineHeight: '1.8', color: '#23435d' }}>
                                <div>✔ Secure membership onboarding</div>
                                <div>✔ Clear step-by-step registration</div>
                                <div>✔ Faster access to member services</div>
                            </div>
                        </CCol>

                        <CCol xs={12} sm={10} md={6} lg={6} className="mx-auto">
                            <CCard className="shadow border-0" style={{ borderRadius: '18px', backgroundColor: '#ffffff', padding: '6px', marginTop: '10px' }}>
                                <CCardBody className="p-3 p-md-4">
                                    <div className="text-center mb-4">
                                        <h3 className="fw-bold mb-2" style={{ color: '#0f4c81' }}>Register to X-SACCO</h3>
                                        <p className="text-muted small mb-0">Step {step} of {numberOfSteps}</p>
                                    </div>

                                    <CProgress
                                        value={(step / numberOfSteps) * 100}
                                        className="mb-4"
                                        color="#0f4c81"
                                        thin

                                    />

                                    {step === 1 && (
                                        <Step1_PhoneNumber
                                            phoneNumber={phoneNumber}
                                            onPhoneChange={setPhoneNumber}
                                            onSuccess={(phone) => {
                                                setPhoneNumber(phone)
                                                nextStep()
                                            }}
                                        />
                                    )}

                                    {step === 2 && (
                                        <Step2_UserPersonalInfo
                                            personalInfo={personalInfo}
                                            onBack={prevStep}
                                            onSuccess={(info) => {
                                                setPersonalInfo(info)
                                                nextStep()
                                            }}
                                        />
                                    )}

                                    {step === 3 && (
                                        <Step3_UserAddress
                                            userAddress={userAddress}
                                            onBack={prevStep}
                                            onSuccess={(address) => {
                                                setUserAddress(address)
                                                nextStep()
                                            }}
                                        />
                                    )}

                                    {step === 4 && (
                                        <Step4_UploadFaydaAndPersonalPhoto
                                            phoneNumber={phoneNumber}
                                            personalInfo={personalInfo}
                                            userAddress={userAddress}
                                            onBack={prevStep}
                                            onSuccess={() => nextStep()}
                                        />
                                    )}

                                    {step === 5 && (
                                        <Step5_ThankYou />
                                    )}
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>
                </CContainer>
            </div>
            <PublicFooter />
        </div>
    )
}

export default RegisterStepper