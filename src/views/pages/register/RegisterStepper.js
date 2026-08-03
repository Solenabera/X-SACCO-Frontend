import React, { useState } from 'react'
import Step1_PhoneNumber from './Step1_PhoneNumber'
import Step2_UserPersonalInfo from './Step2_UserPersonalInfo'
import Step3_UserAddress from './Step3_UserAddress'
import Step4_UploadFayda from './Step4_UploadFayda'
import Step5_ThankYou from './Step5_ThankYou'

import { CCard, CCardBody, CContainer, CProgress } from '@coreui/react'

const RegisterStepper = () => {
    const [step, setStep] = useState(1)
    const [phoneNumber, setPhoneNumber] = useState('')
    const [personalInfo, setPersonalInfo] = useState({})
    const [userAddress, setUserAddress] = useState({})

    const numberOfSteps = 5;

    const nextStep = () => setStep((prev) => prev + 1)
    const prevStep = () => setStep((prev) => prev - 1)

    return (
        <CContainer className="d-flex align-items-center justify-content-center min-vh-100 py-5">
            <CCard className="shadow-lg border-0" style={{ width: '100%', maxWidth: '600px' }}>
                <CCardBody className="p-2">
                    <div className="text-center mb-4">
                        <h3 className="fw-bold" style={{ color: '#1e3c72' }}>Register to X-SACCO</h3>
                        <p className="text-muted small">Step {step} of {numberOfSteps}</p>
                    </div>
                    
                    <CProgress
                        value={(step / numberOfSteps) * 100}
                        className="mb-4"
                        color="#1e3c72"
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
        </CContainer>
    )
}

export default RegisterStepper