import {
    CButton,
    CForm,
    CFormInput,
    CInputGroup,
    CRow,
    CInputGroupText,
    CSpinner,
} from '@coreui/react';

import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilLockUnlocked } from '@coreui/icons';

import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useApiFetch from '../../../hooks/useAPIFetch';
import { UserContext } from '../../../providers/userProvider';

import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import { set } from 'react-hook-form';

const LoginForm = () => {
    const navigate = useNavigate();
    const { setUser, writeStorage, clearStorage } = useContext(UserContext);

    const [phone_number, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');

    const { data, isLoading, errors, fetchData } = useApiFetch(
        { url: 'login', method: 'POST' },
        false
    );

    const handlePhoneChange = (e) => {
        const val = e.target.value.replace(/\D/g, '');

        if (val.length > 0 && val[0] !== '9') {
            return;
        }

        if (val.length <= 9) {
            setEmailErrorMessage('');
            setPhoneNumber(val);
        }
    };

    const loginWithPhoneNumberAndPassword = (e) => {
        e.preventDefault();

        if (phone_number.length !== 9) {
            setEmailErrorMessage('Phone number must be exactly 9 digits long.');
            return;
        }

        fetchData({ data: { phone_number: `+251${phone_number}`, password } });
    };

    useEffect(() => {
        setUser();
        clearStorage();
    }, []);

    const SESSION_TIMEOUT_KEY = 'sessionTimeoutTimestamp';

    useEffect(() => {
        if (!isLoading && data) {
            setUser(data?.data?.member);
            writeStorage('user', JSON.stringify(data.data));

            const timeoutTimestamp = Date.now() + 30 * 60 * 1000;
            writeStorage(SESSION_TIMEOUT_KEY, timeoutTimestamp.toString());

            navigate('/');
        }
    }, [isLoading, data]);

    return (
        <CForm onSubmit={loginWithPhoneNumberAndPassword}>
            <div className="text-center mb-4">
                <h2 className="fw-bold" style={{ color: '#0f4c81' }}>
                    Sign In
                </h2>
                <p style={{ fontSize: '14px', color: '#6c757d' }}>
                    Login to your account
                </p>
            </div>

            <CRow className="px-1 px-md-2">
                <CInputGroup className="mb-4">
                    <CInputGroupText className="bg-light text-primary" style={{ width: '64px', justifyContent: 'center' }}>
                        +251
                    </CInputGroupText>
                    <CFormInput
                        type="tel"
                        placeholder="9XXXXXXXX"
                        value={phone_number}
                        onChange={handlePhoneChange}
                        required
                        maxLength={9}
                    />
                </CInputGroup>
                <ErrorMessage message={emailErrorMessage} />

                <CInputGroup className="mb-4">
                    <CInputGroupText className="bg-light text-primary" style={{ width: '48px', justifyContent: 'center' }}>
                        *
                    </CInputGroupText>
                    <CFormInput
                        placeholder="Password"
                        type={showPass ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <CInputGroupText
                        style={{ cursor: 'pointer', width: '52px', justifyContent: 'center', padding: '0.5rem' }}
                        onClick={() => setShowPass(!showPass)}
                        className="bg-light text-primary"
                    >
                        {showPass ? (
                            <CIcon
                                icon={cilLockUnlocked}
                                size="lg"
                                className="text-primary"
                                style={{ width: '20px', height: '20px' }}
                            />
                        ) : (
                            <CIcon
                                icon={cilLockLocked}
                                size="lg"
                                className="text-primary"
                                style={{ width: '20px', height: '20px' }}
                            />
                        )}
                    </CInputGroupText>
                </CInputGroup>

                {errors?.isError && (
                    <ErrorMessage message={errors?.details?.response?.data?.message ??
                        errors?.message} />
                )}

                <div className="d-grid mt-2">
                    <CButton
                        color="primary"
                        type="submit"
                        disabled={isLoading}
                        className="fw-bold px-4 py-2"
                    >
                        {isLoading ? <CSpinner size="sm" /> : 'Login'}
                    </CButton>
                </div>

                <div className="text-center mt-3">
                    <Link to="/register" style={{ textDecoration: 'none' }}>
                        <small style={{ color: '#0f4c81', fontWeight: 600 }}>
                            Don’t have an account? Register
                        </small>
                    </Link>
                </div>
            </CRow>
        </CForm>
    );
};

export default LoginForm;