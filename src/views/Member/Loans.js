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

const activeLoans = [
    {
        type: 'Business Expansion Loan',
        balance: 'ETB 18,500.00',
        dueDate: '2026-08-14',
        interest: '12% annual',
        status: 'Active',
    },
    {
        type: 'Emergency Support Loan',
        balance: 'ETB 6,200.00',
        dueDate: '2026-08-30',
        interest: '10% annual',
        status: 'Active',
    },
]

const repaymentSchedule = [
    { date: '2026-08-05', amount: 'ETB 1,500.00', status: 'Pending' },
    { date: '2026-08-20', amount: 'ETB 1,500.00', status: 'Scheduled' },
    { date: '2026-09-05', amount: 'ETB 1,500.00', status: 'Scheduled' },
]

const ManageMembersLoans = () => {
    return (
        <CRow className="g-4">
            <CCol xs={12}>
                <CCard className="border-0 shadow-sm">
                    <CCardBody className="p-4">
                        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                            <div className="fw-bold text-primary">Active Loans</div>
                            <div className="d-flex gap-2">
                                <CButton color="primary">Apply for Loan</CButton>
                                <CButton color="secondary" variant="outline">Make Repayment</CButton>
                            </div>
                        </div>

                        <CRow className="g-3">
                            {activeLoans.map((loan) => (
                                <CCol md={6} key={loan.type}>
                                    <div className="rounded-4 p-3 border h-100" style={{ background: '#f7fbff', borderColor: '#dcecff' }}>
                                        <div className="fw-bold text-primary mb-2">{loan.type}</div>
                                        <div className="small text-secondary mb-2">Outstanding balance</div>
                                        <div className="fs-5 fw-bold mb-2">{loan.balance}</div>
                                        <div className="small mb-1"><strong>Due date:</strong> {loan.dueDate}</div>
                                        <div className="small mb-1"><strong>Interest:</strong> {loan.interest}</div>
                                        <CBadge color="success" shape="rounded-pill">{loan.status}</CBadge>
                                    </div>
                                </CCol>
                            ))}
                        </CRow>
                    </CCardBody>
                </CCard>
            </CCol>

            <CCol lg={6}>
                <CCard className="border-0 shadow-sm h-100">
                    <CCardBody className="p-4">
                        <div className="fw-bold text-primary mb-3">Repayment Schedule</div>
                        <CTable hover responsive align="middle" className="mb-0">
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell>Date</CTableHeaderCell>
                                    <CTableHeaderCell>Amount</CTableHeaderCell>
                                    <CTableHeaderCell>Status</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {repaymentSchedule.map((item) => (
                                    <CTableRow key={`${item.date}-${item.amount}`}>
                                        <CTableDataCell>{item.date}</CTableDataCell>
                                        <CTableDataCell className="fw-semibold">{item.amount}</CTableDataCell>
                                        <CTableDataCell>
                                            <CBadge color={item.status === 'Pending' ? 'warning' : 'info'} shape="rounded-pill">{item.status}</CBadge>
                                        </CTableDataCell>
                                    </CTableRow>
                                ))}
                            </CTableBody>
                        </CTable>
                    </CCardBody>
                </CCard>
            </CCol>

            <CCol lg={6}>
                <CCard className="border-0 shadow-sm h-100">
                    <CCardBody className="p-4">
                        <div className="fw-bold text-primary mb-3">Loan Information</div>
                        <p className="text-secondary mb-3">
                            Repayments are applied automatically according to the approved schedule. Members can also request a top-up or a new loan application when eligibility is met.
                        </p>
                        <div className="rounded-4 p-3 border" style={{ background: '#f7fbff', borderColor: '#dcecff' }}>
                            <div className="small text-secondary mb-1">Interest Summary</div>
                            <div className="fw-bold">12% annual on the business loan</div>
                        </div>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default ManageMembersLoans
