import React from 'react'
import { CRow, CCol, CCard, CCardBody } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilWallet, cilMoney, cilChartPie } from '@coreui/icons'

const WidgetsDropdown = ({ className }) => {
  return (
    <CRow className={className} xs={{ gutter: 3 }} sm={{ gutter: 4 }} lg={{ gutter: 4 }}>
      <CCol xs={12} sm={6} lg={4}>
        <CCard className="hover-card border-0 h-100" style={{ background: 'linear-gradient(135deg, #e8f3ff, #ffffff)', minHeight: '140px' }}>
          <CCardBody className="d-flex justify-content-between align-items-center p-3 p-sm-4">
            <div>
              <div className="text-medium-emphasis small mb-1">Total Savings</div>
              <div className="fs-5 fs-sm-4 fw-bold text-primary">ETB 25,000</div>
            </div>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#0f4c81', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <CIcon icon={cilWallet} size="lg" className="text-white" />
            </div>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol xs={12} sm={6} lg={4}>
        <CCard className="hover-card border-0 h-100" style={{ background: 'linear-gradient(135deg, #ffe9ef, #ffffff)', minHeight: '140px' }}>
          <CCardBody className="d-flex justify-content-between align-items-center p-3 p-sm-4">
            <div>
              <div className="text-medium-emphasis small mb-1">Active Loans</div>
              <div className="fs-5 fs-sm-4 fw-bold text-danger">ETB 12,000</div>
            </div>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#dc3545', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <CIcon icon={cilMoney} size="lg" className="text-white" />
            </div>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol xs={12} sm={6} lg={4}>
        <CCard className="hover-card border-0 h-100" style={{ background: 'linear-gradient(135deg, #eaf9f2, #ffffff)', minHeight: '140px' }}>
          <CCardBody className="d-flex justify-content-between align-items-center p-3 p-sm-4">
            <div>
              <div className="text-medium-emphasis small mb-1">Shares</div>
              <div className="fs-5 fs-sm-4 fw-bold text-success">ETB 8,500</div>
            </div>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#11a36a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <CIcon icon={cilChartPie} size="lg" className="text-white" />
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default WidgetsDropdown