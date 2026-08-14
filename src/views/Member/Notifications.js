import React, { useState, useEffect } from 'react'
import {
    CCard,
    CCardBody,
    CCol,
    CRow,
    CSpinner,
    CButton,
    CBadge,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
    cilBell,
    cilTask,
    cilWarning,
    cilInfo,
    cilCheckCircle,
} from '@coreui/icons'
import useApiFetch from '../../hooks/useAPIFetch'
import PageHeader from '../../components/shared/PageHeader'

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
        return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
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

const Notifications = () => {
    const { data: fetchResult, isLoading } = useApiFetch(
        { url: 'notifications/fetch-all', method: 'GET' },
        true
    )

    const { fetchData: markReadRequest } = useApiFetch(
        { url: 'notifications/mark-as-read', method: 'PUT' },
        false
    )

    const [notifications, setNotifications] = useState([])
    const [filter, setFilter] = useState('all') // 'all' | 'unread'
    const [showModal, setShowModal] = useState(false)
    const [selectedNotification, setSelectedNotification] = useState(null)

    useEffect(() => {
        if (fetchResult?.data?.notifications) {
            setNotifications(fetchResult.data.notifications)
        }
    }, [fetchResult])

    const markAllRead = async () => {
        try {
            await markReadRequest()
            setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
            window.dispatchEvent(new Event('notification-updated'))
        } catch (error) {
            console.error('Failed to mark all notifications as read:', error)
        }
    }

    const handleNotificationClick = async (notif) => {
        setSelectedNotification(notif)
        setShowModal(true)

        if (!notif.isRead) {
            try {
                await markReadRequest({ data: { notificationId: notif.id } })
                // Update local state to mark this specific notification as read
                setNotifications((prev) =>
                    prev.map((n) => (n.id === notif.id ? { ...n, isRead: true } : n))
                )
                window.dispatchEvent(new Event('notification-updated'))
            } catch (error) {
                console.error('Failed to mark notification as read:', error)
            }
        }
    }

    const filteredNotifications = notifications.filter((notif) => {
        if (filter === 'unread') return !notif.isRead
        return true
    })

    const unreadCount = notifications.filter((n) => !n.isRead).length

    return (
        <CRow className="g-4">
            <CCol xs={12}>
                <PageHeader
                    icon={<CIcon icon={cilBell} className="text-white" size="lg" />}
                    title="Notifications"
                    subtitle="Stay updated with your account activity, transactions, and system updates"
                    gradient="linear-gradient(135deg, #0f4c81, #1b6fb5)"
                />
            </CCol>

            <CCol xs={12}>
                <CCard className="border-0 shadow-sm">
                    <CCardBody className="p-4">
                        {/* Toolbar */}
                        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
                            <div className="d-flex gap-2">
                                <CButton
                                    onClick={() => setFilter('all')}
                                    style={{
                                        background: filter === 'all' ? '#0f4c81' : 'transparent',
                                        color: filter === 'all' ? 'white' : '#0f4c81',
                                        borderColor: '#0f4c81',
                                        fontWeight: 600,
                                        borderRadius: '8px',
                                    }}
                                >
                                    All ({notifications.length})
                                </CButton>
                                <CButton
                                    onClick={() => setFilter('unread')}
                                    style={{
                                        background: filter === 'unread' ? '#0f4c81' : 'transparent',
                                        color: filter === 'unread' ? 'white' : '#0f4c81',
                                        borderColor: '#0f4c81',
                                        fontWeight: 600,
                                        borderRadius: '8px',
                                    }}
                                >
                                    Unread ({unreadCount})
                                </CButton>
                            </div>

                            {unreadCount > 0 && (
                                <CButton
                                    onClick={markAllRead}
                                    style={{
                                        background: 'rgba(15,76,129,0.08)',
                                        color: '#0f4c81',
                                        borderColor: 'transparent',
                                        fontWeight: 600,
                                        borderRadius: '8px',
                                    }}
                                >
                                    Mark all as read
                                </CButton>
                            )}
                        </div>

                        {/* List */}
                        {isLoading ? (
                            <div className="text-center py-5">
                                <CSpinner color="primary" />
                            </div>
                        ) : filteredNotifications.length === 0 ? (
                            <div style={{
                                padding: '60px 20px',
                                textAlign: 'center',
                                color: '#6b87a0',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '16px'
                            }}>
                                <div style={{
                                    width: '64px', height: '64px', borderRadius: '50%',
                                    background: 'rgba(25,135,84,0.08)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <CIcon icon={cilCheckCircle} size="xl" style={{ color: '#198754' }} />
                                </div>
                                <div>
                                    <div style={{ fontWeight: 700, color: '#1e3a5f', fontSize: '1.1rem', marginBottom: '4px' }}>
                                        No notifications found
                                    </div>
                                    <div style={{ fontSize: '0.85rem', color: '#8fa0b0' }}>
                                        {filter === 'unread'
                                            ? "You don't have any unread notifications at the moment."
                                            : "There are no notifications in your history."
                                        }
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {filteredNotifications.map((notif) => {
                                    const styles = getNotificationStyles(notif)
                                    return (
                                        <div
                                            key={notif.id}
                                            onClick={() => handleNotificationClick(notif)}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '16px',
                                                padding: '16px 20px',
                                                background: notif.isRead ? '#ffffff' : 'rgba(15,76,129,0.03)',
                                                border: '1px solid rgba(15,76,129,0.08)',
                                                borderLeft: notif.isRead ? '4px solid transparent' : '4px solid #0f4c81',
                                                borderRadius: '12px',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease',
                                            }}
                                            className="notification-item"
                                        >
                                            <div style={{
                                                width: '40px', height: '40px', borderRadius: '10px',
                                                background: styles.iconBg, flexShrink: 0,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            }}>
                                                <CIcon icon={styles.icon} style={{ width: '18px', height: '18px', color: styles.iconColor }} />
                                            </div>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                                    <span style={{ fontSize: '0.92rem', fontWeight: 600, color: '#1e3a5f' }}>
                                                        {notif.title}
                                                    </span>
                                                    {!notif.isRead && (
                                                        <CBadge color="primary" shape="rounded-pill" style={{ fontSize: '0.65rem' }}>
                                                            New
                                                        </CBadge>
                                                    )}
                                                </div>
                                                <div style={{ fontSize: '0.82rem', color: '#6b87a0', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                                                    {notif.message}
                                                </div>
                                            </div>
                                            <div style={{ fontSize: '0.78rem', color: '#adc0d0', fontWeight: 500, flexShrink: 0 }}>
                                                {formatTimeAgo(notif.createdAt)}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </CCardBody>
                </CCard>
            </CCol>

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
                                <div style={{ marginBottom: '26px', fontWeight: 500 }}>
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
        </CRow>
    )
}

export default Notifications
