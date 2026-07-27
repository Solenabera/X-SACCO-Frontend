import React, { useContext, useRef } from 'react'

import {
    CHeader,
} from '@coreui/react'

import navigations from '../_nav';
import { UserContext } from '../providers/userProvider'
import { AppSubHeaderNav } from './AppSubHeaderNav';

const { _nav_Admin, _nav_Consultant, _nav_Supplier, _nav_Purchaser } = navigations;

const AppSubHeader = () => {
    const headerRef = useRef()
    const { user } = useContext(UserContext);

    const renderSubHeaderNav = () => {
        switch (user?.personalInfo?.RoleID) {
            case "RoleID_01":
                return <AppSubHeaderNav items={_nav_Admin} />;
            case "RoleID_02":
                return <AppSubHeaderNav items={_nav_Supplier} />;
            case "RoleID_03":
                return <AppSubHeaderNav items={_nav_Purchaser} />;
            case "RoleID_04":
                return <AppSubHeaderNav items={_nav_Consultant} />;
            default:
                return null;
        }
    };

    return (
        <CHeader position="sticky" className="mx-4 mb-2 px-4 py-0 rounded shadow" ref={headerRef} style={{ top: '70px' }}>
            {renderSubHeaderNav()}
        </CHeader>
    )
}

export default React.memo(AppSubHeader)
