import React, { useState, useMemo } from 'react'
import {
    CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton,
    CRow, CCol, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody,
    CTableDataCell, CFormSelect, CProgress, CCard, CCardBody
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCalculator, cilCloudDownload } from '@coreui/icons'
import { calculateAmortizationSchedule } from '../utils/amortizationCalculator'

const modalStyles = `
  .amortization-modal .modal-content {
      border-radius: 16px !important;
      overflow: hidden !important;
      border: none !important;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
  }
  .amortization-modal-header {
      background: var(--sacco-primary-gradient, linear-gradient(135deg, #0f4c81 0%, #1b5e9d 100%)) !important;
      border-bottom: none !important;
      padding: 1.5rem !important;
  }
  .amortization-modal-title {
      color: #ffffff !important;
      font-size: 1.25rem !important;
      font-weight: 700 !important;
      letter-spacing: -0.025em !important;
  }
  .amortization-modal .btn-close {
      filter: invert(1) grayscale(1) brightness(2) !important;
      opacity: 0.8 !important;
      transition: opacity 0.2s ease !important;
  }
  .amortization-modal .btn-close:hover {
      opacity: 1 !important;
  }
  .summary-card {
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      border-radius: 12px !important;
      border: 1px solid #e2e8f0 !important;
      background: #ffffff;
  }
  .summary-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
  .input-card {
      border-radius: 12px !important;
      border: 1px solid #e2e8f0 !important;
      background: #f8fafc !important;
  }
  .input-group-custom {
      display: flex;
      align-items: center;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      padding: 0 0.5rem;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }
  .input-group-custom:focus-within {
      border-color: var(--sacco-primary, #0f4c81);
      box-shadow: 0 0 0 3px rgba(15, 76, 129, 0.15);
  }
  .input-group-custom .input-addon {
      color: #94a3b8;
      font-size: 0.85rem;
      font-weight: 600;
      padding: 0 0.5rem;
      user-select: none;
  }
  .input-group-custom input {
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
  .custom-select-premium {
      background-color: #ffffff !important;
      border-radius: 8px !important;
      border: 1px solid #cbd5e1 !important;
      padding: 0.6rem 0.8rem !important;
      font-size: 0.9rem !important;
      transition: border-color 0.2s ease, box-shadow 0.2s ease !important;
      color: #1e293b !important;
      font-weight: 500 !important;
  }
  .custom-select-premium:focus {
      border-color: var(--sacco-primary, #0f4c81) !important;
      box-shadow: 0 0 0 3px rgba(15, 76, 129, 0.15) !important;
  }
  .ratio-container {
      background: #ffffff;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
      padding: 1.25rem;
  }
  .progress-custom {
      background-color: #f1f5f9 !important;
      border-radius: 9999px !important;
      height: 14px !important;
      overflow: hidden;
  }
  .schedule-table-container {
      border-radius: 12px;
      border: 1px solid #e2e8f0;
      overflow: hidden;
  }
  .schedule-table-container div::-webkit-scrollbar {
      width: 6px;
      height: 6px;
  }
  .schedule-table-container div::-webkit-scrollbar-track {
      background: #f1f5f9;
  }
  .schedule-table-container div::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 3px;
  }
  .schedule-table-container div::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
  }
  .schedule-table {
      font-size: 0.9rem;
  }
  .schedule-table thead th {
      background-color: #f8fafc !important;
      color: #475569 !important;
      font-weight: 600 !important;
      text-transform: uppercase;
      font-size: 0.75rem;
      letter-spacing: 0.05em;
      padding: 1rem !important;
      border-bottom: 2px solid #e2e8f0 !important;
  }
  .schedule-table tbody tr {
      transition: background-color 0.15s ease;
  }
  .schedule-table tbody tr:hover {
      background-color: #f8fafc !important;
  }
  .schedule-table tbody td {
      padding: 0.85rem 1rem !important;
      border-bottom: 1px solid #f1f5f9 !important;
  }
  .text-indigo { color: var(--sacco-primary, #0f4c81) !important; }
  .bg-indigo-subtle { background-color: var(--sacco-primary-soft, #dcecff) !important; color: var(--sacco-primary, #0f4c81) !important; }
  .text-sky { color: #0284c7 !important; }
  .bg-sky-subtle { background-color: #f0f9ff !important; color: #0369a1 !important; }
  .text-rose { color: #e11d48 !important; }
  .bg-rose-subtle { background-color: #fff1f2 !important; color: #be123c !important; }
  .text-emerald { color: #059669 !important; }
  .bg-emerald-subtle { background-color: #ecfdf5 !important; color: #065f46 !important; }
  .export-btn {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
      border: none !important;
      border-radius: 8px !important;
      padding: 0.6rem 1.2rem !important;
      font-weight: 600 !important;
      font-size: 0.9rem !important;
      transition: opacity 0.2s ease, transform 0.2s ease !important;
      box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.2) !important;
      color: #ffffff !important;
  }
  .export-btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 10px 15px -3px rgba(16, 185, 129, 0.3) !important;
      opacity: 0.95;
  }
  .close-modal-btn {
      border-radius: 8px !important;
      padding: 0.6rem 1.2rem !important;
      font-weight: 600 !important;
      font-size: 0.9rem !important;
  }
`;

