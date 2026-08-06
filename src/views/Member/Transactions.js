import React, { useMemo, useState } from 'react'
import {
    CCard,
    CCardBody,
    CCol,
    CFormSelect,
    CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSwapHorizontal, cilCreditCard } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'

import PageHeader from '../../components/shared/PageHeader'
import HistoryTable from '../../components/shared/HistoryTable'

// All confirmed ledger entries across savings, shares, and loans
// Replace with API data: useApiFetch({ url: 'member/transactions', method: 'GET' }, true)
const allTransactions = [
    { id: 'TX-001', date: '2026-07-24', category: 'Savings',  type: 'Savings Deposit',    amount: '+ETB 5,000.00',  isCredit: true,  status: 'Completed' },
    { id: 'TX-002', date: '2026-07-23', category: 'Loan',     type: 'Loan Repayment',      amount: '-ETB 2,500.00',  isCredit: false, status: 'Completed' },
    { id: 'TX-003', date: '2026-07-22', category: 'Shares',   type: 'Share Purchase',      amount: '-ETB 3,000.00',  isCredit: false, status: 'Completed' },
    { id: 'TX-004', date: '2026-07-21', category: 'Loan',     type: 'Loan Disbursement',   amount: '+ETB 15,000.00', isCredit: true,  status: 'Completed' },
    { id: 'TX-005', date: '2026-07-18', category: 'Savings',  type: 'Savings Withdrawal',  amount: '-ETB 1,200.00',  isCredit: false, status: 'Completed' },
    { id: 'TX-006', date: '2026-07-12', category: 'Savings',  type: 'Savings Deposit',     amount: '+ETB 3,000.00',  isCredit: true,  status: 'Completed' },
    { id: 'TX-007', date: '2026-07-10', category: 'Shares',   type: 'Share Purchase',      amount: '-ETB 600.00',    isCredit: false, status: 'Completed' },
    { id: 'TX-008', date: '2026-06-28', category: 'Savings',  type: 'Savings Deposit',     amount: '+ETB 2,500.00',  isCredit: true,  status: 'Completed' },
]

const CATEGORY_ICONS = { Savings: '💰', Loan: '🏦', Shares: '📈' }

const COLUMNS = [
    { key: 'date',     label: 'Date',     cellClass: 'text-nowrap' },
    {
        key: 'category',
        label: 'Category',
        render: (val) => (
            <span className="small">
                {CATEGORY_ICONS[val] ?? ''} {val}
            </span>
        ),
    },
    { key: 'type',   label: 'Description' },
    {
        key: 'amount',
        label: 'Amount',
        render: (val, row) => (
            <span className={`fw-semibold small text-nowrap ${row.isCredit ? 'text-success' : 'text-danger'}`}>
                {val}
            </span>
        ),
    },
    { key: 'status', label: 'Status' },
]

const MONTHS = [
    { value: 'all',     label: 'All months' },
    { value: '2026-07', label: 'July 2026' },
    { value: '2026-06', label: 'June 2026' },
]

const ManageMembersTransactions = () => {
    const navigate = useNavigate()
    const [typeFilter, setTypeFilter] = useState('all')
    const [monthFilter, setMonthFilter] = useState('all')

    const filtered = useMemo(() => {
        return allTransactions.filter((tx) => {
            const matchType  = typeFilter === 'all' || tx.category.toLowerCase() === typeFilter
            const matchMonth = monthFilter === 'all' || tx.date.startsWith(monthFilter)
            return matchType && matchMonth
        })
    }, [typeFilter, monthFilter])

    // Summary stats
    const totalCredits = filtered.filter((t) => t.isCredit).reduce((s, t) => s + parseFloat(t.amount.replace(/[^0-9.]/g, '')), 0)
    const totalDebits  = filtered.filter((t) => !t.isCredit).reduce((s, t) => s + parseFloat(t.amount.replace(/[^0-9.]/g, '')), 0)
    const net          = totalCredits - totalDebits

    const statCards = [
        { label: 'Total Credits',  value: `+ETB ${totalCredits.toLocaleString()}`, color: '#059669', bg: '#d1fae5' },
        { label: 'Total Debits',   value: `-ETB ${totalDebits.toLocaleString()}`,  color: '#dc2626', bg: '#fee2e2' },
        { label: 'Net',            value: `${net >= 0 ? '+' : ''}ETB ${Math.abs(net).toLocaleString()}`, color: net >= 0 ? '#0f4c81' : '#dc2626', bg: '#eff6ff' },
    ]

    return (
        <CRow className="g-4">
            <CCol xs={12}>
                <PageHeader
                    icon={<CIcon icon={cilSwapHorizontal} className="text-white" size="lg" />}
                    title="My Transactions"
                    subtitle="A complete record of all confirmed ledger entries"
                    gradient="linear-gradient(135deg, #0f4c81, #4f46e5)"
                    actions={
                        <button
                            className="btn btn-sm btn-primary fw-semibold"
                            onClick={() => navigate('/my-payments')}
                        >
                            <CIcon icon={cilCreditCard} className="me-1" />
                            Make Payment
                        </button>
                    }
                />
            </CCol>

            {/* Stats bar */}
            <CCol xs={12}>
                <CRow className="g-3">
                    {statCards.map((s) => (
                        <CCol xs={4} key={s.label}>
                            <CCard className="border-0 shadow-sm">
                                <CCardBody className="p-3">
                                    <div className="small text-medium-emphasis mb-1">{s.label}</div>
                                    <div className="fw-bold" style={{ color: s.color }}>{s.value}</div>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    ))}
                </CRow>
            </CCol>

            {/* Filtered table */}
            <CCol xs={12}>
                <CCard className="border-0 shadow-sm">
                    <CCardBody className="p-4">
                        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                            <div className="fw-bold text-primary">Transaction History</div>
                            <div className="d-flex gap-2 flex-wrap">
                                <CFormSelect
                                    value={typeFilter}
                                    onChange={(e) => setTypeFilter(e.target.value)}
                                    style={{ minWidth: 140 }}
                                >
                                    <option value="all">All categories</option>
                                    <option value="savings">Savings</option>
                                    <option value="loan">Loan</option>
                                    <option value="shares">Shares</option>
                                </CFormSelect>
                                <CFormSelect
                                    value={monthFilter}
                                    onChange={(e) => setMonthFilter(e.target.value)}
                                    style={{ minWidth: 140 }}
                                >
                                    {MONTHS.map((m) => (
                                        <option key={m.value} value={m.value}>{m.label}</option>
                                    ))}
                                </CFormSelect>
                            </div>
                        </div>
                        <HistoryTable
                            columns={COLUMNS}
                            rows={filtered}
                            rowKey="id"
                            emptyText="No transactions match the selected filters."
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default ManageMembersTransactions
