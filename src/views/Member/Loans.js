import React, { useState, useContext, useEffect } from 'react'
import {
    CBadge,
    CButton,
    CCard,
    CCardBody,
    CCol,
    CRow,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CFormInput,
    CFormSelect,
    CAlert,
    CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCheckCircle, cilMoney, cilPlus, cilCalculator, cilWarning } from '@coreui/icons'
import { UserContext } from '../../providers/userProvider'
import AmortizationScheduleModal from '../../components/AmortizationScheduleModal'
import PageHeader from '../../components/shared/PageHeader'
import StatusBadge from '../../components/shared/StatusBadge'
import useApiFetch from '../../hooks/useAPIFetch'

const loanModalStyles = `
  .loan-apply-modal .modal-content {
      border-radius: 16px !important;
      overflow: hidden !important;
      border: none !important;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
  }
  .loan-apply-modal-header {
      background: var(--sacco-primary-gradient, linear-gradient(135deg, #0f4c81 0%, #1b5e9d 100%)) !important;
      border-bottom: none !important;
      padding: 1.5rem !important;
  }
  .loan-apply-modal-title {
      color: #ffffff !important;
      font-size: 1.25rem !important;
      font-weight: 700 !important;
      letter-spacing: -0.025em !important;
  }
  .loan-apply-modal .btn-close {
      filter: invert(1) grayscale(1) brightness(2) !important;
      opacity: 0.8 !important;
      transition: opacity 0.2s ease !important;
  }
  .loan-apply-modal .btn-close:hover {
      opacity: 1 !important;
  }
  .loan-input-card {
      border-radius: 12px !important;
      border: 1px solid #e2e8f0 !important;
      background: #f8fafc !important;
      padding: 1.5rem !important;
  }
  .loan-input-group {
      display: flex;
      align-items: center;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      padding: 0 0.5rem;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }
  .loan-input-group:focus-within {
      border-color: var(--sacco-primary, #0f4c81);
      box-shadow: 0 0 0 3px rgba(15, 76, 129, 0.15);
  }
  .loan-input-group .loan-addon {
      color: #94a3b8;
      font-size: 0.85rem;
      font-weight: 600;
      padding: 0 0.5rem;
      user-select: none;
  }
  .loan-input-group input {
      border: none !important;
      outline: none !important;
      box-shadow: none !important;
      padding: 0.6rem 0.5rem !important;
      font-size: 0.9rem !important;
      width: 100%;
      background: transparent;
      color: #1e293b;
      font-weight: 500;
  }
  .loan-select-premium {
      background-color: #ffffff !important;
      border-radius: 8px !important;
      border: 1px solid #cbd5e1 !important;
      padding: 0.6rem 0.8rem !important;
      font-size: 0.9rem !important;
      transition: border-color 0.2s ease, box-shadow 0.2s ease !important;
      color: #1e293b !important;
      font-weight: 500 !important;
  }
  .loan-select-premium:focus {
      border-color: var(--sacco-primary, #0f4c81) !important;
      box-shadow: 0 0 0 3px rgba(15, 76, 129, 0.15) !important;
  }
  .loan-guarantor-box {
      border-radius: 12px !important;
      border: 1px solid rgba(15, 76, 129, 0.12) !important;
      background: #ffffff !important;
      padding: 1.5rem !important;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05) !important;
  }
  .preview-btn {
      border-radius: 8px !important;
      padding: 0.6rem 1.2rem !important;
      font-weight: 600 !important;
      font-size: 0.9rem !important;
      color: var(--sacco-primary, #0f4c81) !important;
      border: 1.5px solid var(--sacco-primary, #0f4c81) !important;
      background: transparent !important;
      transition: background-color 0.2s ease, color 0.2s ease !important;
  }
  .preview-btn:hover {
      background-color: var(--sacco-primary, #0f4c81) !important;
      color: #ffffff !important;
  }
  .submit-request-btn {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
      border: none !important;
      border-radius: 8px !important;
      padding: 0.6rem 1.2rem !important;
      font-weight: 700 !important;
      font-size: 0.9rem !important;
      box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.2) !important;
      color: #ffffff !important;
      transition: opacity 0.2s ease, transform 0.2s ease !important;
  }
  .submit-request-btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 10px 15px -3px rgba(16, 185, 129, 0.3) !important;
      opacity: 0.95;
  }
  .cancel-request-btn {
      border-radius: 8px !important;
      padding: 0.6rem 1.2rem !important;
      font-weight: 600 !important;
      font-size: 0.9rem !important;
  }
`;

