// src/pages/RegisterStepper/RegisterStepper.js
import React, { useState } from 'react'
import Step1_Email from './Step1_Email'
import Step2_VerifyCode from './Step2_VerifyCode'
import Step3_UserInfo from './Step3_UserInfo'
import Step4_CompanyInfo from './Step4_CompanyInfo'
import Step5_UploadFiles from './Step5_UploadFiles'
import Step6_UserInfo from './Step6_ThankYou'
import { CCard, CCardBody, CContainer, CProgress } from '@coreui/react'

const RegisterStepper = () => {
    const [step, setStep] = useState(1)
    const [email, setEmail] = useState('')
    const [otpId, setOtpId] = useState('')
    const [roleID, setRole] = useState('')

    const numberOfSteps = 5;

    const nextStep = () => setStep((prev) => prev + 1)
    const prevStep = () => setStep((prev) => prev - 1)

    return (
        <CContainer className="d-flex align-items-center justify-content-center min-vh-100">
            <CCard style={{ width: '100%', maxWidth: '500px' }}>
                <CCardBody>

                    <div className="text-center mb-3">
                        <h3 className="fw-bold">Register to ConnectX</h3>
                    </div>
                    <CProgress
                        value={(step / numberOfSteps) * 100}
                        className="mb-4"
                        animated
                        color="info"
                    />
                    {step === 1 && (
                        <Step1_Email
                            onSuccess={(email, otpId) => {
                                setEmail(email)
                                setOtpId(otpId)
                                nextStep()
                            }}
                        />
                    )}
                    {step === 2 && (
                        <Step2_VerifyCode
                            email={email}
                            otpId={otpId}
                            onBack={prevStep}
                            onVerified={() => nextStep()}
                        />
                    )}
                    {step === 3 && (
                        <Step3_UserInfo
                            email={email}
                            onBack={prevStep}
                            onSuccess={(roleID) => {
                                setRole(roleID)
                                nextStep()
                            }
                            }
                        />
                    )}

                    {/* {step === 4 && (
                        <Step4_CompanyInfo
                            email={email}
                            onBack={prevStep}
                            onSuccess={() => nextStep()}
                        />
                    )} */}

                    {step === 4 && (
                        <Step5_UploadFiles
                            email={email}
                            roleID={roleID}
                            onBack={prevStep}
                            onSuccess={() => nextStep()}
                        />
                    )}
                    {step === 5 && (
                        <Step6_UserInfo
                            email={email}
                            onBack={prevStep}
                        />
                    )}
                </CCardBody>
            </CCard>
        </CContainer>
    )
}

export default RegisterStepper
