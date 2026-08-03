import { useContext, useEffect, useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormInput,
    CFormLabel,
    CFormSelect,
    CRow,
    CInputGroup,
    CFormTextarea,
    CModal,
    CInputGroupText,
    CSpinner
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import { cilPlus, cilPencil, cilTrash, cilViewColumn } from '@coreui/icons';
import './savings.css';
import customColors from "../../constants/colors"
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { UserContext } from '../../providers/userProvider';
import useApiFetch from '../../hooks/useAPIFetch';
import document from '../../yup/docSchema';
import { API_URL } from '../../Config/config';
import { ToasterContext } from '../../providers/toastProvider';
import Toast from '../../components/Toast';

const ManagePurchaserDocuments = () => {
    const { addToast } = useContext(ToasterContext)
    const { user } = useContext(UserContext);

    const [documents, setDocuments] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [newModalType, setNewModalType] = useState(true);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [docToDelete, setDocToDelete] = useState(null);

    const [allDocumentTypes, setAllDocumentTypes] = useState([]);

    const {
        register: registerPurchaserDoc,
        handleSubmit: handleSubmitPurchaserDoc,
        formState: { errors: errorsPurchaserDocForm },
        control,
        setValue,
    } = useForm({ resolver: yupResolver(document) });

    const {
        register: registerPurchaserUpdateDoc,
        handleSubmit: handleSubmitPurchaserUpdateDoc,
        formState: { errors: errorsPurchaserDocUpdateForm },
        reset,
        control: controlUpdate,
    } = useForm({ resolver: yupResolver(document) });

    const newFile = useWatch({ control, name: 'document' })
    const documentType = useWatch({ control, name: 'documentType' })

    const updateFile = useWatch({ control: controlUpdate, name: 'document' })

    useEffect(() => {
        if (documentType) {
            setValue('documentTitle', `${documentType} - ${user?.personalInfo?.UserID}`)
        }
    }, [documentType])

    const {
        data,
        isLoading,
    } = useApiFetch({ url: 'fetch-document-types', method: 'GET' }, true)

    const {
        data: dataPurchaser,
        isLoading: isLoadingPurchaser,
        fetchData
    } = useApiFetch({ url: 'fetch-user-documents-data', method: 'GET', }, true)

    const {
        data: dataInsert,
        isLoading: isLoadingInsert,
        fetchData: fetchDataInsert,
        errors: errorsInsert
    } = useApiFetch({ url: 'insert-user-documents', method: 'POST' }, false)

    const {
        data: dataUpdate,
        isLoading: isLoadingUpdate,
        fetchData: fetchDataUpdate,
        errors: errorsUpdate,
    } = useApiFetch({ url: 'update-user-document', method: 'PUT' }, false)

    const {
        data: dataDelete,
        isLoading: isLoadingDelete,
        fetchData: fetchDataDelete,
        errors: errorsDelete,
    } = useApiFetch({ url: 'delete-user-document', method: 'POST' }, false)

    useEffect(() => {
        if (!isLoading && data) {
            const docs = data?.data?.documentTypes ?? [];
            let filtered = []
            switch (user?.personalInfo?.RoleID) {
                case 'RoleID_02':
                    filtered = docs?.filter((doc) => doc?.documentMandatoryForSupplier)
                    break;
                case 'RoleID_03':
                    filtered = docs?.filter((doc) => doc?.documentMandatoryForPurchaser)
                    break;
                case 'RoleID_04':
                    filtered = docs?.filter((doc) => doc?.documentMandatoryForConsultant)
                    break;
                default:
                    filtered = []
                    break;
            }
            setAllDocumentTypes(filtered);
        }
    }, [isLoading, data])

    useEffect(() => {
        if (!isLoadingPurchaser && dataPurchaser) {
            const docs = dataPurchaser?.data?.documents[0]?.documents;
            setDocuments(docs ?? []);
        }
    }, [isLoadingPurchaser, dataPurchaser])

    useEffect(() => {
        if (!isLoadingInsert && dataInsert) {
            addToast(Toast({ message: "Document uploaded.", type: 'success' }))
            fetchData()
        }
        else if (errorsInsert?.details) {
            addToast(Toast({ message: errorsInsert?.details?.response?.data?.message ?? errorsInsert?.message, type: 'warning' }))
        }
    }, [isLoadingInsert, dataInsert, errorsInsert])

    useEffect(() => {
        if (!isLoadingUpdate & dataUpdate) {
            addToast(Toast({ message: "Document updated.", type: 'success' }))
            setShowModal(false);
            fetchData()
        }
        else if (errorsUpdate?.details) {
            addToast(Toast({ message: errorsUpdate?.details?.response?.data?.message ?? errorsUpdate?.message, type: 'warning' }))
        }
    }, [isLoadingUpdate, dataUpdate, errorsUpdate])

    useEffect(() => {
        if (!isLoadingDelete && dataDelete) {
            addToast(Toast({ message: "Document deleted.", type: 'success' }))
            fetchData()
        }
        else if (errorsDelete?.details) {
            addToast(Toast({ message: errorsDelete?.details?.response?.data?.message ?? errorsDelete?.message, type: 'warning' }))
        }
    }, [isLoadingDelete, dataDelete, errorsDelete])

    const handleInsertBtn = (data) => {
        setShowModal(false);
        const formData = new FormData();
        formData.append('userEmail', user?.personalInfo?.Email)
        formData.append('document', data.document[0]);
        formData.append('documentTitle', data.documentTitle);
        formData.append('documentType', data.documentType);
        formData.append('documentDescription', data.documentDescription);

        fetchDataInsert({ data: formData })
    };

    const handleUpdateBtn = (data) => {
        const formData = new FormData();
        formData.append('documentId', data?._id);
        formData.append('userEmail', user?.personalInfo?.Email);
        formData.append('documentTitle', data?.documentTitle);
        formData.append('documentType', data?.documentType);
        formData.append('documentDescription', data?.documentDescription || '');
        if (data?.document?.length) formData.append('document', data.document[0]);

        fetchDataUpdate({ data: formData })
    };

    const handlePreviewDocBtn = (file) => {
        if (file) {
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL, '_blank');
        } else {
            addToast(Toast({ message: "No file selected for preview!", type: 'warning' }))
        }
    };

    const handleAddNewBtn = () => {
        setNewModalType(true);
        setShowModal(true);
    };

    const handleEditDocBtn = (doc) => {
        reset(doc)
        setNewModalType(false);
        setShowModal(true);
    }

    const handleDeleteDocBtn = (doc) => {
        setDocToDelete(doc);
        setShowDeleteModal(true);
    };

    const confirmDeleteDoc = async () => {
        setShowDeleteModal(false);
        fetchDataDelete({
            data: {
                userEmail: user?.personalInfo?.Email,
                documentId: docToDelete._id,
            }
        })

    };

    return (
        <>
            {isLoading ?
                <div className="pt-3 text-center">
                    <CSpinner color="primary" variant="grow" />
                </div>
                :
                <CRow>
                    <CCol xs={12}>
                        <CCard className="mb-4">
                            <CCardHeader
                                className="d-flex justify-content-between align-items-center"
                                style={{ color: customColors.headerTextColor, backgroundColor: customColors.headerBgColor, position: 'relative' }}
                            >
                                <div style={{ flexGrow: 1, textAlign: 'center' }}>
                                    <strong style={{ fontSize: '1.5rem' }}>Documents</strong>
                                </div>

                                <CButton size="xl" onClick={handleAddNewBtn} style={{ color: 'blue' }}>
                                    <CIcon icon={cilPlus} />
                                </CButton>
                            </CCardHeader>

                            <CCardBody className='my-2 p-0'>
                                <CRow className='g-2'>
                                    {documents?.map((doc, index) => (
                                        <CCol md={4} key={index}>
                                            <CCard>
                                                <CCardHeader style={{ color: customColors.headerTextColor, backgroundColor: customColors.headerBgColor, position: 'relative' }} className="d-flex justify-content-between align-items-center">
                                                    <strong>{doc.documentType}</strong>
                                                    <div className="d-flex">
                                                        <CButton size="sm" onClick={() => handleDeleteDocBtn(doc)} style={{ marginRight: '5px' }}>
                                                            <CIcon icon={cilTrash} style={{ color: customColors.deleteBtnColor }} />
                                                        </CButton>
                                                        <CButton size="sm" onClick={() => handleEditDocBtn(doc)}>
                                                            <CIcon icon={cilPencil} style={{ color: 'blue' }} />
                                                        </CButton>
                                                    </div>
                                                </CCardHeader>

                                                <CCardBody>
                                                    <CForm className="row g-3">
                                                        <CCol md={12}>
                                                            <CFormLabel htmlFor="inputState">
                                                                Document Title <span style={{ color: "red" }}>*</span>
                                                            </CFormLabel>
                                                            <CInputGroup>
                                                                <CFormInput
                                                                    placeholder="Document Title"
                                                                    autoComplete="Title"
                                                                    value={doc?.documentTitle}
                                                                    disabled
                                                                />
                                                                <CInputGroupText role='button'
                                                                    onClick={() => { window.open(`${API_URL}fetch-user-documents/${doc?.filepath}`, '_blank') }}>
                                                                    View File
                                                                </CInputGroupText>
                                                            </CInputGroup>
                                                        </CCol>

                                                        <CCol xs={12}>
                                                            <CFormLabel htmlFor="description">Description</CFormLabel>
                                                            <CInputGroup className="mb-3">
                                                                <CFormTextarea
                                                                    id="description"
                                                                    placeholder="Document Descriptions"
                                                                    autoComplete="off"
                                                                    value={doc?.documentDescription}
                                                                    rows={2}
                                                                    disabled
                                                                />
                                                            </CInputGroup>
                                                        </CCol>
                                                    </CForm>
                                                </CCardBody>
                                            </CCard>
                                        </CCol>

                                    ))}
                                </CRow>

                                {!isLoadingPurchaser && documents?.length === 0 &&
                                    <CCol className='my-3' align='center'>
                                        <CRow>
                                            <h1 className='h5'>You have no documents yet!</h1>
                                        </CRow>
                                        <CRow>
                                            <CCol>
                                                <CButton size="xl" onClick={handleAddNewBtn} className='btn-outline-primary'>
                                                    <CIcon icon={cilPlus} /> Add
                                                </CButton>
                                            </CCol>
                                        </CRow>
                                    </CCol>
                                }
                            </CCardBody>

                            <CModal visible={showModal} onClose={() => setShowModal(false)}>
                                <CCard>
                                    <CCardHeader
                                        className="d-flex justify-content-between align-items-center"
                                        style={{ color: customColors.headerTextColor, backgroundColor: customColors.headerBgColor, position: 'relative' }}
                                    >
                                        <div style={{ flexGrow: 1, textAlign: 'center' }}>
                                            <strong style={{ fontSize: '1.2rem' }}>{newModalType ? "Add New Document" : "Edit Document"}</strong>
                                        </div>
                                    </CCardHeader>
                                    <CCardBody>
                                        {!newModalType ?
                                            <CForm onSubmit={handleSubmitPurchaserUpdateDoc(handleUpdateBtn)} className="row g-3">
                                                <CCol md={6}>
                                                    <CFormLabel htmlFor="inputState">
                                                        Document Type
                                                    </CFormLabel>
                                                    <CFormInput
                                                        id="editDocType"
                                                        {...registerPurchaserUpdateDoc('documentTitle')}
                                                    />
                                                </CCol>

                                                <CCol md={6}>
                                                    <CFormLabel htmlFor="inputState">
                                                        Document Title <span style={{ color: "red" }}>*</span>
                                                    </CFormLabel>
                                                    <CInputGroup className="mb-3">
                                                        <CFormInput
                                                            placeholder="Document Title"
                                                            autoComplete="Title"
                                                            disabled
                                                            {...registerPurchaserUpdateDoc('documentTitle')}
                                                        />
                                                    </CInputGroup>
                                                    {errorsPurchaserDocUpdateForm?.documentTitle &&
                                                        <p className='text-danger'>{errorsPurchaserDocUpdateForm?.documentTitle?.message}</p>
                                                    }
                                                </CCol>

                                                <CCol className='me-0 pe-0' xs={12}>
                                                    <CFormLabel htmlFor="fileUpload">
                                                        Upload File <span style={{ color: "red" }}>*</span>
                                                    </CFormLabel>
                                                    <CInputGroup className="mb-3">
                                                        <CFormInput
                                                            type="file"
                                                            id="fileUpload"
                                                            {...registerPurchaserUpdateDoc('document')}
                                                        />
                                                        <CInputGroupText role='button'
                                                            disabled={!updateFile || !updateFile[0]}
                                                            onClick={() => { handlePreviewDocBtn(updateFile[0]) }}
                                                            color="primary"
                                                            title='Open file'>
                                                            <CIcon icon={cilViewColumn} style={{ color: 'blue' }} />
                                                        </CInputGroupText>
                                                    </CInputGroup>
                                                </CCol>

                                                <CCol xs={12}>
                                                    <CFormLabel htmlFor="description">Description</CFormLabel>
                                                    <CInputGroup className="mb-3">
                                                        <CFormTextarea
                                                            id="description"
                                                            placeholder="Document Description"
                                                            autoComplete="off"
                                                            {...registerPurchaserUpdateDoc('documentDescription')}
                                                            rows={5}
                                                        />
                                                    </CInputGroup>
                                                </CCol>

                                                <CCol xs={12}>
                                                    <CButton type='submit' color="primary" size="md">Update</CButton>
                                                </CCol>
                                            </CForm>
                                            :
                                            <CForm onSubmit={handleSubmitPurchaserDoc(handleInsertBtn)} className="row g-3">
                                                <CCol md={6}>
                                                    <CFormLabel htmlFor="inputState">
                                                        Document Type <span style={{ color: "red" }}>*</span>
                                                    </CFormLabel>
                                                    <CFormSelect
                                                        id="inputState"
                                                        {...registerPurchaserDoc('documentType')}
                                                    >
                                                        <option value=''>Select Type</option>
                                                        {allDocumentTypes.map(docType => (
                                                            <option key={docType._id} value={docType.documentType}>
                                                                {docType.documentType}
                                                            </option>
                                                        ))}
                                                    </CFormSelect>
                                                    {errorsPurchaserDocForm?.documentType &&
                                                        <p className='text-danger'>{errorsPurchaserDocForm?.documentType?.message}</p>
                                                    }
                                                </CCol>

                                                <CCol md={6}>
                                                    <CFormLabel htmlFor="inputState">
                                                        Document Title <span style={{ color: "red" }}>*</span>
                                                    </CFormLabel>
                                                    <CInputGroup>
                                                        <CFormInput
                                                            placeholder="Document Title"
                                                            autoComplete="Title"
                                                            {...registerPurchaserDoc('documentTitle')}
                                                        />
                                                    </CInputGroup>
                                                    {errorsPurchaserDocForm?.documentTitle &&
                                                        <p className='text-danger'>{errorsPurchaserDocForm?.documentTitle?.message}</p>
                                                    }
                                                </CCol>

                                                <CRow className='mt-3 align-items-end'>
                                                    <CCol className='me-0 pe-0' xs={11}>
                                                        <CFormLabel htmlFor="fileUpload">
                                                            Upload File <span style={{ color: "red" }}>*</span>
                                                        </CFormLabel>
                                                        <CInputGroup>
                                                            <CFormInput
                                                                type="file"
                                                                id="fileUpload"
                                                                {...registerPurchaserDoc('document')}
                                                            />
                                                        </CInputGroup>
                                                        {errorsPurchaserDocForm?.document &&
                                                            <p className='text-danger'>{errorsPurchaserDocForm?.document?.message}</p>
                                                        }
                                                    </CCol>

                                                    <CCol className='ms-0 ps-0' xs={1}>
                                                        <CButton
                                                            color="primary"
                                                            size="md"
                                                            disabled={!newFile || !newFile[0]}
                                                            title='Open file'
                                                            onClick={() => { handlePreviewDocBtn(newFile[0]) }}>
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="20"
                                                                height="20"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            >
                                                                <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                                                                <circle cx="12" cy="12" r="3" />
                                                            </svg>
                                                        </CButton>
                                                    </CCol>
                                                </CRow>


                                                <CCol xs={12}>
                                                    <CFormLabel htmlFor="description">Description</CFormLabel>
                                                    <CInputGroup>
                                                        <CFormTextarea
                                                            id="description"
                                                            placeholder="Document Description"
                                                            autoComplete="off"
                                                            {...registerPurchaserDoc('documentDescription')}
                                                            rows={5}
                                                        />
                                                    </CInputGroup>
                                                </CCol>

                                                <CCol xs={12} align='center'>
                                                    <CButton type='submit' color="primary" size="md"> Add </CButton>
                                                </CCol>
                                            </CForm>
                                        }
                                    </CCardBody>
                                </CCard>
                            </CModal>

                            <CModal visible={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
                                <CCard>
                                    <CCardHeader
                                        className="d-flex justify-content-between align-items-center"
                                        style={{ color: customColors.headerTextColor, backgroundColor: customColors.headerBgColor, position: 'relative' }}
                                    >
                                        <div style={{ flexGrow: 1, textAlign: 'center' }}>
                                            <strong style={{ fontSize: '1.2rem' }}>Delete Document</strong>
                                        </div>
                                    </CCardHeader>
                                    <CCardBody>
                                        <p>Are you sure you want to delete <strong>{docToDelete?.documentType}</strong>?</p>
                                        <CCol align='center'>
                                            <CButton color="danger" onClick={confirmDeleteDoc}>
                                                Delete
                                            </CButton>
                                        </CCol>
                                    </CCardBody>
                                </CCard>
                            </CModal>
                        </CCard>
                    </CCol>
                </CRow>
            }
        </>
    )
}

export default ManagePurchaserDocuments
