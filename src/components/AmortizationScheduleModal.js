import React, { useState, useMemo } from 'react'
import {
    CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton,
    CRow, CCol, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody,
    CTableDataCell, CBadge, CFormInput, CFormSelect, CProgress, CCard, CCardBody
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCalculator, cilCloudDownload } from '@coreui/icons'
import { calculateAmortizationSchedule } from '../utils/amortizationCalculator'

const AmortizationScheduleModal = ({
    visible,
    onClose,
    initialPrincipal = 100000,
    initialInterestRate = 12,
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
        <CModal visible={visible} onClose={onClose} size="xl">
            <CModalHeader className="bg-light">
                <CModalTitle className="fw-bold text-primary">
                    <CIcon icon={cilCalculator} className="me-2" />
                    {loanTitle}
                </CModalTitle>
            </CModalHeader>
            <CModalBody className="p-4">
                {/* Interactive Controls Bar */}
                <CCard className="border-0 shadow-sm mb-4 bg-light">
                    <CCardBody className="p-3">
                        <CRow className="g-3 align-items-center">
                            <CCol md={3}>
                                <label className="form-label small fw-semibold">Principal Amount (ETB)</label>
                                <CFormInput
                                    type="number"
                                    step="5000"
                                    value={principal}
                                    onChange={(e) => setPrincipal(Number(e.target.value))}
                                />
                            </CCol>
                            <CCol md={3}>
                                <label className="form-label small fw-semibold">Annual Interest Rate (%)</label>
                                <CFormInput
                                    type="number"
                                    step="0.5"
                                    value={interestRate}
                                    onChange={(e) => setInterestRate(Number(e.target.value))}
                                />
                            </CCol>
                            <CCol md={3}>
                                <label className="form-label small fw-semibold">Tenure (Months)</label>
                                <CFormSelect value={tenureMonths} onChange={(e) => setTenureMonths(Number(e.target.value))}>
                                    <option value={6}>6 Months</option>
                                    <option value={12}>12 Months</option>
                                    <option value={18}>18 Months</option>
                                    <option value={24}>24 Months</option>
                                    <option value={36}>36 Months</option>
                                    <option value={48}>48 Months</option>
                                </CFormSelect>
                            </CCol>
                            <CCol md={3}>
                                <label className="form-label small fw-semibold">Amortization Method</label>
                                <CFormSelect value={method} onChange={(e) => setMethod(e.target.value)}>
                                    <option value="Reducing Balance">Reducing Balance (Standard PMT)</option>
                                    <option value="Flat Rate">Flat Rate Method</option>
                                </CFormSelect>
                            </CCol>
                        </CRow>
                    </CCardBody>
                </CCard>

                {/* Key Financial Summary Widgets */}
                <CRow className="g-3 mb-4">
                    <CCol md={3}>
                        <div className="p-3 rounded-3 border bg-white shadow-sm h-100">
                            <div className="small text-muted fw-semibold">Monthly Installment (PMT)</div>
                            <div className="fs-3 fw-bold text-primary">ETB {result.monthlyPaymentAvg.toLocaleString()}</div>
                            <div className="small text-muted">{method}</div>
                        </div>
                    </CCol>
                    <CCol md={3}>
                        <div className="p-3 rounded-3 border bg-white shadow-sm h-100">
                            <div className="small text-muted fw-semibold">Total Principal Repaid</div>
                            <div className="fs-3 fw-bold text-dark">ETB {result.principal.toLocaleString()}</div>
                            <div className="small text-success">{principalPct}% of Total Payback</div>
                        </div>
                    </CCol>
                    <CCol md={3}>
                        <div className="p-3 rounded-3 border bg-white shadow-sm h-100">
                            <div className="small text-muted fw-semibold">Total Cumulative Interest</div>
                            <div className="fs-3 fw-bold text-danger">ETB {result.totalInterestPaid.toLocaleString()}</div>
                            <div className="small text-danger">{interestPct}% Total Interest Burden</div>
                        </div>
                    </CCol>
                    <CCol md={3}>
                        <div className="p-3 rounded-3 border bg-white shadow-sm h-100">
                            <div className="small text-muted fw-semibold">Total Repayment Amount</div>
                            <div className="fs-3 fw-bold text-success">ETB {result.totalRepaymentAmount.toLocaleString()}</div>
                            <div className="small text-muted">Principal + Total Interest</div>
                        </div>
                    </CCol>
                </CRow>

                {/* Visual Ratio Bar */}
                <div className="mb-4 bg-white p-3 rounded-3 border shadow-sm">
                    <div className="d-flex justify-content-between small fw-bold mb-1">
                        <span className="text-primary">Principal: ETB {result.principal.toLocaleString()} ({principalPct}%)</span>
                        <span className="text-danger">Interest: ETB {result.totalInterestPaid.toLocaleString()} ({interestPct}%)</span>
                    </div>
                    <CProgress className="rounded-pill" height={12}>
                        <div className="bg-primary" style={{ width: `${principalPct}%` }}></div>
                        <div className="bg-danger" style={{ width: `${interestPct}%` }}></div>
                    </CProgress>
                </div>

                {/* Full Month-by-Month Amortization Schedule Table */}
                <h6 className="fw-bold text-primary mb-3">Month-by-Month Repayment Breakdown</h6>
                <div style={{ maxHeight: '380px', overflowY: 'auto' }}>
                    <CTable hover responsive align="middle" className="mb-0 border">
                        <CTableHead style={{ position: 'sticky', top: 0, zIndex: 2 }}>
                            <CTableRow className="bg-light">
                                <CTableHeaderCell>Month #</CTableHeaderCell>
                                <CTableHeaderCell>Payment Date</CTableHeaderCell>
                                <CTableHeaderCell>Installment (PMT)</CTableHeaderCell>
                                <CTableHeaderCell className="text-primary">Principal Portion</CTableHeaderCell>
                                <CTableHeaderCell className="text-danger">Interest Portion</CTableHeaderCell>
                                <CTableHeaderCell>Remaining Balance</CTableHeaderCell>
                                <CTableHeaderCell>Cumulative Interest</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {result.schedule.map((s) => (
                                <CTableRow key={s.month}>
                                    <CTableDataCell className="fw-bold">{s.month}</CTableDataCell>
                                    <CTableDataCell className="small">{s.date}</CTableDataCell>
                                    <CTableDataCell className="fw-bold">ETB {s.totalPayment.toLocaleString()}</CTableDataCell>
                                    <CTableDataCell className="fw-semibold text-primary">ETB {s.principalPayment.toLocaleString()}</CTableDataCell>
                                    <CTableDataCell className="fw-semibold text-danger">ETB {s.interestPayment.toLocaleString()}</CTableDataCell>
                                    <CTableDataCell className="fw-bold text-dark">ETB {s.remainingBalance.toLocaleString()}</CTableDataCell>
                                    <CTableDataCell className="small text-muted">ETB {s.cumulativeInterest.toLocaleString()}</CTableDataCell>
                                </CTableRow>
                            ))}
                        </CTableBody>
                    </CTable>
                </div>
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={onClose}>Close</CButton>
                <CButton color="primary" onClick={handleExportCSV}>
                    <CIcon icon={cilCloudDownload} className="me-1" /> Export Schedule (CSV)
                </CButton>
            </CModalFooter>
        </CModal>
    )
}

export default AmortizationScheduleModal
