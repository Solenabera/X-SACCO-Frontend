import React from 'react'

/**
 * PageHeader — consistent page-top section used across all member pages.
 * Props:
 *   icon       — CIcon element
 *   title      — string
 *   subtitle   — string
 *   gradient   — CSS gradient string (default: indigo-violet)
 *   actions    — optional JSX (buttons placed on the right)
 */
const PageHeader = ({
    icon,
    title,
    subtitle,
    gradient = 'linear-gradient(135deg, #4f46e5, #7c3aed)',
    actions,
}) => (
    <div className="d-flex align-items-center justify-content-between gap-3 mb-1 flex-wrap">
        <div className="d-flex align-items-center gap-3">
            <div
                style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                }}
            >
                {icon}
            </div>
            <div>
                <div className="fw-bold fs-5 lh-sm">{title}</div>
                {subtitle && (
                    <div className="small text-medium-emphasis">{subtitle}</div>
                )}
            </div>
        </div>
        {actions && <div className="d-flex gap-2 flex-wrap">{actions}</div>}
    </div>
)

export default PageHeader