const AmortizationScheduleModal = ({
    visible,
    onClose,
    initialPrincipal = 100000,
    initialInterestRate = 13.5,
    initialTenureMonths = 12,
    initialMethod = 'Reducing Balance',
    loanTitle = 'Loan Repayment Amortization Schedule'
}) => {
    const [principal, setPrincipal] = useState(initialPrincipal)
    const [interestRate, setInterestRate] = useState(initialInterestRate)
    const [tenureMonths, setTenureMonths] = useState(initialTenureMonths)
    const [method, setMethod] = useState(initialMethod)

    const result = useMemo(() => {
        return calculateAmortizationSchedule({
            principal,
            annualInterestRate: interestRate,
            tenureMonths,
            method
        })
    }, [principal, interestRate, tenureMonths, method])

    const principalPct = result.totalRepaymentAmount > 0 ? ((result.principal / result.totalRepaymentAmount) * 100).toFixed(1) : 0
    const interestPct = result.totalRepaymentAmount > 0 ? ((result.totalInterestPaid / result.totalRepaymentAmount) * 100).toFixed(1) : 0

    const handleExportCSV = () => {
        const headers = ['Month,Payment Date,Total Installment (PMT),Principal Portion,Interest Portion,Remaining Principal Balance,Cumulative Interest']
        const rows = result.schedule.map(s => `${s.month},"${s.date}","ETB ${s.totalPayment}","ETB ${s.principalPayment}","ETB ${s.interestPayment}","ETB ${s.remainingBalance}","ETB ${s.cumulativeInterest}"`)
        const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n')
        const encodedUri = encodeURI(csvContent)
        const link = document.createElement('a')
        link.setAttribute('href', encodedUri)
        link.setAttribute('download', `Amortization_Schedule_${principal}_ETB.csv`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <CModal visible={visible} onClose={onClose} size="xl" className="amortization-modal">
            <style dangerouslySetInnerHTML={{ __html: modalStyles }} />
            <CModalHeader className="amortization-modal-header">
                <CModalTitle className="amortization-modal-title d-flex align-items-center">
                    <CIcon icon={cilCalculator} className="me-2" size="lg" />
                    {loanTitle}
                </CModalTitle>
            </CModalHeader>
            <CModalBody className="p-4 bg-light-subtle">
                {/* Interactive Controls Bar */}
                <CCard className="input-card mb-4 shadow-sm">
                    <CCardBody className="p-4">
                        <div className="fw-bold text-dark mb-3 fs-6">Adjust Loan Parameters</div>
                        <CRow className="g-3">
                            <CCol md={3}>
                                <label className="form-label small fw-semibold text-secondary">Principal Amount</label>
                                <div className="input-group-custom">
                                    <span className="input-addon">ETB</span>
                                    <input
                                        type="number"
                                        step="5000"
                                        value={principal}
                                        onChange={(e) => setPrincipal(Number(e.target.value))}
                                    />
                                </div>
                            </CCol>
                            <CCol md={3}>
                                <label className="form-label small fw-semibold text-secondary">Annual Interest Rate</label>
                                <div className="input-group-custom">
                                    <input
                                        type="number"
                                        step="0.5"
                                        value={interestRate}
                                        onChange={(e) => setInterestRate(Number(e.target.value))}
                                    />
                                    <span className="input-addon">%</span>
                                </div>
                            </CCol>
                            <CCol md={3}>
                                <label className="form-label small fw-semibold text-secondary">Tenure (Months)</label>
                                <div className="input-group-custom">
                                    <input
                                        type="number"
                                        step="6"
                                        value={tenureMonths}
                                        onChange={(e) => setTenureMonths(Number(e.target.value))}
                                    />
                                    <span className="input-addon">Months</span>
                                </div>
                            </CCol>
                            <CCol md={3}>
                                <label className="form-label small fw-semibold text-secondary">Amortization Method</label>
                                <CFormSelect className="custom-select-premium" value={method} onChange={(e) => setMethod(e.target.value)}>
                                    <option value="Reducing Balance">Reducing Balance (Standard PMT)</option>
                                    <option value="Flat Rate">Flat Rate (Constant PMT)</option>
                                </CFormSelect>
                            </CCol>
                        </CRow>
                    </CCardBody>
                </CCard>

                {/* Key Financial Summary Widgets */}
                <CRow className="g-3 mb-4">
                    <CCol md={3}>
                        <div className="p-4 summary-card h-100" style={{ borderLeft: '5px solid var(--sacco-primary, #0f4c81)' }}>
                            <div className="text-secondary small fw-semibold uppercase tracking-wider mb-2" style={{ letterSpacing: '0.05em', fontSize: '0.75rem' }}>Monthly Installment (PMT)</div>
                            <div className="fs-3 fw-bold text-indigo">ETB {result.monthlyPaymentAvg.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                            <div className="small mt-2">
                                <span className="badge bg-indigo-subtle p-1 px-2 rounded">{method}</span>
                            </div>
                        </div>
                    </CCol>
                    <CCol md={3}>
                        <div className="p-4 summary-card h-100" style={{ borderLeft: '5px solid #0284c7' }}>
                            <div className="text-secondary small fw-semibold uppercase tracking-wider mb-2" style={{ letterSpacing: '0.05em', fontSize: '0.75rem' }}>Total Principal Repaid</div>
                            <div className="fs-3 fw-bold text-sky">ETB {result.principal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                            <div className="small mt-2">
                                <span className="badge bg-sky-subtle p-1 px-2 rounded">{principalPct}% of Total Payback</span>
                            </div>
                        </div>
                    </CCol>
                    <CCol md={3}>
                        <div className="p-4 summary-card h-100" style={{ borderLeft: '5px solid #e11d48' }}>
                            <div className="text-secondary small fw-semibold uppercase tracking-wider mb-2" style={{ letterSpacing: '0.05em', fontSize: '0.75rem' }}>Total Interest Paid</div>
                            <div className="fs-3 fw-bold text-rose">ETB {result.totalInterestPaid.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                            <div className="small mt-2">
                                <span className="badge bg-rose-subtle p-1 px-2 rounded">{interestPct}% Interest Burden</span>
                            </div>
                        </div>
                    </CCol>
                    <CCol md={3}>
                        <div className="p-4 summary-card h-100" style={{ borderLeft: '5px solid #059669' }}>
                            <div className="text-secondary small fw-semibold uppercase tracking-wider mb-2" style={{ letterSpacing: '0.05em', fontSize: '0.75rem' }}>Total Repayment</div>
                            <div className="fs-3 fw-bold text-emerald">ETB {result.totalRepaymentAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                            <div className="small mt-2">
                                <span className="badge bg-emerald-subtle p-1 px-2 rounded">Principal + Interest</span>
                            </div>
                        </div>
                    </CCol>
                </CRow>

                {/* Visual Ratio Bar */}
                <div className="mb-4 ratio-container shadow-sm">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                            <span className="fw-bold text-dark fs-6">Repayment Composition Ratio</span>
                            <div className="text-muted small">Visual breakdown of principal vs. interest cost</div>
                        </div>
                        <div className="d-flex gap-3 small">
                            <span className="d-flex align-items-center gap-2 fw-semibold" style={{ color: 'var(--sacco-primary, #0f4c81)' }}>
                                <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: 'var(--sacco-primary, #0f4c81)', display: 'inline-block' }}></span>
                                Principal: {principalPct}%
                            </span>
                            <span className="d-flex align-items-center gap-2 fw-semibold" style={{ color: '#e11d48' }}>
                                <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#e11d48', display: 'inline-block' }}></span>
                                Interest: {interestPct}%
                            </span>
                        </div>
                    </div>
                    <CProgress className="progress-custom">
                        <div style={{ width: `${principalPct}%`, backgroundColor: 'var(--sacco-primary, #0f4c81)' }}></div>
                        <div style={{ width: `${interestPct}%`, backgroundColor: '#e11d48' }}></div>
                    </CProgress>
                </div>

                {/* Full Month-by-Month Amortization Schedule Table */}
                <h6 className="fw-bold text-dark mb-3 mt-4 fs-6">Month-by-Month Repayment Breakdown</h6>
                <div className="schedule-table-container shadow-sm">
                    <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
                        <CTable hover responsive align="middle" className="mb-0 schedule-table">
                            <CTableHead style={{ position: 'sticky', top: 0, zIndex: 2 }}>
                                <CTableRow>
                                    <CTableHeaderCell>Month</CTableHeaderCell>
                                    <CTableHeaderCell>Payment Date</CTableHeaderCell>
                                    <CTableHeaderCell>Installment (PMT)</CTableHeaderCell>
                                    <CTableHeaderCell>Principal Portion</CTableHeaderCell>
                                    <CTableHeaderCell>Interest Portion</CTableHeaderCell>
                                    <CTableHeaderCell>Remaining Balance</CTableHeaderCell>
                                    <CTableHeaderCell>Cumulative Interest</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {result.schedule.map((s) => (
                                    <CTableRow key={s.month}>
                                        <CTableDataCell><span className="badge bg-light text-dark border p-2 px-3 fw-bold rounded-pill">{s.month}</span></CTableDataCell>
                                        <CTableDataCell className="small text-secondary fw-semibold">{s.date}</CTableDataCell>
                                        <CTableDataCell className="fw-bold text-indigo">ETB {s.totalPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</CTableDataCell>
                                        <CTableDataCell className="fw-semibold text-sky">ETB {s.principalPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</CTableDataCell>
                                        <CTableDataCell className="fw-semibold text-rose">ETB {s.interestPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</CTableDataCell>
                                        <CTableDataCell className="fw-extrabold text-dark">ETB {s.remainingBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</CTableDataCell>
                                        <CTableDataCell className="small text-muted fw-medium">ETB {s.cumulativeInterest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</CTableDataCell>
                                    </CTableRow>
                                ))}
                            </CTableBody>
                        </CTable>
                    </div>
                </div>
            </CModalBody>
            <CModalFooter className="bg-light border-top-0 p-3">
                <CButton color="secondary" onClick={onClose} className="close-modal-btn">Close</CButton>
                <CButton className="export-btn" onClick={handleExportCSV}>
                    <CIcon icon={cilCloudDownload} className="me-1" /> Export Schedule (CSV)
                </CButton>
            </CModalFooter>
        </CModal>
    )
}

export default AmortizationScheduleModal

