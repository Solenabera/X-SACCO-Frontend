import React from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CRow,
    CBadge,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow
} from '@coreui/react'

const savingsSummary = {
    currentBalance: 'ETB 25,000.00',
    targetPlan: 'Emergency Reserve',
    monthlyContribution: 'ETB 2,500.00',
}

const recentMovements = [
    { date: '2026-07-24', type: 'Deposit', amount: '+ ETB 5,000.00', status: 'Completed' },
    { date: '2026-07-18', type: 'Withdrawal', amount: '- ETB 1,200.00', status: 'Completed' },
    { date: '2026-07-12', type: 'Deposit', amount: '+ ETB 3,000.00', status: 'Completed' },
]

const savingsPlans = [
    { plan: 'Emergency Reserve', progress: '70%', amount: 'ETB 17,500.00' },
    { plan: 'Education Fund', progress: '45%', amount: 'ETB 6,800.00' },
]

const ManageMembersSavings = () => {
    return (
        <CRow className="g-4">
            <CCol lg={5}>
                <CCard className="border-0 shadow-sm h-100">
                    <CCardBody className="p-4">
                        <div className="small text-medium-emphasis mb-2">Current Balance</div>
                        <div className="fs-3 fw-bold text-primary mb-3">{savingsSummary.currentBalance}</div>
                        <div className="mb-2"><strong>Active Plan:</strong> {savingsSummary.targetPlan}</div>
                        <div className="mb-3"><strong>Monthly Contribution:</strong> {savingsSummary.monthlyContribution}</div>
                        <div className="d-flex gap-2 flex-wrap">
                            <CButton color="primary">Deposit</CButton>
                            <CButton color="secondary" variant="outline">Withdraw</CButton>
                        </div>
                    </CCardBody>
                </CCard>
            </CCol>

            <CCol lg={7}>
                <CCard className="border-0 shadow-sm h-100">
                    <CCardBody className="p-4">
                        <div className="fw-bold text-primary mb-3">Recent Deposits / Withdrawals</div>
                        <CTable hover responsive align="middle" className="mb-0">
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell>Date</CTableHeaderCell>
                                    <CTableHeaderCell>Type</CTableHeaderCell>
                                    <CTableHeaderCell>Amount</CTableHeaderCell>
                                    <CTableHeaderCell>Status</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {recentMovements.map((item) => (
                                    <CTableRow key={`${item.date}-${item.type}`}>
                                        <CTableDataCell>{item.date}</CTableDataCell>
                                        <CTableDataCell>{item.type}</CTableDataCell>
                                        <CTableDataCell className="fw-semibold">{item.amount}</CTableDataCell>
                                        <CTableDataCell>
                                            <CBadge color="success" shape="rounded-pill">{item.status}</CBadge>
                                        </CTableDataCell>
                                    </CTableRow>
                                ))}
                            </CTableBody>
                        </CTable>
                    </CCardBody>
                </CCard>
            </CCol>

            <CCol xs={12}>
                <CCard className="border-0 shadow-sm">
                    <CCardBody className="p-4">
                        <div className="fw-bold text-primary mb-3">Savings Plans</div>
                        <CRow className="g-3">
                            {savingsPlans.map((plan) => (
                                <CCol md={6} key={plan.plan}>
                                    <div className="rounded-4 p-3 border h-100" style={{ background: '#f7fbff', borderColor: '#dcecff' }}>
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <strong>{plan.plan}</strong>
                                            <span className="small text-secondary">{plan.progress}</span>
                                        </div>
                                        <div className="small text-secondary mb-2">Current value</div>
                                        <div className="fw-bold text-primary">{plan.amount}</div>
                                    </div>
                                </CCol>
                            ))}
                        </CRow>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default ManageMembersSavings
