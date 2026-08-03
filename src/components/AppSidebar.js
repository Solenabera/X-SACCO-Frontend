import React, { useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    CCloseButton,
    CSidebar,
    CSidebarBrand,
    CSidebarHeader,
} from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'
import navigations from '../_nav'
import { UserContext } from '../providers/userProvider'
import customColors from '../constants/colors'

const { _nav_Admin, _nav_Consultant, _nav_Supplier, _nav_Purchaser } = navigations

const AppSidebar = () => {
    const dispatch = useDispatch()
    const { user } = useContext(UserContext)

    const unfoldable = useSelector((state) => state.sidebarUnfoldable)
    const sidebarShow = useSelector((state) => state.sidebarShow)

    const renderSidebarNav = () => {
        switch (user?.personalInfo?.RoleID) {
            case 'RoleID_03':
                return <AppSidebarNav items={_nav_Purchaser} />
            default:
                return null
        }
    }

    return (
        <CSidebar
            position="fixed"
            unfoldable={unfoldable}
            visible={sidebarShow}
            onVisibleChange={(visible) => {
                dispatch({ type: 'set', sidebarShow: visible })
            }}
            style={{
                backgroundColor: customColors.headerBgColor,
                color: customColors.headerTextColor,
                borderRight: '1px solid rgba(255,255,255,0.1)',
            }}
        >
            {/* HEADER */}
            <CSidebarHeader
                className="d-flex justify-content-between align-items-center px-3 py-2"
                style={{
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                }}
            >
                <CSidebarBrand
                    to="/"
                    style={{
                        color: customColors.headerTextColor,
                        textDecoration: 'none',
                        fontWeight: '600',
                    }}
                >
                    X-SACCO
                </CSidebarBrand>


                {/* MOBILE CLOSE */}
                <CCloseButton
                    className="d-lg-none ms-2"
                    onClick={() =>
                        dispatch({ type: 'set', sidebarShow: false })
                    }
                />
            </CSidebarHeader>

            {/* NAVIGATION */}
            <div className="px-2 py-2">
                {renderSidebarNav()}
            </div>

        </CSidebar>
    )
}

export default React.memo(AppSidebar)