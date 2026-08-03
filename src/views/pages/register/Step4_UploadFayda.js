import React, { useEffect, useState } from 'react'
import {
    CForm,
    CFormInput,
    CButton,
    CRow,
    CCol,
    CAlert,
} from '@coreui/react'
import useApiFetch from '../../../hooks/useAPIFetch';

const Step4_UploadFayda = ({ phoneNumber, personalInfo, userAddress, onBack, onSuccess }) => {
    const [file, setFile] = useState(null);
    const [validationError, setValidationError] = useState('');

    // Setup the API Fetch hook for the final submission
    const { data, isLoading, errors: apiErrors, fetchData } = useApiFetch(
        { url: 'register_user', method: 'POST', isFormData: true }, 
        false
    );

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setValidationError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!file) {
            setValidationError('Please upload your Fayda ID document.');
            return;
        }

        // Construct the final payload combining all stepper data
        const formData = new FormData();
        
        formData.append('phoneNumber', phoneNumber);
        
        // Append all personal info keys
        Object.keys(personalInfo).forEach(key => {
            formData.append(key, personalInfo[key]);
        });
        
        // Append all address info keys
        Object.keys(userAddress).forEach(key => {
            formData.append(key, userAddress[key]);
        });

        // Append the physical file
        formData.append('faydaDocument', file);

        // Execute API Call
        fetchData({ data: formData });
    };

    // Watch for successful API response
    useEffect(() => {
        if (data && !apiErrors?.isError && !isLoading) {
            onSuccess();
        }
    }, [data, apiErrors, isLoading, onSuccess]);

    return (
        <CForm onSubmit={handleSubmit}>
            <h5 className="mb-4 text-center">Upload Fayda ID</h5>

            <CCol md={12} className="mb-4">
                <CFormInput
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    required
                />
                <small className="text-muted mt-1 d-block">
                    Please upload a clear scan or photo of your Fayda ID.
                </small>
            </CCol>

            {validationError && <CAlert color="danger">{validationError}</CAlert>}
            
            {apiErrors?.isError && (
                <CAlert color="danger">
                    {apiErrors?.details?.response?.data?.message ?? apiErrors?.message ?? 'An error occurred during registration.'}
                </CAlert>
            )}

            <CRow className="mt-4">
                <CCol xs={6}>
                    <CButton color="secondary" variant="outline" onClick={onBack} className="w-100" disabled={isLoading}>
                        Back
                    </CButton>
                </CCol>
                <CCol xs={6}>
                    <CButton type="submit" color="primary" className="w-100" disabled={isLoading}>
                        {isLoading ? 'Submitting...' : 'Submit'}
                    </CButton>
                </CCol>
            </CRow>
        </CForm>
    );
};

export default Step4_UploadFayda;