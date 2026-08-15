import React, { useState, useEffect, useCallback } from 'react'
import {
    CCard,
    CCardBody,
    CCol,
    CRow,
    CSpinner,
    CBadge,
    CButton,
    CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilWallet, cilChevronLeft, cilChevronRight } from '@coreui/icons'
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

const formatTypeLabel = (type) => {
    if (!type) return '—'
    return type
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
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
        render: (val) => <span className="small">{formatTypeLabel(val)}</span>,
    },
    {
        key: 'amount',
        label: 'Amount',
        render: (val, row) => {
            const isCredit = row.entryDirection === 'CREDIT';
            return (
                <span className={`fw-semibold small ${isCredit ? 'text-success' : 'text-danger'}`}>
                    {isCredit ? '+' : '-'} ETB {Number(val ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
            )
        },
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

const ManageMembersSavings = () => {
    const navigate = useNavigate()
    const [page, setPage] = useState(1)

    const { data, isLoading } = useApiFetch(
        { url: 'member/account', method: 'GET' },
        true
    )

    // Savings transactions (paginated, type-filtered)
    const { data: txData, isLoading: txLoading, errors: txErrors, fetchData: fetchTx } = useApiFetch(
        { url: `member/transaction?page=${page}&limit=${LIMIT}&type=SAVING_DEPOSIT,SAVING_WITHDRAWAL`, method: 'GET' },
        false
    )

    const loadPage = useCallback((p) => {
        fetchTx({ url: `member/transaction?page=${p}&limit=${LIMIT}&type=SAVING_DEPOSIT,SAVING_WITHDRAWAL` })
    }, [fetchTx]);

    useEffect(() => {
        loadPage(page)
    }, [page, loadPage])

    // Format currency helper
    const fmt = (v) => {
        if (v == null) return '—'
        return `ETB ${Number(v).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    }

    // Format account number helper (adding leading zeros or prefix)
    const formatAccNo = (no) => {
        if (no == null || no === '—') return '—'
        return `SAV-${String(no).padStart(7, '0')}`
    }

    // Derived values mapped from saving_account schema
    const accountDetails = {
        id: data?.data?.account?.id,
        accountNumber: data?.data?.account?.accountNumber ?? '—',
        balance: data?.data?.account?.balance ?? 0,
        lockedBalance: data?.data?.account?.lockedBalance ?? 0,
        workingBalance: data?.data?.account?.workingBalance ?? 0,
        monthlyContribution: data?.data?.account?.monthlyContribution ?? 0,
        interestCollected: data?.data?.account?.interestCollected ?? 0,
        status: data?.data?.account?.status ?? 'ACTIVE',
    }

    // Future-Proofing: List of savings products structured as an array
    const savingsAccounts = [
        {
            key: 'MANDATORY',
            name: 'Mandatory Savings',
            subtitle: 'SACCO Membership Account',
            description: 'Required monthly savings contribution to maintain active membership and borrow loans.',
            balance: accountDetails.balance,
            lockedBalance: accountDetails.lockedBalance,
            workingBalance: accountDetails.workingBalance,
            monthlyContribution: accountDetails.monthlyContribution,
            lastContributionDate: accountDetails.lastContributionDate,
            interestCollected: accountDetails.interestCollected,
            accountNumber: accountDetails.accountNumber,
            status: accountDetails.status,
            isActive: true,
            themeColor: '#0f4c81',
            badgeBg: '#e0f2fe',
            badgeText: '#0369a1',
        },
        {
            key: 'VOLUNTARY',
            name: 'Voluntary Savings',
            subtitle: 'Flexible Savings Account',
            description: 'Optional savings account allowing flexible deposits and withdrawals at any time.',
            balance: 0,
            lockedBalance: 0,
            workingBalance: 0,
            monthlyContribution: 0,
            interestCollected: 0,
            accountNumber: '—',
            status: 'INACTIVE',
            isActive: false, // Set to true to automatically render in the future
            themeColor: '#64748b',
            badgeBg: '#f1f5f9',
            badgeText: '#475569',
        }
    ]

    const transactions = txData?.data?.transactions ?? []
    const hasNext = transactions.length === LIMIT
    const hasPrev = page > 1

    return (
        <CRow className="g-4">
            <CCol xs={12}>
                <PageHeader
                    icon={<CIcon icon={cilWallet} className="text-white" size="lg" />}
                    title="My Savings"
                    subtitle="Manage your mandatory contributions and savings growth"
                    gradient="linear-gradient(135deg, #0f4c81, #1b6fb5)"
                />
            </CCol>

            {/* Render Active Savings Accounts */}
            {savingsAccounts.filter(acc => acc.isActive).map((acc) => (
                <CCol lg={6} key={acc.key}>
                    <CCard
                        className="border-0 shadow-sm h-100"
                        style={{
                            borderRadius: '16px',
                            overflow: 'hidden',
                            border: '1px solid #e2e8f0',
                            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.05)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        <CCardBody className="p-4 p-xl-5 d-flex flex-column justify-content-between">
                            <div>
                                {/* Card Header: Type, Status/Badge */}
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <div className="d-flex align-items-center gap-3">
                                        <div
                                            style={{
                                                width: 44, height: 44, borderRadius: '12px',
                                                background: `linear-gradient(135deg, ${acc.themeColor}, #1b6fb5)`,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                color: '#fff'
                                            }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v2A1.5 1.5 0 0 0 1.5 7h13A1.5 1.5 0 0 0 16 5.5v-2A1.5 1.5 0 0 0 14.5 2h-13zM1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-2zM1.5 8A1.5 1.5 0 0 0 0 9.5v3A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-3A1.5 1.5 0 0 0 14.5 8h-13zm0 1h13a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h6 className="fw-bold text-dark mb-0">{acc.name}</h6>
                                            <span className="text-secondary" style={{ fontSize: '0.75rem' }}>{acc.subtitle}</span>
                                        </div>
                                    </div>

                                    <div>
                                        <CBadge style={{ backgroundColor: acc.badgeBg, color: acc.badgeText }} className="px-2.5 py-1.5 rounded-pill fw-semibold">
                                            {acc.status === 'ACTIVE' ? 'Active' : acc.status}
                                        </CBadge>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-secondary my-3" style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>
                                    {acc.description}
                                </p>

                                {/* Balance Details */}
                                <div className="mb-4">
                                    <div className="small text-secondary mb-1">Total Savings Balance</div>
                                    <div className="d-flex align-items-baseline gap-2">
                                        <span className="fs-2 fw-bold text-dark" style={{ letterSpacing: '-1px' }}>
                                            {isLoading ? (
                                                <CSpinner size="sm" className="text-primary" />
                                            ) : (
                                                fmt(acc.balance)
                                            )}
                                        </span>
                                    </div>
                                    {acc.lockedBalance > 0 && (
                                        <div className="text-warning small d-flex align-items-center gap-1 mt-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                                            </svg>
                                            <span>{fmt(acc.lockedBalance)} locked / on hold</span>
                                        </div>
                                    )}
                                </div>

                                {/* Info Grid (Schema Data Mapping) */}
                                <div
                                    className="p-3 mb-4"
                                    style={{
                                        backgroundColor: '#f8fafc',
                                        borderRadius: '12px',
                                        border: '1px solid #e2e8f0',
                                        fontSize: '0.85rem'
                                    }}
                                >
                                    <CRow className="g-3">
                                        <CCol xs={6}>
                                            <div className="text-secondary small">Account Number</div>
                                            <div className="fw-semibold text-dark mt-0.5">{formatAccNo(acc.accountNumber)}</div>
                                        </CCol>
                                        <CCol xs={6}>
                                            <div className="text-secondary small">Available Balance</div>
                                            <div className="fw-semibold text-dark mt-0.5">
                                                {isLoading ? <CSpinner size="sm" style={{ width: '12px', height: '12px' }} /> : fmt(acc.workingBalance)}
                                            </div>
                                        </CCol>
                                        <CCol xs={6}>
                                            <div className="text-secondary small">Monthly Contribution</div>
                                            <div className="fw-semibold text-dark mt-0.5">
                                                {isLoading ? '—' : fmt(acc.monthlyContribution)}
                                            </div>
                                        </CCol>
                                        <CCol xs={6}>
                                            <div className="text-secondary small">Last Contribution Date</div>
                                            <div className="fw-semibold text-success mt-0.5">
                                                {isLoading ? <CSpinner size="sm" style={{ width: '12px', height: '12px' }} /> : fmt(acc.lastContributionDate)}
                                            </div>
                                        </CCol>
                                    </CRow>
                                </div>
                            </div>

                            {/* Call to Action buttons */}
                            <div className="d-flex gap-2 w-100">
                                <CButton
                                    color="primary"
                                    className="w-100 py-2.5 fw-semibold d-flex align-items-center justify-content-center gap-2"
                                    onClick={() => navigate('/make-payments')}
                                    style={{ borderRadius: '10px' }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                    </svg>
                                    Make a Deposit
                                </CButton>
                                <CButton
                                    variant="outline"
                                    color="secondary"
                                    className="w-100 py-2.5 fw-semibold d-flex align-items-center justify-content-center gap-2"
                                    onClick={() => navigate('/my-transactions')}
                                    style={{ borderRadius: '10px', border: '1px solid #cbd5e1', color: '#475569' }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z" />
                                        <path d="M8 4.4a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .223.418l2 1.3a.5.5 0 0 0 .554-.836L8.5 7.5V4.9a.5.5 0 0 0-.5-.5z" />
                                    </svg>
                                    View Full History
                                </CButton>
                            </div>
                        </CCardBody>
                    </CCard>
                </CCol>
            ))}

            {/* Savings Calculator & Growth Card */}
            <CCol lg={6}>
                <CCard
                    className="border-0 shadow-sm h-100 text-white"
                    style={{
                        borderRadius: '16px',
                        background: 'linear-gradient(135deg, #0f4c81, #1e3a8a)',
                        border: 'none',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    {/* Background decorative circle */}
                    <div
                        className="position-absolute"
                        style={{
                            right: '-10%', bottom: '-10%', width: '180px', height: '180px',
                            background: 'rgba(255, 255, 255, 0.05)', borderRadius: '50%',
                            zIndex: 1
                        }}
                    />

                    <CCardBody className="p-4 p-xl-5 d-flex flex-column justify-content-between" style={{ zIndex: 2 }}>
                        <div>
                            <div className="d-flex align-items-center gap-2 mb-3">
                                <div style={{ padding: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '8px' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h8zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4z" />
                                        <path d="M4 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-2zm1 .5v1h6V3H5zm.5 4.5a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm2 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm2 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm-4 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm2 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm2 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm-4 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm2 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm2 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z" />
                                    </svg>
                                </div>
                                <h6 className="fw-bold mb-0">Loan Eligibility</h6>
                            </div>

                            <h5 className="fw-bold mb-3">Borrowing Requirements</h5>

                            {/* Eligibility Rules Checklist */}
                            <div className="d-flex flex-column gap-2 mb-4">
                                <div className="d-flex align-items-start gap-2 small">
                                    <svg className="text-info flex-shrink-0 mt-1" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                                    </svg>
                                    <span className="text-light opacity-75">Borrow up to 4x your savings, capped at <strong>500,000 ETB</strong>.</span>
                                </div>
                                <div className="d-flex align-items-start gap-2 small">
                                    <svg className="text-info flex-shrink-0 mt-1" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                                    </svg>
                                    <span className="text-light opacity-75">Must be an active member for at least <strong>6 months</strong>.</span>
                                </div>
                                <div className="d-flex align-items-start gap-2 small">
                                    <svg className="text-info flex-shrink-0 mt-1" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                                    </svg>
                                    <span className="text-light opacity-75">Must have saved for <strong>3 consecutive months</strong> prior to applying.</span>
                                </div>
                            </div>
                        </div>

                        <div
                            className="p-3"
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.12)' }}
                        >
                            <div className="small text-light opacity-75">Your Estimated Borrowing Limit</div>
                            <div className="fs-3 fw-bold mt-1 text-white">
                                {isLoading ? (
                                    <CSpinner size="sm" className="text-light" />
                                ) : (
                                    // Math.min ensures the displayed value never exceeds 500,000
                                    fmt(Math.min(accountDetails.balance * 4, 500000))
                                )}
                            </div>
                            <div className="small text-light opacity-50 mt-1">
                                {accountDetails?.balance * 4 > 500000
                                    ? "Maximum limit reached"
                                    : "Based on 4x your current savings balance"}
                            </div>
                        </div>
                    </CCardBody>
                </CCard>
            </CCol>
            {/* Savings transaction history */}
            <CCol xs={12}>
                <CCard className="border-0 shadow-sm">
                    <CCardBody className="p-4 p-xl-5">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <div>
                                <h5 className="fw-bold text-dark mb-0">Savings Transaction History</h5>
                                <span className="text-secondary small">Page {page} · {LIMIT} records per page</span>
                            </div>
                        </div>

                        {/* Loading */}
                        {txLoading && (
                            <div className="text-center py-5">
                                <CSpinner color="primary" size="sm" className="me-2" />
                                <span className="small text-secondary">Loading transactions...</span>
                            </div>
                        )}

                        {/* Error */}
                        {!txLoading && txErrors?.isError && (
                            <CAlert color="warning" className="small">
                                {txErrors.message || 'Could not load savings transactions. Please try again.'}
                            </CAlert>
                        )}

                        {/* Empty */}
                        {!txLoading && !txErrors?.isError && transactions.length === 0 && (
                            <div className="text-center py-5 text-secondary small">
                                No savings transactions found{page > 1 ? ' on this page' : ''}.<br />
                                {page > 1 && (
                                    <CButton size="sm" color="primary" variant="outline" className="mt-2" onClick={() => setPage(1)}>
                                        Back to first page
                                    </CButton>
                                )}
                            </div>
                        )}

                        {/* Table */}
                        {!txLoading && !txErrors?.isError && transactions.length > 0 && (
                            <HistoryTable
                                columns={HISTORY_COLUMNS}
                                rows={transactions}
                                rowKey="id"
                                emptyText="No savings transactions found."
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
                                    style={{ borderRadius: '8px' }}
                                >
                                    <CIcon icon={cilChevronLeft} size="sm" /> Previous
                                </CButton>
                                <span className="small text-secondary fw-semibold">Page {page}</span>
                                <CButton
                                    color="outline-primary"
                                    size="sm"
                                    disabled={!hasNext}
                                    onClick={() => setPage((p) => p + 1)}
                                    className="d-flex align-items-center gap-1"
                                    style={{ borderRadius: '8px' }}
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

export default ManageMembersSavings
