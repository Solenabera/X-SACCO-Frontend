import { CButton, CCol, CForm, CFormInput, CFormLabel, CFormSelect, CInputGroup } from "@coreui/react";

const UpdateDocTypeForm = ({ registerUpdate, handleSubmitUpdate, handleUpdateBtn, errorsUpdateDocTypeForm }) => {
    return <CForm onSubmit={handleSubmitUpdate(handleUpdateBtn)} className="row g-3">
        <CCol md={12}>
            <CFormLabel>Document Type <span style={{ color: "red" }}>*</span></CFormLabel>
            <CInputGroup>
                <CFormInput
                    placeholder="Document Type"
                    autoComplete="Type"
                    {...registerUpdate('documentType')}
                />
            </CInputGroup>
            {errorsUpdateDocTypeForm?.documentType &&
                <p className='text-danger'>{errorsUpdateDocTypeForm?.documentType?.message}</p>
            }
        </CCol>

        <CCol md={12}>
            <CFormLabel>Document Mandatory for Supplier</CFormLabel>
            <CFormSelect {...registerUpdate('documentMandatoryForSupplier')}>
                <option value="true">True</option>
                <option value="false">False</option>
            </CFormSelect>
        </CCol>

        <CCol md={12}>
            <CFormLabel>Document Mandatory for Purchaser</CFormLabel>
            <CFormSelect {...registerUpdate('documentMandatoryForPurchaser')}>
                <option value="true">True</option>
                <option value="false">False</option>
            </CFormSelect>
        </CCol>

        <CCol md={12}>
            <CFormLabel>Document Mandatory for Consultant</CFormLabel>
            <CFormSelect {...registerUpdate('documentMandatoryForConsultant')}>
                <option value="true">True</option>
                <option value="false">False</option>
            </CFormSelect>
        </CCol>

        <CCol md={12}>
            <CFormLabel>Document Mandatory for Company</CFormLabel>
            <CFormSelect {...registerUpdate('documentMandatoryForCompany')}>
                <option value="true">True</option>
                <option value="false">False</option>
            </CFormSelect>
        </CCol>

        <CCol align="center" xs={12}>
            <CButton type='submit' color="primary" size="md">Update</CButton>
        </CCol>
    </CForm>
}

export default UpdateDocTypeForm;