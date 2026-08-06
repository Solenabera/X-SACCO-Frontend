import React from 'react'
import { CContainer } from '@coreui/react'
import PublicHeader from './PublicHeader'
import PublicFooter from './PublicFooter'

const PublicPageTemplate = ({ title, intro, children, className, style }) => {
    return (
        <div className="min-vh-100 d-flex flex-column" style={{ background: 'linear-gradient(180deg, #f5f9ff 0%, #eef5ff 48%, #ffffff 100%)' }}>
            <PublicHeader />

            <main className="flex-grow-1 py-5">
                <CContainer className={`px-3 px-sm-4 px-md-5 ${className || ''}`.trim()} style={style}>
                    <div className="rounded-4 p-3 p-sm-4 p-lg-5 shadow-sm border" style={{ background: '#ffffff', borderColor: '#dcecff' }}>
                        <div className="mb-4">
                            <div className="text-primary fw-bold mb-2 text-uppercase small">Public services</div>
                            <h1 className="fw-bold mb-2" style={{ color: '#0f4c81' }}>{title}</h1>
                            <p className="text-secondary mb-0" style={{ maxWidth: '760px' }}>{intro}</p>
                        </div>
                        {children}
                    </div>
                </CContainer>
            </main>

            <PublicFooter />
        </div>
    )
}

export default PublicPageTemplate
