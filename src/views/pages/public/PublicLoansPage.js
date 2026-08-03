import React from 'react'
import { CCol, CRow } from '@coreui/react'
import PublicPageTemplate from '../../../components/public/PublicPageTemplate'

const loanSteps = [
    'Submit a loan request through the secure member portal.',
    'Provide the required identification and supporting documentation.',
    'Meet eligibility requirements such as active membership and repayment capacity.',
    'Receive a decision and manage repayments through the system.',
]

const PublicLoansPage = () => {
    return (
        <PublicPageTemplate
            title="Loans"
            intro="Loans help members meet important personal and business goals with flexible support and transparent processes. The system guides members through request submission, eligibility review, and repayment management."
        >
            <CRow className="g-4">
                <CCol lg={6}>
                    <div className="rounded-4 p-4 border h-100" style={{ background: '#f7fbff', borderColor: '#dcecff' }}>
                        <h3 className="fw-bold mb-3" style={{ color: '#0f4c81' }}>How to request a loan</h3>
                        <ul className="mb-0 text-secondary">
                            {loanSteps.map((item) => (
                                <li key={item} className="mb-2">{item}</li>
                            ))}
                        </ul>
                    </div>
                </CCol>

                <CCol lg={6}>
                    <div className="rounded-4 p-4 border h-100" style={{ background: '#ffffff', borderColor: '#dcecff' }}>
                        <h3 className="fw-bold mb-3" style={{ color: '#0f4c81' }}>Eligibility and requirements</h3>
                        <p className="text-secondary mb-0">
                            Members are generally expected to maintain active membership, provide accurate identification details, show repayment ability, and complete any required loan application documentation. Clear cooperation and timely communication are essential throughout the process.
                        </p>
                    </div>
                </CCol>
            </CRow>
        </PublicPageTemplate>
    )
}

export default PublicLoansPage
