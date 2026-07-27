import { CButton, CCol, CForm, CFormInput, CFormLabel, CInputGroup } from "@coreui/react";

export const UpdateProductLevelOneForm = ({ handleSubmitUpdate, handleUpdateBtn, registerUpdate, errorsUpdateProductForm }) => {
    return <CForm onSubmit={handleSubmitUpdate(handleUpdateBtn)} className="row g-3">
        <CCol md={12}>
            <CFormLabel htmlFor="inputState">
                Product Type <span style={{ color: "red" }}>*</span>
            </CFormLabel>
            <CInputGroup>
                <CFormInput
                    placeholder="Product Type"
                    autoComplete="Type"
                    autoFocus
                    {...registerUpdate('productTypeName')}
                />
            </CInputGroup>
            {errorsUpdateProductForm?.productTypeName && (
                <p className='text-danger'>{errorsUpdateProductForm?.productTypeName?.message}</p>
            )}
        </CCol>

        <CCol align="center" xs={12}>
            <CButton type='submit' color="primary" size="md">Update</CButton>
        </CCol>
    </CForm>
}