import React from 'react'
import { CButton } from '@coreui/react'
import { useNavigate } from 'react-router-dom'

const Step5_ThankYou = () => {
  const navigate = useNavigate()

  return (
    <div className="text-center py-4">
        <div className="mb-4">
            <h1 style={{ fontSize: '4rem' }}>🎉</h1>
        </div>
        <h4 className="fw-bold mb-3 text-success">Registration Complete!</h4>
        <p className="text-muted mb-4">
            Thank you for registering. We will review your details and your Fayda ID submission. 
            You will be notified once your account is activated.
        </p>
        <CButton 
            color="primary" 
            size="lg" 
            className="px-5" 
            onClick={() => navigate('/login')}
        >
            Go to Login
        </CButton>
    </div>
  )
}

export default Step5_ThankYou