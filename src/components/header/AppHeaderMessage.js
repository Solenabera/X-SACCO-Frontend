import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'; 
import {
    CBadge,
    CDropdown,
    CDropdownHeader,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
} from '@coreui/react'
import {
    cilCommentSquare,
    cilEnvelopeOpen,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const AppHeaderMessage = () => {
    const navigate = useNavigate();

    return (
        <CDropdown variant="nav-item">
            <CDropdownToggle placement="bottom-end" className="py-0 pe-0 text-primary" caret={false}>
                <CIcon icon={cilEnvelopeOpen} size="lg" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
                <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Messages</CDropdownHeader>
                <CDropdownItem href="#">
                    <CIcon icon={cilEnvelopeOpen} className="me-2" />
                    Messages
                    <CBadge color="success" className="ms-2">
                        42
                    </CBadge>
                </CDropdownItem>
            </CDropdownMenu>
        </CDropdown>
    )
}

export default AppHeaderMessage
