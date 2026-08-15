import React, { useState, useEffect, useContext } from 'react'
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
import saccosAccountNumbers from '../../constants/SaccosAccountNumbers';
import { ToasterContext } from '../../providers/toastProvider'
import Toast from '../../components/Toast'

// Maps DB enum values to human-readable labels
const formatTypeLabel = (type) => {
    if (!type) return '—';

    return type
        .split('_') // Split the string into an array of words wherever there is an underscore
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter, lowercase the rest
        .join(' '); // Join the words back together with a space
};

const formatDate = (dateStr) => {
    if (!dateStr) return '—'
    return new Date(dateStr).toISOString().split('T')[0]
}

const MakePayment = () => {
    const navigate = useNavigate()
    const { addToast } = useContext(ToasterContext)

    // POST — submit a new payment
    const { data, isLoading, errors: apiErrors, fetchData } = useApiFetch(
        { url: 'member/make-payment', method: 'POST', isFormData: true },
        false
    );

    // POST — submit uploaded image for extraction
    const { data: extractData, isLoading: extractLoading, errors: extractErrors, fetchData: extractFetch } = useApiFetch(
        { url: 'member/make-payment/extract-from-receipt', method: 'POST', isFormData: true },
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
    const [saccoTransactionTypes, setSaccoTransactionTypes] = useState([])

    const { data: saccoTransactionTypesData } = useApiFetch(
        { url: 'member/transaction/transaction-types', method: 'GET' },
        true
    )

    useEffect(() => {
        if (saccoTransactionTypesData?.status === 'success' && saccoTransactionTypesData?.data?.transactionTypes) {
            setSaccoTransactionTypes(saccoTransactionTypesData.data.transactionTypes)
        }
    }, [saccoTransactionTypesData])

    const handleFile = (file) => {
        setReceipt(file)
        if (file.type.startsWith('image/')) {
            const reader = new FileReader()
            reader.onload = (e) => setPreview(e.target.result)
            reader.readAsDataURL(file)
        } else {
            setPreview('pdf')
        }
        const formData = new FormData();
        formData.append('receipt', file);
        extractFetch({ data: formData });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!transactionType) return setError('Please select a transaction type.')
        if (!receipt) return setError('Please upload a payment receipt.')
        if (!amount || isNaN(amount) || Number(amount) <= 0) return setError('Please enter a valid amount.')
        if (!bankName) return setError('Please enter a bank name.')
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

    // Watch for receipt data extraction results
    useEffect(() => {
        if (extractData && extractData.status === 'success' && extractData.data) {
            const { amount: extAmount, bankName: extBank, transactionDate: extDate, transactionId: extTxId } = extractData.data;
            if (extAmount) setAmount(extAmount);
            if (extBank) setBankName(extBank);
            if (extDate) setTransactionDate(extDate);
            if (extTxId) setReference(extTxId);
        }
    }, [extractData]);

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
                    gradient="linear-gradient(135deg, #0f4c81, #1b6fb5)"
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
                                        {saccoTransactionTypes.map((t) => (
                                            <option key={t.id} value={t.name}>
                                                {formatTypeLabel(t.name)}
                                            </option>
                                        ))}
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
                                    {extractLoading && (
                                        <div className="d-flex align-items-center gap-2 mt-2 text-primary small fw-semibold animate-pulse">
                                            <CSpinner size="sm" color="primary" />
                                            <span>Scanning receipt and extracting details...</span>
                                        </div>
                                    )}
                                    {extractErrors?.isError && (
                                        <div className="text-warning small mt-2">
                                            Could not auto-extract details. Please enter manually.
                                        </div>
                                    )}
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
                        <h5 className="fw-bold text-primary mb-4 d-flex align-items-center gap-2">
                            Recent Submissions
                        </h5>
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
                            ) : recentTransactions.map((p) => (<div
                                key={p.id}
                                className="d-flex align-items-center justify-content-between p-3 rounded-3 mb-2"
                                style={{
                                    backgroundColor: '#ffffff',
                                    border: '1px solid #e2e8f0',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                                    transition: 'all 0.2s ease-in-out'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = '#cbd5e1';
                                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.04)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = '#e2e8f0';
                                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.02)';
                                }}
                            >
                                {/* Left Side: Type and Date */}
                                <div className="d-flex flex-column justify-content-center">
                                    <div className="fw-bold text-dark mb-1" style={{ fontSize: '0.95rem' }}>
                                        {formatTypeLabel(p.type)}
                                    </div>
                                    <div className="text-secondary d-flex align-items-center gap-1" style={{ fontSize: '0.8rem' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                                        </svg>
                                        <span>Submitted on {formatDate(p.createdAt)}</span>
                                    </div>
                                </div>

                                {/* Right Side: Amount and Status */}
                                <div className="d-flex flex-column align-items-end justify-content-center gap-2">
                                    <div className="fw-bold" style={{ fontSize: '1rem', color: '#0f172a' }}>
                                        ETB {Number(p.amount ?? 0).toLocaleString()}
                                    </div>
                                    <StatusBadge status={p.status} />
                                </div>
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
                <CCard className="border-0 shadow-sm" style={{ borderRadius: '12px' }}>
                    <CCardBody className="p-4 p-md-5">
                        <h5 className="fw-bold text-primary mb-4 d-flex align-items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                            </svg>
                            How it works
                        </h5>

                        <div className="d-flex flex-column">
                            {[
                                {
                                    step: '1',
                                    title: 'Make Payment',
                                    text: (
                                        <>
                                            Make your payment from <strong>any channel</strong> to our <strong>CBE Account Number </strong>
                                            <strong
                                                onClick={() => {
                                                    navigator.clipboard.writeText(saccosAccountNumbers.CBE.AccountNumber);
                                                    addToast(Toast({ message: 'Account number copied to clipboard!', type: 'success' }));
                                                }}
                                                className="text-primary"
                                                style={{ cursor: 'pointer', borderBottom: '1px dashed #0f4c81', paddingBottom: '2px' }}
                                                title="Click to copy account number"
                                            >
                                                {saccosAccountNumbers.CBE.AccountNumber}
                                                <svg className="ms-1 mb-1" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                                                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                                                    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                                                </svg>
                                            </strong>
                                            <strong> ({saccosAccountNumbers.CBE.AccountName})</strong>.
                                        </>
                                    )
                                },
                                {
                                    step: '2',
                                    title: 'Save Receipt',
                                    text: (
                                        <>Take a photo or save the PDF receipt from your transaction.</>
                                    )
                                },
                                {
                                    step: '3',
                                    title: 'Submit Details',
                                    text: (
                                        <>Fill in the form and upload your receipt here.</>
                                    )
                                },
                                {
                                    step: '4',
                                    title: 'Get Credited',
                                    text: (
                                        <>Our team reviews and credits your account within 24 hours.</>
                                    )
                                },
                            ].map((s, index, array) => {
                                const isLast = index === array.length - 1;
                                return (
                                    <div key={s.step} className="d-flex gap-3 position-relative" style={{ paddingBottom: isLast ? '0' : '1.5rem' }}>

                                        {/* Connecting Vertical Line */}
                                        {!isLast && (
                                            <div
                                                className="position-absolute"
                                                style={{
                                                    left: '17px', // Centers the line under the 34px circle
                                                    top: '34px',
                                                    bottom: '0',
                                                    width: '2px',
                                                    backgroundColor: '#e2e8f0',
                                                    zIndex: 1
                                                }}
                                            />
                                        )}

                                        {/* Step Circle */}
                                        <div
                                            className="flex-shrink-0 shadow-sm"
                                            style={{
                                                width: '34px',
                                                height: '34px',
                                                borderRadius: '50%',
                                                background: 'linear-gradient(135deg, #0f4c81, #1b6fb5)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: '#fff',
                                                fontSize: '0.9rem',
                                                fontWeight: 700,
                                                zIndex: 2,
                                                border: '2px solid #fff' // Creates a nice cutout effect over the line
                                            }}
                                        >
                                            {s.step}
                                        </div>

                                        {/* Step Content */}
                                        <div className="pt-1">
                                            <div className="fw-bold text-dark mb-1" style={{ fontSize: '0.95rem' }}>
                                                {s.title}
                                            </div>
                                            <div className="text-secondary" style={{ fontSize: '0.875rem', lineHeight: '1.5' }}>
                                                {s.text}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default MakePayment
