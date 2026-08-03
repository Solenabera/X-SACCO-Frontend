import React from 'react'
import {
    CCard,
    CCardBody,
    CTable,
    CTableHead,
    CTableRow,
    CTableHeaderCell,
    CTableBody,
    CTableDataCell,
    CBadge
} from '@coreui/react'

const RecentTransaction = () => {
    return (
        <CCard className="mb-4 border-0">
            <CCardBody className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="mb-0 fw-bold text-primary">Recent Transactions</h5>
                    <span className="small text-medium-emphasis">Last 30 days</span>
                </div>

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
                        <CTableRow>
                            <CTableDataCell>24 Jul 2026</CTableDataCell>
                            <CTableDataCell>Savings Deposit</CTableDataCell>
                            <CTableDataCell className="fw-semibold">ETB 5,000</CTableDataCell>
                            <CTableDataCell>
                                <CBadge color="success" shape="rounded-pill">Completed</CBadge>
                            </CTableDataCell>
                        </CTableRow>

                        <CTableRow>
                            <CTableDataCell>23 Jul 2026</CTableDataCell>
                            <CTableDataCell>Loan Repayment</CTableDataCell>
                            <CTableDataCell className="fw-semibold">ETB 2,500</CTableDataCell>
                            <CTableDataCell>
                                <CBadge color="success" shape="rounded-pill">Completed</CBadge>
                            </CTableDataCell>
                        </CTableRow>

                        <CTableRow>
                            <CTableDataCell>22 Jul 2026</CTableDataCell>
                            <CTableDataCell>Shares Purchase</CTableDataCell>
                            <CTableDataCell className="fw-semibold">ETB 3,000</CTableDataCell>
                            <CTableDataCell>
                                <CBadge color="info" shape="rounded-pill">Processed</CBadge>
                            </CTableDataCell>
                        </CTableRow>

                        <CTableRow>
                            <CTableDataCell>21 Jul 2026</CTableDataCell>
                            <CTableDataCell>Loan Disbursement</CTableDataCell>
                            <CTableDataCell className="fw-semibold">ETB 15,000</CTableDataCell>
                            <CTableDataCell>
                                <CBadge color="warning" shape="rounded-pill">Pending</CBadge>
                            </CTableDataCell>
                        </CTableRow>
                    </CTableBody>
                </CTable>
            </CCardBody>
        </CCard>
    )
}

export default RecentTransaction