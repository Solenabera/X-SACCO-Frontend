import React, { useMemo, useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CFormSelect,
    CRow,
    CBadge,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow
} from '@coreui/react'

const transactionData = [
    { date: '2026-07-24', type: 'Savings Deposit', amount: '+ ETB 5,000.00', status: 'Completed' },
    { date: '2026-07-23', type: 'Loan Repayment', amount: '- ETB 2,500.00', status: 'Completed' },
    { date: '2026-07-22', type: 'Shares Purchase', amount: '- ETB 3,000.00', status: 'Processed' },
    { date: '2026-07-21', type: 'Loan Disbursement', amount: '+ ETB 15,000.00', status: 'Pending' },
]

const ManageMembersTransactions = () => {
    const [typeFilter, setTypeFilter] = useState('all')
    const [dateFilter, setDateFilter] = useState('all')

    const filteredTransactions = useMemo(() => {
        return transactionData.filter((transaction) => {
            const matchesType = typeFilter === 'all' || transaction.type.toLowerCase().includes(typeFilter)
            const matchesDate = dateFilter === 'all' || transaction.date.startsWith(dateFilter)
            return matchesType && matchesDate
        })
    }, [typeFilter, dateFilter])

    return (
        <CRow className="g-4">
            <CCol xs={12}>
                <CCard className="border-0 shadow-sm">
                    <CCardBody className="p-4">
                        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                            <div className="fw-bold text-primary">Transaction History</div>
                            <div className="d-flex gap-2 flex-wrap">
                                <CFormSelect
                                    value={typeFilter}
                                    onChange={(e) => setTypeFilter(e.target.value)}
                                    style={{ minWidth: '160px' }}
                                >
                                    <option value="all">All types</option>
                                    <option value="savings">Savings</option>
                                    <option value="loan">Loan</option>
                                    <option value="shares">Shares</option>
                                </CFormSelect>
                                <CFormSelect
                                    value={dateFilter}
                                    onChange={(e) => setDateFilter(e.target.value)}
                                    style={{ minWidth: '160px' }}
                                >
                                    <option value="all">All dates</option>
                                    <option value="2026-07">July 2026</option>
                                    <option value="2026-06">June 2026</option>
                                </CFormSelect>
                            </div>
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
                                {filteredTransactions.map((item) => (
                                    <CTableRow key={`${item.date}-${item.type}`}>
                                        <CTableDataCell>{item.date}</CTableDataCell>
                                        <CTableDataCell>{item.type}</CTableDataCell>
                                        <CTableDataCell className="fw-semibold">{item.amount}</CTableDataCell>
                                        <CTableDataCell>
                                            <CBadge
                                                color={item.status === 'Completed' ? 'success' : item.status === 'Pending' ? 'warning' : 'info'}
                                                shape="rounded-pill"
                                            >
                                                {item.status}
                                            </CBadge>
                                        </CTableDataCell>
                                    </CTableRow>
                                ))}
                            </CTableBody>
                        </CTable>

                        {filteredTransactions.length === 0 && (
                            <div className="text-center text-secondary py-4">No transactions match the selected filters.</div>
                        )}
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default ManageMembersTransactions
