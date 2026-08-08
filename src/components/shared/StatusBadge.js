import React from 'react'
import { CBadge } from '@coreui/react'

const STATUS_CONFIG = {
    // ── DB enum values (UPPER_CASE) ──────────────────────────────
    PENDING: { color: 'warning', label: 'Pending' },
    PAID: { color: 'success', label: 'Paid' },
    REVERSED: { color: 'danger', label: 'Reversed' },
    APPROVED: { color: 'success', label: 'Approved' },
    REJECTED: { color: 'danger', label: 'Rejected' },
    ACTIVE: { color: 'success', label: 'Active' },
    PROCESSING: { color: 'info', label: 'Processing' },
    FAILED: { color: 'danger', label: 'Failed' },
    EXPIRED: { color: 'secondary', label: 'Expired' },
    OVERDUE: { color: 'danger', label: 'Overdue' },

    // ── Title Case values (legacy / UI-generated) ────────────────
    Completed: { color: 'success', label: 'Completed' },
    Approved: { color: 'success', label: 'Approved' },
    Active: { color: 'success', label: 'Active' },
    Joined: { color: 'success', label: 'Joined' },
    Processed: { color: 'info', label: 'Processed' },
    Pending: { color: 'warning', label: 'Pending' },
    Scheduled: { color: 'info', label: 'Scheduled' },
    'Under Review': { color: 'warning', label: 'Under Review' },
    'Pending Appraisal': { color: 'warning', label: 'Pending Appraisal' },
    Rejected: { color: 'danger', label: 'Rejected' },
    Expired: { color: 'secondary', label: 'Expired' },
    Failed: { color: 'danger', label: 'Failed' },
    Overdue: { color: 'danger', label: 'Overdue' },
}

const FALLBACK = { color: 'secondary', label: '—' }

const StatusBadge = ({ status, shape = 'rounded-pill', className = '' }) => {
    const { color, label } = STATUS_CONFIG[status] ?? FALLBACK
    return (
        <CBadge color={color} shape={shape} className={className}>
            {label}
        </CBadge>
    )
}

export default StatusBadge
