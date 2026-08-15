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
    membershipStatus = 'PENDING'
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
      {/* ── Attractive section header ── */}
      <div
        className="rounded-4 mb-4 p-4"
        style={{
          background: 'linear-gradient(135deg, #0f4c81 0%, #1b6fb5 55%, #11a36a 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative blurred circles */}
        <div style={{
          position: 'absolute', top: -30, right: -30,
          width: 140, height: 140, borderRadius: '50%',
          background: 'rgba(255,255,255,0.07)', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: -20, right: 80,
          width: 80, height: 80, borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)', pointerEvents: 'none',
        }} />

        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3" style={{ position: 'relative', zIndex: 1 }}>
          <div>
            <div
              className="fw-bold mb-1"
              style={{ color: '#fff', fontSize: '1.25rem', letterSpacing: '-0.01em' }}
            >
              Member Overview
            </div>
            <div style={{ color: 'rgba(255,255,255,0.72)', fontSize: '0.84rem' }}>
              Share balance, savings summary, and loan status at a glance
            </div>
          </div>

          {/* Live indicator badge */}
          <div
            className="d-flex align-items-center gap-2 px-3 py-2 rounded-pill"
            style={{ background: 'rgba(255,255,255,0.13)', backdropFilter: 'blur(8px)' }}
          >
            <span style={{
              width: 8, height: 8, borderRadius: '50%', background: '#4ade80',
              boxShadow: '0 0 0 3px rgba(74,222,128,0.3)',
              display: 'inline-block', flexShrink: 0,
            }} />
            <span style={{ color: '#fff', fontSize: '0.78rem', fontWeight: 600 }}>{membershipStatus} Member</span>
          </div>
        </div>

        {/* Shimmer divider */}
        <div style={{
          marginTop: '1rem',
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)',
        }} />

        {/* Sub-stat strip */}
        <div className="d-flex gap-4 flex-wrap mt-3" style={{ position: 'relative', zIndex: 1 }}>
          {[
            { label: 'Shares', value: isLoading ? '—' : `${shareBalance}`, unit: shareBalance <= 1 ? 'unit' : 'units' },
            { label: 'Savings', value: isLoading ? '—' : `ETB ${Number(savingBalance).toLocaleString()}`, unit: '' },
            { label: 'Loan', value: isLoading ? '—' : `ETB ${Number(loanBalance).toLocaleString()}`, unit: 'outstanding' },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '1rem' }}>
                {s.value} <span style={{ fontWeight: 400, fontSize: '0.78rem', opacity: 0.7 }}>{s.unit}</span>
              </div>
            </div>
          ))}
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
                  {isLoading ? '—' : `${shareBalance} ${Number(shareBalance) <= 1 ? 'Share' : 'Shares'}`}
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
                  {isLoading ? '—' : Number(loanBalance) > 0 ? `Expiry Date: ${formatDate(loanExpiryDate)} ` : "No active loan on record."}
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