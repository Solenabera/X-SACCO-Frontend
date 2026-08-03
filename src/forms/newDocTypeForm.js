import { CButton, CCol, CForm, CFormInput, CFormLabel, CFormSelect, CInputGroup } from "@coreui/react";

const NewDocTypeForm = ({ register, handleSubmit, handleInsertBtn, errorsNewDocTypeForm }) => {
    return <CForm onSubmit={handleSubmit(handleInsertBtn)} className="row g-3">
        <CCol md={12}>
            <CFormLabel>Document Type <span style={{ color: "red" }}>*</span></CFormLabel>
            <CInputGroup>
                <CFormInput
                    placeholder="Document Type"
                    autoComplete="Type"
                    {...register('documentType')}
                />
            </CInputGroup>
            {errorsNewDocTypeForm?.documentType &&
                <p className='text-danger'>{errorsNewDocTypeForm?.documentType?.message}</p>
            }
        </CCol>

        <CCol md={12}>
            <CFormLabel>Document Mandatory for Supplier</CFormLabel>
            <CFormSelect {...register('documentMandatoryForSupplier')} >
                <option value="true">True</option>
                <option value="false">False</option>
            </CFormSelect>
        </CCol>

        <CCol md={12}>
            <CFormLabel>Document Mandatory for Purchaser</CFormLabel>
            <CFormSelect {...register('documentMandatoryForPurchaser')} >
                <option value="true">True</option>
                <option value="false">False</option>
            </CFormSelect>
        </CCol>

        <CCol md={12}>
            <CFormLabel>Document Mandatory for Consultant</CFormLabel>
            <CFormSelect {...register('documentMandatoryForConsultant')} >
                <option value="true">True</option>
                <option value="false">False</option>
            </CFormSelect>
        </CCol>

        <CCol md={12}>
            <CFormLabel>Document Mandatory for Company</CFormLabel>
            <CFormSelect {...register('documentMandatoryForCompany')}>
                <option value="true">True</option>
                <option value="false">False</option>
            </CFormSelect>
        </CCol>

        <CCol align="center" xs={12}>
            <CButton type='submit' color="primary" size="md"> Add </CButton>
        </CCol>
    </CForm>
}

export default NewDocTypeForm;