import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
    CCollapse,
    CContainer,
    CNavbar,
    CNavbarBrand,
    CNavbarNav,
    CNavbarToggler,
} from '@coreui/react'

const publicNavItems = [
    { label: 'Home', href: '/', type: 'route' },
    { label: 'Savings', href: '/savings', type: 'route' },
    { label: 'Loans', href: '/loans', type: 'route' },
    { label: 'About Us', href: '/about', type: 'route' },
    { label: 'Contact Us', href: '/contact', type: 'route' },
    { label: 'Login', href: '/login', type: 'route' },
]

const PublicHeader = () => {
    const [visible, setVisible] = useState(false)
    const location = useLocation()

    const renderNavItem = (item) => {
        const baseClass = 'fw-semibold px-3 py-2 rounded-pill text-decoration-none'
        const commonOnClick = () => setVisible(false)

        if (item.type === 'route') {
            const isActive = location.pathname === item.href

            return (
                <Link
                    key={item.label}
                    to={item.href}
                    className={`${baseClass} ${isActive ? 'text-white' : 'text-primary'} d-inline-flex align-items-center`}
                    onClick={commonOnClick}
                    style={
                        isActive
                            ? {
                                  background: 'linear-gradient(135deg, #0f4c81 0%, #1b5e9d 100%)',
                              }
                            : {
                                  background: '#eff6ff',
                              }
                    }
                >
                    {item.label}
                </Link>
            )
        }

        return (
            <a
                key={item.label}
                href={item.href}
                className={`${baseClass} text-dark d-inline-flex align-items-center`}
                onClick={commonOnClick}
            >
                {item.label}
            </a>
        )
    }

    return (
        <CNavbar
            expand="lg"
            colorScheme="light"
            className="sticky-top border-bottom"
            style={{
                background: 'rgba(255,255,255,0.94)',
                backdropFilter: 'blur(14px)',
                boxShadow: '0 8px 30px rgba(15, 76, 129, 0.08)',
            }}
        >
            <CContainer fluid className="px-3 px-lg-5">
                <CNavbarBrand as={Link} to="/" className="fw-bold d-flex align-items-center gap-2 text-primary">
                    <span
                        className="d-inline-flex align-items-center justify-content-center rounded-circle text-white fw-bold"
                        style={{
                            width: '40px',
                            height: '40px',
                            background: 'linear-gradient(135deg, #0f4c81 0%, #1f6ea8 100%)',
                        }}
                    >
                        X
                    </span>
                    <span>X-SACCO</span>
                </CNavbarBrand>

                <CNavbarNav className="d-none d-lg-flex align-items-center gap-2 ms-auto">
                    {publicNavItems.map(renderNavItem)}
                </CNavbarNav>

                <CNavbarToggler
                    aria-label="Toggle navigation"
                    className="border-0 d-lg-none"
                    onClick={() => setVisible(!visible)}
                >
                    <span className="fs-5">{visible ? '✕' : '☰'}</span>
                </CNavbarToggler>

                <CCollapse className="d-lg-none w-100" visible={visible}>
                    <CNavbarNav className="align-items-start gap-2 py-3">
                        {publicNavItems.map(renderNavItem)}
                    </CNavbarNav>
                </CCollapse>
            </CContainer>
        </CNavbar>
    )
}

export default PublicHeader
