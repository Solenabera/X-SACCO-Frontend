import React, { useEffect, useState } from 'react'
import { CRow, CCol, CCard, CCardBody } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilWallet, cilMoney, cilChartPie } from '@coreui/icons'

const formatDate = (value) => {
  if (!value) return 'Not Available';
  const d = new Date(value);
  return isNaN(d) ? 'Not Available' : d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

const MemberOverviewCards = ({ className, data, isLoading, stats = {} }) => {
  const [shareBalance, setShareBalance] = useState(0);
  const [savingBalance, setSavingBalance] = useState(0);
  const [loanBalance, setLoanBalance] = useState(0);

  const {
    currentSharePrice = 0,
    savingIncreaseRate = 0,
    loanExpiryDate = null,
  } = stats;

  useEffect(() => {
    if (!isLoading && data) {
      setShareBalance(data?.data?.share?.amount ?? 0);
      setSavingBalance(data?.data?.saving?.balance ?? 0);
      setLoanBalance(data?.data?.loan?.outstandingBalance ?? 0);
    }
  }, [isLoading, data]);

  const increaseLabel = savingIncreaseRate > 0
    ? `↑ ${savingIncreaseRate}% vs last month`
    : savingIncreaseRate < 0
      ? `↓ ${Math.abs(savingIncreaseRate)}% vs last month`
      : 'No change';

  const increaseColor = savingIncreaseRate >= 0 ? 'text-success' : 'text-danger';

  return (
    <div className={className}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <div className="text-primary fw-bold mb-1">Member Overview</div>
          <div className="small text-medium-emphasis">Share balance, savings summary, and loan status at a glance</div>
        </div>
      </div>

      <CRow xs={{ gutter: 3 }} sm={{ gutter: 4 }} lg={{ gutter: 4 }}>

        {/* Share Balance */}
        <CCol xs={12} sm={6} lg={4}>
          <CCard className="hover-card border-0 h-100 shadow-sm" style={{ background: 'linear-gradient(135deg, #eaf9f2, #ffffff)', minHeight: '160px' }}>
            <CCardBody className="d-flex justify-content-between align-items-center p-3 p-sm-4">
              <div>
                <div className="text-medium-emphasis small mb-1">Share Balance</div>
                <div className="fs-5 fw-bold text-success">
                  {isLoading ? '—' : `${shareBalance} ${Number(shareBalance) === 1 ? 'Share' : 'Shares'}`}
                </div>
                <div className="small text-success mt-1">
                  {isLoading ? '-' : "Current Share Price: ETB " + Number(currentSharePrice)}
                </div>
              </div>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#11a36a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <CIcon icon={cilChartPie} size="lg" className="text-white" />
              </div>
            </CCardBody>
          </CCard>
        </CCol>

        {/* Savings Summary */}
        <CCol xs={12} sm={6} lg={4}>
          <CCard className="hover-card border-0 h-100 shadow-sm" style={{ background: 'linear-gradient(135deg, #e8f3ff, #ffffff)', minHeight: '160px' }}>
            <CCardBody className="d-flex justify-content-between align-items-center p-3 p-sm-4">
              <div>
                <div className="text-medium-emphasis small mb-1">Savings Summary</div>
                <div className="fs-5 fw-bold text-primary">
                  {isLoading ? '—' : `ETB ${Number(savingBalance).toLocaleString()}`}
                </div>
                <div className={`small mt-1 ${increaseColor}`}>
                  {isLoading ? '—' : increaseLabel}
                </div>
              </div>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#0f4c81', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <CIcon icon={cilWallet} size="lg" className="text-white" />
              </div>
            </CCardBody>
          </CCard>
        </CCol>

        {/* Remaining Loan Amount */}
        <CCol xs={12} sm={6} lg={4}>
          <CCard className="hover-card border-0 h-100 shadow-sm" style={{ background: 'linear-gradient(135deg, #f8f1ff, #ffffff)', minHeight: '160px' }}>
            <CCardBody className="d-flex justify-content-between align-items-center p-3 p-sm-4">
              <div>
                <div className="text-medium-emphasis small mb-1">Remaining Loan Amount</div>
                <div className="fs-5 fw-bold" style={{ color: '#5b4b8a' }}>
                  {isLoading ? '—' : `ETB ${Number(loanBalance).toLocaleString()}`}
                </div>
                <div className="small text-secondary mt-1">
                  {isLoading ? '—' : `Expiry Date: ${formatDate(loanExpiryDate)}`}
                </div>
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