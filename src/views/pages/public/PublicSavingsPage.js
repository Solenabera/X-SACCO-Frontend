import React from 'react'
import { CCol, CRow } from '@coreui/react'
import PublicPageTemplate from '../../../components/public/PublicPageTemplate'

const savingsBenefits = [
    'Build a reliable emergency reserve and improve financial discipline.',
    'Create a secure habit of regular savings with clear member visibility.',
    'Prepare for future goals such as education, business growth, and family needs.',
]

const PublicSavingsPage = () => {
    return (
        <PublicPageTemplate
            className="py-5 py-lg-6" style={{ maxWidth: '1700px' }}
            title="Savings"
            intro="Savings are the foundation of financial stability. Through disciplined contributions and secure member services, members can build a dependable reserve while preparing for both short-term and long-term goals."
        >

            <CRow className="g-4">
                <CCol lg={7}>
                    <div className="rounded-4 p-4 border h-100" style={{ background: '#f7fbff', borderColor: '#dcecff' }}>
                        <h3 className="fw-bold mb-3" style={{ color: '#0f4c81' }}>How users can save</h3>
                        <ul className="mb-0 text-secondary">
                            {savingsBenefits.map((item) => (
                                <li key={item} className="mb-2">{item}</li>
                            ))}
                        </ul>
                    </div>
                </CCol>

                <CCol lg={5}>
                    <div className="rounded-4 p-4 border h-100" style={{ background: '#ffffff', borderColor: '#dcecff' }}>
                        <h3 className="fw-bold mb-3" style={{ color: '#0f4c81' }}>Why savings matter</h3>
                        <p className="text-secondary mb-0">
                            Saving regularly strengthens personal security, encourages responsible planning, and helps members access future opportunities through trusted cooperative support.
                        </p>
                    </div>
                </CCol>
            </CRow>
        </PublicPageTemplate>
    )
}

export default PublicSavingsPage
