import React, { useState, useRef } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CRow,
    CBadge,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CFormLabel,
    CFormInput,
    CSpinner,
    CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
    cilPeople,
    cilCheckCircle,
    cilCopy,
    cilEnvelopeClosed,
    cilSend,
} from '@coreui/icons'

const mockInvitations = [
    { id: 1, name: 'Abebe Girma', contact: 'abebe.girma@email.com', date: '2026-07-20', status: 'Joined' },
    { id: 2, name: 'Tigist Haile', contact: '+251 911 223 344', date: '2026-07-22', status: 'Pending' },
    { id: 3, name: 'Dawit Kebede', contact: 'dawit.k@email.com', date: '2026-07-25', status: 'Pending' },
    { id: 4, name: 'Meron Tadesse', contact: '+251 922 445 566', date: '2026-07-10', status: 'Expired' },
    { id: 5, name: 'Yonas Bekele', contact: 'yonas.b@email.com', date: '2026-06-30', status: 'Joined' },
]

const statusColor = { Joined: 'success', Pending: 'warning', Expired: 'secondary' }

const REFERRAL_CODE = 'SACCO-M-7842'

const Invitations = () => {
    const [name, setName] = useState('')
    const [contact, setContact] = useState('')
    const [sending, setSending] = useState(false)
    const [sent, setSent] = useState(false)
    const [error, setError] = useState('')
    const [copied, setCopied] = useState(false)
    const [invitations, setInvitations] = useState(mockInvitations)

    const totalInvited = invitations.length
    const totalJoined = invitations.filter((i) => i.status === 'Joined').length
    const totalPending = invitations.filter((i) => i.status === 'Pending').length

    const handleCopy = () => {
        navigator.clipboard.writeText(`Join our SACCO using referral code: ${REFERRAL_CODE}`)
        setCopied(true)
        setTimeout(() => setCopied(false), 2500)
    }

    const handleInvite = (e) => {
        e.preventDefault()
        if (!name.trim()) return setError('Please enter the invitee\'s name.')
        if (!contact.trim()) return setError('Please enter a phone number or email.')
        setError('')
        setSending(true)
        setTimeout(() => {
            const today = new Date().toISOString().split('T')[0]
            setInvitations((prev) => [
                { id: prev.length + 1, name: name.trim(), contact: contact.trim(), date: today, status: 'Pending' },
                ...prev,
            ])
            setSending(false)
            setSent(true)
            setName('')
            setContact('')
            setTimeout(() => setSent(false), 3500)
        }, 1800)
    }

    return (
        <CRow className="g-4">
            {/* Page header */}
            <CCol xs={12}>
                <div className="d-flex align-items-center gap-3 mb-1">
                    <div
                        style={{
                            width: 48, height: 48, borderRadius: 14,
                            background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}
                    >
                        <CIcon icon={cilPeople} className="text-white" size="lg" />
                    </div>
                    <div>
                        <div className="fw-bold fs-5">Invitations</div>
                        <div className="small text-medium-emphasis">Invite new members and track your referrals</div>
                    </div>
                </div>
            </CCol>

            {/* Stats */}
            <CCol xs={12}>
                <CRow className="g-3">
                    {[
                        { label: 'Total Invited', value: totalInvited, color: '#4f46e5', bg: '#ede9fe' },
                        { label: 'Joined', value: totalJoined, color: '#059669', bg: '#d1fae5' },
                        { label: 'Pending', value: totalPending, color: '#d97706', bg: '#fef3c7' },
                    ].map((stat) => (
                        <CCol xs={4} key={stat.label}>
                            <CCard className="border-0 shadow-sm text-center">
                                <CCardBody className="p-3">
                                    <div
                                        className="fs-3 fw-bold mb-1"
                                        style={{ color: stat.color }}
                                    >
                                        {stat.value}
                                    </div>
                                    <div className="small text-medium-emphasis">{stat.label}</div>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    ))}
                </CRow>
            </CCol>

            {/* Invite form + referral code */}
            <CCol lg={5}>
                <CCard className="border-0 shadow-sm mb-3">
                    <CCardBody className="p-4">
                        <div className="fw-bold text-primary mb-3">Send an Invitation</div>

                        {error && <CAlert color="danger" className="py-2 small">{error}</CAlert>}
                        {sent && (
                            <CAlert color="success" className="py-2 small d-flex align-items-center gap-2">
                                <CIcon icon={cilCheckCircle} />
                                Invitation sent successfully!
                            </CAlert>
                        )}

                        <form onSubmit={handleInvite}>
                            <div className="mb-3">
                                <CFormLabel className="small fw-semibold">Full Name <span className="text-danger">*</span></CFormLabel>
                                <CFormInput
                                    placeholder="e.g. Abebe Girma"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <CFormLabel className="small fw-semibold">Phone or Email <span className="text-danger">*</span></CFormLabel>
                                <div className="input-group">
                                    <span className="input-group-text" style={{ background: '#f1f5f9' }}>
                                        <CIcon icon={cilEnvelopeClosed} />
                                    </span>
                                    <CFormInput
                                        placeholder="+251 9XX XXX XXX or email"
                                        value={contact}
                                        onChange={(e) => setContact(e.target.value)}
                                    />
                                </div>
                            </div>
                            <CButton
                                type="submit"
                                color="primary"
                                className="w-100 fw-semibold py-2"
                                disabled={sending}
                            >
                                {sending
                                    ? <><CSpinner size="sm" className="me-2" />Sending...</>
                                    : <><CIcon icon={cilSend} className="me-2" />Send Invitation</>
                                }
                            </CButton>
                        </form>
                    </CCardBody>
                </CCard>

                {/* Referral code card */}
                <CCard className="border-0 shadow-sm">
                    <CCardBody className="p-4">
                        <div className="fw-bold text-primary mb-1">Your Referral Code</div>
                        <div className="small text-medium-emphasis mb-3">
                            Share this code with anyone you want to invite. They can use it during registration.
                        </div>
                        <div
                            className="d-flex align-items-center justify-content-between rounded-3 px-3 py-2"
                            style={{ background: 'linear-gradient(135deg, #ede9fe, #e0f2fe)', border: '1.5px solid #c4b5fd' }}
                        >
                            <span className="fw-bold fs-5 text-primary" style={{ letterSpacing: 2 }}>
                                {REFERRAL_CODE}
                            </span>
                            <CButton
                                color={copied ? 'success' : 'primary'}
                                variant="ghost"
                                size="sm"
                                onClick={handleCopy}
                                className="d-flex align-items-center gap-1"
                            >
                                <CIcon icon={copied ? cilCheckCircle : cilCopy} />
                                {copied ? 'Copied!' : 'Copy'}
                            </CButton>
                        </div>
                    </CCardBody>
                </CCard>
            </CCol>

            {/* Invitations table */}
            <CCol lg={7}>
                <CCard className="border-0 shadow-sm h-100">
                    <CCardBody className="p-4">
                        <div className="fw-bold text-primary mb-3">My Invitations</div>
                        <CTable hover responsive align="middle" className="mb-0">
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell>Name</CTableHeaderCell>
                                    <CTableHeaderCell>Contact</CTableHeaderCell>
                                    <CTableHeaderCell>Date Sent</CTableHeaderCell>
                                    <CTableHeaderCell>Status</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {invitations.map((inv) => (
                                    <CTableRow key={inv.id}>
                                        <CTableDataCell className="fw-semibold small">{inv.name}</CTableDataCell>
                                        <CTableDataCell className="small text-medium-emphasis">{inv.contact}</CTableDataCell>
                                        <CTableDataCell className="small text-nowrap">{inv.date}</CTableDataCell>
                                        <CTableDataCell>
                                            <CBadge color={statusColor[inv.status]} shape="rounded-pill">
                                                {inv.status}
                                            </CBadge>
                                        </CTableDataCell>
                                    </CTableRow>
                                ))}
                            </CTableBody>
                        </CTable>
                        {invitations.length === 0 && (
                            <div className="text-center text-medium-emphasis small py-4">
                                No invitations sent yet.
                            </div>
                        )}
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default Invitations
