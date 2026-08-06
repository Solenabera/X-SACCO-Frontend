import React from 'react'
import {
    CTable,
    CTableHead,
    CTableBody,
    CTableRow,
    CTableHeaderCell,
    CTableDataCell,
} from '@coreui/react'
import StatusBadge from './StatusBadge'

/**
 * HistoryTable — generic, configurable table used across member pages.
 *
 * Props:
 *   columns   — Array<{ key: string, label: string, render?: (value, row) => JSX }>
 *   rows      — Array<object>   — data rows; each object must have keys matching column.key values
 *   rowKey    — string | ((row, i) => string)  — key prop for React list
 *   emptyText — string  — shown when rows is empty
 *   className — extra classes on CTable
 *
 * Built-in renderers (used when no custom render fn is provided):
 *   - If column.key === 'status', renders a <StatusBadge>
 *   - If column.isAmount, renders with fw-semibold
 */
const HistoryTable = ({
    columns,
    rows = [],
    rowKey,
    emptyText = 'No records to display.',
    className = '',
}) => {
    const getKey = (row, i) => {
        if (typeof rowKey === 'function') return rowKey(row, i)
        if (typeof rowKey === 'string') return row[rowKey]
        return i
    }

    return (
        <>
            <CTable hover responsive align="middle" className={`mb-0 ${className}`}>
                <CTableHead>
                    <CTableRow>
                        {columns.map((col) => (
                            <CTableHeaderCell key={col.key}>{col.label}</CTableHeaderCell>
                        ))}
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {rows.map((row, i) => (
                        <CTableRow key={getKey(row, i)}>
                            {columns.map((col) => {
                                const value = row[col.key]

                                if (col.render) {
                                    return (
                                        <CTableDataCell key={col.key} className={col.cellClass ?? ''}>
                                            {col.render(value, row)}
                                        </CTableDataCell>
                                    )
                                }

                                if (col.key === 'status') {
                                    return (
                                        <CTableDataCell key={col.key}>
                                            <StatusBadge status={value} />
                                        </CTableDataCell>
                                    )
                                }

                                return (
                                    <CTableDataCell
                                        key={col.key}
                                        className={`small ${col.isAmount ? 'fw-semibold text-nowrap' : ''} ${col.cellClass ?? ''}`}
                                    >
                                        {value ?? '—'}
                                    </CTableDataCell>
                                )
                            })}
                        </CTableRow>
                    ))}
                </CTableBody>
            </CTable>

            {rows.length === 0 && (
                <div className="text-center text-medium-emphasis small py-4">{emptyText}</div>
            )}
        </>
    )
}

export default HistoryTable
