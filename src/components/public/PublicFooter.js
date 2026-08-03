import React from 'react'
import { Link } from 'react-router-dom'
import { CContainer, CRow, CCol } from '@coreui/react'

const quickLinks = [
    { label: 'Home', to: '/' },
    { label: 'Savings', to: '/savings' },
    { label: 'Loans', to: '/loans' },
    { label: 'About Us', to: '/about' },
    { label: 'Contact Us', to: '/contact' },
]

const PublicFooter = () => {
    return (
        <footer className="mt-auto border-top" style={{ background: '#0f4c81', color: '#ffffff' }}>
            <CContainer className="py-4 py-lg-5">
                <CRow className="g-4">
                    <CCol lg={4}>
                        <div className="fw-bold fs-5 mb-3">X-SACCO</div>
                        <p className="mb-2 opacity-75">
                            A modern member-owned financial cooperative built to help people save, borrow, and grow with confidence.
                        </p>
                        <div className="small opacity-75">© 2026 X-SACCO. All rights reserved.</div>
                    </CCol>

                    <CCol lg={4}>
                        <div className="fw-bold mb-3">Quick Links</div>
                        <div className="d-flex flex-column gap-2">
                            {quickLinks.map((link) => (
                                <Link key={link.label} to={link.to} className="text-decoration-none text-white opacity-85">
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </CCol>

                    <CCol lg={4}>
                        <div className="fw-bold mb-3">Contact</div>
                        <div className="small opacity-85 mb-2">Email: support@xsacco.org</div>
                        <div className="small opacity-85 mb-2">Phone: +251 911 234 567</div>
                        <div className="small opacity-85 mb-2">Address: Addis Ababa, Ethiopia</div>
                        <div className="d-flex gap-3 mt-3">
                            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-white opacity-85 text-decoration-none">Facebook</a>
                            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-white opacity-85 text-decoration-none">Twitter</a>
                            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-white opacity-85 text-decoration-none">LinkedIn</a>
                        </div>
                    </CCol>
                </CRow>
            </CContainer>
        </footer>
    )
}

export default PublicFooter
