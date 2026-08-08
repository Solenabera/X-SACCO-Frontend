import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    CContainer,
    CDropdown,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CHeader,
    CHeaderNav,
    CHeaderToggler,
    useColorModes,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
    cilContrast,
    cilMenu,
    cilMoon,
    cilSun,
} from '@coreui/icons'

import { AppHeaderDropdown, AppHeaderMessage, AppHeaderNotification } from './header/index'
import customColors from '../constants/colors'

const AppHeader = () => {
    const headerRef = useRef()
    const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')

    const dispatch = useDispatch()
    const sidebarShow = useSelector((state) => state.sidebarShow)

    useEffect(() => {
        document.addEventListener('scroll', () => {
            headerRef.current &&
                headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
        })
    }, [])

    return (
        <CHeader
            position="sticky"
            className="mb-3 p-0 border-0"
            ref={headerRef}
            style={{
                background: customColors.navGlassBg,
                backdropFilter: 'blur(14px)',
                boxShadow: customColors.navShadow,
                borderBottom: `1px solid ${customColors.navBorderColor}`,
                position: 'relative',
                zIndex: 1030,
            }}
        >
            <CContainer className="px-3 px-lg-4" fluid>
                <CHeaderToggler
                    className="ps-1"
                    onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
                >
                    <CIcon
                        icon={cilMenu}
                        size="lg"
                        style={{
                            color: customColors.headerBgColor,
                            opacity: 1
                        }}
                    />
                </CHeaderToggler>

                <div className="d-none d-md-flex align-items-center fw-bold ms-2" style={{ color: customColors.headerBgColor }}>
                    X-SACCO Smart Finance
                </div>

                <CHeaderNav className="ms-auto">
                    <AppHeaderNotification />
                    {/* <li className="nav-item py-1">
                        <div className="vr h-100 mx-2 text-primary opacity-25"></div>
                    </li> */}
                    {/* <AppHeaderMessage /> */}
                </CHeaderNav>
                <CHeaderNav>
                    {/* <li className="nav-item py-1">
                        <div className="vr h-100 mx-2 text-primary opacity-25"></div>
                    </li> */}
                    {/* <CDropdown variant="nav-item" placement="bottom-end">
                        <CDropdownToggle caret={false} className="text-primary">
                            {colorMode === 'dark' ? (
                                <CIcon icon={cilMoon} size="lg" />
                            ) : colorMode === 'auto' ? (
                                <CIcon icon={cilContrast} size="lg" />
                            ) : (
                                <CIcon icon={cilSun} size="lg" />
                            )}
                        </CDropdownToggle>
                        <CDropdownMenu>
                            <CDropdownItem
                                active={colorMode === 'light'}
                                className="d-flex align-items-center"
                                as="button"
                                type="button"
                                onClick={() => setColorMode('light')}
                            >
                                <CIcon className="me-2" icon={cilSun} size="lg" /> Light
                            </CDropdownItem>
                            <CDropdownItem
                                active={colorMode === 'dark'}
                                className="d-flex align-items-center"
                                as="button"
                                type="button"
                                onClick={() => setColorMode('dark')}
                            >
                                <CIcon className="me-2" icon={cilMoon} size="lg" /> Dark
                            </CDropdownItem>
                            <CDropdownItem
                                active={colorMode === 'auto'}
                                className="d-flex align-items-center"
                                as="button"
                                type="button"
                                onClick={() => setColorMode('auto')}
                            >
                                <CIcon className="me-2" icon={cilContrast} size="lg" /> Auto
                            </CDropdownItem>
                        </CDropdownMenu>
                    </CDropdown> */}
                    <li className="nav-item py-1">
                        <div className="vr h-100 mx-2 text-primary opacity-25"></div>
                    </li>
                    <AppHeaderDropdown />
                </CHeaderNav>
            </CContainer>
        </CHeader>
    )
}

export default AppHeader
