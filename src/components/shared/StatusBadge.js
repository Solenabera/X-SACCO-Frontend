import React from 'react'
import { CBadge } from '@coreui/react'

/**
 * Centralised status → badge-color mapping.
 * Add new statuses here; all pages pick up the change automatically.
 */
const STATUS_COLORS = {
    // Generic positive
    Completed:  'success',
    Approved:   'success',
    Active:     'success',
    Joined:     'success',
    Processed:  'info',

    // In-progress / neutral
    Pending:    'warning',
    Scheduled:  'info',
    'Under Review': 'warning',
    'Pending Appraisal': 'warning',

    // Negative
    Rejected:   'danger',
    Expired:    'secondary',
    Failed:     'danger',
    Overdue:    'danger',

    // Fallback
    default:    'secondary',
}

/**
 * StatusBadge — renders a CoreUI CBadge with the correct color for a given status string.
 * Props:
 *   status   — string
 *   shape    — 'rounded-pill' (default) | 'rounded'
 *   className — extra classes
 */
const StatusBadge = ({ status, shape = 'rounded-pill', className = '' }) => {
    const color = STATUS_COLORS[status] ?? STATUS_COLORS.default
    return (
        <CBadge color={color} shape={shape} className={className}>
            {status}
        </CBadge>
    )
}

export default StatusBadge
