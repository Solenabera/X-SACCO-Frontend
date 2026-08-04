import React from 'react'
import MemberOverviewCards from './MemberOverviewCards'
import RecentTransaction from './RecentTransaction'
import { CCard, CCardBody, CCol, CRow } from '@coreui/react'

const MembersDashboard = () => {
  return (
    <>
      <MemberOverviewCards className="mb-4" />
      <RecentTransaction />

      <CRow className="g-4 mt-1">
        <CCol lg={6}>
          <CCard className="border-0 shadow-sm h-100">
            <CCardBody className="p-4">
              <div className="fw-bold text-primary mb-2">Savings Momentum</div>
              <p className="text-secondary mb-0">
                Your recurring savings are trending upward. Keep contributing regularly to build a stronger reserve and unlock more member benefits.
              </p>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol lg={6}>
          <CCard className="border-0 shadow-sm h-100">
            <CCardBody className="p-4">
              <div className="fw-bold text-primary mb-2">Loan Support</div>
              <p className="text-secondary mb-0">
                Review your remaining loan balance and plan upcoming repayments to stay aligned with your financial goals and member commitments.
              </p>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default MembersDashboard