import React, { useState, useEffect } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CRow,
    CFormLabel,
    CFormSelect,
    CFormInput,
    CFormTextarea,
    CSpinner,
    CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCheckCircle, cilCreditCard } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import useApiFetch from '../../hooks/useAPIFetch';

import PageHeader from '../../components/shared/PageHeader'
import FileUploadZone from '../../components/shared/FileUploadZone'
import StatusBadge from '../../components/shared/StatusBadge'

// Maps DB enum values to human-readable labels
const TYPE_LABELS = {
    REGISTRATION_FEE: 'Registration Fee',
    SAVINGS_DEPOSIT: 'Savings Deposit',
    SHARE_PURCHASE: 'Share Purchase',
    LOAN_REPAYMENT: 'Loan Repayment',
}

const formatTypeLabel = (type) => TYPE_LABELS[type] ?? type ?? '—'

const formatDate = (dateStr) => {
    if (!dateStr) return '—'
    return new Date(dateStr).toISOString().split('T')[0]
}

const MakePayment = () => {
    const navigate = useNavigate()

    // POST — submit a new payment
    const { data, isLoading, errors: apiErrors, fetchData } = useApiFetch(
        { url: 'member/make-payment', method: 'POST', isFormData: true },
        false
    );

    // GET — load recent transactions (fetches immediately on mount)
    const {
        data: recentData,
        isLoading: recentLoading,
        fetchData: fetchRecent,
    } = useApiFetch(
        { url: 'member/transaction?page=1&limit=5', method: 'GET' },
        true
    );

    const recentTransactions = recentData?.data?.transactions ?? []

    const [transactionType, setTransactionType] = useState('')
    const [amount, setAmount] = useState('')
    const [bankName, setBankName] = useState('')
    const [transactionDate, setTransactionDate] = useState(new Date().toISOString().split('T')[0]);
    const [reference, setReference] = useState('')
    const [description, setDescription] = useState('')
    const [receipt, setReceipt] = useState(null)
    const [preview, setPreview] = useState(null)
    const [isDragging, setIsDragging] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState('')

    const handleFile = (file) => {
        setReceipt(file)
        if (file.type.startsWith('image/')) {
            const reader = new FileReader()
            reader.onload = (e) => setPreview(e.target.result)
            reader.readAsDataURL(file)
        } else {
            setPreview('pdf')
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!transactionType) return setError('Please select a transaction type.')
        if (!amount || isNaN(amount) || Number(amount) <= 0) return setError('Please enter a valid amount.')
        if (!receipt) return setError('Please upload a payment receipt.')
        setError('')
        setSubmitting(true)

        const formData = new FormData();
        formData.append('transactionType', transactionType);
        formData.append('amount', amount);
        formData.append('bankName', bankName);
        formData.append('transactionDate', transactionDate);
        formData.append('reference', reference);
        formData.append('description', description);
        formData.append('receipt', receipt);

        fetchData({ data: formData });
    }

    // Watch for successful POST response — mark submitted and refresh the list
    useEffect(() => {
        if (data && !apiErrors?.isError && !isLoading) {
            setSubmitted(true);
            setSubmitting(false);
            fetchRecent({});   // refresh the sidebar list immediately
        }
    }, [data, apiErrors, isLoading]);

    // Watch for API errors and display them in the form
    useEffect(() => {
        if (apiErrors?.isError && apiErrors?.message) {
            setError(apiErrors.message);
            setSubmitting(false);
        }
    }, [apiErrors]);

    const handleReset = () => {
        setTransactionType('');
        setAmount('');
        setReference('');
        setDescription('');
        setBankName('');
        setTransactionDate(new Date().toISOString().split('T')[0]);
        setReceipt(null); setPreview(null); setSubmitted(false); setError('');
    }

    return (
        <CRow className="g-4">
            <CCol xs={12}>
                <PageHeader
                    icon={<CIcon icon={cilCreditCard} className="text-white" size="lg" />}
                    title="Make a Payment"
                    subtitle="Upload your bank receipt to confirm a payment with our team"
                    gradient="linear-gradient(135deg, #4f46e5, #7c3aed)"
                />
            </CCol>

            {/* Payment form */}
            <CCol lg={7}>
                <CCard className="border-0 shadow-sm h-100">
                    <CCardBody className="p-4">
                        {submitted ? (
                            <div className="text-center py-4">
                                <div
                                    style={{
                                        width: 72, height: 72, borderRadius: '50%',
                                        background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        margin: '0 auto 1.25rem',
                                    }}
                                >
                                    <CIcon icon={cilCheckCircle} style={{ color: '#059669', width: 36, height: 36 }} />
                                </div>
                                <div className="fw-bold fs-5 mb-1">Payment Submitted!</div>
                                <div className="text-medium-emphasis small mb-4">
                                    Your receipt is under review. You'll be notified once it's approved.
                                </div>
                                <div
                                    className="rounded-4 p-3 mb-4 text-start"
                                    style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}
                                >
                                    <div className="small text-medium-emphasis mb-1">Transaction Type</div>
                                    <div className="fw-semibold mb-2">{transactionType}</div>
                                    <div className="small text-medium-emphasis mb-1">Amount</div>
                                    <div className="fw-semibold mb-2">ETB {Number(amount).toLocaleString()}</div>
                                    {reference && (
                                        <>
                                            <div className="small text-medium-emphasis mb-1">Reference</div>
                                            <div className="fw-semibold">{reference}</div>
                                        </>
                                    )}
                                </div>
                                <div className="d-flex gap-2 justify-content-center flex-wrap">
                                    <CButton color="primary" onClick={handleReset}>Make Another Payment</CButton>
                                    <CButton color="secondary" variant="outline" onClick={() => navigate('/my-transactions')}>
                                        View My Transactions
                                    </CButton>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="fw-bold text-primary mb-4">Payment Details</div>
                                {error && <CAlert color="danger" className="py-2 small">{error}</CAlert>}

                                <div className="mb-3">
                                    <CFormLabel className="small fw-semibold">
                                        Transaction Type <span className="text-danger">*</span>
                                    </CFormLabel>
                                    <CFormSelect value={transactionType} onChange={(e) => setTransactionType(e.target.value)}>
                                        <option value="">— Select Transaction Type —</option>
                                        <option value="REGISTRATION_FEE">Registration Fee</option>
                                        <option value="SAVINGS_DEPOSIT">Savings Deposit</option>
                                        <option value="SHARE_PURCHASE">Share Purchase</option>
                                        <option value="LOAN_REPAYMENT">Loan Repayment</option>
                                    </CFormSelect>
                                </div>

                                <div className="mb-4">
                                    <CFormLabel className="small fw-semibold">
                                        Receipt Upload <span className="text-danger">*</span>
                                        <span className="text-medium-emphasis fw-normal ms-1">(JPG, PNG, PDF — max 5 MB)</span>
                                    </CFormLabel>
                                    <FileUploadZone
                                        file={receipt}
                                        preview={preview}
                                        onFile={handleFile}
                                        onClear={() => { setReceipt(null); setPreview(null) }}
                                        label="Drag & drop your receipt here"
                                        onError={setError}
                                        isDragging={isDragging}
                                        onDragState={setIsDragging}
                                    />
                                </div>

                                <div className="mb-3">
                                    <CFormLabel className="small fw-semibold">
                                        Amount (ETB) <span className="text-danger">*</span>
                                    </CFormLabel>
                                    <div className="input-group">
                                        <span className="input-group-text fw-semibold" style={{ background: '#f1f5f9' }}>ETB</span>
                                        <CFormInput
                                            type="number" min="1" step="0.01" placeholder="0.00"
                                            value={amount} onChange={(e) => setAmount(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <CFormLabel className="small fw-semibold">
                                        Bank Name <span className="text-danger">*</span>
                                    </CFormLabel>
                                    <CFormInput
                                        placeholder="e.g. CBE"
                                        value={bankName}
                                        onChange={(e) => setBankName(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <CFormLabel className="small fw-semibold">
                                        Transaction Date <span className="text-danger">*</span>
                                    </CFormLabel>
                                    <CFormInput
                                        type="date"
                                        placeholder="Transaction Date"
                                        value={transactionDate}
                                        onChange={(e) => setTransactionDate(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <CFormLabel className="small fw-semibold">Transaction ID</CFormLabel>
                                    <CFormInput
                                        placeholder="e.g. FT345982346"
                                        value={reference}
                                        onChange={(e) => setReference(e.target.value)}
                                    />
                                </div>

                                <div className="mb-4">
                                    <CFormLabel className="small fw-semibold">Description (optional)</CFormLabel>
                                    <CFormTextarea
                                        rows={2}
                                        placeholder="Any additional information..."
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>

                                <CButton
                                    type="submit"
                                    color="primary"
                                    className="w-100 py-2 fw-semibold"
                                    disabled={submitting}
                                >
                                    {submitting
                                        ? <><CSpinner size="sm" className="me-2" />Submitting...</>
                                        : 'Submit Payment'
                                    }
                                </CButton>
                            </form>
                        )}
                    </CCardBody>
                </CCard>
            </CCol>

            {/* Recent submissions + info strip */}
            <CCol lg={5}>
                <CCard className="border-0 shadow-sm mb-3">
                    <CCardBody className="p-4">
                        <div className="fw-bold text-primary mb-1">Recent Submissions</div>
                        <div className="small text-medium-emphasis mb-3">Your last 5 receipt submissions</div>
                        <div className="d-flex flex-column gap-2">
                            {recentLoading ? (
                                <div className="text-center py-3">
                                    <CSpinner size="sm" className="text-primary" />
                                    <div className="small text-medium-emphasis mt-2">Loading...</div>
                                </div>
                            ) : recentTransactions.length === 0 ? (
                                <div className="text-center py-3 small text-medium-emphasis">
                                    No submissions yet.
                                </div>
                            ) : recentTransactions.map((p) => (
                                <div
                                    key={p.id}
                                    className="d-flex align-items-center justify-content-between p-2 rounded-3"
                                    style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}
                                >
                                    <div>
                                        <div className="small fw-semibold">{formatTypeLabel(p.type)}</div>
                                        <div className="small text-medium-emphasis">
                                            {formatDate(p.createdAt)} · ETB {Number(p.amount ?? 0).toLocaleString()}
                                        </div>
                                    </div>
                                    <StatusBadge status={p.status} />
                                </div>
                            ))}
                        </div>
                        <button
                            className="btn btn-sm btn-outline-primary w-100 mt-3 fw-semibold"
                            onClick={() => navigate('/my-transactions')}
                        >
                            View full history in My Transactions →
                        </button>
                    </CCardBody>
                </CCard>

                {/* How it works */}
                <CCard className="border-0 shadow-sm">
                    <CCardBody className="p-4">
                        <div className="fw-bold text-primary mb-3">How it works</div>
                        <div className="d-flex flex-column gap-3">
                            {[
                                {
                                    step: '1',
                                    text: (
                                        <>
                                            Make your payment at any <strong>CBE Bank branch</strong> or through <strong>CBE Mobile Banking</strong>.
                                        </>
                                    )
                                },
                                {
                                    step: '2',
                                    text: (
                                        <>
                                            Take a photo or save the PDF receipt from your transaction.
                                        </>
                                    )
                                },
                                {
                                    step: '3',
                                    text: (
                                        <>
                                            Fill in the form and upload your receipt here.
                                        </>
                                    )
                                },
                                {
                                    step: '4',
                                    text: (
                                        <>
                                            Our team reviews and credits your account within 24 hours.
                                        </>
                                    )
                                },
                            ].map((s) => (
                                <div key={s.step} className="d-flex gap-3 align-items-start">
                                    <div
                                        style={{
                                            width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                                            background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            color: '#fff', fontSize: '0.75rem', fontWeight: 700,
                                        }}
                                    >
                                        {s.step}
                                    </div>
                                    <span className="small">{s.text}</span>
                                </div>
                            ))}
                        </div>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default MakePayment
