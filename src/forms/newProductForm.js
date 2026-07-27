import { cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CButton, CCol, CForm, CFormInput, CFormLabel, CFormSelect, CInputGroup } from "@coreui/react";

const NewProductForm = ({ registerInsert, handleSubmitInsert, handleInsertBtn, errorsInsert, allLevelOneProductTypes,
    levelTwoProductTypes, productAttributeFields, newProductImages, errorsSupplierProductAdd, handleDeleteImage, supplierCompanies }) => {
    return <CForm onSubmit={handleSubmitInsert(handleInsertBtn)} className="row g-3">
        <CCol md={6}>
            <CFormLabel htmlFor="inputState">
                Catagory <span style={{ color: "red" }}>*</span>
            </CFormLabel>
            <CFormSelect
                id="inputState"
                defaultValue=''
                {...registerInsert('productTypeIDLevelOne')}
            >
                <option value='' disabled>Select product</option>
                {allLevelOneProductTypes.map(prodType => (
                    <option key={prodType._id} value={prodType._id}>
                        {prodType.productTypeName}
                    </option>
                ))}
            </CFormSelect>

            {errorsInsert?.productTypeIDLevelOne &&
                <p className='text-danger my-0 py-0'>{errorsInsert?.productTypeIDLevelOne?.message}</p>
            }
        </CCol>

        <CCol md={6}>
            <CFormLabel htmlFor="inputState">
                Company <span style={{ color: "red" }}>*</span>
            </CFormLabel>
            <CFormSelect
                id="inputState"
                {...registerInsert('companyID')}
            >
                {supplierCompanies?.map(comp => (
                    <option key={comp._id} value={comp._id}> {comp?.companyName} </option>
                ))}
            </CFormSelect>
            {errorsInsert?.companyID &&
                <p className='text-danger my-0 py-0'>{errorsInsert?.companyID?.message}</p>
            }
        </CCol>

        <CCol md={6}>
            <CFormLabel htmlFor="inputState">
                Product Type <span style={{ color: "red" }}>*</span>
            </CFormLabel>
            <CFormSelect
                id="inputState"
                defaultValue=''
                {...registerInsert('productTypeIDLevelTwo')}
            >
                <option value='' disabled>Select product</option>
                {levelTwoProductTypes?.map(prodType => (
                    <option key={prodType._id} value={prodType._id}>
                        {prodType.productName}
                    </option>
                ))}
            </CFormSelect>
            {errorsInsert?.productTypeIDLevelTwo &&
                <p className='text-danger my-0 py-0'>{errorsInsert?.productTypeIDLevelTwo?.message}</p>
            }
        </CCol>

        <CCol md={3}>
            <CFormLabel htmlFor="inputState">
                Price <span style={{ color: "red" }}>*</span>
            </CFormLabel>
            <CFormInput
                type="number"
                {...registerInsert('price')}
            />
            {errorsInsert?.price &&
                <p className='text-danger my-0 py-0'>{errorsInsert?.price?.message}</p>
            }
        </CCol>

        <CCol md={3}>
            <CFormLabel htmlFor="inputState">
                Quantity <span style={{ color: "red" }}>*</span>
            </CFormLabel>
            <CFormInput
                type="number"
                {...registerInsert('quantity')}
            />
            {errorsInsert?.quantity &&
                <p className='text-danger my-0 py-0'>{errorsInsert?.quantity?.message}</p>
            }
        </CCol>

        {productAttributeFields.map((field) => (
            <CCol md={6} key={field.id}>
                <CFormLabel htmlFor={`attributeName${field.id}`}>
                    {field.name} {field.isMandatory && <span style={{ color: "red" }}>*</span>}
                </CFormLabel>
                <CInputGroup>
                    <CFormInput
                        id={`attributeName${field.id}`}
                        autoComplete="Type"
                        {...registerInsert(`attributes.${field.name}`)}
                    />
                </CInputGroup>
                {errorsInsert?.attributes?.[field.name] &&
                    <p className='text-danger my-0 py-0'>{errorsInsert?.attributes?.[field.name]?.message}</p>
                }
            </CCol>
        ))}

        <CCol md={6}>
            <CFormLabel htmlFor="imageUpload">
                Upload Images (up to 4) <span style={{ color: "red" }}>*</span>
            </CFormLabel>
            <CInputGroup>
                <CFormInput
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    multiple
                    {...registerInsert('selectedImages', {
                        onChange: (e) => e.target.files,
                    })}
                />
            </CInputGroup>
            {errorsInsert?.selectedImages &&
                <p className='text-danger'>{errorsInsert?.selectedImages?.message}</p>
            }
        </CCol>

        {Object.values(newProductImages ?? {})?.length > 0 && (
            <div className='d-flex mt-3 align-items-center overflow-x-auto'>
                {Object.values(newProductImages ?? {})?.map((image, index) => {
                    const fileURL = URL.createObjectURL(image);
                    return <div key={index} style={{ position: "relative", marginRight: "10px", border: "2px solid #007bff", borderRadius: "5px", padding: "2px" }}>
                        <img
                            src={fileURL}
                            alt={`Selected ${index + 1}`}
                            style={{
                                width: '100px',
                                height: '100px',
                                overflow: 'hidden',
                                cursor: 'pointer',
                            }}
                        />
                        <CButton
                            size="sm"
                            color="light"
                            style={{
                                position: 'absolute',
                                top: '2px',
                                right: '2px',
                                zIndex: 2,
                                padding: '0.25rem 0.4rem',
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteImage(index, true);
                            }}
                        >
                            <CIcon icon={cilTrash} className="text-danger" />
                        </CButton>
                    </div>
                })}
            </div>
        )}

        {errorsInsert?.[""] &&
            <p className='text-danger my-0 py-0'>{errorsInsert?.[""]?.message}</p>
        }

        {errorsSupplierProductAdd?.details && (
            <p className="text-danger my-0 py-0">{errorsSupplierProductAdd?.details?.response?.data?.message}</p>
        )}

        <CCol align='center' xs={12}>
            <CButton type='submit' color="primary" size="md">Add Product</CButton>
        </CCol>
    </CForm>
}

export default NewProductForm;