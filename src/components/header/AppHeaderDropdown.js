import React, { useEffect, useState, useCallback, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import {
    CAvatar,
    CBadge,
    CDropdown,
    CDropdownDivider,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
} from '@coreui/react'
import {
    cilBell,
    cilCreditCard,
    cilSettings,
    cilUser,
    cilAccountLogout,
    cilShieldAlt,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import avatar8 from './../../assets/images/avatars/8.jpg'
import { UserContext } from '../../providers/userProvider';

const AppHeaderDropdown = () => {
    const navigate = useNavigate();
    const { user, setUser, getStorage, clearStorage } = useContext(UserContext);
    const handleLogout = useCallback(() => {
        setUser()
        clearStorage()
        navigate('/login');
    }, [navigate, setUser, clearStorage]);
    const displayName = user?.fullName || (user?.firstName
        ? `${user.firstName} ${user.lastName || ''}`.trim()
        : 'Member');
    const displaySub = user?.email || user?.phoneNumber || '';

    /* ── Inline styles ── */
    const menuStyle = {
        minWidth: '260px',
        padding: '0',
        border: 'none',
        borderRadius: '16px',
        boxShadow: '0 20px 60px rgba(15,76,129,0.18), 0 4px 16px rgba(15,76,129,0.08)',
        overflow: 'hidden',
        backdropFilter: 'blur(16px)',
    }

    const headerSectionStyle = {
        background: 'linear-gradient(135deg, #0f4c81 0%, #1b6fba 100%)',
        padding: '18px 20px 16px',
    }

    const avatarRingStyle = {
        width: '52px',
        height: '52px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #ffffff33, #ffffff66)',
        border: '2.5px solid rgba(255,255,255,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        flexShrink: 0,
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    }

    const onlineDotStyle = {
        width: '10px', height: '10px',
        borderRadius: '50%',
        background: '#22d3a5',
        border: '2px solid #0f4c81',
        position: 'absolute',
        bottom: '1px', right: '1px',
    }

    const sectionLabelStyle = {
        fontSize: '0.65rem',
        fontWeight: 700,
        letterSpacing: '0.08em',
        color: '#8fa8bf',
        padding: '10px 18px 4px',
        textTransform: 'uppercase',
        background: 'transparent',
    }

    const menuItemStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px 18px',
        fontSize: '0.875rem',
        fontWeight: 500,
        color: '#1e3a5f',
        cursor: 'pointer',
        transition: 'background 0.18s ease, color 0.18s ease',
        borderRadius: '0',
    }

    const iconWrapStyle = (color) => ({
        width: '30px', height: '30px',
        borderRadius: '8px',
        background: color,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
    })

    const logoutItemStyle = {
        ...menuItemStyle,
        color: '#dc3545',
    }

    return (
        <CDropdown variant="nav-item">
            {/* ── Toggle Button ── */}
            <CDropdownToggle
                placement="bottom-end"
                className="py-0 pe-0"
                caret={false}
                style={{ background: 'none', border: 'none', padding: 0 }}
            >
                <div style={{
                    position: 'relative',
                    display: 'inline-flex',
                    borderRadius: '50%',
                    padding: '2px',
                    background: 'linear-gradient(135deg, #0f4c81, #1b6fba)',
                    boxShadow: '0 2px 8px rgba(15,76,129,0.3)',
                    transition: 'box-shadow 0.2s ease',
                    cursor: 'pointer',
                }}>
                    <CAvatar src={avatar8} size="md" style={{ border: '2px solid white', borderRadius: '50%' }} />
                    <span style={{
                        position: 'absolute', bottom: '2px', right: '2px',
                        width: '10px', height: '10px',
                        background: '#22d3a5', borderRadius: '50%',
                        border: '2px solid white',
                        boxShadow: '0 0 0 2px rgba(34,211,165,0.3)',
                    }} />
                </div>
            </CDropdownToggle>

            {/* ── Dropdown Menu ── */}
            <CDropdownMenu className="pt-0" placement="bottom-end" style={menuStyle}>

                {/* Profile Header */}
                <div style={headerSectionStyle}>
                    <div className="d-flex align-items-center gap-3">
                        <div style={{ position: 'relative' }}>
                            <div style={avatarRingStyle}>
                                <CAvatar src={avatar8} size="md" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <span style={onlineDotStyle} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{
                                color: '#ffffff', fontWeight: 700, fontSize: '0.92rem',
                                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                            }}>
                                {displayName}
                            </div>
                            <div style={{
                                color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem',
                                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                                marginTop: '2px',
                            }}>
                                {displaySub}
                            </div>
                            <div style={{
                                display: 'inline-flex', alignItems: 'center', gap: '4px',
                                marginTop: '6px',
                                background: 'rgba(34,211,165,0.2)',
                                border: '1px solid rgba(34,211,165,0.4)',
                                borderRadius: '20px', padding: '1px 8px',
                            }}>
                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22d3a5' }} />
                                <span style={{ fontSize: '0.65rem', color: '#a5f3db', fontWeight: 600 }}>Active</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Account Section */}
                <div style={{ background: '#ffffff', paddingBottom: '4px' }}>
                    <div style={sectionLabelStyle}>Account</div>

                    <CDropdownItem href="/profile" style={menuItemStyle}>
                        <span style={iconWrapStyle('rgba(15,76,129,0.08)')}>
                            <CIcon icon={cilUser} style={{ width: '15px', height: '15px', color: '#0f4c81' }} />
                        </span>
                        Profile
                    </CDropdownItem>

                    <CDropdownItem href="#" style={menuItemStyle}>
                        <span style={iconWrapStyle('rgba(102,16,242,0.08)')}>
                            <CIcon icon={cilSettings} style={{ width: '15px', height: '15px', color: '#6610f2' }} />
                        </span>
                        Settings
                    </CDropdownItem>

                    <CDropdownItem href="#" style={menuItemStyle}>
                        <span style={iconWrapStyle('rgba(25,135,84,0.08)')}>
                            <CIcon icon={cilCreditCard} style={{ width: '15px', height: '15px', color: '#198754' }} />
                        </span>
                        Payments
                        <CBadge color="secondary" className="ms-auto" style={{ fontSize: '0.65rem' }}>42</CBadge>
                    </CDropdownItem>

                    <CDropdownItem href="#" style={menuItemStyle}>
                        <span style={iconWrapStyle('rgba(13,110,253,0.08)')}>
                            <CIcon icon={cilBell} style={{ width: '15px', height: '15px', color: '#0d6efd' }} />
                        </span>
                        Updates
                        <CBadge color="info" className="ms-auto" style={{ fontSize: '0.65rem' }}>42</CBadge>
                    </CDropdownItem>

                    <CDropdownItem href="#" style={menuItemStyle}>
                        <span style={iconWrapStyle('rgba(220,53,69,0.08)')}>
                            <CIcon icon={cilShieldAlt} style={{ width: '15px', height: '15px', color: '#dc3545' }} />
                        </span>
                        Security
                    </CDropdownItem>
                </div>

                <CDropdownDivider style={{ margin: '0' }} />

                {/* Logout */}
                <div style={{ background: '#ffffff', paddingTop: '2px', paddingBottom: '4px' }}>
                    <CDropdownItem href="#" onClick={handleLogout} style={logoutItemStyle}>
                        <span style={iconWrapStyle('rgba(220,53,69,0.08)')}>
                            <CIcon icon={cilAccountLogout} style={{ width: '15px', height: '15px', color: '#dc3545' }} />
                        </span>
                        Sign Out
                    </CDropdownItem>
                </div>
            </CDropdownMenu>
        </CDropdown>
    )
}

export default AppHeaderDropdown
