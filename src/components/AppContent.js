import React, { Suspense, useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CSpinner } from '@coreui/react'

// routes config
import { UserContext } from '../providers/userProvider'
import membersRoutes from '../routes/membersRoutes'

const AppContent = () => {
    const { user } = useContext(UserContext);
    const routes = membersRoutes;

    if (!user) { return <Navigate to='/login' replace /> }

    return (
        <div className="mx-3 mx-md-4 mb-3 py-1">
            <div className="sacco-surface rounded-4 p-3 p-md-4">
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
        </div>
    )
}

export default React.memo(AppContent)
