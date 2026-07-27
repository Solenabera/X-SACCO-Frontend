import { CToaster } from '@coreui/react';
import { createContext, useRef, useState } from 'react';

export const ToasterContext = createContext({});

const Toaster = ({ children }) => {
    const [toast, addToast] = useState()
    const toaster = useRef(null)

    return (
        <ToasterContext.Provider value={{ addToast }} >
            <CToaster className="p-3" placement="top-end" push={toast} ref={toaster} />
            {children}
        </ToasterContext.Provider>
    );
};

export default Toaster;