import React, { useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CRow,
    CFormLabel,
    CFormInput,
    CFormTextarea,
    CSpinner,
    CAlert,
    CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
    cilBriefcase,
    cilCheckCircle,
    cilLocationPin,
    cilPhone,
    cilEnvelopeClosed,
    cilUser,
} from '@coreui/icons'
import FileUploadZone from '../../components/shared/FileUploadZone'

const benefits = [
    { icon: '💰', title: 'Earn Commissions', desc: 'Earn a competitive commission on every member you onboard and transaction you facilitate.' },
    { icon: '🕐', title: 'Flexible Hours', desc: 'Work at your own pace — set your own schedule and operate within your community.' },
    { icon: '🤝', title: 'Dedicated Support', desc: 'Get direct support from our team, including training, materials, and a dedicated contact.' },
    { icon: '📈', title: 'Grow with Us', desc: 'Top-performing agents get fast-tracked for leadership roles and higher commission tiers.' },
]

const requirements = [
    'Active SACCO member for at least 6 months',
    'Minimum share balance of ETB 5,000',
    'No outstanding loan defaults',
    'Reside in or near your proposed operation area',
    'Valid national ID',
]

const BecomeAnAgent = () => {
    const [fullName, setFullName]   = useState('')
    const [phone, setPhone]         = useState('')
    const [email, setEmail]         = useState('')
    const [area, setArea]           = useState('')
    const [motivation, setMotivation] = useState('')
    const [idFile, setIdFile]       = useState(null)
    const [idPreview, setIdPreview] = useState(null)
    const [isDragging, setIsDragging] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [error, setError]         = useState('')

    const handleFile = (file) => {
        setIdFile(file)
        if (file.type.startsWith('image/')) {
            const reader = new FileReader()
            reader.onload = (e) => setIdPreview(e.target.result)
            reader.readAsDataURL(file)
        } else {
            setIdPreview('pdf')
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!fullName.trim()) return setError('Please enter your full name.')
        if (!phone.trim()) return setError('Please enter your phone number.')
        if (!area.trim()) return setError('Please enter your area of operation.')
        if (!motivation.trim() || motivation.trim().length < 30) return setError('Please write a motivation of at least 30 characters.')
        if (!idFile) return setError('Please upload a copy of your national ID.')
        setError('')
        setSubmitting(true)
        setTimeout(() => {
            setSubmitting(false)
            setSubmitted(true)
        }, 2200)
    }

    return (
        <CRow className="g-4">
            {/* Hero */}
            <CCol xs={12}>
                <CCard
                    className="border-0"
                    style={{
                        background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4f46e5 100%)',
                        borderRadius: 20,
                        overflow: 'hidden',
                    }}
                >
                    <CCardBody className="p-4 p-md-5">
                        <CRow className="align-items-center">
                            <CCol md={8}>
                                <div className="text-white-50 small fw-semibold mb-2 text-uppercase" style={{ letterSpacing: 2 }}>
                                    Agent Programme
                                </div>
                                <div className="text-white fw-bold mb-3" style={{ fontSize: '1.75rem', lineHeight: 1.2 }}>
                                    Become a SACCO Agent
                                </div>
                                <div className="text-white-50 mb-4" style={{ maxWidth: 480 }}>
                                    Join our growing network of community agents. Help members in your area access financial services — and earn while you do it.
                                </div>
                                <div className="d-flex gap-2 flex-wrap">
                                    <span className="badge rounded-pill px-3 py-2" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: '0.82rem' }}>
                                        💰 Commission-based earnings
                                    </span>
                                    <span className="badge rounded-pill px-3 py-2" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: '0.82rem' }}>
                                        🕐 Flexible schedule
                                    </span>
                                    <span className="badge rounded-pill px-3 py-2" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: '0.82rem' }}>
                                        🤝 Full support
                                    </span>
                                </div>
                            </CCol>
                            <CCol md={4} className="d-none d-md-flex justify-content-end">
                                <div
                                    style={{
                                        width: 120, height: 120, borderRadius: '50%',
                                        background: 'rgba(255,255,255,0.08)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    }}
                                >
                                    <CIcon icon={cilBriefcase} style={{ width: 56, height: 56, color: 'rgba(255,255,255,0.7)' }} />
                                </div>
                            </CCol>
                        </CRow>
                    </CCardBody>
                </CCard>
            </CCol>

            {/* Benefits */}
            <CCol xs={12}>
                <div className="fw-bold text-primary mb-3">Why Become an Agent?</div>
                <CRow className="g-3">
                    {benefits.map((b) => (
                        <CCol sm={6} lg={3} key={b.title}>
                            <CCard className="border-0 shadow-sm h-100">
                                <CCardBody className="p-3">
                                    <div style={{ fontSize: '1.75rem', marginBottom: 8 }}>{b.icon}</div>
                                    <div className="fw-semibold small mb-1">{b.title}</div>
                                    <div className="small text-medium-emphasis">{b.desc}</div>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    ))}
                </CRow>
            </CCol>

            {/* Eligibility */}
            <CCol lg={4}>
                <CCard className="border-0 shadow-sm h-100">
                    <CCardBody className="p-4">
                        <div className="fw-bold text-primary mb-3">Eligibility Requirements</div>
                        <div className="d-flex flex-column gap-3">
                            {requirements.map((req, i) => (
                                <div key={i} className="d-flex align-items-start gap-2">
                                    <div
                                        style={{
                                            width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                                            background: '#d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            marginTop: 1,
                                        }}
                                    >
                                        <CIcon icon={cilCheckCircle} style={{ width: 14, height: 14, color: '#059669' }} />
                                    </div>
                                    <span className="small">{req}</span>
                                </div>
                            ))}
                        </div>
                    </CCardBody>
                </CCard>
            </CCol>

            {/* Application form */}
            <CCol lg={8}>
                <CCard className="border-0 shadow-sm">
                    <CCardBody className="p-4">
                        {submitted ? (
                            <div className="text-center py-5">
                                <div
                                    style={{
                                        width: 80, height: 80, borderRadius: '50%',
                                        background: 'linear-gradient(135deg, #ede9fe, #dbeafe)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        margin: '0 auto 1.5rem',
                                    }}
                                >
                                    <CIcon icon={cilCheckCircle} style={{ width: 40, height: 40, color: '#4f46e5' }} />
                                </div>
                                <div className="fw-bold fs-5 mb-2">Application Submitted!</div>
                                <div className="text-medium-emphasis small mb-4" style={{ maxWidth: 380, margin: '0 auto 1.5rem' }}>
                                    Thank you, <strong>{fullName}</strong>. Your agent application is under review.
                                    Our team will contact you at <strong>{phone}</strong> within 3–5 business days.
                                </div>
                                <CBadge color="warning" shape="rounded-pill" className="px-3 py-2 fs-6">
                                    Status: Under Review
                                </CBadge>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="fw-bold text-primary mb-4">Agent Application Form</div>

                                {error && <CAlert color="danger" className="py-2 small">{error}</CAlert>}

                                <CRow className="g-3 mb-3">
                                    <CCol sm={6}>
                                        <CFormLabel className="small fw-semibold">Full Name <span className="text-danger">*</span></CFormLabel>
                                        <div className="input-group">
                                            <span className="input-group-text" style={{ background: '#f1f5f9' }}>
                                                <CIcon icon={cilUser} />
                                            </span>
                                            <CFormInput
                                                placeholder="Your full legal name"
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                            />
                                        </div>
                                    </CCol>
                                    <CCol sm={6}>
                                        <CFormLabel className="small fw-semibold">Phone Number <span className="text-danger">*</span></CFormLabel>
                                        <div className="input-group">
                                            <span className="input-group-text" style={{ background: '#f1f5f9' }}>
                                                <CIcon icon={cilPhone} />
                                            </span>
                                            <CFormInput
                                                placeholder="+251 9XX XXX XXX"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                            />
                                        </div>
                                    </CCol>
                                    <CCol sm={6}>
                                        <CFormLabel className="small fw-semibold">Email Address</CFormLabel>
                                        <div className="input-group">
                                            <span className="input-group-text" style={{ background: '#f1f5f9' }}>
                                                <CIcon icon={cilEnvelopeClosed} />
                                            </span>
                                            <CFormInput
                                                type="email"
                                                placeholder="optional"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                    </CCol>
                                    <CCol sm={6}>
                                        <CFormLabel className="small fw-semibold">Area of Operation <span className="text-danger">*</span></CFormLabel>
                                        <div className="input-group">
                                            <span className="input-group-text" style={{ background: '#f1f5f9' }}>
                                                <CIcon icon={cilLocationPin} />
                                            </span>
                                            <CFormInput
                                                placeholder="e.g. Bole, Addis Ababa"
                                                value={area}
                                                onChange={(e) => setArea(e.target.value)}
                                            />
                                        </div>
                                    </CCol>
                                </CRow>

                                <div className="mb-3">
                                    <CFormLabel className="small fw-semibold">
                                        Why do you want to become an agent? <span className="text-danger">*</span>
                                    </CFormLabel>
                                    <CFormTextarea
                                        rows={4}
                                        placeholder="Tell us about your motivation, community connections, and what value you'll bring as an agent..."
                                        value={motivation}
                                        onChange={(e) => setMotivation(e.target.value)}
                                    />
                                    <div className="small text-medium-emphasis mt-1">{motivation.length} / 30 characters minimum</div>
                                </div>

                                {/* ID upload */}
                                <div className="mb-4">
                                    <CFormLabel className="small fw-semibold">
                                        National ID Document <span className="text-danger">*</span>
                                        <span className="text-medium-emphasis fw-normal ms-1">(JPG, PNG, PDF — max 5 MB)</span>
                                    </CFormLabel>
                                    <FileUploadZone
                                        file={idFile}
                                        preview={idPreview}
                                        onFile={handleFile}
                                        onClear={() => { setIdFile(null); setIdPreview(null) }}
                                        label="Drag & drop your ID document here"
                                        onError={setError}
                                        isDragging={isDragging}
                                        onDragState={setIsDragging}
                                    />
                                </div>

                                <CButton
                                    type="submit"
                                    color="primary"
                                    className="w-100 py-2 fw-semibold"
                                    disabled={submitting}
                                    style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', border: 'none' }}
                                >
                                    {submitting
                                        ? <><CSpinner size="sm" className="me-2" />Submitting Application...</>
                                        : 'Submit Application'
                                    }
                                </CButton>
                            </form>
                        )}
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default BecomeAnAgent
