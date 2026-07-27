import React from 'react'
import { CRow, CCol, CCard, CCardBody } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilWallet, cilMoney, cilChartPie } from '@coreui/icons'

const WidgetsDropdown = ({ className }) => {
  return (
    <>
      <style>
        {`
          .hover-card {
            border-radius: 14px;
            transition: all 0.3s ease;
            cursor: pointer;
          }

          .hover-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 12px 28px rgba(0,0,0,0.15);
          }
        `}
      </style>

      <CRow
        className={className}
        xs={{ gutter: 3 }}
        sm={{ gutter: 4 }}
        lg={{ gutter: 4 }}
      >

        {/* SAVINGS */}
        <CCol xs={12} sm={6} lg={4}>
          <CCard
            className="hover-card border-0 h-100"
            style={{
              background: 'linear-gradient(135deg, #e3f2fd, #ffffff)',
              minHeight: '130px',
            }}
          >
            <CCardBody className="d-flex justify-content-between align-items-center p-3 p-sm-4">

              <div>
                <div className="text-medium-emphasis small mb-1">
                  Total Savings
                </div>
                <div className="fs-5 fs-sm-4 fw-bold">
                  ETB 25,000
                </div>
              </div>

              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: '#0d6efd',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <CIcon icon={cilWallet} size="lg" className="text-white" />
              </div>

            </CCardBody>
          </CCard>
        </CCol>

        {/* LOANS */}
        <CCol xs={12} sm={6} lg={4}>
          <CCard
            className="hover-card border-0 h-100"
            style={{
              background: 'linear-gradient(135deg, #fdecea, #ffffff)',
              minHeight: '130px',
            }}
          >
            <CCardBody className="d-flex justify-content-between align-items-center p-3 p-sm-4">

              <div>
                <div className="text-medium-emphasis small mb-1">
                  Active Loans
                </div>
                <div className="fs-5 fs-sm-4 fw-bold">
                  ETB 12,000
                </div>
              </div>

              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: '#dc3545',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <CIcon icon={cilMoney} size="lg" className="text-white" />
              </div>

            </CCardBody>
          </CCard>
        </CCol>

        {/* SHARES */}
        <CCol xs={12} sm={6} lg={4}>
          <CCard
            className="hover-card border-0 h-100"
            style={{
              background: 'linear-gradient(135deg, #e8f5e9, #ffffff)',
              minHeight: '130px',
            }}
          >
            <CCardBody className="d-flex justify-content-between align-items-center p-3 p-sm-4">

              <div>
                <div className="text-medium-emphasis small mb-1">
                  Shares
                </div>
                <div className="fs-5 fs-sm-4 fw-bold">
                  ETB 8,500
                </div>
              </div>

              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: '#198754',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <CIcon icon={cilChartPie} size="lg" className="text-white" />
              </div>

            </CCardBody>
          </CCard>
        </CCol>

      </CRow>
    </>
  )
}

export default WidgetsDropdown