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

const shareSummary = {
    totalShares: 248,
    shareValue: 'ETB 40.00',
    totalShareValue: 'ETB 9,920.00',
}

const shareHistory = [
    { date: '2026-07-24', type: 'Purchase', quantity: 20, amount: 'ETB 800.00', status: 'Completed' },
    { date: '2026-07-10', type: 'Purchase', quantity: 15, amount: 'ETB 600.00', status: 'Completed' },
    { date: '2026-06-22', type: 'Transfer In', quantity: 8, amount: 'ETB 320.00', status: 'Processed' },
    { date: '2026-06-01', type: 'Bonus', quantity: 5, amount: 'ETB 200.00', status: 'Completed' },
]

const ManageMembersShares = () => {
    const [historyFilter, setHistoryFilter] = useState('all')

    const filteredHistory = useMemo(() => {
        if (historyFilter === 'all') return shareHistory
        return shareHistory.filter((item) => item.type.toLowerCase().includes(historyFilter))
    }, [historyFilter])

    return (
        <CRow className="g-4">
            <CCol xs={12}>
                <CRow className="g-4 mb-2">
                    <CCol md={4}>
                        <CCard className="border-0 shadow-sm h-100">
                            <CCardBody className="p-4">
                                <div className="small text-medium-emphasis mb-2">Total Shares Owned</div>
                                <div className="fs-4 fw-bold text-primary">{shareSummary.totalShares}</div>
                            </CCardBody>
                        </CCard>
                    </CCol>
                    <CCol md={4}>
                        <CCard className="border-0 shadow-sm h-100">
                            <CCardBody className="p-4">
                                <div className="small text-medium-emphasis mb-2">Share Value</div>
                                <div className="fs-4 fw-bold text-success">{shareSummary.shareValue}</div>
                            </CCardBody>
                        </CCard>
                    </CCol>
                    <CCol md={4}>
                        <CCard className="border-0 shadow-sm h-100">
                            <CCardBody className="p-4">
                                <div className="small text-medium-emphasis mb-2">Total Share Value</div>
                                <div className="fs-4 fw-bold text-info">{shareSummary.totalShareValue}</div>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CCol>

            <CCol lg={4}>
                <CCard className="border-0 shadow-sm h-100">
                    <CCardBody className="p-4">
                        <div className="fw-bold text-primary mb-3">Share Actions</div>
                        <div className="d-grid gap-2">
                            <CButton color="primary">Buy Shares</CButton>
                            <CButton color="secondary" variant="outline">Transfer Shares</CButton>
                        </div>
                    </CCardBody>
                </CCard>
            </CCol>

            <CCol lg={8}>
                <CCard className="border-0 shadow-sm h-100">
                    <CCardBody className="p-4">
                        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                            <div className="fw-bold text-primary">Share Purchase History</div>
                            <CFormSelect
                                value={historyFilter}
                                onChange={(e) => setHistoryFilter(e.target.value)}
                                style={{ maxWidth: '200px' }}
                            >
                                <option value="all">All types</option>
                                <option value="purchase">Purchase</option>
                                <option value="transfer">Transfer</option>
                                <option value="bonus">Bonus</option>
                            </CFormSelect>
                        </div>

                        <CTable hover responsive align="middle" className="mb-0">
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell>Date</CTableHeaderCell>
                                    <CTableHeaderCell>Type</CTableHeaderCell>
                                    <CTableHeaderCell>Shares</CTableHeaderCell>
                                    <CTableHeaderCell>Amount</CTableHeaderCell>
                                    <CTableHeaderCell>Status</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {filteredHistory.map((item) => (
                                    <CTableRow key={`${item.date}-${item.type}`}>
                                        <CTableDataCell>{item.date}</CTableDataCell>
                                        <CTableDataCell>{item.type}</CTableDataCell>
                                        <CTableDataCell>{item.quantity}</CTableDataCell>
                                        <CTableDataCell className="fw-semibold">{item.amount}</CTableDataCell>
                                        <CTableDataCell>
                                            <CBadge
                                                color={item.status === 'Completed' ? 'success' : 'info'}
                                                shape="rounded-pill"
                                            >
                                                {item.status}
                                            </CBadge>
                                        </CTableDataCell>
                                    </CTableRow>
                                ))}
                            </CTableBody>
                        </CTable>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default ManageMembersShares
