import React from 'react'
import CIcon from '@coreui/icons-react'
import {
    cilSpeedometer,
    cilWallet,
    cilMoney,
    cilChartPie,
    cilSwapHorizontal,
    cilNotes,
    cilDescription,
    cilBriefcase,
    cilPlus,
    cilPencil,
} from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

const _nav_Purchaser = [
    {
        component: CNavItem,
        name: 'Dashboard',
        to: '/',
        icon: <CIcon icon={cilSpeedometer} className="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Savings',
        to: '/savings',
        icon: <CIcon icon={cilWallet} className="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Loans',
        to: '/loans',
        icon: <CIcon icon={cilMoney} className="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Shares',
        to: '/shares',
        icon: <CIcon icon={cilChartPie} className="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Transactions',
        to: '/transactions',
        icon: <CIcon icon={cilSwapHorizontal} className="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Contributions',
        to: '/contributions',
        icon: <CIcon icon={cilNotes} className="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Statements',
        to: '/statements',
        icon: <CIcon icon={cilDescription} className="nav-icon" />,
    },
    {
        component: CNavGroup,
        name: 'Procurement',
        to: '/procurement',
        icon: <CIcon icon={cilBriefcase} className="nav-icon" />,
        items: [
            {
                component: CNavItem,
                name: 'Initiate Procurement',
                to: '/procurement/initiate',
                icon: <CIcon icon={cilPlus} className="nav-icon mx-1" />,
            },
            {
                component: CNavItem,
                name: 'Draft',
                to: '/procurement/draft',
                icon: <CIcon icon={cilPencil} className="nav-icon mx-1" />,
            },
        ],
    },
]

export default {
    _nav_Purchaser,
}