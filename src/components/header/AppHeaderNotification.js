import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    CBadge,
    CButton,
    CDropdown,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
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
import useApiFetch from '../../hooks/useAPIFetch'

const formatTimeAgo = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now - date
    const diffSec = Math.floor(diffMs / 1000)
    const diffMin = Math.floor(diffSec / 60)
    const diffHr = Math.floor(diffMin / 60)
    const diffDays = Math.floor(diffHr / 24)

    if (diffSec < 60) {
        return 'just now'
    } else if (diffMin < 60) {
        return `${diffMin} ${diffMin === 1 ? 'min' : 'mins'} ago`
    } else if (diffHr < 24) {
        return `${diffHr} ${diffHr === 1 ? 'hr' : 'hrs'} ago`
    } else if (diffDays === 1) {
        return 'Yesterday'
    } else if (diffDays < 7) {
        return `${diffDays} days ago`
    } else {
        return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
    }
}

const getNotificationStyles = (notif) => {
    const refType = (notif.referenceType || '').toUpperCase()
    const title = (notif.title || '').toLowerCase()

    if (refType === 'LOAN' || title.includes('loan')) {
        return {
            icon: cilTask,
            iconBg: 'rgba(13,110,253,0.1)',
            iconColor: '#0d6efd',
        }
    } else if (refType === 'WARNING' || title.includes('warning') || title.includes('due') || title.includes('alert')) {
        return {
            icon: cilWarning,
            iconBg: 'rgba(255,193,7,0.12)',
            iconColor: '#e6a817',
        }
    } else if (
        refType === 'DEPOSIT' ||
        refType === 'TRANSACTION' ||
        refType === 'PAYMENT' ||
        title.includes('confirm') ||
        title.includes('success') ||
        title.includes('approved') ||
        title.includes('processed')
    ) {
        return {
            icon: cilCheckCircle,
            iconBg: 'rgba(25,135,84,0.1)',
            iconColor: '#198754',
        }
    } else {
        return {
            icon: cilInfo,
            iconBg: 'rgba(13,202,240,0.1)',
            iconColor: '#0dcaf0',
        }
    }
}

