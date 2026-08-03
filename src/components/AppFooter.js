import React from 'react'
import { CFooter, CContainer } from '@coreui/react'

const AppFooter = () => {
  const year = new Date().getFullYear()

  return (
    <CFooter
      className="mt-auto"
      style={{
        backgroundColor: '#f8f9fa',
        borderTop: '1px solid #e4e7ea',
        padding: '12px 0',
      }}
    >
      <CContainer
        fluid
        className="d-flex flex-column flex-md-row justify-content-between align-items-center"
      >
        {/* LEFT */}
        <div style={{ fontSize: '14px' }}>
          <strong style={{ color: '#0d6efd' }}>X-SACCO</strong>
          <span className="ms-2 text-medium-emphasis">
            &copy; {year}. All rights reserved.
          </span>
        </div>

        {/* RIGHT */}
        <div
          className="d-flex gap-3 mt-2 mt-md-0"
          style={{ fontSize: '13px' }}
        >
          <a href="#" className="text-decoration-none text-medium-emphasis">
            Privacy
          </a>
          <a href="#" className="text-decoration-none text-medium-emphasis">
            Terms
          </a>
          <a href="#" className="text-decoration-none text-medium-emphasis">
            Support
          </a>
        </div>
      </CContainer>
    </CFooter>
  )
}

export default React.memo(AppFooter)