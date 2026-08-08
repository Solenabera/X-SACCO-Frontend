import React, { useState } from 'react'
import {
    CBadge,
    CDropdown,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
} from '@coreui/react'
import {
    cilBell,
    cilTask,
    cilCommentSquare,
    cilWarning,
    cilInfo,
    cilCheckCircle,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const NOTIFICATIONS = [
    {
        id: 1,
        icon: cilTask,
        iconBg: 'rgba(13,110,253,0.1)',
        iconColor: '#0d6efd',
        title: 'Loan Approved',
        desc: 'Your loan application has been approved.',
        time: '2 min ago',
        unread: true,
    },
    {
        id: 2,
        icon: cilWarning,
        iconBg: 'rgba(255,193,7,0.12)',
        iconColor: '#e6a817',
        title: 'Payment Due',
        desc: 'Your monthly contribution is due in 3 days.',
        time: '1 hr ago',
        unread: true,
    },
    {
        id: 3,
        icon: cilCheckCircle,
        iconBg: 'rgba(25,135,84,0.1)',
        iconColor: '#198754',
        title: 'Deposit Confirmed',
        desc: 'ETB 5,000 deposit was successfully processed.',
        time: '3 hr ago',
        unread: false,
    },
    {
        id: 4,
        icon: cilInfo,
        iconBg: 'rgba(13,202,240,0.1)',
        iconColor: '#0dcaf0',
        title: 'System Update',
        desc: 'The system will be down on Sunday 2 AM.',
        time: 'Yesterday',
        unread: false,
    },
]

const AppHeaderNotification = () => {
    const [notifications, setNotifications] = useState(NOTIFICATIONS)
    const unreadCount = notifications.filter((n) => n.unread).length

    const markAllRead = (e) => {
        e.preventDefault()
        setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))
    }

    const menuStyle = {
        minWidth: '320px',
        padding: 0,
        border: 'none',
        borderRadius: '16px',
        boxShadow: '0 20px 60px rgba(15,76,129,0.18), 0 4px 16px rgba(15,76,129,0.08)',
        overflow: 'hidden',
    }

    return (
        <CDropdown variant="nav-item">
            <CDropdownToggle
                placement="bottom-end"
                className="py-0 pe-0"
                caret={false}
                style={{ background: 'none', border: 'none', position: 'relative', display: 'flex', alignItems: 'center' }}
            >
                <div style={{ position: 'relative', display: 'inline-flex' }}>
                    <div style={{
                        width: '36px', height: '36px', borderRadius: '10px',
                        background: 'rgba(15,76,129,0.08)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'background 0.2s ease',
                        cursor: 'pointer',
                    }}>
                        <CIcon icon={cilBell} style={{ width: '18px', height: '18px', color: '#0f4c81' }} />
                    </div>
                    {unreadCount > 0 && (
                        <span style={{
                            position: 'absolute', top: '-4px', right: '-4px',
                            minWidth: '18px', height: '18px',
                            background: 'linear-gradient(135deg, #dc3545, #ff6b6b)',
                            borderRadius: '99px', border: '2px solid white',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '0.6rem', fontWeight: 700, color: 'white',
                            padding: '0 3px',
                            boxShadow: '0 2px 6px rgba(220,53,69,0.4)',
                        }}>
                            {unreadCount}
                        </span>
                    )}
                </div>
            </CDropdownToggle>

            <CDropdownMenu className="pt-0" placement="bottom-end" style={menuStyle}>
                {/* Header */}
                <div style={{
                    background: 'linear-gradient(135deg, #0f4c81 0%, #1b6fba 100%)',
                    padding: '14px 18px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                            width: '28px', height: '28px', borderRadius: '8px',
                            background: 'rgba(255,255,255,0.15)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <CIcon icon={cilBell} style={{ width: '14px', height: '14px', color: 'white' }} />
                        </div>
                        <span style={{ color: 'white', fontWeight: 700, fontSize: '0.88rem' }}>Notifications</span>
                        {unreadCount > 0 && (
                            <CBadge style={{
                                background: 'rgba(255,255,255,0.2)', color: 'white',
                                fontSize: '0.65rem', borderRadius: '99px', padding: '2px 7px',
                            }}>
                                {unreadCount} new
                            </CBadge>
                        )}
                    </div>
                    {unreadCount > 0 && (
                        <button
                            onClick={markAllRead}
                            style={{
                                background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)',
                                color: 'rgba(255,255,255,0.9)', fontSize: '0.7rem', fontWeight: 600,
                                borderRadius: '6px', padding: '3px 10px', cursor: 'pointer',
                                transition: 'background 0.2s',
                            }}
                        >
                            Mark all read
                        </button>
                    )}
                </div>

                {/* Items */}
                <div style={{ background: '#ffffff', maxHeight: '320px', overflowY: 'auto' }}>
                    {notifications.map((notif, idx) => (
                        <div key={notif.id}>
                            <CDropdownItem href="#" style={{
                                display: 'flex', alignItems: 'flex-start', gap: '12px',
                                padding: '12px 16px',
                                background: notif.unread ? 'rgba(15,76,129,0.04)' : 'transparent',
                                transition: 'background 0.18s ease',
                                borderBottom: idx < notifications.length - 1 ? '1px solid rgba(15,76,129,0.06)' : 'none',
                            }}>
                                <div style={{
                                    width: '36px', height: '36px', borderRadius: '10px',
                                    background: notif.iconBg, flexShrink: 0,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                    <CIcon icon={notif.icon} style={{ width: '16px', height: '16px', color: notif.iconColor }} />
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                                        <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#1e3a5f' }}>
                                            {notif.title}
                                        </span>
                                        {notif.unread && (
                                            <span style={{
                                                width: '6px', height: '6px', borderRadius: '50%',
                                                background: '#0d6efd', flexShrink: 0,
                                            }} />
                                        )}
                                    </div>
                                    <div style={{ fontSize: '0.76rem', color: '#6b87a0', lineHeight: 1.4 }}>{notif.desc}</div>
                                    <div style={{ fontSize: '0.68rem', color: '#adc0d0', marginTop: '4px', fontWeight: 500 }}>{notif.time}</div>
                                </div>
                            </CDropdownItem>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div style={{
                    background: '#f8fbff', borderTop: '1px solid rgba(15,76,129,0.08)',
                    padding: '10px 16px', textAlign: 'center',
                }}>
                    <a href="#" style={{ fontSize: '0.78rem', color: '#0f4c81', fontWeight: 600, textDecoration: 'none' }}>
                        View all notifications →
                    </a>
                </div>
            </CDropdownMenu>
        </CDropdown>
    )
}

export default AppHeaderNotification