const AppHeaderNotification = () => {
    const navigate = useNavigate()
    const { data: fetchResult, fetchData: refetchUnread } = useApiFetch(
        { url: 'notifications/fetch-unread', method: 'GET' },
        true
    )

    const { fetchData: markReadRequest } = useApiFetch(
        { url: 'notifications/mark-as-read', method: 'PUT' },
        false
    )

    const [notifications, setNotifications] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [selectedNotification, setSelectedNotification] = useState(null)

    useEffect(() => {
        if (fetchResult?.data?.notifications) {
            setNotifications(fetchResult.data.notifications)
        }
    }, [fetchResult])

    useEffect(() => {
        const handleUpdate = () => {
            refetchUnread()
        }
        window.addEventListener('notification-updated', handleUpdate)
        return () => {
            window.removeEventListener('notification-updated', handleUpdate)
        }
    }, [refetchUnread])

    const unreadCount = notifications.length

    const markAllRead = async (e) => {
        e.preventDefault()
        try {
            await markReadRequest()
            setNotifications([])
            window.dispatchEvent(new Event('notification-updated'))
        } catch (error) {
            console.error('Failed to mark all notifications as read:', error)
        }
    }

    const handleNotificationClick = async (e, notification) => {
        e.preventDefault()
        setSelectedNotification(notification)
        setShowModal(true)
        try {
            await markReadRequest({ data: { notificationId: notification.id } })
            setNotifications((prev) => prev.filter((n) => n.id !== notification.id))
            window.dispatchEvent(new Event('notification-updated'))
        } catch (error) {
            console.error('Failed to mark notification as read:', error)
        }
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
        <>
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
                        {notifications.length === 0 ? (
                            <div style={{
                                padding: '40px 20px',
                                textAlign: 'center',
                                color: '#6b87a0',
                                fontSize: '0.85rem',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '12px'
                            }}>
                                <div style={{
                                    width: '48px', height: '48px', borderRadius: '50%',
                                    background: 'rgba(25,135,84,0.08)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <CIcon icon={cilCheckCircle} style={{ width: '22px', height: '22px', color: '#198754' }} />
                                </div>
                                <div>
                                    <div style={{ fontWeight: 600, color: '#1e3a5f', marginBottom: '2px' }}>All caught up!</div>
                                    <div style={{ fontSize: '0.76rem', color: '#8fa0b0' }}>You have no unread notifications.</div>
                                </div>
                            </div>
                        ) : (
                            notifications.map((notif, idx) => {
                                const styles = getNotificationStyles(notif)
                                return (
                                    <div key={notif.id}>
                                        <CDropdownItem
                                            href="#"
                                            onClick={(e) => handleNotificationClick(e, notif)}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                gap: '12px',
                                                padding: '12px 16px',
                                                background: 'rgba(15,76,129,0.03)',
                                                transition: 'background 0.18s ease',
                                                borderBottom: idx < notifications.length - 1 ? '1px solid rgba(15,76,129,0.06)' : 'none',
                                            }}
                                        >
                                            <div style={{
                                                width: '36px', height: '36px', borderRadius: '10px',
                                                background: styles.iconBg, flexShrink: 0,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            }}>
                                                <CIcon icon={styles.icon} style={{ width: '16px', height: '16px', color: styles.iconColor }} />
                                            </div>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                                                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#1e3a5f' }}>
                                                        {notif.title}
                                                    </span>
                                                    <span style={{
                                                        width: '6px', height: '6px', borderRadius: '50%',
                                                        background: '#0d6efd', flexShrink: 0,
                                                    }} />
                                                </div>
                                                <div style={{ fontSize: '0.76rem', color: '#6b87a0', lineHeight: 1.4 }}>{notif.message}</div>
                                                <div style={{ fontSize: '0.68rem', color: '#adc0d0', marginTop: '4px', fontWeight: 500 }}>
                                                    {formatTimeAgo(notif.createdAt)}
                                                </div>
                                            </div>
                                        </CDropdownItem>
                                    </div>
                                )
                            })
                        )}
                    </div>

                    {/* Footer */}
                    <div style={{
                        background: '#f8fbff', borderTop: '1px solid rgba(15,76,129,0.08)',
                        padding: '10px 16px', textAlign: 'center',
                    }}>
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault()
                                navigate('/notifications')
                            }}
                            style={{ fontSize: '0.78rem', color: '#0f4c81', fontWeight: 600, textDecoration: 'none' }}
                        >
                            View all notifications →
                        </a>
                    </div>
                </CDropdownMenu>
            </CDropdown>

            {/* Notification Detail Modal */}
            <CModal
                visible={showModal}
                onClose={() => {
                    setShowModal(false)
                    setSelectedNotification(null)
                }}
                alignment="center"
                backdrop="static"
            >
                {selectedNotification && (() => {
                    const styles = getNotificationStyles(selectedNotification)
                    return (
                        <>
                            <CModalHeader style={{
                                background: 'linear-gradient(135deg, #0f4c81 0%, #1b6fba 100%)',
                                color: 'white',
                                borderBottom: 'none',
                                borderTopLeftRadius: 'calc(var(--cui-modal-border-radius) - 1px)',
                                borderTopRightRadius: 'calc(var(--cui-modal-border-radius) - 1px)',
                                padding: '16px 24px',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{
                                        width: '32px', height: '32px', borderRadius: '8px',
                                        background: 'rgba(255,255,255,0.2)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    }}>
                                        <CIcon icon={styles.icon} style={{ width: '16px', height: '16px', color: 'white' }} />
                                    </div>
                                    <CModalTitle style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                                        {selectedNotification.title}
                                    </CModalTitle>
                                </div>
                            </CModalHeader>
                            <CModalBody style={{ padding: '24px', color: '#1e3a5f', fontSize: '0.92rem', lineHeight: '1.6' }}>
                                <div style={{ marginBottom: '16px', fontWeight: 500 }}>
                                    {selectedNotification.message}
                                </div>
                                <div style={{ fontSize: '0.78rem', color: '#adc0d0', fontWeight: 500 }}>
                                    Received: {new Date(selectedNotification.createdAt).toLocaleString(undefined, {
                                        dateStyle: 'medium',
                                        timeStyle: 'short'
                                    })}
                                </div>
                            </CModalBody>
                            <CModalFooter style={{ borderTop: '1px solid rgba(15,76,129,0.08)', padding: '12px 24px' }}>
                                <CButton
                                    style={{
                                        background: '#0f4c81',
                                        borderColor: '#0f4c81',
                                        color: 'white',
                                        fontWeight: 600,
                                        padding: '6px 20px',
                                        borderRadius: '8px',
                                    }}
                                    onClick={() => {
                                        setShowModal(false)
                                        setSelectedNotification(null)
                                    }}
                                >
                                    Close
                                </CButton>
                            </CModalFooter>
                        </>
                    )
                })()}
            </CModal>
        </>
    )
}

export default AppHeaderNotification
