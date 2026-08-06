import React, { useEffect } from 'react'
import {
    CCard,
    CCardBody,
    CCol,
    CRow,
    CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilWallet } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'

import useApiFetch from '../../hooks/useAPIFetch'
import PageHeader from '../../components/shared/PageHeader'

// Savings plans — static until API endpoint is available
const savingsPlans = [
    { plan: 'Emergency Reserve', progress: 70,  saved: 'ETB 17,500.00', target: 'ETB 25,000.00' },
    { plan: 'Education Fund',    progress: 45,  saved: 'ETB 6,800.00',  target: 'ETB 15,000.00' },
]

const ManageMembersSavings = () => {
    const navigate = useNavigate()

    const { data, isLoading } = useApiFetch(
        { url: 'member/account', method: 'GET' },
        true
    )

    // Derived values
    const balance             = isLoading ? null : (data?.data?.account?.balance ?? data?.data?.balance ?? null)
    const monthlyContribution = isLoading ? null : (data?.data?.account?.monthlyContribution ?? 'ETB 2,500.00')
    const activePlan          = isLoading ? null : (data?.data?.account?.plan ?? 'Emergency Reserve')

    const fmt = (v) => (v == null ? '—' : typeof v === 'number' ? `ETB ${Number(v).toLocaleString()}` : v)

    return (
        <CRow className="g-4">
            <CCol xs={12}>
                <PageHeader
                    icon={<CIcon icon={cilWallet} className="text-white" size="lg" />}
                    title="My Savings"
                    subtitle="View your savings balance and active plans"
                    gradient="linear-gradient(135deg, #0f4c81, #1b6fb5)"
                />
            </CCol>

            {/* Balance card + quick info */}
            <CCol lg={5}>
                <CCard className="border-0 shadow-sm h-100">
                    <CCardBody className="p-4 d-flex flex-column justify-content-between">
                        <div>
                            <div className="small text-medium-emphasis mb-1">Current Balance</div>
                            <div className="fs-2 fw-bold text-primary mb-4">
                                {isLoading
                                    ? <CSpinner size="sm" />
                                    : fmt(balance)
                                }
                            </div>

                            <div className="d-flex flex-column gap-3">
                                <div className="d-flex justify-content-between small">
                                    <span className="text-medium-emphasis">Active Plan</span>
                                    <span className="fw-semibold">{isLoading ? '—' : activePlan}</span>
                                </div>
                                <div className="d-flex justify-content-between small">
                                    <span className="text-medium-emphasis">Monthly Contribution</span>
                                    <span className="fw-semibold">{isLoading ? '—' : fmt(monthlyContribution)}</span>
                                </div>
                            </div>
                        </div>

                        {/* CTA — payments handled on Make Payment */}
                        <div
                            className="mt-4 rounded-4 p-3"
                            style={{ background: '#eff6ff', border: '1.5px solid #bfdbfe' }}
                        >
                            <div className="small text-primary fw-semibold mb-2">
                                Make a deposit or withdrawal
                            </div>
                            <div className="small text-medium-emphasis mb-3">
                                Upload your bank receipt on the Make Payment page — our team will confirm and credit your account.
                            </div>
                            <button
                                className="btn btn-sm btn-primary fw-semibold"
                                onClick={() => navigate('/my-payments')}
                            >
                                Go to Make Payment →
                            </button>
                        </div>
                    </CCardBody>
                </CCard>
            </CCol>

            {/* Savings plans */}
            <CCol lg={7}>
                <CCard className="border-0 shadow-sm h-100">
                    <CCardBody className="p-4">
                        <div className="fw-bold text-primary mb-4">Savings Plans</div>
                        <div className="d-flex flex-column gap-4">
                            {savingsPlans.map((plan) => (
                                <div key={plan.plan}>
                                    <div className="d-flex justify-content-between align-items-end mb-1">
                                        <span className="fw-semibold small">{plan.plan}</span>
                                        <span className="small text-medium-emphasis">{plan.progress}%</span>
                                    </div>
                                    {/* Progress bar */}
                                    <div
                                        className="rounded-pill mb-2"
                                        style={{ height: 8, background: '#e2e8f0' }}
                                    >
                                        <div
                                            className="rounded-pill"
                                            style={{
                                                height: 8,
                                                width: `${plan.progress}%`,
                                                background: 'linear-gradient(90deg, #0f4c81, #1b6fb5)',
                                                transition: 'width 0.6s ease',
                                            }}
                                        />
                                    </div>
                                    <div className="d-flex justify-content-between small text-medium-emphasis">
                                        <span>Saved: <strong className="text-primary">{plan.saved}</strong></span>
                                        <span>Target: {plan.target}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CCardBody>
                </CCard>
            </CCol>

            {/* Info strip — point to My Transactions for history */}
            <CCol xs={12}>
                <div
                    className="rounded-4 p-3 d-flex align-items-center justify-content-between flex-wrap gap-2"
                    style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0' }}
                >
                    <div className="small text-medium-emphasis">
                        Looking for your deposit and withdrawal history?
                    </div>
                    <button
                        className="btn btn-sm btn-outline-secondary fw-semibold"
                        onClick={() => navigate('/my-transactions')}
                    >
                        View My Transactions →
                    </button>
                </div>
            </CCol>
        </CRow>
    )
}

export default ManageMembersSavings
