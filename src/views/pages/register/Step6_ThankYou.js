// Step6_ThankYou.js
import React from 'react'
import {
  CCard, CCardBody, CContainer, CButton
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'

const Step6_ThankYou = () => {
  const navigate = useNavigate()

  return (
    <CContainer className="d-flex align-items-center justify-content-center">
      <CCard style={{ width: '500px' }}>
        <CCardBody className="text-center">
          <h4>🎉 Thank You for Registering!</h4>
          <p>We'll review your details and get back to you soon.</p>
          <CButton color="primary" onClick={() => navigate('/login')}>Go to Login</CButton>
        </CCardBody>
      </CCard>
    </CContainer>
  )
}

export default Step6_ThankYou
