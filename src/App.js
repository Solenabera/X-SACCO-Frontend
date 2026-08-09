import React, { Suspense, useContext, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'

import { UserContext } from './providers/userProvider'
import useAxiosInterceptor from './hooks/useAxiosInterceptor'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const PublicLandingPage = React.lazy(() => import('./views/pages/public/PublicLandingPage'))
const PublicSavingsPage = React.lazy(() => import('./views/pages/public/PublicSavingsPage'))
const PublicLoansPage = React.lazy(() => import('./views/pages/public/PublicLoansPage'))
const PublicAboutPage = React.lazy(() => import('./views/pages/public/PublicAboutPage'))
const PublicContactPage = React.lazy(() => import('./views/pages/public/PublicContactPage'))
const Login = React.lazy(() => import('./views/pages/login/Login'))
const RegisterStepper = React.lazy(() => import('./views/pages/register/RegisterStepper'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))


const AxiosInterceptorBridge = () => {
    useAxiosInterceptor();
    return null;
};

const App = () => {
    const { user } = useContext(UserContext)
    const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
    const storedTheme = useSelector((state) => state.theme)

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.href.split('?')[1])
        const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
        if (theme) {
            setColorMode(theme)
        }

        if (isColorModeSet()) {
            return
        }

        setColorMode(storedTheme)
    }, [])

    return (
        <BrowserRouter>
            <AxiosInterceptorBridge />
            <Suspense
                fallback={
                    <div className="pt-3 text-center">
                        <CSpinner color="primary" variant="grow" />
                    </div>
                }
            >
                <Routes>
                    <Route exact path="/" name="Public Home" element={user ? <DefaultLayout /> : <PublicLandingPage />} />
                    <Route exact path="/savings" name="Savings Page" element={<PublicSavingsPage />} />
                    <Route exact path="/loans" name="Loans Page" element={<PublicLoansPage />} />
                    <Route exact path="/about" name="About Us Page" element={<PublicAboutPage />} />
                    <Route exact path="/contact" name="Contact Us Page" element={<PublicContactPage />} />
                    <Route exact path="/login" name="Login Page" element={<Login />} />
                    <Route exact path="/register/*" name="Register Page" element={<RegisterStepper />} />
                    <Route exact path="/404" name="Page 404" element={<Page404 />} />
                    <Route exact path="/500" name="Page 500" element={<Page500 />} />
                    <Route path="*" name="Home" element={<DefaultLayout />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}

export default App