const ManageMembersLoans = () => {
    const { user } = useContext(UserContext)

    // Toast state
    const [toastMessage, setToastMessage] = useState('')

    // Modal states
    const [showApplyModal, setShowApplyModal] = useState(false)
    const [showAmortizationModal, setShowAmortizationModal] = useState(false)

    // API 1: Fetch General Eligibility
    const {
        data: eligibilityData,
        isLoading: eligibilityLoading,
        errors: eligibilityErrors,
        fetchData: fetchEligibility
    } = useApiFetch({ url: 'loan/get-member-eligible-for-loans', method: 'GET' }, true)

    // API 2: Fetch Active & Applied Member Loans
    const {
        data: loansData,
        isLoading: loansLoading,
        errors: loansErrors,
        fetchData: fetchLoans
    } = useApiFetch({ url: 'loan/get-member-loan', method: 'GET' }, true)

    // API 3: Apply for Loan
    const {
        data: applyResult,
        isLoading: applyLoading,
        errors: applyErrors,
        fetchData: submitApplyRequest
    } = useApiFetch({ url: 'loan/new-loan', method: 'POST' }, false)

    // API 4: Fetch Available Loan Packages
    const {
        data: packagesData,
        isLoading: packagesLoading,
        errors: packagesErrors,
        fetchData: fetchPackages
    } = useApiFetch({ url: 'loan/get-loan-packages', method: 'GET' }, true)

    // Loan Application Form State
    const [requestedAmount, setRequestedAmount] = useState(100000)
    const [selectedPackageId, setSelectedPackageId] = useState('')

    // Amortization Modal Config
    const [amortizationConfig, setAmortizationConfig] = useState({
        principal: 100000,
        interestRate: 13.5,
        tenureMonths: 12,
        method: 'Reducing Balance',
        title: 'Loan Repayment Amortization Schedule'
    })

    // Computed states from Backend response
    const overallEligible = eligibilityData?.data?.overallEligible || false
    const criteria = eligibilityData?.data?.criteria || {}
    const memberSavings = Number(eligibilityData?.data?.savingAccount?.balance) || 0
    const maxLoanMultiplier = 4 // Max 4x savings
    const maxEligibleLoan = memberSavings * maxLoanMultiplier

    const loanPackages = packagesData?.data || []
    const selectedPackage = loanPackages.find(p => p.id === selectedPackageId) || null

    // Real-time validations
    const isFormValid = overallEligible && requestedAmount >= 0 && !!selectedPackageId

    const showToast = (msg) => {
        setToastMessage(msg)
        setTimeout(() => setToastMessage(''), 5000)
    }

    // Set initial form values when modal opens
    useEffect(() => {
        if (showApplyModal) {
            setRequestedAmount(50000)
            setSelectedPackageId('')
            fetchPackages()
        }
    }, [showApplyModal])

    // Watch loan application submission result
    useEffect(() => {
        if (applyResult?.status === 'success') {
            setShowApplyModal(false)
            showToast(applyResult?.message || 'Loan Application submitted successfully!')
            // Refresh eligibility status & loans list
            fetchEligibility()
            fetchLoans()
        }
    }, [applyResult, fetchEligibility, fetchLoans])

    const openAmortizationForLoan = (loan) => {
        setAmortizationConfig({
            principal: Number(loan.principal_amount) || 50000,
            interestRate: Number(loan.interest_rate) || 12,
            tenureMonths: loan.term_months || 12,
            method: loan.interest_type || 'Reducing Balance',
            title: `Amortization Schedule: ${loan.package_name || 'Loan'} (LN-${loan.loan_number})`
        })
        setShowAmortizationModal(true)
    }

    const handleApplyLoan = async (e) => {
        if (e) e.preventDefault()
        if (!isFormValid || !selectedPackageId) return

        await submitApplyRequest({
            data: {
                loan_package_id: selectedPackageId,
                requestedAmount
            }
        })
    }

    const memberLoans = loansData?.data || []

    return (
        <CRow className="g-4">
            {/* Page Header */}
            <CCol xs={12}>
                <PageHeader
                    icon={<CIcon icon={cilMoney} className="text-white" size="lg" />}
                    title="My Loans"
                    subtitle="Manage your active loans, repayments, and applications"
                    gradient="linear-gradient(135deg, #0f4c81, #1b6fb5)"
                />
            </CCol>

            {/* Success Toast */}
            {toastMessage && (
                <CCol xs={12}>
                    <CAlert color="success" dismissible className="border-0 shadow-sm fw-semibold mb-0">
                        {toastMessage}
                    </CAlert>
                </CCol>
            )}

            {/* SECTION 1: LOAN ELIGIBILITY */}
            <CCol xs={12}>
                <CCard className="border-0 shadow-sm">
                    <CCardBody className="p-4">
                        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
                            <div>
                                <h4 className="fw-bold text-primary mb-1">General Loan Eligibility</h4>
                                <p className="text-muted small mb-0">General rules and requirements to qualify for a loan.</p>
                            </div>
                            {eligibilityLoading ? (
                                <CSpinner size="sm" color="primary" />
                            ) : (
                                <CBadge
                                    color={overallEligible ? 'success' : 'danger'}
                                    className="p-2 fs-6"
                                    style={{ borderRadius: '6px' }}
                                >
                                    {overallEligible ? 'ELIGIBLE' : 'INELIGIBLE'}
                                </CBadge>
                            )}
                        </div>

                        {eligibilityErrors?.isError && (
                            <CAlert color="danger" className="border-0 shadow-sm mb-4">
                                {eligibilityErrors?.message || 'Failed to fetch loan eligibility data.'}
                            </CAlert>
                        )}

                        {/* Overall Status Banner */}
                        {!eligibilityLoading && !eligibilityErrors?.isError && (
                            <CAlert
                                color={overallEligible ? 'success' : 'warning'}
                                className="border-0 shadow-sm d-flex align-items-center gap-3 mb-4 p-3"
                                style={{
                                    background: overallEligible ? '#eafaf1' : '#fff9e6',
                                    color: overallEligible ? '#1b7a43' : '#b27b00'
                                }}
                            >
                                <CIcon
                                    icon={overallEligible ? cilCheckCircle : cilWarning}
                                    size="xl"
                                    className={overallEligible ? 'text-success' : 'text-warning'}
                                />
                                <div>
                                    <h6 className="fw-bold mb-1">
                                        {overallEligible
                                            ? 'Congratulations! You meet all loan eligibility criteria.'
                                            : 'You are currently ineligible for a new loan.'
                                        }
                                    </h6>
                                    <span className="small">
                                        {overallEligible
                                            ? 'You are qualified to apply for a loan. Click the "Apply For Loan" button below to proceed.'
                                            : 'Please review the criteria list below to see what requirements are pending.'
                                        }
                                    </span>
                                </div>
                            </CAlert>
                        )}

                        {/* 4 Criteria Grid */}
                        <CRow className="g-3">
                            {/* Membership Duration */}
                            <CCol md={6} lg={3}>
                                <CCard className="h-100 border-0 shadow-sm" style={{ background: '#f8fafc', borderLeft: `4px solid ${criteria.membershipDuration?.eligible ? '#2eb85c' : '#e55353'}` }}>
                                    <CCardBody className="p-3">
                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                            <span className="small text-secondary fw-bold">Membership Tenure</span>
                                            <CBadge color={criteria.membershipDuration?.eligible ? 'success' : 'danger'}>
                                                {criteria.membershipDuration?.eligible ? 'Pass' : 'Fail'}
                                            </CBadge>
                                        </div>
                                        <p className="small text-dark mb-0 fw-semibold">
                                            {criteria.membershipDuration?.message || 'Checking membership duration...'}
                                        </p>
                                    </CCardBody>
                                </CCard>
                            </CCol>

                            {/* Share Amount */}
                            <CCol md={6} lg={3}>
                                <CCard className="h-100 border-0 shadow-sm" style={{ background: '#f8fafc', borderLeft: `4px solid ${criteria.minimumShareAmount?.eligible ? '#2eb85c' : '#e55353'}` }}>
                                    <CCardBody className="p-3">
                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                            <span className="small text-secondary fw-bold">Share Balance</span>
                                            <CBadge color={criteria.minimumShareAmount?.eligible ? 'success' : 'danger'}>
                                                {criteria.minimumShareAmount?.eligible ? 'Pass' : 'Fail'}
                                            </CBadge>
                                        </div>
                                        <p className="small text-dark mb-0 fw-semibold">
                                            {criteria.minimumShareAmount?.message || 'Checking share balance...'}
                                        </p>
                                    </CCardBody>
                                </CCard>
                            </CCol>

                            {/* Consistent Savings */}
                            <CCol md={6} lg={3}>
                                <CCard className="h-100 border-0 shadow-sm" style={{ background: '#f8fafc', borderLeft: `4px solid ${criteria.consistentSavings?.eligible ? '#2eb85c' : '#e55353'}` }}>
                                    <CCardBody className="p-3">
                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                            <span className="small text-secondary fw-bold">Consistent Savings</span>
                                            <CBadge color={criteria.consistentSavings?.eligible ? 'success' : 'danger'}>
                                                {criteria.consistentSavings?.eligible ? 'Pass' : 'Fail'}
                                            </CBadge>
                                        </div>
                                        <p className="small text-dark mb-0 fw-semibold">
                                            {criteria.consistentSavings?.message || 'Checking savings patterns...'}
                                        </p>
                                    </CCardBody>
                                </CCard>
                            </CCol>

                            {/* Active Loans */}
                            <CCol md={6} lg={3}>
                                <CCard className="h-100 border-0 shadow-sm" style={{ background: '#f8fafc', borderLeft: `4px solid ${criteria.activeLoans?.eligible ? '#2eb85c' : '#e55353'}` }}>
                                    <CCardBody className="p-3">
                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                            <span className="small text-secondary fw-bold">Active Loans</span>
                                            <CBadge color={criteria.activeLoans?.eligible ? 'success' : 'danger'}>
                                                {criteria.activeLoans?.eligible ? 'Pass' : 'Fail'}
                                            </CBadge>
                                        </div>
                                        <p className="small text-dark mb-0 fw-semibold">
                                            {criteria.activeLoans?.message || 'Checking active loans...'}
                                        </p>
                                    </CCardBody>
                                </CCard>
                            </CCol>
                        </CRow>
                    </CCardBody>
                </CCard>
            </CCol>

            {/* SECTION 2: LOAN ACTIONS */}
            <CCol xs={12}>
                <CCard className="border-0 shadow-sm" style={{ background: '#f0f4f9' }}>
                    <CCardBody className="p-4 d-flex justify-content-between align-items-center flex-wrap gap-3">
                        <div>
                            <h5 className="fw-bold text-dark mb-1">Loan Management Actions</h5>
                            <span className="small text-secondary">Apply for a new loan or preview amortization repayment schedules.</span>
                        </div>
                        <div className="d-flex gap-2">
                            <CButton
                                color="primary"
                                variant="outline"
                                size="lg"
                                className="fw-bold"
                                onClick={() => {
                                    setAmortizationConfig({
                                        principal: 100000,
                                        interestRate: 12,
                                        tenureMonths: 12,
                                        method: 'Reducing Balance',
                                        title: 'Interactive Repayment Amortization Calculator'
                                    })
                                    setShowAmortizationModal(true)
                                }}
                            >
                                <CIcon icon={cilCalculator} className="me-2" /> Amortization Calculator
                            </CButton>
                            <CButton
                                color="success"
                                size="lg"
                                className="text-white fw-bold"
                                disabled={!overallEligible}
                                onClick={() => setShowApplyModal(true)}
                            >
                                <CIcon icon={cilPlus} className="me-2" /> Apply For Loan
                            </CButton>
                        </div>
                    </CCardBody>
                </CCard>
            </CCol>

            {/* SECTION 3: ACTIVE & APPLIED MEMBER LOANS */}
            <CCol xs={12} lg={8}>
                <CCard className="border-0 shadow-sm h-100">
                    <CCardBody className="p-4">
                        <div className="fw-bold text-primary fs-5 mb-3">Active & Applied Member Loans</div>

                        {loansLoading && (
                            <div className="text-center p-5">
                                <CSpinner color="primary" className="mb-2" />
                                <div className="text-muted small">Loading active and applied loans...</div>
                            </div>
                        )}

                        {loansErrors?.isError && (
                            <CAlert color="danger" className="border-0 shadow-sm mb-0">
                                {loansErrors?.message || 'Failed to retrieve active loans.'}
                            </CAlert>
                        )}

                        {!loansLoading && !loansErrors?.isError && memberLoans.length === 0 && (
                            <div className="text-center p-5 border rounded-4 bg-light" style={{ borderStyle: 'dashed' }}>
                                <CIcon icon={cilMoney} size="3xl" className="text-muted mb-3" />
                                <h6 className="fw-bold text-secondary mb-1">No Loans Found</h6>
                                <p className="small text-muted mb-0">You currently have no active or pending loan applications.</p>
                            </div>
                        )}

                        {!loansLoading && !loansErrors?.isError && memberLoans.length > 0 && (
                            <CRow className="g-3">
                                {memberLoans.map((loan) => (
                                    <CCol md={6} key={loan.id}>
                                        <div className="rounded-4 p-3 border h-100 d-flex flex-column justify-content-between" style={{ background: '#f7fbff', borderColor: '#dcecff' }}>
                                            <div>
                                                <div className="d-flex justify-content-between align-items-start">
                                                    <div className="fw-bold text-primary mb-2">{loan.package_name || 'General Loan'}</div>
                                                    <StatusBadge status={loan.status} />
                                                </div>
                                                <div className="small text-secondary mb-1">Loan ID: LN-{loan.loan_number}</div>
                                                <div className="fs-5 fw-bold mb-2 text-dark">
                                                    ETB {Number(loan.outstanding_balance).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                                </div>
                                                <div className="small mb-1">
                                                    <strong>{loan.status === 'PENDING' ? 'Applied Principal: ' : 'Approved Principal: '}</strong> ETB {Number(loan.principal_amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                                </div>
                                                <div className="small mb-1">
                                                    <strong>Interest Terms:</strong> {loan.interest_rate}% annual ({loan.interest_type || 'Reducing Balance'})
                                                </div>
                                                <div className="small mb-2">
                                                    <strong>Repayment Term:</strong> {loan.term_months} Months ({loan.installment_period})
                                                </div>
                                                {loan.disbursed_at && (
                                                    <div className="small mb-1 text-muted">
                                                        <strong>Disbursed:</strong> {new Date(loan.disbursed_at).toLocaleDateString()}
                                                    </div>
                                                )}
                                            </div>
                                            <CButton
                                                color="primary"
                                                variant="outline"
                                                size="sm"
                                                className="mt-3 w-100 fw-semibold"
                                                onClick={() => openAmortizationForLoan(loan)}
                                            >
                                                <CIcon icon={cilCalculator} className="me-1" /> View Amortization Schedule
                                            </CButton>
                                        </div>
                                    </CCol>
                                ))}
                            </CRow>
                        )}
                    </CCardBody>
                </CCard>
            </CCol>

            {/* Borrowing Capacity & Rules Info */}
            <CCol xs={12} lg={4}>
                <CCard className="border-0 shadow-sm h-100">
                    <CCardBody className="p-4 d-flex flex-column justify-content-between">
                        <div>
                            <div className="fw-bold text-primary fs-5 mb-3">Borrower Capacity & Rules</div>
                            <p className="text-secondary small mb-3">
                                Under SACCO policies, your maximum borrowing limit is determined by your total accumulated savings. You can borrow up to a maximum multiplier of <strong>4x</strong> of your savings collateral.
                            </p>

                            <div className="rounded-4 p-3 border mb-3" style={{ background: '#f8fafc', borderColor: '#e2e8f0' }}>
                                <div className="small text-secondary mb-1">Your Active Savings Balance</div>
                                <div className="fw-bold fs-5 text-dark">
                                    ETB {memberSavings.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                </div>
                            </div>

                            <div className="rounded-4 p-3 border" style={{ background: '#ebfbee', borderColor: '#d3f9d8' }}>
                                <div className="small text-success fw-bold mb-1">Maximum Borrowing Limit (4x)</div>
                                <div className="fw-bold fs-4 text-success">
                                    ETB {maxEligibleLoan.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                </div>
                                <div className="small text-muted mt-1">Requires 25% minimum savings coverage.</div>
                            </div>
                        </div>

                        <div className="small text-muted mt-4">
                            ℹ️ <em>Early repayments reduce cumulative interest costs under the Reducing Balance method.</em>
                        </div>
                    </CCardBody>
                </CCard>
            </CCol>

            {/* MODAL: APPLY FOR LOAN WITH REAL-TIME VALIDATION */}
            <CModal visible={showApplyModal} onClose={() => setShowApplyModal(false)} size="lg" className="loan-apply-modal">
                <style dangerouslySetInnerHTML={{ __html: loanModalStyles }} />
                <CModalHeader className="loan-apply-modal-header">
                    <CModalTitle className="loan-apply-modal-title d-flex align-items-center">
                        <CIcon icon={cilPlus} className="me-2" size="lg" />
                        SACCO Loan Application Form
                    </CModalTitle>
                </CModalHeader>
                <CModalBody className="p-4 bg-light-subtle">
                    {packagesLoading && (
                        <div className="text-center py-4">
                            <CSpinner color="primary" />
                            <div className="text-muted small mt-2">Loading available loan packages...</div>
                        </div>
                    )}

                    {packagesErrors?.isError && (
                        <CAlert color="danger" className="mb-4 border-0 shadow-sm fw-semibold">
                            ⚠️ {packagesErrors?.message || 'Failed to load available loan packages.'}
                        </CAlert>
                    )}

                    {!packagesLoading && !packagesErrors?.isError && (
                        <>
                            {applyErrors?.isError && (
                                <CAlert color="danger" className="mb-4 border-0 shadow-sm fw-semibold">
                                    ❌ {applyErrors?.message || 'Failed to submit loan request.'}
                                </CAlert>
                            )}

                            <form onSubmit={handleApplyLoan}>
                                <CRow className="g-3">
                                    <CCol md={6}>
                                        <label className="form-label small fw-semibold text-secondary">Select Loan Product</label>
                                        <CFormSelect 
                                            className="loan-select-premium" 
                                            value={selectedPackageId} 
                                            onChange={(e) => setSelectedPackageId(e.target.value)}
                                        >
                                            <option value="">-- Choose a Loan Package --</option>
                                            {loanPackages.map(pkg => (
                                                <option key={pkg.id} value={pkg.id}>
                                                    {pkg.name} ({pkg.interest_rate_percentage}% p.a.)
                                                </option>
                                            ))}
                                        </CFormSelect>
                                    </CCol>

                                    <CCol md={6}>
                                        <label className="form-label small fw-semibold text-secondary">Requested Amount</label>
                                        <div className="loan-input-group">
                                            <span className="loan-addon">ETB</span>
                                            <input
                                                type="number"
                                                step="1000"
                                                value={requestedAmount}
                                                onChange={(e) => setRequestedAmount(Number(e.target.value))}
                                                required
                                                min={1000}
                                            />
                                        </div>
                                    </CCol>

                                    <CCol md={6}>
                                        <label className="form-label small fw-semibold text-secondary">Repayment Tenure</label>
                                        <div className="loan-input-group" style={{ backgroundColor: '#f1f5f9' }}>
                                            <input 
                                                value={selectedPackage ? `${selectedPackage.term_months} Months (${selectedPackage.installment_period})` : 'Select a package to see tenure'} 
                                                disabled 
                                                readOnly 
                                            />
                                        </div>
                                    </CCol>

                                    <CCol md={6}>
                                        <label className="form-label small fw-semibold text-secondary">Interest Type</label>
                                        <div className="loan-input-group" style={{ backgroundColor: '#f1f5f9' }}>
                                            <input 
                                                value={selectedPackage ? selectedPackage.interest_type : 'Select a package to see interest type'} 
                                                disabled 
                                                readOnly 
                                            />
                                        </div>
                                    </CCol>
                                </CRow>
                            </form>
                        </>
                    )}
                </CModalBody>
                <CModalFooter className="bg-light border-top-0 p-3">
                    <CButton className="btn btn-secondary cancel-request-btn" onClick={() => setShowApplyModal(false)}>Cancel</CButton>
                    <CButton
                        className="preview-btn"
                        disabled={!selectedPackage || requestedAmount <= 0}
                        onClick={() => {
                            if (!selectedPackage) return
                            setAmortizationConfig({
                                principal: requestedAmount,
                                interestRate: selectedPackage.interest_rate_percentage,
                                tenureMonths: selectedPackage.term_months,
                                method: selectedPackage.interest_type,
                                title: `Preview Amortization: ${selectedPackage.name} (ETB ${requestedAmount.toLocaleString()})`
                            })
                            setShowAmortizationModal(true)
                        }}
                    >
                        <CIcon icon={cilCalculator} className="me-1" /> Preview Amortization Table
                    </CButton>
                    <CButton
                        className="submit-request-btn text-white fw-bold"
                        disabled={!isFormValid || applyLoading || !selectedPackage}
                        onClick={handleApplyLoan}
                    >
                        {applyLoading ? <CSpinner size="sm" color="light" className="me-1" /> : <CIcon icon={cilCheckCircle} className="me-1" />}
                        Submit Loan Request
                    </CButton>
                </CModalFooter>
            </CModal>

            {/* REUSABLE AMORTIZATION SCHEDULE MODAL */}
            <AmortizationScheduleModal
                visible={showAmortizationModal}
                onClose={() => setShowAmortizationModal(false)}
                initialPrincipal={amortizationConfig.principal}
                initialInterestRate={amortizationConfig.interestRate}
                initialTenureMonths={amortizationConfig.tenureMonths}
                initialMethod={amortizationConfig.method}
                loanTitle={amortizationConfig.title}
            />
        </CRow>
    )
}

export default ManageMembersLoans
