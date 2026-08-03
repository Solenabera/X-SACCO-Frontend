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
        <CCard className="mb-4 shadow-sm border-0">
            <CCardBody>
                <h5 className="mb-3">Recent Transactions</h5>

                <CTable hover responsive align="middle">
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
                            <CTableDataCell>ETB 5,000</CTableDataCell>
                            <CTableDataCell>
                                <CBadge color="success">Completed</CBadge>
                            </CTableDataCell>
                        </CTableRow>

                        <CTableRow>
                            <CTableDataCell>23 Jul 2026</CTableDataCell>
                            <CTableDataCell>Loan Repayment</CTableDataCell>
                            <CTableDataCell>ETB 2,500</CTableDataCell>
                            <CTableDataCell>
                                <CBadge color="success">Completed</CBadge>
                            </CTableDataCell>
                        </CTableRow>

                        <CTableRow>
                            <CTableDataCell>22 Jul 2026</CTableDataCell>
                            <CTableDataCell>Shares Purchase</CTableDataCell>
                            <CTableDataCell>ETB 3,000</CTableDataCell>
                            <CTableDataCell>
                                <CBadge color="info">Processed</CBadge>
                            </CTableDataCell>
                        </CTableRow>

                        <CTableRow>
                            <CTableDataCell>21 Jul 2026</CTableDataCell>
                            <CTableDataCell>Loan Disbursement</CTableDataCell>
                            <CTableDataCell>ETB 15,000</CTableDataCell>
                            <CTableDataCell>
                                <CBadge color="warning">Pending</CBadge>
                            </CTableDataCell>
                        </CTableRow>
                    </CTableBody>
                </CTable>
            </CCardBody>
        </CCard>
    )
}

export default RecentTransaction