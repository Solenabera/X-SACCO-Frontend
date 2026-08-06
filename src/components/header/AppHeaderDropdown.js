import React, { useEffect, useState, useCallback, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import {
    CAvatar,
    CBadge,
    CDropdown,
    CDropdownDivider,
    CDropdownHeader,
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
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import avatar8 from './../../assets/images/avatars/8.jpg'
import { UserContext } from '../../providers/userProvider';

const AppHeaderDropdown = () => {
    const navigate = useNavigate();
    const { user, setUser, getStorage, clearStorage } = useContext(UserContext);

    const [isSessionExpired, setSessionExpired] = useState(false);
    const SESSION_TIMEOUT_KEY = "sessionTimeoutTimestamp";

    const handleLogout = useCallback(() => {
        setUser()
        clearStorage()
        navigate('/login');
    }, [navigate]);

    useEffect(() => {
        let sessionTimeout;

        const startSessionTimeout = () => {
            const timeoutTimestamp = Date.now() + (30 * 60 * 1000);
            sessionStorage.setItem(SESSION_TIMEOUT_KEY, timeoutTimestamp.toString());

            sessionTimeout = setTimeout(() => {
                setSessionExpired(true);
            }, 30 * 60 * 1000);
        };

        const resetSessionTimeout = () => {
            clearTimeout(sessionTimeout);
            if (!isSessionExpired) startSessionTimeout();
        };

        const checkSessionTimeout = () => {
            const timeoutTimestampStr = getStorage(SESSION_TIMEOUT_KEY);

            if (!timeoutTimestampStr) {
                startSessionTimeout();
                return;
            }

            const timeoutTimestamp = parseInt(timeoutTimestampStr);
            const currentTimestamp = Date.now();

            if (currentTimestamp > timeoutTimestamp) setSessionExpired(true);
            else startSessionTimeout();
        };

        checkSessionTimeout();

        document.addEventListener('mousemove', resetSessionTimeout);
        document.addEventListener('keydown', resetSessionTimeout);

        return () => {
            clearTimeout(sessionTimeout);
            document.removeEventListener('mousemove', resetSessionTimeout);
            document.removeEventListener('keydown', resetSessionTimeout);
        };
    }, [isSessionExpired]);

    useEffect(() => {
        if (isSessionExpired) {
            handleLogout();
        }
    }, [isSessionExpired, handleLogout]);

    return (
        <CDropdown variant="nav-item">
            <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
                <CAvatar src={avatar8} size="md" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
                <CDropdownHeader className="bg-body-secondary fw-bold mb-2">
                    {user?.fullName || (user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : 'Member')}
                    <div className="bg-body-secondary fw-semibold mb-0">{user?.email || user?.phoneNumber || ''}</div>
                </CDropdownHeader>
                <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Account</CDropdownHeader>
                <CDropdownItem href="#">
                    <CIcon icon={cilBell} className="me-2" />
                    Updates
                    <CBadge color="info" className="ms-2">
                        42
                    </CBadge>
                </CDropdownItem>
                <CDropdownHeader className="bg-body-secondary fw-semibold my-2">Settings</CDropdownHeader>
                <CDropdownItem href="/profile">
                    <CIcon icon={cilUser} className="me-2" />
                    Profile
                </CDropdownItem>
                <CDropdownItem href="#">
                    <CIcon icon={cilSettings} className="me-2" />
                    Settings
                </CDropdownItem>
                <CDropdownItem href="#">
                    <CIcon icon={cilCreditCard} className="me-2" />
                    Payments
                    <CBadge color="secondary" className="ms-2">
                        42
                    </CBadge>
                </CDropdownItem>
                <CDropdownDivider />
                <CDropdownItem href="#" onClick={handleLogout}>
                    <CIcon icon={cilAccountLogout} className="me-2" />
                    Logout
                </CDropdownItem>
            </CDropdownMenu>
        </CDropdown>
    )
}

export default AppHeaderDropdown
