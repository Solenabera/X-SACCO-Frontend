import React, { useState } from 'react'
import Step1_PhoneNumber from './Step1_PhoneNumber'
import Step2_UserPersonalInfo from './Step2_UserPersonalInfo'
import Step3_UserAddress from './Step3_UserAddress'
import Step4_UploadFayda from './Step4_UploadFayda'
import Step5_ThankYou from './Step5_ThankYou'

import { CCard, CCardBody, CCol, CContainer, CProgress, CRow } from '@coreui/react'

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
            className="min-vh-100 d-flex align-items-center py-4"
            style={{
                background:
                    'radial-gradient(circle at top right, rgba(17, 163, 106, 0.2), transparent 20%), linear-gradient(135deg, #0f4c81, #1f6ea8)'
            }}
        >
            <CContainer>
                <CRow className="align-items-center g-4">
                    <CCol md={6} className="text-white px-3 px-md-5">
                        <div className="mb-4 d-inline-flex align-items-center justify-content-center rounded-circle fw-bold text-primary bg-white" style={{ width: '58px', height: '58px' }}>
                            X
                        </div>
                        <h1 className="fw-bold mb-3">X-SACCO</h1>
                        <p style={{ fontSize: '18px', opacity: 0.92, maxWidth: '520px' }}>
                            Join a secure and modern financial platform built for seamless member registration,
                            savings coordination, and trusted service delivery.
                        </p>
                        <div style={{ marginTop: '25px', lineHeight: '1.8' }}>
                            <div>✔ Secure membership onboarding</div>
                            <div>✔ Clear step-by-step registration</div>
                            <div>✔ Faster access to member services</div>
                        </div>
                    </CCol>

                    <CCol xs={11} sm={8} md={5} lg={5} className="mx-auto">
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
                                        onSuccess={(phone) => {
                                            setPhoneNumber(phone)
                                            nextStep()
                                        }}
                                    />
                                )}

                                {step === 2 && (
                                    <Step2_UserPersonalInfo
                                        onBack={prevStep}
                                        onSuccess={(info) => {
                                            setPersonalInfo(info)
                                            nextStep()
                                        }}
                                    />
                                )}

                                {step === 3 && (
                                    <Step3_UserAddress
                                        onBack={prevStep}
                                        onSuccess={(address) => {
                                            setUserAddress(address)
                                            nextStep()
                                        }}
                                    />
                                )}

                                {step === 4 && (
                                    <Step4_UploadFayda
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
    )
}

export default RegisterStepper