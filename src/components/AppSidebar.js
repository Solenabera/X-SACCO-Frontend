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
            onVisibleChange={(visible) => dispatch({ type: 'set', sidebarShow: visible })}
            style={{
                background: 'linear-gradient(180deg, #0b2742 0%, #143f66 100%)',
                color: customColors.headerTextColor,
                borderRight: '1px solid rgba(255,255,255,0.12)',
            }}
        >
            <CSidebarHeader
                className="d-flex justify-content-between align-items-center px-3 py-3"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.12)' }}
            >
                <CSidebarBrand
                    to="/"
                    className="d-flex align-items-center gap-2"
                    style={{
                        color: customColors.headerTextColor,
                        textDecoration: 'none',
                        fontWeight: '700',
                        letterSpacing: '0.02em',
                    }}
                >
                    <span
                        className="d-inline-flex align-items-center justify-content-center rounded-circle text-primary fw-bold"
                        style={{ background: '#ffffff', width: '34px', height: '34px' }}
                    >
                        X
                    </span>
                    <span className="d-none d-md-inline">X-SACCO</span>
                </CSidebarBrand>

                <CCloseButton
                    className="d-lg-none ms-2"
                    onClick={() => dispatch({ type: 'set', sidebarShow: false })}
                />
            </CSidebarHeader>

            <div className="px-2 py-3">
                {renderSidebarNav()}
            </div>
        </CSidebar>
    )
}

export default React.memo(AppSidebar)