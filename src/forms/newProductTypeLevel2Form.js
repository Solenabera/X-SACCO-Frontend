import { CButton, CCol, CForm, CFormCheck, CFormInput, CFormLabel, CFormSelect, CInputGroup, CRow } from "@coreui/react";
import customColors from '../constants/colors';
import { useFieldArray } from "react-hook-form";
import { cilMinus, cilPlus, cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

export const NewProductLevelTwoForm = ({ allProductTypes, units, register, handleSubmit, handleInsert, control, errorsNewProductForm }) => {
    const { fields, append, remove } = useFieldArray({ control, name: 'attributeFields' })

    return <CForm onSubmit={handleSubmit(handleInsert)} className="row g-3">
        <CCol md={6}>
            <CFormLabel htmlFor="inputState">
                Product Type <span style={{ color: "red" }}>*</span>
            </CFormLabel>
            <CFormSelect
                id="inputState"
                {...register('productTypeID')}
            >
                {allProductTypes.map(prodType => (
                    <option key={prodType._id} value={prodType._id}>
                        {prodType.productTypeName}
                    </option>
                ))}
            </CFormSelect>
            {errorsNewProductForm?.productTypeID &&
                <p style={{ color: customColors.deleteBtnColor }}>
                    {errorsNewProductForm?.productTypeID?.message}
                </p>
            }
        </CCol>

        <CCol md={6}>
            <CFormLabel htmlFor="inputState">
                Unit <span style={{ color: "red" }}>*</span>
            </CFormLabel>
            <CFormSelect
                id="inputState"
                {...register('unit')}
            >
                <option value="">Select unit</option>
                {units.map(unit => (
                    <option key={unit.ID} value={unit.UnitName}>
                        {unit.UnitName}
                    </option>
                ))}
            </CFormSelect>
            {errorsNewProductForm?.unit && (
                <p className='text-danger'>{errorsNewProductForm?.unit?.message}</p>
            )}
        </CCol>

        <CCol md={12}>
            <CFormLabel htmlFor="inputState">
                Product Name <span style={{ color: "red" }}>*</span>
            </CFormLabel>
            <CInputGroup>
                <CFormInput
                    placeholder="Product Name"
                    autoComplete="Type"
                    {...register('productName')}
                />
            </CInputGroup>
            {errorsNewProductForm?.productName &&
                <p className="text-danger fs-7 py-0">
                    {errorsNewProductForm?.productName?.message}
                </p>
            }
        </CCol>
        <CCol md={12} className="d-flex">
            <p className="h5">Attributes</p>
            <div>
                <CButton color="primary" className="ms-3 px-1 py-0" onClick={() => { append({ name: "" }) }}>
                    <CIcon icon={cilPlus} />
                </CButton>
            </div>
        </CCol>
        {fields?.map((attribute, index) => (
            <CCol md={12} key={attribute.id}>
                <CRow>
                    <CCol md={6}>
                        <div className="d-flex justify-content-between">
                            <CFormLabel htmlFor={`attributeName${index}`}>
                                Name #{index + 1}<span style={{ color: "red" }}>*</span>
                            </CFormLabel>
                        </div>
                        <CInputGroup>
                            <CFormInput
                                id={`attributeName${index}`}
                                placeholder="Attribute Name"
                                autoComplete="Type"
                                {...register(`attributeFields.${index}.name`)}
                            />
                        </CInputGroup>
                        {errorsNewProductForm?.attributeFields?.[index]?.name && (
                            <p className="text-danger fs-6">
                                {errorsNewProductForm?.attributeFields?.[index]?.name?.message}
                            </p>
                        )}
                    </CCol>
                    <CCol md={3}>
                        <CFormLabel htmlFor="inputState">
                            Type <span style={{ color: "red" }}>*</span>
                        </CFormLabel>
                        <CFormSelect
                            id="inputState"
                            {...register(`attributeFields.${index}.dataType`)}
                        >
                            <option value="number">Number</option>
                            <option value="string">Text</option>
                        </CFormSelect>
                        {errorsNewProductForm?.attributeFields?.[index]?.dataType && (
                            <p className="text-danger fs-6">
                                {errorsNewProductForm?.attributeFields?.[index]?.dataType?.message}
                            </p>
                        )}
                    </CCol>
                    <CCol md={2}>
                        <CFormLabel htmlFor="inputState">
                            Mandatory <span style={{ color: "red" }}>*</span>
                        </CFormLabel>
                        <CFormSelect
                            id="inputState"
                            {...register(`attributeFields.${index}.isMandatory`)}
                        >
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </CFormSelect>
                        {errorsNewProductForm?.attributeFields?.[index]?.isMandatory && (
                            <p className="text-danger fs-6">
                                {errorsNewProductForm?.attributeFields?.[index]?.isMandatory?.message}
                            </p>
                        )}
                    </CCol>
                    <CCol md={1}>
                        {index > 0 &&
                            <CButton size="xl" onClick={() => remove(index)} style={{ color: 'red' }}>
                                <CIcon icon={cilTrash} />
                            </CButton>}
                    </CCol>
                </CRow>
            </CCol>
        ))}

        {/* {generalErrorMessage && (
            <p style={{ color: customColors.deleteBtnColor }}>{attributeErrogeneralErrorMessagerMessage}</p>
        )} */}

        <CCol align="center" xs={12}>
            <CButton type="submit" color="primary" size="md">
                Insert
            </CButton>
        </CCol>
    </CForm>
}