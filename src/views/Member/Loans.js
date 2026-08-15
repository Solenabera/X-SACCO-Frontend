import React, { useState, useContext } from 'react'
import {
    CBadge,
    CButton,
    CCard,
    CCardBody,
    CCol,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CFormInput,
    CFormSelect,
    CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCheckCircle, cilMoney, cilPlus, cilCalculator } from '@coreui/icons'
import { UserContext } from '../../providers/userProvider'
import AmortizationScheduleModal from '../../components/AmortizationScheduleModal'
import PageHeader from '../../components/shared/PageHeader'
import StatusBadge from '../../components/shared/StatusBadge'

const activeLoansList = [
    {
        id: 'LN-201',
        type: 'Business Expansion Loan',
        principal: 50000,
        balance: 'ETB 18,500.00',
        dueDate: '2026-08-14',
        interestRate: 12,
        tenureMonths: 12,
        method: 'Reducing Balance',
        status: 'Active',
    },
    {
        id: 'LN-202',
        type: 'Emergency Support Loan',
        principal: 20000,
        balance: 'ETB 6,200.00',
        dueDate: '2026-08-30',
        interestRate: 9,
        tenureMonths: 6,
        method: 'Flat Rate',
        status: 'Active',
    },
]

const repaymentSchedule = [
    { date: '2026-08-05', amount: 'ETB 1,500.00', status: 'Pending' },
    { date: '2026-08-20', amount: 'ETB 1,500.00', status: 'Scheduled' },
    { date: '2026-09-05', amount: 'ETB 1,500.00', status: 'Scheduled' },
]

