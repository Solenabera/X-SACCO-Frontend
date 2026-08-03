import React from 'react'
import { CButton, CCard, CCardBody, CCol, CContainer, CForm, CFormInput, CFormLabel, CFormTextarea, CRow } from '@coreui/react'
import PublicHeader from '../../../components/public/PublicHeader'
import PublicFooter from '../../../components/public/PublicFooter'

const PublicContactPage = () => {
    return (
        <div className="min-vh-100" style={{ background: 'linear-gradient(180deg, #f5f9ff 0%, #eef5ff 48%, #ffffff 100%)' }}>
            <PublicHeader />
            <CContainer className="py-5">
                <CRow className="g-4">
                    <CCol lg={5}>
                        <div className="text-primary fw-bold mb-2">Contact Us</div>
                        <h1 className="fw-bold mb-3" style={{ color: '#0f4c81' }}>Reach our support team</h1>
                        <p className="text-secondary mb-4">
                            For help with memberships, savings, shares, or loan requests, please use the contact channels below or send a quick message.
                        </p>
                        <div className="small text-secondary">
                            <div className="mb-2">📍 123 Finance Avenue, Addis Ababa</div>
                            <div className="mb-2">📞 +251 911 000 000</div>
                            <div>✉️ support@xsacco.com</div>
                        </div>
                    </CCol>
                    <CCol lg={7}>
                        <CCard className="border-0 shadow-sm">
                            <CCardBody className="p-4">
                                <CForm>
                                    <CRow className="g-3">
                                        <CCol md={6}>
                                            <CFormLabel>Full Name</CFormLabel>
                                            <CFormInput placeholder="Your name" />
                                        </CCol>
                                        <CCol md={6}>
                                            <CFormLabel>Email Address</CFormLabel>
                                            <CFormInput placeholder="you@example.com" />
                                        </CCol>
                                        <CCol xs={12}>
                                            <CFormLabel>Message</CFormLabel>
                                            <CFormTextarea rows={5} placeholder="Tell us how we can help" />
                                        </CCol>
                                        <CCol xs={12}>
                                            <CButton color="primary" className="fw-semibold px-4 py-2">Send Message</CButton>
                                        </CCol>
                                    </CRow>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
            <PublicFooter />
        </div>
    )
}

export default PublicContactPage
