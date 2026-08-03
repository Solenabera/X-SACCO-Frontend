import React from 'react'
import { Link } from 'react-router-dom'
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CRow,
} from '@coreui/react'
import customColors from '../../../constants/colors'
import PublicHeader from '../../../components/public/PublicHeader'
import PublicFooter from '../../../components/public/PublicFooter'

const featureCards = [
    {
        title: 'What is a SACCO?',
        text: 'A SACCO is a member-owned financial cooperative that helps people save together, access affordable loans, and build long-term financial resilience through shared resources.',
    },
    {
        title: 'Savings Opportunities',
        text: 'Members can build discipline and wealth through recurring savings, secure deposits, and goal-focused financial planning designed to match everyday needs.',
    },
    {
        title: 'Buy Shares',
        text: 'Share ownership strengthens a member’s participation in the cooperative and creates a foundation for future credit, dividends, and stronger community growth.',
    },
]

const serviceCards = [
    {
        title: 'Save Money Securely',
        text: 'Open recurring savings plans, track each deposit, and grow your balance with confidence through a transparent member platform.',
    },
    {
        title: 'Manage Loan Requests',
        text: 'Submit applications, review repayment milestones, and stay informed on loan status through a digital member workflow.',
    },
    {
        title: 'Grow with Member Services',
        text: 'Access statements, updates, and financial support features designed to keep every member informed and supported.',
    },
]

