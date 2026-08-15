import React, { useEffect, useState, useCallback } from 'react'
import {
    CCard,
    CCardBody,
    CCol,
    CRow,
    CSpinner,
    CAlert,
    CButton,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilChartPie, cilChevronLeft, cilChevronRight, cilCreditCard } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'

import useApiFetch from '../../hooks/useAPIFetch'
import PageHeader from '../../components/shared/PageHeader'
import HistoryTable from '../../components/shared/HistoryTable'
import StatusBadge from '../../components/shared/StatusBadge'

const LIMIT = 10

const formatDate = (dateStr) => {
    if (!dateStr) return '—'
    return new Date(dateStr).toISOString().split('T')[0]
}

const HISTORY_COLUMNS = [
    {
        key: 'date',
        label: 'Txn. Date',
        cellClass: 'text-nowrap',
        render: (val) => <span className="small">{formatDate(val)}</span>,
    },
    {
        key: 'type',
        label: 'Type',
        render: () => <span className="small">Share Purchase</span>,
    },
    {
        key: 'amount',
        label: 'Amount',
        render: (val) => (
            <span className="fw-semibold small text-success">
                ETB {Number(val ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
        ),
    },
    {
        key: 'description',
        label: 'Description',
        render: (val) => <span className="small text-medium-emphasis">{val || '—'}</span>,
    },
    {
        key: 'status',
        label: 'Status',
        render: (val) => <StatusBadge status={val} />,
    },
]

const ManageMembersShares = () => {
    const navigate = useNavigate()
    const [page, setPage] = useState(1)

    // Share portfolio data
    const { data: shareData, isLoading: shareLoading } = useApiFetch(
        { url: 'member/share', method: 'GET' },
        true
    )

    // Current share price
    const { data: priceData, isLoading: priceLoading } = useApiFetch(
        { url: '/share/share-price', method: 'GET' },
        true
    )

    // Share transactions (paginated, type-filtered)
    const { data: txData, isLoading: txLoading, errors: txErrors, fetchData: fetchTx } = useApiFetch(
        { url: `member/transaction?page=${page}&limit=${LIMIT}&type=SHARE_BUY`, method: 'GET' },
        false
    )

    const loadPage = useCallback((p) => {
        fetchTx({ url: `member/transaction?page=${p}&limit=${LIMIT}&type=SHARE_BUY` })
    }, [fetchTx])

    useEffect(() => {
        loadPage(page)
    }, [page]) // eslint-disable-line react-hooks/exhaustive-deps

    // Derive share portfolio values
    const shareObj = shareData?.data?.share || shareData?.data
    const totalShare = Number(shareObj?.amount || 0)
    const shareValue = Number(priceData?.data?.sharePrice?.price || 0)
    const totalShareValue = totalShare * shareValue

    const isStatsLoading = shareLoading || priceLoading

    const transactions = txData?.data?.transactions ?? []
    const hasNext = transactions.length === LIMIT
    const hasPrev = page > 1

    const statCards = [
        { label: 'Total Shares Owned', value: `${totalShare} ${totalShare === 1 ? 'Share' : 'Shares'}`, color: '#059669', accent: '#d1fae5' },
        { label: 'Current Share Price', value: `ETB ${shareValue.toLocaleString()}`, color: '#0f4c81', accent: '#eff6ff' },
        { label: 'Total Share Value', value: `ETB ${totalShareValue.toLocaleString()}`, color: '#7c3aed', accent: '#f3e8ff' },
    ]

    return (
        <CRow className="g-4">
            <CCol xs={12}>
                <PageHeader
                    icon={<CIcon icon={cilChartPie} className="text-white" size="lg" />}
                    title="My Shares"
                    subtitle="View your share position and purchase history"
                    gradient="linear-gradient(135deg, #0f4c81, #1b6fb5)"
                />
            </CCol>

            {/* Summary stats */}
            <CCol xs={12}>
                <CRow className="g-3">
                    {statCards.map((s) => (
                        <CCol md={4} key={s.label}>
                            <CCard className="border-0 shadow-sm h-100">
                                <CCardBody className="p-4" style={{ borderLeft: `4px solid ${s.color}` }}>
                                    <div className="small text-medium-emphasis mb-2">{s.label}</div>
                                    <div className="fs-4 fw-bold" style={{ color: s.color }}>
                                        {isStatsLoading ? <CSpinner size="sm" /> : s.value}
                                    </div>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    ))}
                </CRow>
            </CCol>

            {/* CTA */}
            <CCol xs={12}>
                <div
                    className="rounded-4 p-3 d-flex align-items-center justify-content-between flex-wrap gap-2"
                    style={{ background: '#f7fbff', border: '1.5px solid #dcecff' }}
                >
                    <div className="small fw-semibold text-primary">
                        Want to purchase more shares?
                    </div>
                    <button
                        className="btn btn-sm btn-primary fw-semibold"
                        onClick={() => navigate('/make-payments')}
                    >
                        <CIcon icon={cilCreditCard} className="me-1" />
                        Go to Make Payment →
                    </button>
                </div>
            </CCol>

            {/* Share purchase history */}
            <CCol xs={12}>
                <CCard className="border-0 shadow-sm">
                    <CCardBody className="p-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <div>
                                <div className="fw-bold text-primary">Share Purchase History</div>
                                <div className="small text-medium-emphasis">Page {page} · {LIMIT} per page</div>
                            </div>
                        </div>

                        {/* Loading */}
                        {txLoading && (
                            <div className="text-center py-5">
                                <CSpinner color="primary" size="sm" className="me-2" />
                                <span className="small text-medium-emphasis">Loading transactions...</span>
                            </div>
                        )}

                        {/* Error */}
                        {!txLoading && txErrors?.isError && (
                            <CAlert color="warning" className="small">
                                {txErrors.message || 'Could not load share transactions. Please try again.'}
                            </CAlert>
                        )}

                        {/* Empty */}
                        {!txLoading && !txErrors?.isError && transactions.length === 0 && (
                            <div className="text-center py-5 text-medium-emphasis small">
                                No share purchase transactions found{page > 1 ? ' on this page' : ''}.<br />
                                {page > 1 && (
                                    <button className="btn btn-sm btn-outline-primary mt-2" onClick={() => setPage(1)}>
                                        Back to first page
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Table */}
                        {!txLoading && !txErrors?.isError && transactions.length > 0 && (
                            <HistoryTable
                                columns={HISTORY_COLUMNS}
                                rows={transactions}
                                rowKey="id"
                                emptyText="No share transactions found."
                            />
                        )}

                        {/* Pagination */}
                        {!txLoading && !txErrors?.isError && (hasPrev || hasNext) && (
                            <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
                                <CButton
                                    color="outline-primary"
                                    size="sm"
                                    disabled={!hasPrev}
                                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                                    className="d-flex align-items-center gap-1"
                                >
                                    <CIcon icon={cilChevronLeft} size="sm" /> Previous
                                </CButton>
                                <span className="small text-medium-emphasis fw-semibold">Page {page}</span>
                                <CButton
                                    color="outline-primary"
                                    size="sm"
                                    disabled={!hasNext}
                                    onClick={() => setPage((p) => p + 1)}
                                    className="d-flex align-items-center gap-1"
                                >
                                    Next <CIcon icon={cilChevronRight} size="sm" />
                                </CButton>
                            </div>
                        )}
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default ManageMembersShares