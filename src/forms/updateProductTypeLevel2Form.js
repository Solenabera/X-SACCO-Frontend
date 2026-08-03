import { CButton, CCol, CForm, CFormInput, CFormLabel, CFormSelect, CInputGroup, CRow } from "@coreui/react";
import { useFieldArray } from "react-hook-form";
import { cilMinus, cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

export const UpdateProductLevelTwoForm = ({ allProductTypes, units, registerUpdate, handleSubmitUpdate, handleUpdateBtn, controlUpdate, errorsUpdateProductForm }) => {
    const { fields, append, remove } = useFieldArray({ control: controlUpdate, name: 'attributeFields' })

    return <CForm onSubmit={handleSubmitUpdate(handleUpdateBtn)} className="row g-3">
        <CCol md={6}>
            <CFormLabel htmlFor="inputState">
                Product Name <span style={{ color: "red" }}>*</span>
            </CFormLabel>
            <CInputGroup>
                <CFormInput
                    placeholder="Product Name"
                    autoComplete="Type"
                    {...registerUpdate('productName')}
                />
            </CInputGroup>
            {errorsUpdateProductForm?.productName && (
                <p className='text-danger'>{errorsUpdateProductForm?.productName?.message}</p>
            )}
        </CCol>

        <CCol md={6}>
            <CFormLabel htmlFor="inputState">
                Unit <span style={{ color: "red" }}>*</span>
            </CFormLabel>
            <CFormSelect
                id="inputState"
                {...registerUpdate('unit')}
            >
                <option value="">Select unit</option>
                {units.map(unit => (
                    <option key={unit.ID} value={unit.UnitName}>
                        {unit.UnitName}
                    </option>
                ))}
            </CFormSelect>
            {errorsUpdateProductForm?.unit && (
                <p className='text-danger'>{errorsUpdateProductForm?.unit?.message}</p>
            )}
        </CCol>

        <CCol md={12}>
            <CFormLabel htmlFor="inputState">
                Product Type <span style={{ color: "red" }}>*</span>
            </CFormLabel>
            <CFormSelect
                id="inputState"
                {...registerUpdate('productTypeID')}
            >
                {allProductTypes.map(prodType => (
                    <option key={prodType._id} value={prodType._id}>
                        {prodType.productTypeName}
                    </option>
                ))}
            </CFormSelect>
            {errorsUpdateProductForm?.productTypeID && (
                <p className='text-danger'>{errorsUpdateProductForm?.productTypeID?.message}</p>
            )}
        </CCol>

        {fields.map((attribute, attrIndex) => (
            <CCol md={12} key={attrIndex}>
                <CRow>
                    <CCol md={6}>
                        <div className="d-flex justify-content-between">
                            <CFormLabel htmlFor={`attributeName${attrIndex}`}>
                                Name #{attrIndex + 1}<span style={{ color: "red" }}>*</span>
                            </CFormLabel>
                        </div>
                        <CInputGroup>
                            <CFormInput
                                id={`attributeName${attrIndex}`}
                                placeholder="Attribute Name"
                                autoComplete="Type"
                                {...registerUpdate(`attributeFields.${attrIndex}.name`)}
                            />
                        </CInputGroup>
                        {errorsUpdateProductForm?.attributeFields?.[attrIndex]?.name && (
                            <p className="text-danger fs-6">
                                {errorsUpdateProductForm?.attributeFields?.[attrIndex]?.name?.message}
                            </p>
                        )}
                    </CCol>
                    <CCol md={3}>
                        <CFormLabel htmlFor="inputState">
                            Type <span style={{ color: "red" }}>*</span>
                        </CFormLabel>
                        <CFormSelect
                            id="inputState"
                            {...registerUpdate(`attributeFields.${attrIndex}.dataType`)}
                        >
                            <option value="number">Number</option>
                            <option value="string">Text</option>
                        </CFormSelect>
                        {errorsUpdateProductForm?.attributeFields?.[attrIndex]?.dataType && (
                            <p className="text-danger fs-6">
                                {errorsUpdateProductForm?.attributeFields?.[attrIndex]?.dataType?.message}
                            </p>
                        )}
                    </CCol>
                    <CCol md={2}>
                        <CFormLabel htmlFor="inputState">
                            Mandatory <span style={{ color: "red" }}>*</span>
                        </CFormLabel>
                        <CFormSelect
                            id="inputState"
                            {...registerUpdate(`attributeFields.${attrIndex}.isMandatory`)}
                        >
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </CFormSelect>
                        {errorsUpdateProductForm?.attributeFields?.[attrIndex]?.isMandatory && (
                            <p className="text-danger fs-6">
                                {errorsUpdateProductForm?.attributeFields?.[attrIndex]?.isMandatory?.message}
                            </p>
                        )}
                    </CCol>
                    <CCol md={1}>
                        {attrIndex > 0 &&
                            <CButton size="xl" onClick={() => remove(attrIndex)} style={{ color: 'red' }}>
                                <CIcon icon={cilTrash} />
                            </CButton>}
                    </CCol>
                </CRow>
            </CCol>
        ))}

        <CCol xs={12}>
            <CButton color="secondary" size="md" onClick={() => { append({ name: "" }) }}>
                Add Attribute Name
            </CButton>
        </CCol>

        <CCol align="center" xs={12}>
            <CButton type='submit' color="primary" size="md">Update</CButton>
        </CCol>
    </CForm>
}