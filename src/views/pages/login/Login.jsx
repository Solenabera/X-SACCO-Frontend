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
            className="min-vh-100 d-flex align-items-center"
            style={{
                background: 'linear-gradient(135deg, #9ebefaff, #30679bff)'
            }}
        >
            <CContainer>
                <CRow className="align-items-center">

                    {/* LEFT SIDE */}
                    <CCol md={6} className="text-white px-5">
                        <h1 className="fw-bold mb-4">
                            X-SACCO
                        </h1>

                        <p style={{ fontSize: '18px', opacity: 0.9 }}>
                            A secure and modern platform to manage savings, loans,
                            and financial transactions efficiently.
                        </p>

                        <div style={{ marginTop: '25px', lineHeight: '1.8' }}>
                            <div>✔ Secure and reliable system</div>
                            <div>✔ Easy loan and savings management</div>
                            <div>✔ Real-time financial tracking</div>
                        </div>
                    </CCol>

                    {/* RIGHT SIDE */}

                    <CCol xs={11} sm={8} md={5} lg={5} className="mx-auto">
                        <CCard
                            className="shadow border-0"
                            style={{
                                borderRadius: '12px',
                                backgroundColor: '#ffffff',
                                padding: window.innerWidth < 576 ? '5px' : '10px',
                                marginTop: window.innerWidth < 576 ? '20px' : '10px'
                            }}
                        >             <CCardBody>
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