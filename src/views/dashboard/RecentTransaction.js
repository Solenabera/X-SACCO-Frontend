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
    CBadge,
    CSpinner,
} from '@coreui/react'

const STATUS_COLOR = {
    completed: 'success',
    approved: 'success',
    processed: 'info',
    pending: 'warning',
    rejected: 'danger',
    failed: 'danger',
};

const formatDate = (value) => {
    if (!value) return '—';
    const d = new Date(value);
    return isNaN(d) ? value : d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

const formatAmount = (amount) => {
    if (amount == null) return '—';
    return `ETB ${Number(amount).toLocaleString()}`;
};

const getStatusColor = (status) =>
    STATUS_COLOR[(status ?? '').toLowerCase()] ?? 'secondary';

const formatType = (type) => {
    if (!type) return '—';
    return type
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());
};

const RecentTransaction = ({ transactions = [], isLoading = false }) => {
    return (
        <CCard className="mb-4 border-0">
            <CCardBody className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="mb-0 fw-bold text-primary">Recent Transactions</h5>
                    <span className="small text-medium-emphasis">Last 10 transactions</span>
                </div>

                {isLoading ? (
                    <div className="d-flex justify-content-center py-5">
                        <CSpinner color="primary" />
                    </div>
                ) : transactions.length === 0 ? (
                    <div className="text-center text-medium-emphasis py-5">
                        No recent transactions found.
                    </div>
                ) : (
                    <CTable hover responsive align="middle" className="mb-0">
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell>Date</CTableHeaderCell>
                                <CTableHeaderCell>Type</CTableHeaderCell>
                                <CTableHeaderCell>Description</CTableHeaderCell>
                                <CTableHeaderCell>Amount</CTableHeaderCell>
                                <CTableHeaderCell>Status</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>

                        <CTableBody>
                            {transactions.map((t, index) => (
                                <CTableRow key={t.id ?? index}>
                                    <CTableDataCell className="text-nowrap">
                                        {formatDate(t.createdAt ?? t.date)}
                                    </CTableDataCell>
                                    <CTableDataCell className="text-nowrap">
                                        {formatType(t.type)}
                                    </CTableDataCell>
                                    <CTableDataCell className="text-medium-emphasis small">
                                        {t.description || '—'}
                                    </CTableDataCell>
                                    <CTableDataCell className="fw-semibold text-nowrap">
                                        {formatAmount(t.amount)}
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CBadge color={getStatusColor(t.status)} shape="rounded-pill">
                                            {t.status
                                                ? t.status.charAt(0).toUpperCase() + t.status.slice(1)
                                                : '—'}
                                        </CBadge>
                                    </CTableDataCell>
                                </CTableRow>
                            ))}
                        </CTableBody>
                    </CTable>
                )}
            </CCardBody>
        </CCard>
    )
}

export default RecentTransaction