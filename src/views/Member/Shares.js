import React, { useEffect, useMemo, useState } from 'react'
import {
    CCard,
    CCardBody,
    CCol,
    CFormSelect,
    CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilChartPie } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'

import useApiFetch from '../../hooks/useAPIFetch'
import PageHeader from '../../components/shared/PageHeader'
import HistoryTable from '../../components/shared/HistoryTable'

// Mock share transaction history — replace with API data when endpoint is ready
const shareHistory = [
    { id: 'SH-001', date: '2026-07-24', type: 'Purchase', quantity: 20, amount: 'ETB 800.00', status: 'Completed' },
    { id: 'SH-002', date: '2026-07-10', type: 'Purchase', quantity: 15, amount: 'ETB 600.00', status: 'Completed' },
    { id: 'SH-003', date: '2026-06-22', type: 'Transfer In', quantity: 8,  amount: 'ETB 320.00', status: 'Processed' },
    { id: 'SH-004', date: '2026-06-01', type: 'Bonus',    quantity: 5,  amount: 'ETB 200.00', status: 'Completed' },
]

const HISTORY_COLUMNS = [
    { key: 'date',     label: 'Date',    cellClass: 'text-nowrap' },
    { key: 'type',     label: 'Type' },
    { key: 'quantity', label: 'Shares' },
    { key: 'amount',   label: 'Amount',  isAmount: true },
    { key: 'status',   label: 'Status' },
]

const ManageMembersShares = () => {
    const navigate = useNavigate()

    const { data, isLoading } = useApiFetch(
        { url: 'member/share', method: 'GET' },
        true
    )

    const [totalShare, setTotalShare]           = useState(0)
    const [shareValue, setShareValue]           = useState(0)
    const [totalShareValue, setTotalShareValue] = useState(0)
    const [historyFilter, setHistoryFilter]     = useState('all')

    useEffect(() => {
        if (!isLoading && data) {
            const shareObj = data?.data?.share || data?.data
            const qty      = shareObj?.amount || 0
            const price    = shareObj?.shareValue?.shareValue || 1000
            setTotalShare(qty)
            setShareValue(price)
            setTotalShareValue(qty * price)
        }
    }, [isLoading, data])

    const filteredHistory = useMemo(() => {
        if (historyFilter === 'all') return shareHistory
        return shareHistory.filter((item) =>
            item.type.toLowerCase().includes(historyFilter)
        )
    }, [historyFilter])

    const statCards = [
        { label: 'Total Shares Owned', value: `${totalShare} ${totalShare === 1 ? 'Share' : 'Shares'}`, color: 'text-primary' },
        { label: 'Current Share Price', value: `ETB ${Number(shareValue).toLocaleString()}`, color: 'text-success' },
        { label: 'Total Share Value',   value: `ETB ${Number(totalShareValue).toLocaleString()}`, color: 'text-info' },
    ]

    return (
        <CRow className="g-4">
            <CCol xs={12}>
                <PageHeader
                    icon={<CIcon icon={cilChartPie} className="text-white" size="lg" />}
                    title="My Shares"
                    subtitle="View your share position and transaction history"
                    gradient="linear-gradient(135deg, #11a36a, #059669)"
                />
            </CCol>

            {/* Summary stats */}
            <CCol xs={12}>
                <CRow className="g-3">
                    {statCards.map((s) => (
                        <CCol md={4} key={s.label}>
                            <CCard className="border-0 shadow-sm h-100">
                                <CCardBody className="p-4">
                                    <div className="small text-medium-emphasis mb-2">{s.label}</div>
                                    <div className={`fs-4 fw-bold ${s.color}`}>
                                        {isLoading ? '—' : s.value}
                                    </div>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    ))}
                </CRow>
            </CCol>

            {/* CTA — payments handled on Make Payment page */}
            <CCol xs={12}>
                <div
                    className="rounded-4 p-3 d-flex align-items-center justify-content-between flex-wrap gap-2"
                    style={{ background: '#f0fdf4', border: '1.5px solid #bbf7d0' }}
                >
                    <div className="small text-success fw-semibold">
                        Want to purchase more shares or make a share deposit?
                    </div>
                    <button
                        className="btn btn-sm btn-success fw-semibold"
                        onClick={() => navigate('/my-payments')}
                    >
                        Go to Make Payment →
                    </button>
                </div>
            </CCol>

            {/* Share history */}
            <CCol xs={12}>
                <CCard className="border-0 shadow-sm">
                    <CCardBody className="p-4">
                        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                            <div className="fw-bold text-primary">Share Transaction History</div>
                            <CFormSelect
                                value={historyFilter}
                                onChange={(e) => setHistoryFilter(e.target.value)}
                                style={{ maxWidth: 200 }}
                            >
                                <option value="all">All types</option>
                                <option value="purchase">Purchase</option>
                                <option value="transfer">Transfer</option>
                                <option value="bonus">Bonus</option>
                            </CFormSelect>
                        </div>
                        <HistoryTable
                            columns={HISTORY_COLUMNS}
                            rows={filteredHistory}
                            rowKey="id"
                            emptyText="No share transactions match the selected filter."
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default ManageMembersShares