const ManageMembersLoans = () => {
    const { user } = useContext(UserContext)
    const [loans, setLoans] = useState(activeLoansList)
    const [showApplyModal, setShowApplyModal] = useState(false)
    const [toastMessage, setToastMessage] = useState('')

    // Amortization Modal State
    const [showAmortizationModal, setShowAmortizationModal] = useState(false)
    const [amortizationConfig, setAmortizationConfig] = useState({
        principal: 100000,
        interestRate: 12,
        tenureMonths: 12,
        method: 'Reducing Balance',
        title: 'Loan Repayment Amortization Schedule'
    })

    // Member profile stats (Default Dawit Tadesse stats for demo)
    const memberSavings = 45000 // Member's active savings balance
    const memberTenureMonths = 8 // Member has fulfilled 8 months of membership (>= 5 months requirement)
    const minRequiredTenureMonths = 5
    const maxLoanMultiplier = 4 // 25% savings requirement -> max 4x savings
    const maxEligibleLoan = memberSavings * maxLoanMultiplier // ETB 180,000

    // Loan Application Form State
    const [requestedAmount, setRequestedAmount] = useState(100000)
    const [loanType, setLoanType] = useState('Development Loan')
    const [tenureMonths, setTenureMonths] = useState(24)

    // Calculated Rule Metrics
    const savingsCoveragePct = requestedAmount > 0 ? ((memberSavings / requestedAmount) * 100).toFixed(1) : 0
    const isTenureEligible = memberTenureMonths >= minRequiredTenureMonths
    const isSavingsEligible = memberSavings >= (requestedAmount * 0.25)
    const isFormValid = isTenureEligible && isSavingsEligible && requestedAmount > 0

    const showToast = (msg) => {
        setToastMessage(msg)
        setTimeout(() => setToastMessage(''), 5000)
    }

    const openAmortizationForLoan = (loan) => {
        setAmortizationConfig({
            principal: loan.principal || 50000,
            interestRate: loan.interestRate || 12,
            tenureMonths: loan.tenureMonths || 12,
            method: loan.method || 'Reducing Balance',
            title: `Amortization Schedule: ${loan.type} (${loan.id})`
        })
        setShowAmortizationModal(true)
    }

    const handleApplyLoan = (e) => {
        e.preventDefault()
        if (!isFormValid) return

        const newLoan = {
            id: 'LN-' + Math.floor(200 + Math.random() * 800),
            type: loanType,
            principal: requestedAmount,
            balance: `ETB ${Number(requestedAmount).toLocaleString()}.00`,
            dueDate: '2026-09-30',
            interestRate: 13.5,
            tenureMonths: tenureMonths,
            method: 'Reducing Balance',
            status: 'Pending Appraisal',
        }

        setLoans([...loans, newLoan])
        setShowApplyModal(false)
        showToast(`Loan Application for ETB ${Number(requestedAmount).toLocaleString()} submitted for staff appraisal!`)
    }

    return (
        <CRow className="g-4">
            <CCol xs={12}>
                <PageHeader
                    icon={<CIcon icon={cilMoney} className="text-white" size="lg" />}
                    title="My Loans"
                    subtitle="Manage your active loans, repayments, and applications"
                    gradient="linear-gradient(135deg, #0f4c81, #1b6fb5)"
                />
            </CCol>

            {toastMessage && (
                <CCol xs={12}>
                    <CAlert color="success" dismissible className="border-0 shadow-sm fw-semibold mb-0">
                        {toastMessage}
                    </CAlert>
                </CCol>
            )}

            {/* Top Eligibility Policy Banner */}
            <CCol xs={12}>
                <CCard className="border-0 shadow-sm" style={{ background: 'linear-gradient(135deg, #0f4c81 0%, #1b5e9d 100%)', color: '#ffffff' }}>
                    <CCardBody className="p-4">
                        <CRow className="align-items-center g-3">
                            <CCol md={7}>
                                <h5 className="fw-bold mb-2">X-SACCO Loan Policy & Amortization Calculator</h5>
                                <div className="small opacity-90">
                                    Calculate month-by-month repayment installments, principal portions, and interest breakdowns.
                                </div>
                                <div className="d-flex gap-4 mt-3 flex-wrap">
                                    <div className="bg-white bg-opacity-10 p-2 px-3 rounded-3">
                                        <div className="small text-warning fw-semibold">1. Membership Tenure</div>
                                        <div className="fw-bold fs-6">≥ 6 Months Active Membership</div>
                                        <div className="small opacity-75">Your Tenure: <strong>{memberTenureMonths} Months</strong> (Eligible)</div>
                                    </div>
                                    <div className="bg-white bg-opacity-10 p-2 px-3 rounded-3">
                                        <div className="small text-warning fw-semibold">2. Minimum Savings Ratio</div>
                                        <div className="fw-bold fs-6">≥ 25% of Requested Loan (Max 4x)</div>
                                        <div className="small opacity-75">Your Savings: <strong>ETB {memberSavings.toLocaleString()}</strong> (Max Loan: ETB {maxEligibleLoan.toLocaleString()})</div>
                                    </div>
                                </div>
                            </CCol>
                            <CCol md={5} className="text-md-end d-flex gap-2 justify-content-md-end flex-wrap">
                                <CButton
                                    color="light"
                                    size="lg"
                                    className="fw-bold text-primary shadow-sm"
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
                                    className="text-white fw-bold shadow-sm"
                                    onClick={() => setShowApplyModal(true)}
                                >
                                    <CIcon icon={cilPlus} className="me-2" /> Apply For Loan
                                </CButton>
                            </CCol>
                        </CRow>
                    </CCardBody>
                </CCard>
            </CCol>

            <CCol xs={12}>
                <CCard className="border-0 shadow-sm">
                    <CCardBody className="p-4">
                        <div className="fw-bold text-primary fs-5 mb-3">Active & Applied Member Loans</div>

                        <CRow className="g-3">
                            {loans.map((loan) => (
                                <CCol md={6} key={loan.id}>
                                    <div className="rounded-4 p-3 border h-100 d-flex flex-column justify-content-between" style={{ background: '#f7fbff', borderColor: '#dcecff' }}>
                                        <div>
                                            <div className="d-flex justify-content-between align-items-start">
                                                <div className="fw-bold text-primary mb-2">{loan.type}</div>
                                                <StatusBadge status={loan.status} />
                                            </div>
                                            <div className="small text-secondary mb-1">Loan ID: {loan.id}</div>
                                            <div className="fs-5 fw-bold mb-2 text-dark">{loan.balance}</div>
                                            <div className="small mb-1"><strong>Due Date:</strong> {loan.dueDate}</div>
                                            <div className="small mb-2"><strong>Interest Terms:</strong> {loan.interestRate}% annual ({loan.method})</div>
                                        </div>
                                        <CButton
                                            color="primary"
                                            variant="outline"
                                            size="sm"
                                            className="mt-2 w-100"
                                            onClick={() => openAmortizationForLoan(loan)}
                                        >
                                            <CIcon icon={cilCalculator} className="me-1" /> View Amortization Schedule
                                        </CButton>
                                    </div>
                                </CCol>
                            ))}
                        </CRow>
                    </CCardBody>
                </CCard>
            </CCol>

            <CCol lg={6}>
                <CCard className="border-0 shadow-sm h-100">
                    <CCardBody className="p-4">
                        <div className="fw-bold text-primary mb-3">Upcoming Repayment Schedule</div>
                        <CTable hover responsive align="middle" className="mb-0">
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell>Date</CTableHeaderCell>
                                    <CTableHeaderCell>Amount</CTableHeaderCell>
                                    <CTableHeaderCell>Status</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {repaymentSchedule.map((item) => (
                                    <CTableRow key={`${item.date}-${item.amount}`}>
                                        <CTableDataCell>{item.date}</CTableDataCell>
                                        <CTableDataCell className="fw-semibold">{item.amount}</CTableDataCell>
                                        <CTableDataCell>
                                            <StatusBadge status={item.status} />
                                        </CTableDataCell>
                                    </CTableRow>
                                ))}
                            </CTableBody>
                        </CTable>
                    </CCardBody>
                </CCard>
            </CCol>

            <CCol lg={6}>
                <CCard className="border-0 shadow-sm h-100">
                    <CCardBody className="p-4">
                        <div className="fw-bold text-primary mb-3">Borrower Eligibility & Amortization Rules</div>
                        <p className="text-secondary mb-3">
                            Amortization schedules calculate monthly principal reduction and interest capitalization. Early repayments reduce cumulative interest costs under the Reducing Balance method.
                        </p>
                        <div className="rounded-4 p-3 border mb-3" style={{ background: '#f7fbff', borderColor: '#dcecff' }}>
                            <div className="small text-secondary mb-1">Your Max Borrowing Capacity</div>
                            <div className="fw-bold fs-4 text-success">ETB {maxEligibleLoan.toLocaleString()}</div>
                            <div className="small text-muted">Based on your ETB {memberSavings.toLocaleString()} savings balance (4x multiplier)</div>
                        </div>
                    </CCardBody>
                </CCard>
            </CCol>

            {/* MODAL 1: APPLY FOR LOAN WITH REAL-TIME VALIDATION */}
            <CModal visible={showApplyModal} onClose={() => setShowApplyModal(false)} size="lg">
                <CModalHeader className="bg-light">
                    <CModalTitle className="fw-bold text-primary">SACCO Loan Application Form</CModalTitle>
                </CModalHeader>
                <CModalBody className="p-4">
                    {/* Eligibility Rule Checks */}
                    <div className="mb-4">
                        <h6 className="fw-bold text-primary mb-2">X-SACCO Eligibility Check:</h6>
                        <CRow className="g-3">
                            <CCol md={6}>
                                <div className={`p-3 rounded-3 border ${isTenureEligible ? 'bg-success bg-opacity-10 border-success' : 'bg-danger bg-opacity-10 border-danger'}`}>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="fw-bold">1. Membership Tenure (≥5 Mo)</div>
                                        <CBadge color={isTenureEligible ? 'success' : 'danger'}>
                                            {isTenureEligible ? 'PASSED' : 'FAILED'}
                                        </CBadge>
                                    </div>
                                    <div className="small text-muted mt-1">
                                        You have completed <strong>{memberTenureMonths} months</strong> of membership (Min: 5 months).
                                    </div>
                                </div>
                            </CCol>
                            <CCol md={6}>
                                <div className={`p-3 rounded-3 border ${isSavingsEligible ? 'bg-success bg-opacity-10 border-success' : 'bg-danger bg-opacity-10 border-danger'}`}>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="fw-bold">2. 25% Savings Coverage</div>
                                        <CBadge color={isSavingsEligible ? 'success' : 'danger'}>
                                            {isSavingsEligible ? 'PASSED' : 'FAILED'}
                                        </CBadge>
                                    </div>
                                    <div className="small text-muted mt-1">
                                        Savings coverage: <strong>{savingsCoveragePct}%</strong> (Min required: 25.0%).
                                    </div>
                                </div>
                            </CCol>
                        </CRow>
                    </div>

                    {!isSavingsEligible && (
                        <CAlert color="danger" className="mb-4 border-0 shadow-sm fw-semibold">
                            ⚠️ Requested loan of ETB {Number(requestedAmount).toLocaleString()} exceeds your maximum borrowing limit of ETB {maxEligibleLoan.toLocaleString()} (Requires at least 25% savings collateral). Please reduce the requested loan amount.
                        </CAlert>
                    )}

                    <form onSubmit={handleApplyLoan}>
                        <CRow className="g-3">
                            <CCol md={6}>
                                <label className="form-label fw-semibold">Select Loan Product</label>
                                <CFormSelect value={loanType} onChange={(e) => setLoanType(e.target.value)}>
                                    <option value="Normal Development Loan">Normal Development Loan (13.5% p.a. Reducing Balance)</option>
                                    <option value="Emergency Support Loan">Emergency Support Loan (9.0% p.a. Flat Rate)</option>
                                    <option value="SME Business Expansion Loan">SME Business Expansion Loan (14.5% p.a.)</option>
                                </CFormSelect>
                            </CCol>

                            <CCol md={6}>
                                <label className="form-label fw-semibold">Requested Amount (ETB)</label>
                                <CFormInput
                                    type="number"
                                    step="1000"
                                    value={requestedAmount}
                                    onChange={(e) => setRequestedAmount(Number(e.target.value))}
                                    required
                                />
                                <small className="text-muted">Maximum eligible based on savings: ETB {maxEligibleLoan.toLocaleString()}</small>
                            </CCol>

                            <CCol md={6}>
                                <label className="form-label fw-semibold">Repayment Tenure (Months)</label>
                                <CFormSelect value={tenureMonths} onChange={(e) => setTenureMonths(Number(e.target.value))}>
                                    <option value={6}>6 Months</option>
                                    <option value={12}>12 Months</option>
                                    <option value={24}>24 Months</option>
                                    <option value={36}>36 Months</option>
                                </CFormSelect>
                            </CCol>

                            <CCol md={6}>
                                <label className="form-label fw-semibold">Your Active Savings Balance</label>
                                <CFormInput value={`ETB ${memberSavings.toLocaleString()}`} disabled readOnly />
                            </CCol>

                            <CCol md={12}>
                                <div className="p-3 bg-light rounded-3 border mt-2">
                                    <h6 className="fw-bold text-primary mb-2">📄 Guarantor Pledged Collateral & Official Work Verification Letter</h6>
                                    <p className="small text-muted mb-3">
                                        Attach the official employment / salary deduction guarantee letter from your guarantor's employer (signed and stamped by HR/Payroll).
                                    </p>
                                    <CRow className="g-3">
                                        <CCol md={6}>
                                            <label className="form-label small fw-semibold">Primary Guarantor Name</label>
                                            <CFormSelect defaultValue="Alemayehu Worku">
                                                <option value="Alemayehu Worku">Alemayehu Worku (Ethiopian Airlines - ETB 60,000 Pledged)</option>
                                                <option value="Tizita Alemu">Tizita Alemu (Ethio Telecom - ETB 60,000 Pledged)</option>
                                                <option value="Solomon Bekele">Solomon Bekele (CBE - ETB 50,000 Pledged)</option>
                                            </CFormSelect>
                                        </CCol>
                                        <CCol md={6}>
                                            <label className="form-label small fw-semibold">Upload Official Guarantor Work Letter (PDF / Scan)</label>
                                            <input type="file" className="form-control" accept=".pdf,.jpg,.jpeg,.png" />
                                            <small className="text-muted">Must include employer seal & monthly salary verification</small>
                                        </CCol>
                                    </CRow>
                                </div>
                            </CCol>
                        </CRow>
                    </form>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setShowApplyModal(false)}>Cancel</CButton>
                    <CButton
                        color="primary"
                        variant="outline"
                        onClick={() => {
                            setAmortizationConfig({
                                principal: requestedAmount,
                                interestRate: 13.5,
                                tenureMonths: tenureMonths,
                                method: 'Reducing Balance',
                                title: `Preview Amortization: ${loanType} (ETB ${requestedAmount.toLocaleString()})`
                            })
                            setShowAmortizationModal(true)
                        }}
                    >
                        <CIcon icon={cilCalculator} className="me-1" /> Preview Amortization Table
                    </CButton>
                    <CButton
                        color="success"
                        className="text-white fw-bold"
                        disabled={!isFormValid}
                        onClick={handleApplyLoan}
                    >
                        <CIcon icon={cilCheckCircle} className="me-1" /> Submit Loan Request
                    </CButton>
                </CModalFooter>
            </CModal>

            {/* MODAL 2: REUSABLE AMORTIZATION SCHEDULE MODAL */}
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
