import React, { Suspense, useContext, useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CSpinner } from '@coreui/react'

// routes config
import { UserContext } from '../providers/userProvider'
import purchaserRoutes from '../routes/purchaserRoutes'

const AppContent = () => {
    const { user } = useContext(UserContext);
    const [routes, setRoutes] = useState([])

    if (!user) { return <Navigate to='/login' replace /> }

    useEffect(() => {
        switch (user?.personalInfo?.RoleID) {
            case 'RoleID_03':
                setRoutes(purchaserRoutes)
                break;
            default:
                break;
        }
    }, [user])

    return (
        <div className="mx-4 mb-2 py-0 ">
            <Suspense fallback={
                <div className="pt-3 text-center">
                    <CSpinner color="primary" variant="grow" />
                </div>
            }>
                <Routes>
                    {routes.map((route, idx) => {
                        return (
                            route.element && (
                                <Route
                                    key={idx}
                                    path={route.path}
                                    exact={route.exact}
                                    name={route.name}
                                    element={<route.element />}
                                />
                            )
                        )
                    })}
                </Routes>
            </Suspense>
        </div>
    )
}

export default React.memo(AppContent)