const PublicLandingPage = () => {
    return (
        <div
            className="min-vh-100"
            style={{
                background:
                    'linear-gradient(180deg, #f5f9ff 0%, #eef5ff 48%, #ffffff 100%)',
                scrollBehavior: 'smooth',
            }}
        >
            <PublicHeader />

            <main id="home">
                <CContainer className="py-5 py-lg-6">
                    <CRow className="align-items-center g-4 g-lg-5">
                        <CCol lg={6} className="pe-lg-4">
                            <div className="mb-3 d-inline-flex align-items-center rounded-pill px-3 py-2 fw-semibold" style={{ color: customColors.headerBgColor, backgroundColor: '#dcecff' }}>
                                Secure fintech for members and growth-focused savings
                            </div>
                            <h1 className="display-5 fw-bold mb-3" style={{ color: '#0f4c81' }}>
                                Your financial journey starts with confidence.
                            </h1>
                            <p className="lead text-secondary mb-4" style={{ maxWidth: '640px' }}>
                                X-SACCO brings savings, loans, member services, and real-time financial visibility together in one modern digital experience.
                            </p>

                            <div className="d-flex flex-wrap gap-3 mb-4">
                                <Link to="/login">
                                    <CButton color="primary" size="lg" className="fw-semibold px-4 py-2">
                                        Sign In
                                    </CButton>
                                </Link>
                                <Link to="/register">
                                    <CButton color="success" size="lg" className="fw-semibold px-4 py-2">
                                        Open Account
                                    </CButton>
                                </Link>
                                <a href="#loans">
                                    <CButton color="secondary" size="lg" className="fw-semibold px-4 py-2">
                                        Apply for Loan
                                    </CButton>
                                </a>
                            </div>

                            <CRow className="g-3">
                                <CCol sm={4}>
                                    <div className="rounded-4 border-0 p-3 shadow-sm h-100" style={{ background: '#ffffff' }}>
                                        <div className="fw-bold" style={{ color: '#0f4c81' }}>24/7</div>
                                        <small className="text-secondary">Secure access</small>
                                    </div>
                                </CCol>
                                <CCol sm={4}>
                                    <div className="rounded-4 border-0 p-3 shadow-sm h-100" style={{ background: '#ffffff' }}>
                                        <div className="fw-bold" style={{ color: '#0f4c81' }}>Fast</div>
                                        <small className="text-secondary">Loan decisions</small>
                                    </div>
                                </CCol>
                                <CCol sm={4}>
                                    <div className="rounded-4 border-0 p-3 shadow-sm h-100" style={{ background: '#ffffff' }}>
                                        <div className="fw-bold" style={{ color: '#0f4c81' }}>Clear</div>
                                        <small className="text-secondary">Financial insights</small>
                                    </div>
                                </CCol>
                            </CRow>
                        </CCol>

                        <CCol lg={6}>
                            <CCard className="border-0 shadow-lg overflow-hidden">
                                <div
                                    className="px-4 py-4 text-white"
                                    style={{
                                        background: 'linear-gradient(135deg, #0f4c81 0%, #1b5e9d 100%)',
                                    }}
                                >
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <div>
                                            <div className="fw-semibold opacity-75">Member Snapshot</div>
                                            <div className="fs-4 fw-bold">Ready to grow</div>
                                        </div>
                                        <div className="rounded-pill px-3 py-1 bg-white text-primary small fw-bold">Live</div>
                                    </div>
                                    <CRow className="g-3">
                                        <CCol sm={6}>
                                            <div className="rounded-4 p-3" style={{ background: 'rgba(255,255,255,0.14)' }}>
                                                <div className="small opacity-75">Savings balance</div>
                                                <div className="fs-4 fw-bold">ETB 58,250</div>
                                            </div>
                                        </CCol>
                                        <CCol sm={6}>
                                            <div className="rounded-4 p-3" style={{ background: 'rgba(255,255,255,0.14)' }}>
                                                <div className="small opacity-75">Loan status</div>
                                                <div className="fs-4 fw-bold">Approved</div>
                                            </div>
                                        </CCol>
                                    </CRow>
                                </div>
                                <CCardBody className="p-4">
                                    <CRow className="g-3">
                                        {featureCards.map((card) => (
                                            <CCol md={4} key={card.title}>
                                                <div className="rounded-4 p-3 h-100 border" style={{ background: '#f7fbff' }}>
                                                    <div className="fw-bold mb-2" style={{ color: '#0f4c81' }}>
                                                        {card.title}
                                                    </div>
                                                    <div className="small text-secondary">{card.text}</div>
                                                </div>
                                            </CCol>
                                        ))}
                                    </CRow>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>
                </CContainer>

                <CContainer className="py-5">
                    <CRow className="g-4 mb-4">
                        {featureCards.map((card) => (
                            <CCol lg={4} key={card.title}>
                                <div className="rounded-4 p-4 h-100 shadow-sm" style={{ background: '#ffffff', border: '1px solid #dcecff' }}>
                                    <div className="text-primary fw-bold mb-2">{card.title}</div>
                                    <p className="text-secondary mb-0">{card.text}</p>
                                </div>
                            </CCol>
                        ))}
                    </CRow>

                    <div className="rounded-4 p-4 p-lg-5 mb-4 shadow-sm" style={{ background: 'linear-gradient(135deg, #0f4c81 0%, #1b5e9d 100%)' }}>
                        <CRow className="align-items-center g-3">
                            <CCol lg={8} className="text-white">
                                <div className="fw-semibold opacity-75">Member-first service</div>
                                <h3 className="fw-bold mb-2">Designed to help members save smarter, borrow responsibly, and grow together.</h3>
                                <p className="mb-0 opacity-90">From building a savings habit to managing shares and loans, every service is focused on clarity, trust, and financial confidence.</p>
                            </CCol>
                            <CCol lg={4} className="text-lg-end">
                                <Link to="/register">
                                    <CButton color="light" className="fw-bold px-4 py-2">
                                        Get Started
                                    </CButton>
                                </Link>
                            </CCol>
                        </CRow>
                    </div>

                    <CRow className="g-4">
                        <CCol lg={6} id="savings">
                            <div className="rounded-4 p-4 h-100 shadow-sm" style={{ background: '#ffffff', border: '1px solid #dcecff' }}>
                                <div className="text-primary fw-bold mb-2">Savings</div>
                                <h3 className="fw-bold mb-2" style={{ color: '#0f4c81' }}>Build savings with clarity and purpose</h3>
                                <p className="text-secondary mb-0">
                                    Members can plan deposits, grow a personal reserve, and track progress with a secure, easy-to-use savings experience. This helps members stay consistent, prepare for emergencies, and create long-term financial stability.
                                </p>
                            </div>
                        </CCol>
                        <CCol lg={6} id="loans">
                            <div className="rounded-4 p-4 h-100 shadow-sm" style={{ background: '#ffffff', border: '1px solid #dcecff' }}>
                                <div className="text-primary fw-bold mb-2">Loans</div>
                                <h3 className="fw-bold mb-2" style={{ color: '#0f4c81' }}>Responsive loan services that keep members moving forward</h3>
                                <p className="text-secondary mb-0">
                                    Apply for a loan, track approval steps, manage repayment plans, and stay informed throughout the full lifecycle of your request. Every step is designed for clarity, speed, and responsible member support.
                                </p>
                            </div>
                        </CCol>
                        <CCol lg={6} id="about">
                            <div className="rounded-4 p-4 h-100 shadow-sm" style={{ background: '#ffffff', border: '1px solid #dcecff' }}>
                                <div className="text-primary fw-bold mb-2">About Us</div>
                                <h3 className="fw-bold mb-2" style={{ color: '#0f4c81' }}>A trusted cooperative finance partner</h3>
                                <p className="text-secondary mb-0">
                                    X-SACCO combines cooperative values with modern digital systems so members can save, borrow, and grow with confidence.
                                </p>
                            </div>
                        </CCol>
                        <CCol lg={6} id="contact">
                            <div className="rounded-4 p-4 h-100 shadow-sm" style={{ background: '#ffffff', border: '1px solid #dcecff' }}>
                                <div className="text-primary fw-bold mb-2">Contact Us</div>
                                <h3 className="fw-bold mb-2" style={{ color: '#0f4c81' }}>Speak with our member support team</h3>
                                <p className="text-secondary mb-0">
                                    Reach out for onboarding, account support, savings guidance, or loan assistance through our dedicated support channels.
                                </p>
                            </div>
                        </CCol>
                    </CRow>

                    <CRow className="g-4 mt-1">
                        {serviceCards.map((card) => (
                            <CCol lg={4} key={card.title}>
                                <CCard className="border-0 shadow-sm h-100">
                                    <CCardBody className="p-4">
                                        <div className="fw-bold mb-2" style={{ color: '#0f4c81' }}>{card.title}</div>
                                        <div className="text-secondary">{card.text}</div>
                                    </CCardBody>
                                </CCard>
                            </CCol>
                        ))}
                    </CRow>
                </CContainer>
            </main>
            <PublicFooter />
        </div>
    )
}

export default PublicLandingPage
