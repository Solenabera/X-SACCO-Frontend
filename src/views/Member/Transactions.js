import React, { useEffect, useState, useCallback } from 'react'
import {
    CCard,
    CCardBody,
    CCol,
    CFormSelect,
    CFormInput,
    CFormLabel,
    CRow,
    CSpinner,
    CAlert,
    CButton,
    CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSwapHorizontal, cilCreditCard, cilChevronLeft, cilChevronRight, cilFilterX } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'

import PageHeader from '../../components/shared/PageHeader'
import HistoryTable from '../../components/shared/HistoryTable'
import StatusBadge from '../../components/shared/StatusBadge'
import useApiFetch from '../../hooks/useAPIFetch'

// Maps DB enum values to human-readable labels
const formatType = (type) => {
    if (!type) return '—'

    return type
        .split('_') // Split the string into an array of words wherever there is an underscore
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter, lowercase the rest
        .join(' ') // Join the words back together with a space
}

const formatDate = (dateStr) => {
    if (!dateStr) return '—'
    return new Date(dateStr).toISOString().split('T')[0]
}

const formatAmount = (amount, direction) => {
    if (amount == null) return '—';

    // From the member's perspective:
    //   DB CREDIT = association received = member paid OUT → negative (-)
    //   DB DEBIT  = association paid     = member received → positive (+)
    const sign = direction === 'DEBIT' ? '+' : '-';

    const formattedNumber = Number(amount).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    return `${sign}ETB ${formattedNumber}`;
}

const isCredit = (direction) => direction === 'DEBIT' // member received money

