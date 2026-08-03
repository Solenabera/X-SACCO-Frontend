import React, { useEffect, useState } from 'react'
import {
    CForm,
    CFormInput,
    CButton,
    CRow,
    CCol,
    CFormLabel,
} from '@coreui/react'
import useApiFetch from '../../../hooks/useAPIFetch';

const Step5_UploadFiles = ({ email, roleID, onBack, onSuccess }) => {
    const [documents, setDocuments] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState({});
    const [error, setError] = useState('');

    const { data, isLoading: isLoadingDocs,
    } = useApiFetch({ url: 'fetch-document-types', method: 'GET' }, true)

    const { isLoading, fetchData,
    } = useApiFetch({ url: 'upload-user-documents-registration', method: 'POST' }, false)

    useEffect(() => {
        if (!isLoadingDocs && data) {
            setDocuments(data?.data?.documentTypes);
        }
    }, [isLoadingDocs, data]);

    const getMandatoryDocs = () => {
        switch (roleID) {
            case 'RoleID_02':
                return documents.filter(doc => doc.documentMondatoryForSupplier === 'true');
            case 'RoleID_03':
                return documents.filter(doc => doc.documentMondatoryForPurchaser === 'true');
            case 'RoleID_04':
                return documents.filter(doc => doc.documentMondatoryForConsultant === 'true');
            default:
                return [];
        }
    };

    const handleFileChange = (e, doc) => {
        const file = e.target.files[0];
        setUploadedFiles(prev => ({
            ...prev,
            [doc._id]: {
                file,
                documentTitle: doc.documentType, // default to type
                documentType: doc.documentType,
                documentDescription: `Required for ${roleID}`
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        for (const doc of getMandatoryDocs()) {
            const fileData = uploadedFiles[doc._id];
            if (!fileData || !fileData.file) {
                throw new Error(`Please upload file for: ${doc.documentType}`);
            }

            const formData = new FormData();
            formData.append('userEmail', email);
            formData.append('document', fileData.file);
            formData.append('documentTitle', fileData.documentTitle);
            formData.append('documentType', fileData.documentType);
            formData.append('documentDescription', fileData.documentDescription);

            fetchData({ data: formData })
        }

        onSuccess();
    };

    return (
        <CForm onSubmit={handleSubmit}>
            <h5>Step 5: Upload Mandatory Documents</h5>

            {getMandatoryDocs().map(doc => (
                <CCol md={12} key={doc._id} className="mb-3">
                    <CFormLabel>
                        {doc.documentType} <span style={{ color: "red" }}>*</span>
                    </CFormLabel>
                    <CFormInput
                        type="file"
                        onChange={(e) => handleFileChange(e, doc)}
                        required
                    />
                </CCol>
            ))}

            {error && <p className='text-danger'>{error}</p>}

            <CRow>
                <CCol>
                    <CButton color="secondary" onClick={onBack} className="w-100" disabled={isLoading}>
                        Back
                    </CButton>
                </CCol>
                <CCol>
                    <CButton type="submit" color="primary" className="w-100" disabled={isLoading}>
                        {isLoading ? 'Submitting...' : 'Continue'}
                    </CButton>
                </CCol>
            </CRow>
        </CForm>
    );
};

export default Step5_UploadFiles;
