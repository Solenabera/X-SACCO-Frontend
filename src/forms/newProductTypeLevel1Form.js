import { CButton, CCol, CForm, CFormInput, CFormLabel, CInputGroup } from "@coreui/react";

export const NewProductLevelOneForm = ({ handleSubmit, handleInsertBtn, register, errorsNewProductForm }) => {
    return <CForm onSubmit={handleSubmit(handleInsertBtn)} className="row g-3">
        <CCol md={12}>
            <CFormLabel htmlFor="inputState">
                Product Name <span style={{ color: "red" }}>*</span>
            </CFormLabel>
            <CInputGroup>
                <CFormInput
                    placeholder="Product Name"
                    autoComplete="Type"
                    autoFocus
                    {...register('productTypeName')}
                />
            </CInputGroup>
            {errorsNewProductForm?.productTypeName && (
                <p className='text-danger'>{errorsNewProductForm?.productTypeName?.message}</p>
            )}
        </CCol>

        <CCol align="center" xs={12}>
            <CButton type='submit' color="primary" size="md">Insert</CButton>
        </CCol>
    </CForm>
}