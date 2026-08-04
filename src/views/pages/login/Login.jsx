import React from 'react';
import {
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CRow
} from '@coreui/react';
import LoginForm from './LoginForm';
import PublicHeader from '../../../components/public/PublicHeader';
import PublicFooter from '../../../components/public/PublicFooter';

const Login = () => {
    return (
        <div
            className="min-vh-100 d-flex flex-column"
            style={{
                background:
                    'linear-gradient(180deg, #f5f9ff 0%, #eef5ff 48%, #ffffff 100%)'
            }}
        >
            <PublicHeader />
            <div className="d-flex align-items-center py-4 flex-grow-1">
                <CContainer>
                    <CRow className="align-items-center g-4">
                        <CCol md={6} className="text-primary px-3 px-md-5">
                            <div className="mb-4 d-inline-flex align-items-center justify-content-center rounded-circle fw-bold text-white" style={{ width: '58px', height: '58px', backgroundColor: '#0f4c81' }}>
                                X
                            </div>
                            <h1 className="fw-bold mb-3" style={{ color: '#0f4c81' }}>X-SACCO</h1>

                            <p style={{ fontSize: '18px', color: '#34526b', maxWidth: '520px' }}>
                                A secure and modern platform to manage savings, loans,
                                and financial transactions efficiently.
                            </p>

                            <div style={{ marginTop: '25px', lineHeight: '1.8', color: '#23435d' }}>
                                <div>✔ Secure and reliable system</div>
                                <div>✔ Easy loan and savings management</div>
                                <div>✔ Real-time financial tracking</div>
                            </div>
                        </CCol>

                        <CCol xs={12} sm={10} md={6} lg={6} className="mx-auto">
                            <CCard
                                className="shadow border-0"
                                style={{
                                    borderRadius: '18px',
                                    backgroundColor: '#ffffff',
                                    padding: '2px',
                                    marginTop: '5px',
                                }}
                            >
                                <CCardBody className="p-4 p-md-5">
                                    <LoginForm />
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>
                </CContainer>
            </div>
            <PublicFooter />
        </div>
    );
};

export default Login;