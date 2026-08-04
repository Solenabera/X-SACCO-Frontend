import React from 'react'
import { CRow, CCol, CCard, CCardBody } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilWallet, cilMoney, cilChartPie } from '@coreui/icons'

const MemberOverviewCards = ({ className }) => {
  return (
    <div className={className}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <div className="text-primary fw-bold mb-1">Member Overview</div>
          <div className="small text-medium-emphasis">Savings summary, loan status, and share balance at a glance</div>
        </div>
        {/* <span className="badge rounded-pill text-bg-light text-primary border">Live Snapshot</span> */}
      </div>

      <CRow xs={{ gutter: 3 }} sm={{ gutter: 4 }} lg={{ gutter: 4 }}>

        <CCol xs={12} sm={6} lg={4}>
          <CCard className="hover-card border-0 h-100 shadow-sm" style={{ background: 'linear-gradient(135deg, #eaf9f2, #ffffff)', minHeight: '160px' }}>
            <CCardBody className="d-flex justify-content-between align-items-center p-3 p-sm-4">
              <div>
                <div className="text-medium-emphasis small mb-1">Share Balance</div>
                <div className="fs-5 fs-sm-4 fw-bold text-success">ETB 5,000</div>
                <div className="small text-success mt-1">5 new shares this quarter</div>
              </div>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#11a36a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <CIcon icon={cilChartPie} size="lg" className="text-white" />
              </div>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol xs={12} sm={6} lg={4}>
          <CCard className="hover-card border-0 h-100 shadow-sm" style={{ background: 'linear-gradient(135deg, #e8f3ff, #ffffff)', minHeight: '160px' }}>
            <CCardBody className="d-flex justify-content-between align-items-center p-3 p-sm-4">
              <div>
                <div className="text-medium-emphasis small mb-1">Savings Summary</div>
                <div className="fs-5 fs-sm-4 fw-bold text-primary">ETB 125,000</div>
                <div className="small text-success mt-1">+ 100% this month</div>
              </div>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#0f4c81', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <CIcon icon={cilWallet} size="lg" className="text-white" />
              </div>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol xs={12} sm={6} lg={4}>
          <CCard className="hover-card border-0 h-100 shadow-sm" style={{ background: 'linear-gradient(135deg, #f8f1ff, #ffffff)', minHeight: '160px' }}>
            <CCardBody className="d-flex justify-content-between align-items-center p-3 p-sm-4">
              <div>
                <div className="text-medium-emphasis small mb-1">Remaining Loan Amount</div>
                <div className="fs-5 fs-sm-4 fw-bold" style={{ color: '#5b4b8a' }}>ETB 500,000</div>
                <div className="small text-secondary mt-1">Upcoming due in 25 days</div>
              </div>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#7a5af8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <CIcon icon={cilMoney} size="lg" className="text-white" />
              </div>
            </CCardBody>
          </CCard>
        </CCol>

      </CRow>
    </div>
  )
}

export default MemberOverviewCards