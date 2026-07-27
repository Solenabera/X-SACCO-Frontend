import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
// import AppSubHeader from '../components/AppSubHeader'

const DefaultLayout = () => {
    return (
        <div>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                {/* <AppSubHeader /> */}
                <div className="body flex-grow-1 m-0 p-0">
                    <AppContent />
                </div>
                <AppFooter />
            </div>
        </div>
    )
}

export default DefaultLayout
