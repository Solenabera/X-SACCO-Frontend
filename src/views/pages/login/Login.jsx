import React from 'react';
import {
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CRow
} from '@coreui/react';
import LoginForm from './LoginForm';

const Login = () => {
    return (
        <div
            className="min-vh-100 d-flex align-items-center py-4"
            style={{
                background:
                    'radial-gradient(circle at top right, rgba(17, 163, 106, 0.2), transparent 20%), linear-gradient(135deg, #0f4c81, #1f6ea8)'
            }}
        >
            <CContainer>
                <CRow className="align-items-center g-4">
                    <CCol md={6} className="text-white px-3 px-md-5">
                        <div className="mb-4 d-inline-flex align-items-center justify-content-center rounded-circle fw-bold text-primary bg-white" style={{ width: '58px', height: '58px' }}>
                            X
                        </div>
                        <h1 className="fw-bold mb-3">X-SACCO</h1>

                        <p style={{ fontSize: '18px', opacity: 0.92, maxWidth: '520px' }}>
                            A secure and modern platform to manage savings, loans,
                            and financial transactions efficiently.
                        </p>

                        <div style={{ marginTop: '25px', lineHeight: '1.8' }}>
                            <div>✔ Secure and reliable system</div>
                            <div>✔ Easy loan and savings management</div>
                            <div>✔ Real-time financial tracking</div>
                        </div>
                    </CCol>

                    <CCol xs={11} sm={8} md={5} lg={5} className="mx-auto">
                        <CCard
                            className="shadow border-0"
                            style={{
                                borderRadius: '18px',
                                backgroundColor: '#ffffff',
                                padding: '6px',
                                marginTop: '10px',
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
    );
};

export default Login;