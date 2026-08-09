import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'

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

import useApiFetch from '../../../hooks/useAPIFetch';
import { UserContext } from '../../../providers/userProvider';
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchema } from '../../../yup/LoginSchema'

import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';

const LoginForm = () => {
    const navigate = useNavigate();
    const { setUser, writeStorage, clearStorage } = useContext(UserContext);

    const [showPass, setShowPass] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors: loginErrors },
    } = useForm({
        resolver: yupResolver(loginSchema),
        mode: 'onTouched',
        defaultValues: {
            phoneNumber: '',
            password: '',
        },
    });

    const { data, isLoading, errors, fetchData } = useApiFetch(
        { url: 'login', method: 'POST' },
        false
    );

    const loginWithPhoneNumberAndPassword = (formData) => {
        fetchData({
            data: {
                phoneNumber: `+251${formData.phoneNumber}`,
                password: formData.password,
            },
        });
    };

    useEffect(() => {
        setUser();
        clearStorage();
    }, []);

    useEffect(() => {
        if (!isLoading && data) {
            const memberObj = data?.data?.member || data?.data?.user || data?.data;
            setUser(memberObj);
            writeStorage('user', memberObj);
            navigate('/');
        }
    }, [isLoading, data]);

    return (
        <CForm onSubmit={handleSubmit(loginWithPhoneNumberAndPassword)}>
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
                        {...register('phoneNumber', {
                            onChange: (e) => {
                                const val = e.target.value.replace(/\D/g, '');
                                if (val.length > 0 && val[0] !== '9') {
                                    setValue('phoneNumber', '');
                                    return;
                                }
                                setValue('phoneNumber', val.slice(0, 9));
                            }
                        })}
                        required
                        maxLength={9}
                    />
                </CInputGroup>
                {loginErrors.phoneNumber && <ErrorMessage message={loginErrors.phoneNumber.message} />}

                <CInputGroup className="mb-4">
                    <CInputGroupText className="bg-light text-primary" style={{ width: '48px', justifyContent: 'center' }}>
                        *
                    </CInputGroupText>
                    <CFormInput
                        placeholder="Password"
                        type={showPass ? 'text' : 'password'}
                        {...register('password')}
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
                {loginErrors.password && <ErrorMessage message={loginErrors.password.message} />}

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