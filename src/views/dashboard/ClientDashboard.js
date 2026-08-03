import React from 'react'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import RecentTransaction from './RecentTransaction'

const Dashboard = () => {
  return (
    <>
      <WidgetsDropdown className="mb-4" />
      <RecentTransaction />
    </>
  )
}

export default Dashboard