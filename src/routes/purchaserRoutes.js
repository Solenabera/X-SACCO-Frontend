import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const PurchaserDashboard = React.lazy(() => import('../views/dashboard/ClientDashboard'))
// const Charts = React.lazy(() => import('../views/charts/Charts'))
// const Widgets = React.lazy(() => import('../views/widgets/Widgets'))

// Custom
const Savings = React.lazy(() => import('../views/Client/Savings'))
// const Bids = React.lazy(() => import('../views/Purchaser/Procurement/bids'))
// const Profile = React.lazy(() => import('../views/ManageProfile'))

const NotFound = () => {
    const navigate = useNavigate()
    useEffect(() => { navigate('/404') })
    return null
}

const purchaserRoutes = [
    { path: '/', name: 'PurchaserDashboard', element: PurchaserDashboard },
    // { path: '/charts', name: 'Charts', element: Charts },
    // { path: '/widgets', name: 'Widgets', element: Widgets },
    { path: '/savings', name: 'Savings', element: Savings },

    // { path: '/procurement/bids', name: 'Bids', element: Bids },
    // { path: '/profile', name: 'Profile', element: Profile },
    { path: '*', name: '404', element: NotFound },
]

export default purchaserRoutes