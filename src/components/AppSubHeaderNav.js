import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'

import { CBadge, CContainer, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CHeaderNav, CNavLink, CSidebarNav } from '@coreui/react'

export const AppSubHeaderNav = ({ items }) => {
    const navLink = (name, icon, badge, indent = false) => {
        return (
            <span className='text-center'>
                {icon
                    ? icon
                    : indent && (
                        <span className="nav-icon">
                            <span className="nav-icon-bullet"></span>
                        </span>
                    )}
                <span className='ps-1 fw-bold'>{name}</span>
                {badge && (
                    <CBadge color={badge.color} className="ms-auto" size="sm">
                        {badge.text}
                    </CBadge>
                )}
            </span>
        )
    }

    const navItem = (item, index, indent = false) => {
        const { name, badge, icon, to } = item
        return (
            <CHeaderNav variant="nav-item" key={index}>
                <CNavLink href={to} active={window.location.pathname === to}>
                    {navLink(name, icon, badge, indent)}
                </CNavLink>
            </CHeaderNav>
        )
    }

    const navDropDownItem = (item, index, indent = false) => {
        const { name, badge, icon, to } = item
        return (
            <CDropdownItem href={to} key={index}>
                {navLink(name, icon, badge, indent)}
            </CDropdownItem>
        )
    }

    const navGroup = (item, index) => {
        const { name, icon, items, to } = item
        return (
            <CHeaderNav key={index}>
                <CDropdown>
                    <CDropdownToggle style={{ outline: 'none', border: 'none' }}>
                        {navLink(name, icon)}
                    </CDropdownToggle>

                    <CDropdownMenu>
                        {items?.map((item, index) =>
                            item.items ? navGroup(item, index) : navDropDownItem(item, index, true),
                        )}
                    </CDropdownMenu>
                </CDropdown>
            </CHeaderNav>
        )
    }

    return (
        <CContainer className="px-4" fluid>
            {items &&
                items.map((item, index) => (item.items ? navGroup(item, index) : navItem(item, index)))}
        </CContainer>
    )
}

AppSubHeaderNav.propTypes = {
    items: PropTypes.arrayOf(PropTypes.any).isRequired,
}
