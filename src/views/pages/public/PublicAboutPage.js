import React from 'react'
import { CCol, CRow } from '@coreui/react'
import PublicPageTemplate from '../../../components/public/PublicPageTemplate'

const PublicAboutPage = () => {
    return (
        <PublicPageTemplate
            className="py-5 py-lg-6" style={{ maxWidth: '1700px' }}
            title="About Us"
            intro="X-SACCO is a member-centered financial cooperative designed to offer trusted savings, loan, and service solutions. Our mission is to help members improve financial security, participation, and sustainable growth through secure digital access."
        >
            <CRow className="g-4">
                <CCol md={4}>
                    <div className="rounded-4 p-4 border h-100" style={{ background: '#f7fbff', borderColor: '#dcecff' }}>
                        <div className="fw-bold mb-2" style={{ color: '#0f4c81' }}>Mission</div>
                        <p className="text-secondary mb-0">To deliver secure, affordable, and member-focused financial services that empower people to build confidence and financial resilience.</p>
                    </div>
                </CCol>
                <CCol md={4}>
                    <div className="rounded-4 p-4 border h-100" style={{ background: '#ffffff', borderColor: '#dcecff' }}>
                        <div className="fw-bold mb-2" style={{ color: '#0f4c81' }}>Vision</div>
                        <p className="text-secondary mb-0">To become a trusted cooperative financial hub that supports enterprise growth, member development, and community prosperity.</p>
                    </div>
                </CCol>
                <CCol md={4}>
                    <div className="rounded-4 p-4 border h-100" style={{ background: '#f7fbff', borderColor: '#dcecff' }}>
                        <div className="fw-bold mb-2" style={{ color: '#0f4c81' }}>Services</div>
                        <p className="text-secondary mb-0">Savings management, share ownership, loan applications, member updates, and responsive cooperative support.</p>
                    </div>
                </CCol>
            </CRow>
        </PublicPageTemplate>
    )
}

export default PublicAboutPage
