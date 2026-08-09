import React, { useState } from 'react'
import {
    CBadge,
    CDropdown,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
} from '@coreui/react'
import { cilEnvelopeOpen } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const MESSAGES = [
    {
        id: 1,
        initials: 'AB',
        avatarBg: 'linear-gradient(135deg, #0f4c81, #1b6fba)',
        sender: 'Admin Office',
        preview: 'Your account statement is ready for download.',
        time: '5 min ago',
        unread: true,
    },
    {
        id: 2,
        initials: 'LO',
        avatarBg: 'linear-gradient(135deg, #198754, #20c997)',
        sender: 'Loans Officer',
        preview: 'Please submit the remaining documents for your loan.',
        time: '30 min ago',
        unread: true,
    },
    {
        id: 3,
        initials: 'ST',
        avatarBg: 'linear-gradient(135deg, #6610f2, #8a3ffc)',
        sender: 'Support Team',
        preview: 'Your query has been resolved. Let us know if you need help.',
        time: '2 hr ago',
        unread: false,
    },
    {
        id: 4,
        initials: 'SY',
        avatarBg: 'linear-gradient(135deg, #0dcaf0, #0d6efd)',
        sender: 'System',
        preview: 'Scheduled maintenance on Sunday. Plan accordingly.',
        time: 'Yesterday',
        unread: false,
    },
]

const AppHeaderMessage = () => {
    const [messages, setMessages] = useState(MESSAGES)
    const unreadCount = messages.filter((m) => m.unread).length

    const markAllRead = (e) => {
        e.preventDefault()
        setMessages((prev) => prev.map((m) => ({ ...m, unread: false })))
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
                style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center' }}
            >
                <div style={{ position: 'relative', display: 'inline-flex' }}>
                    <div style={{
                        width: '36px', height: '36px', borderRadius: '10px',
                        background: 'rgba(15,76,129,0.08)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer',
                    }}>
                        <CIcon icon={cilEnvelopeOpen} style={{ width: '18px', height: '18px', color: '#0f4c81' }} />
                    </div>
                    {unreadCount > 0 && (
                        <span style={{
                            position: 'absolute', top: '-4px', right: '-4px',
                            minWidth: '18px', height: '18px',
                            background: 'linear-gradient(135deg, #198754, #20c997)',
                            borderRadius: '99px', border: '2px solid white',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '0.6rem', fontWeight: 700, color: 'white',
                            padding: '0 3px',
                            boxShadow: '0 2px 6px rgba(25,135,84,0.4)',
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
                            <CIcon icon={cilEnvelopeOpen} style={{ width: '14px', height: '14px', color: 'white' }} />
                        </div>
                        <span style={{ color: 'white', fontWeight: 700, fontSize: '0.88rem' }}>Messages</span>
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
                            }}
                        >
                            Mark all read
                        </button>
                    )}
                </div>

                {/* Message Items */}
                <div style={{ background: '#ffffff', maxHeight: '320px', overflowY: 'auto' }}>
                    {messages.map((msg, idx) => (
                        <CDropdownItem key={msg.id} href="#" style={{
                            display: 'flex', alignItems: 'flex-start', gap: '12px',
                            padding: '12px 16px',
                            background: msg.unread ? 'rgba(15,76,129,0.04)' : 'transparent',
                            borderBottom: idx < messages.length - 1 ? '1px solid rgba(15,76,129,0.06)' : 'none',
                            transition: 'background 0.18s ease',
                        }}>
                            {/* Avatar */}
                            <div style={{
                                width: '38px', height: '38px', borderRadius: '50%',
                                background: msg.avatarBg, flexShrink: 0,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '0.7rem', fontWeight: 700, color: 'white',
                                boxShadow: '0 2px 8px rgba(15,76,129,0.2)',
                            }}>
                                {msg.initials}
                            </div>

                            {/* Content */}
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
                                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#1e3a5f' }}>{msg.sender}</span>
                                    <span style={{ fontSize: '0.65rem', color: '#adc0d0', fontWeight: 500, whiteSpace: 'nowrap', marginLeft: '8px' }}>{msg.time}</span>
                                </div>
                                <div style={{
                                    fontSize: '0.76rem', color: '#6b87a0', lineHeight: 1.4,
                                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                                    maxWidth: '210px',
                                }}>
                                    {msg.preview}
                                </div>
                            </div>

                            {/* Unread dot */}
                            {msg.unread && (
                                <span style={{
                                    width: '8px', height: '8px', borderRadius: '50%',
                                    background: '#0d6efd', flexShrink: 0, marginTop: '6px',
                                }} />
                            )}
                        </CDropdownItem>
                    ))}
                </div>

                {/* Footer */}
                <div style={{
                    background: '#f8fbff', borderTop: '1px solid rgba(15,76,129,0.08)',
                    padding: '10px 16px', textAlign: 'center',
                }}>
                    <a href="#" style={{ fontSize: '0.78rem', color: '#0f4c81', fontWeight: 600, textDecoration: 'none' }}>
                        View all messages →
                    </a>
                </div>
            </CDropdownMenu>
        </CDropdown>
    )
}

export default AppHeaderMessage
