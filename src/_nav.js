import React from 'react'
import CIcon from '@coreui/icons-react'
import {
    cilSpeedometer,
    cilWallet,
    cilMoney,
    cilChartPie,
    cilSwapHorizontal,
    cilSend,
    cilCreditCard,
    cilPeople,
    cilBriefcase,
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
        name: 'Make Payment',
        to: '/make-payments',
        icon: <CIcon icon={cilCreditCard} className="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Shares',
        to: '/my-shares',
        icon: <CIcon icon={cilChartPie} className="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Savings',
        to: '/my-savings',
        icon: <CIcon icon={cilWallet} className="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Loans',
        to: '/my-loans',
        icon: <CIcon icon={cilMoney} className="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'My Transactions',
        to: '/my-transactions',
        icon: <CIcon icon={cilSwapHorizontal} className="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Invitations',
        to: '/invitations',
        icon: <CIcon icon={cilPeople} className="nav-icon" />,
    },
    // {
    //     component: CNavItem,
    //     name: 'Become an Agent',
    //     to: '/become-an-agent',
    //     icon: <CIcon icon={cilBriefcase} className="nav-icon" />,
    // },
    // {
    //     component: CNavGroup,
    //     name: 'Transfer',
    //     to: '/transfer',
    //     icon: <CIcon icon={cilSend} className="nav-icon" />,
    //     items: [
    //         {
    //             component: CNavItem,
    //             name: 'Transfer Share',
    //             to: '/transfer/share',
    //             icon: <CIcon icon={cilChartPie} className="nav-icon mx-1" />,
    //         },
    //         {
    //             component: CNavItem,
    //             name: 'Transfer Savings',
    //             to: '/transfer/savings',
    //             icon: <CIcon icon={cilWallet} className="nav-icon mx-1" />,
    //         },
    //         {
    //             component: CNavItem,
    //             name: 'Transfer Loan',
    //             to: '/transfer/loan',
    //             icon: <CIcon icon={cilMoney} className="nav-icon mx-1" />,
    //         },
    //     ],
    // },
]

export default {
    _nav_Purchaser,
}