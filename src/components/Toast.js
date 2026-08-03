import { CToast, CToastBody, CToastClose } from "@coreui/react"

const Toast = ({ message, type }) => {
    return <CToast delay={5000} visible color={type} className="text-white align-items-center mb-2 toast-top-right">
        <div className="d-flex">
            <CToastBody>{message}</CToastBody>
            <CToastClose className="me-2 m-auto" white />
        </div>
    </CToast>
}

export default Toast;