const COLUMNS = [
    {
        key: 'date',
        label: 'Txn. Date',
        cellClass: 'text-nowrap',
        render: (_, row) => <span className="small">{formatDate(row.createdAt)}</span>,
    },
    {
        key: 'type',
        label: 'Transaction Type',
        render: (val) => <span className="small">{formatType(val)}</span>,
    },
    {
        key: 'amount',
        label: 'Amount',
        render: (val, row) => (
            <span className={`fw-semibold small text-nowrap ${isCredit(row.entryDirection) ? 'text-success' : 'text-danger'}`}>
                {formatAmount(val, row.entryDirection)}
            </span>
        ),
    },
    {
        key: 'interestDue',
        label: 'Interest Due',
        render: (val, row) => row.type === 'LOAN_REPAYMENT'
            ? <span className="small text-warning fw-semibold">ETB {Number(val ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            : <span className="small text-medium-emphasis">—</span>,
    },
    {
        key: 'interestReceived',
        label: 'Interest Received',
        render: (val, row) => row.type === 'LOAN_REPAYMENT'
            ? <span className="small text-info fw-semibold">ETB {Number(val ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            : <span className="small text-medium-emphasis">—</span>,
    },
    {
        key: 'principalReceived',
        label: 'Principal Received',
        render: (val, row) => row.type === 'LOAN_REPAYMENT'
            ? <span className="small text-primary fw-semibold">ETB {Number(val ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            : <span className="small text-medium-emphasis">—</span>,
    },
    {
        key: 'appliedPercentage',
        label: 'Interest Rate',
        render: (val, row) => row.type === 'LOAN_REPAYMENT'
            ? <span className="small fw-semibold">{val != null ? `${val}%` : '—'}</span>
            : <span className="small text-medium-emphasis">—</span>,
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

const LIMIT = 10

const EMPTY_FILTERS = { type: '', status: '', startDate: '', endDate: '' }

// Build query string from filter state (omits empty values)
const buildUrl = (page, filters) => {
    const params = new URLSearchParams({ page: String(page), limit: String(LIMIT) })
    if (filters.type) params.set('type', filters.type)
    if (filters.status) params.set('status', filters.status)
    if (filters.startDate) params.set('startDate', filters.startDate)
    if (filters.endDate) params.set('endDate', filters.endDate)
    return `member/transaction?${params.toString()}`
}

const activeFilterCount = (f) =>
    [f.type, f.status, f.startDate, f.endDate].filter(Boolean).length

const ManageMembersTransactions = () => {
    const navigate = useNavigate()
    const [page, setPage] = useState(1)
    const [filters, setFilters] = useState(EMPTY_FILTERS)
    const [applied, setApplied] = useState(EMPTY_FILTERS) // filters actually sent to API
    const [saccoTransactionTypes, setSaccoTransactionTypes] = useState([])

    const { data, isLoading, errors, fetchData } = useApiFetch(
        { url: buildUrl(1, EMPTY_FILTERS), method: 'GET' },
        false
    )

    const { data: saccoTransactionTypesData } = useApiFetch(
        { url: 'member/transaction/transaction-types', method: 'GET' },
        true
    )

    useEffect(() => {
        if (saccoTransactionTypesData?.status === 'success' && saccoTransactionTypesData?.data?.transactionTypes) {
            setSaccoTransactionTypes(saccoTransactionTypesData.data.transactionTypes)
        }
    }, [saccoTransactionTypesData])

    const load = useCallback((p, f) => {
        fetchData({ url: buildUrl(p, f) })
    }, [fetchData])

    // Load on mount
    useEffect(() => {
        load(1, EMPTY_FILTERS)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const handleApply = () => {
        setApplied(filters)
        setPage(1)
        load(1, filters)
    }

    const handleReset = () => {
        setFilters(EMPTY_FILTERS)
        setApplied(EMPTY_FILTERS)
        setPage(1)
        load(1, EMPTY_FILTERS)
    }

    const handlePageChange = (newPage) => {
        setPage(newPage)
        load(newPage, applied)
    }

    const set = (key) => (e) => setFilters((f) => ({ ...f, [key]: e.target.value }))

    const transactions = data?.data?.transactions ?? []
    const totals = data?.data?.totals ?? { totalCredit: 0, totalDebit: 0, net: 0 }
    const hasNext = transactions.length === LIMIT
    const hasPrev = page > 1

    const { totalCredit, totalDebit } = totals
    const memberNet = totalDebit - totalCredit

    const statCards = [
        { label: 'Total Received', value: `+ETB ${Number(totalDebit).toLocaleString(undefined, { minimumFractionDigits: 2 })}`, color: '#059669', bg: '#d1fae5' },
        { label: 'Total Paid', value: `-ETB ${Number(totalCredit).toLocaleString(undefined, { minimumFractionDigits: 2 })}`, color: '#dc2626', bg: '#fee2e2' },
        { label: 'Net', value: `${memberNet >= 0 ? '+' : ''}ETB ${Math.abs(memberNet).toLocaleString(undefined, { minimumFractionDigits: 2 })}`, color: memberNet >= 0 ? '#0f4c81' : '#dc2626', bg: '#eff6ff' },
    ]

    const filterCount = activeFilterCount(applied)

    return (
        <CRow className="g-4">
            <CCol xs={12}>
                <PageHeader
                    icon={<CIcon icon={cilSwapHorizontal} className="text-white" size="lg" />}
                    title="My Transactions"
                    subtitle="A complete record of all your ledger entries"
                    gradient="linear-gradient(135deg, #0f4c81, #1b6fb5)"
                    actions={
                        <button
                            className="btn btn-sm btn-primary fw-semibold"
                            onClick={() => navigate('/make-payments')}
                        >
                            <CIcon icon={cilCreditCard} className="me-1" />
                            Make Payment
                        </button>
                    }
                />
            </CCol>

            {/* Summary stats */}
            <CCol xs={12}>
                <CRow className="g-3">
                    {statCards.map((s) => (
                        <CCol xs={12} sm={4} key={s.label}>
                            <CCard className="border-0 shadow-sm h-100">
                                <CCardBody className="p-3" style={{ borderLeft: `4px solid ${s.color}`, borderRadius: '0.5rem' }}>
                                    <div className="small text-medium-emphasis mb-1">{s.label}</div>
                                    <div className="fw-bold" style={{ color: s.color }}>{s.value}</div>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    ))}
                </CRow>
            </CCol>

            {/* Filters */}
            <CCol xs={12}>
                <CCard className="border-0 shadow-sm">
                    <CCardBody className="p-4">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="fw-bold text-primary d-flex align-items-center gap-2">
                                Filters
                                {filterCount > 0 && (
                                    <CBadge color="primary" shape="rounded-pill">{filterCount} active</CBadge>
                                )}
                            </div>
                            {filterCount > 0 && (
                                <CButton
                                    color="outline-secondary"
                                    size="sm"
                                    onClick={handleReset}
                                    className="d-flex align-items-center gap-1"
                                >
                                    <CIcon icon={cilFilterX} size="sm" /> Clear all
                                </CButton>
                            )}
                        </div>

                        <CRow className="g-3 align-items-end">
                            {/* Type */}
                            <CCol xs={12} sm={6} md={3}>
                                <CFormLabel className="small fw-semibold mb-1">Transaction Type</CFormLabel>
                                <CFormSelect size="sm" value={filters.type} onChange={set('type')}>
                                    <option value="">All types</option>
                                    {saccoTransactionTypes.map((t) => (
                                        <option key={t.id} value={t.name}>
                                            {formatType(t.name)}
                                        </option>
                                    ))}
                                </CFormSelect>
                            </CCol>

                            {/* Status */}
                            <CCol xs={12} sm={6} md={3}>
                                <CFormLabel className="small fw-semibold mb-1">Status</CFormLabel>
                                <CFormSelect size="sm" value={filters.status} onChange={set('status')}>
                                    <option value="">All statuses</option>
                                    <option value="PENDING">Pending</option>
                                    <option value="APPROVED">Approved</option>
                                    <option value="REJECTED">Rejected</option>
                                    <option value="REVERSED">Reversed</option>
                                </CFormSelect>
                            </CCol>

                            {/* Start Date */}
                            <CCol xs={12} sm={6} md={2}>
                                <CFormLabel className="small fw-semibold mb-1">From Date</CFormLabel>
                                <CFormInput
                                    type="date"
                                    size="sm"
                                    value={filters.startDate}
                                    onChange={set('startDate')}
                                    max={filters.endDate || undefined}
                                />
                            </CCol>

                            {/* End Date */}
                            <CCol xs={12} sm={6} md={2}>
                                <CFormLabel className="small fw-semibold mb-1">To Date</CFormLabel>
                                <CFormInput
                                    type="date"
                                    size="sm"
                                    value={filters.endDate}
                                    onChange={set('endDate')}
                                    min={filters.startDate || undefined}
                                />
                            </CCol>

                            {/* Apply button */}
                            <CCol xs={12} md={2}>
                                <CButton
                                    color="primary"
                                    size="sm"
                                    className="w-100 fw-semibold"
                                    onClick={handleApply}
                                >
                                    Apply Filters
                                </CButton>
                            </CCol>
                        </CRow>
                    </CCardBody>
                </CCard>
            </CCol>

            {/* Transaction table */}
            <CCol xs={12}>
                <CCard className="border-0 shadow-sm">
                    <CCardBody className="p-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <div>
                                <div className="fw-bold text-primary">Transaction History</div>
                                <div className="small text-medium-emphasis">
                                    Page {page} · {LIMIT} per page
                                    {filterCount > 0 && <span className="ms-1 text-primary">· {filterCount} filter{filterCount > 1 ? 's' : ''} applied</span>}
                                </div>
                            </div>
                        </div>

                        {/* Loading */}
                        {isLoading && (
                            <div className="text-center py-5">
                                <CSpinner color="primary" size="sm" className="me-2" />
                                <span className="small text-medium-emphasis">Loading transactions...</span>
                            </div>
                        )}

                        {/* Error */}
                        {!isLoading && errors?.isError && (
                            <CAlert color="warning" className="small">
                                {errors.message || 'Could not load transactions. Please try again.'}
                            </CAlert>
                        )}

                        {/* Empty */}
                        {!isLoading && !errors?.isError && transactions.length === 0 && (
                            <div className="text-center py-5 text-medium-emphasis small">
                                No transactions found{filterCount > 0 ? ' matching your filters' : page > 1 ? ' on this page' : ''}.<br />
                                {filterCount > 0
                                    ? <button className="btn btn-sm btn-outline-primary mt-2" onClick={handleReset}>Clear filters</button>
                                    : page > 1 && <button className="btn btn-sm btn-outline-primary mt-2" onClick={() => handlePageChange(1)}>Back to first page</button>
                                }
                            </div>
                        )}

                        {/* Table */}
                        {!isLoading && !errors?.isError && transactions.length > 0 && (
                            <HistoryTable
                                columns={COLUMNS}
                                rows={transactions}
                                rowKey="id"
                                emptyText="No transactions found."
                            />
                        )}

                        {/* Pagination */}
                        {!isLoading && !errors?.isError && (hasPrev || hasNext) && (
                            <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
                                <CButton
                                    color="outline-primary"
                                    size="sm"
                                    disabled={!hasPrev}
                                    onClick={() => handlePageChange(Math.max(1, page - 1))}
                                    className="d-flex align-items-center gap-1"
                                >
                                    <CIcon icon={cilChevronLeft} size="sm" /> Previous
                                </CButton>
                                <span className="small text-medium-emphasis fw-semibold">Page {page}</span>
                                <CButton
                                    color="outline-primary"
                                    size="sm"
                                    disabled={!hasNext}
                                    onClick={() => handlePageChange(page + 1)}
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

export default ManageMembersTransactions
