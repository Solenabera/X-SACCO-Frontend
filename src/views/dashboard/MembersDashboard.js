import React, { useEffect, useState } from 'react'
import MemberOverviewCards from './MemberOverviewCards'
import RecentTransaction from './RecentTransaction'
import { CCard, CCardBody, CCol, CRow } from '@coreui/react'

import useApiFetch from '../../hooks/useAPIFetch';

const MembersDashboard = () => {
  const { data, isLoading } = useApiFetch(
    { url: '/member/dashboard', method: 'GET' },
    true
  );

  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState({
    currentSharePrice: 0,
    savingIncreaseRate: 0,
    loanExpiryDate: null,
    membershipStatus: 'PENDING'
  });

  useEffect(() => {
    if (!isLoading && data) {
      setTransactions(data?.data?.transactions ?? []);
      setStats({
        currentSharePrice: data?.data?.stats?.currentSharePrice ?? 0,
        savingIncreaseRate: data?.data?.stats?.savingIncreaseRate ?? 0,
        loanExpiryDate: data?.data?.stats?.loanExpiryDate ?? null,
        membershipStatus: data?.data?.stats?.membershipStatus ?? 'PENDING'
      });
    }
  }, [isLoading, data]);

  return (
    <>
      <MemberOverviewCards className="mb-4" data={data} isLoading={isLoading} stats={stats} />
      <RecentTransaction transactions={transactions} isLoading={isLoading} />

      <CRow className="g-3 mt-1">

        {/* Savings Momentum */}
        <CCol lg={3} sm={6}>
          <CCard className="border-0 shadow-sm h-100" style={{ background: 'linear-gradient(160deg,#e8f3ff 0%,#fff 100%)' }}>
            <CCardBody className="p-4">
              <div className="d-flex align-items-center gap-2 mb-3">
                <div style={{ width: 36, height: 36, borderRadius: 10, background: '#0f4c81', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '1rem' }}>💰</span>
                </div>
                <div className="fw-semibold small text-primary">Savings Momentum</div>
              </div>
              <div
                className="fw-bold mb-1"
                style={{ fontSize: '1.4rem', color: stats.savingIncreaseRate >= 0 ? '#059669' : '#dc2626' }}
              >
                {stats.savingIncreaseRate > 0 ? '↑' : stats.savingIncreaseRate < 0 ? '↓' : '→'} {Math.abs(stats.savingIncreaseRate)}%
              </div>
              <div className="small text-medium-emphasis mb-3">
                {stats.savingIncreaseRate > 0
                  ? 'Growth vs. last month — keep it up!'
                  : stats.savingIncreaseRate < 0
                    ? 'Dip vs. last month — consider topping up.'
                    : 'Steady — no change from last month.'}
              </div>
              <div
                className="rounded-pill"
                style={{ height: 5, background: '#e2e8f0' }}
              >
                <div
                  className="rounded-pill"
                  style={{
                    height: 5,
                    width: `${Math.min(Math.abs(stats.savingIncreaseRate), 100)}%`,
                    background: stats.savingIncreaseRate >= 0 ? 'linear-gradient(90deg,#0f4c81,#11a36a)' : '#dc2626',
                    transition: 'width 0.6s ease',
                  }}
                />
              </div>
            </CCardBody>
          </CCard>
        </CCol>

        {/* Loan Health */}
        <CCol lg={3} sm={6}>
          {(() => {
            const today = new Date()
            const expiry = stats.loanExpiryDate ? new Date(stats.loanExpiryDate) : null
            const daysLeft = expiry ? Math.ceil((expiry - today) / (1000 * 60 * 60 * 24)) : null
            const urgency = daysLeft !== null ? (daysLeft <= 14 ? 'danger' : daysLeft <= 30 ? 'warning' : 'ok') : 'none'
            const urgencyColor = { danger: '#dc2626', warning: '#d97706', ok: '#059669', none: '#64748b' }
            return (
              <CCard className="border-0 shadow-sm h-100" style={{ background: 'linear-gradient(160deg,#f8f1ff 0%,#fff 100%)' }}>
                <CCardBody className="p-4">
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: '#7a5af8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: '1rem' }}>🏦</span>
                    </div>
                    <div className="fw-semibold small" style={{ color: '#7a5af8' }}>Loan Health</div>
                  </div>
                  <div className="fw-bold mb-1" style={{ fontSize: '1.4rem', color: urgencyColor[urgency] }}>
                    {daysLeft !== null ? `${daysLeft}d` : '—'}
                  </div>
                  <div className="small text-medium-emphasis mb-3">
                    {daysLeft === null
                      ? 'No active loan on record.'
                      : daysLeft <= 14
                        ? '⚠️ Repayment due soon — act now!'
                        : daysLeft <= 30
                          ? 'Repayment approaching — plan ahead.'
                          : 'Loan is in good standing.'}
                  </div>
                  {daysLeft !== null && (
                    <div className="small" style={{ color: urgencyColor[urgency], fontWeight: 600 }}>
                      Expiry: {stats.loanExpiryDate ? new Date(stats.loanExpiryDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
                    </div>
                  )}
                </CCardBody>
              </CCard>
            )
          })()}
        </CCol>

        {/* Share Value */}
        <CCol lg={3} sm={6}>
          <CCard className="border-0 shadow-sm h-100" style={{ background: 'linear-gradient(160deg,#eaf9f2 0%,#fff 100%)' }}>
            <CCardBody className="p-4">
              <div className="d-flex align-items-center gap-2 mb-3">
                <div style={{ width: 36, height: 36, borderRadius: 10, background: '#11a36a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '1rem' }}>📈</span>
                </div>
                <div className="fw-semibold small text-success">Share Snapshot</div>
              </div>
              <div className="fw-bold mb-1" style={{ fontSize: '1.4rem', color: '#059669' }}>
                ETB {Number(stats.currentSharePrice).toLocaleString()}
              </div>
              <div className="small text-medium-emphasis mb-3">Current price per share</div>
              <div
                className="rounded-pill px-2 py-1 d-inline-flex align-items-center gap-1"
                style={{ background: '#d1fae5', fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}
              >
                <span>✔</span> Market rate active
              </div>
            </CCardBody>
          </CCard>
        </CCol>

        {/* Quick Action — Make Payment */}
        <CCol lg={3} sm={6}>
          <CCard
            className="border-0 shadow-sm h-100"
            style={{
              background: 'linear-gradient(135deg,#4f46e5 0%,#7c3aed 100%)',
              cursor: 'pointer',
            }}
            onClick={() => window.location.href = '/make-payments'}
          >
            <CCardBody className="p-4 d-flex flex-column justify-content-between">
              <div>
                <div className="d-flex align-items-center gap-2 mb-3">
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '1rem' }}>💳</span>
                  </div>
                  <div className="fw-semibold small" style={{ color: 'rgba(255,255,255,0.85)' }}>Quick Action</div>
                </div>
                <div className="fw-bold mb-1" style={{ color: '#fff', fontSize: '1.1rem' }}>Make a Payment</div>
                <div className="small" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  Upload a bank receipt for savings, shares, or loan repayments.
                </div>
              </div>
              <div
                className="mt-3 rounded-pill px-3 py-1 text-center"
                style={{ background: 'rgba(255,255,255,0.18)', color: '#fff', fontSize: '0.8rem', fontWeight: 600 }}
              >
                Go to Make Payment →
              </div>
            </CCardBody>
          </CCard>
        </CCol>

      </CRow>

    </>
  )
}

export default MembersDashboard