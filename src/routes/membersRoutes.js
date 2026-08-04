import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const MembersDashboard = React.lazy(() => import('../views/dashboard/MembersDashboard'))
const ManageMembersSavings = React.lazy(() => import('../views/Member/Savings'))
const ManageMembersLoans = React.lazy(() => import('../views/Member/Loans'))
const ManageMembersShares = React.lazy(() => import('../views/Member/Shares'))
const ManageMembersTransactions = React.lazy(() => import('../views/Member/Transactions'))

const NotFound = () => {
    const navigate = useNavigate()
    useEffect(() => { navigate('/404') })
    return null
}

const membersRoutes = [
    { path: '/', name: 'MembersDashboard', element: MembersDashboard },
    { path: '/my-shares', name: 'Shares', element: ManageMembersShares },
    { path: '/my-savings', name: 'Savings', element: ManageMembersSavings },
    { path: '/my-loans', name: 'Loans', element: ManageMembersLoans },
    { path: '/my-transactions', name: 'Transactions', element: ManageMembersTransactions },

    { path: '*', name: '404', element: NotFound },
]

export default membersRoutes