import { cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CButton, CCol, CForm, CFormInput, CFormLabel, CFormSelect, CInputGroup, CRow } from "@coreui/react";
import { API_URL } from "../Config/config";

const UpdateProductForm = ({ registerUpdate, handleSubmitUpdate, handleUpdateBtn, handleImageClick, handleDeleteImage, allLevelOneProductTypes,
    allLevelTwoProductTypes, fields, updateProductImages, errorsUpdate, productAttributeFields, supplierCompanies, errorsSupplierProductUpdate }) => {
    return <CForm onSubmit={handleSubmitUpdate(handleUpdateBtn)} className="row g-3">
        <CCol md={6}>
            <CFormLabel htmlFor="inputState">Catagory</CFormLabel>
            <CFormSelect
                id="inputState"
                defaultValue=''
                {...registerUpdate('productTypeIDLevelOne')}
                disabled
            >
                <option value='' disabled>Select product</option>
                {allLevelOneProductTypes.map(prodType => (
                    <option key={prodType._id} value={prodType._id}>
                        {prodType.productTypeName}
                    </option>
                ))}
            </CFormSelect>
        </CCol>

        <CCol md={6}>
            <CFormLabel htmlFor="inputState">
                Company <span style={{ color: "red" }}>*</span>
            </CFormLabel>
            <CFormSelect
                id="inputState"
                {...registerUpdate('companyID')}
            >
                {supplierCompanies.map(comp => (
                    <option key={comp._id} value={comp._id}> {comp?.companyName} </option>
                ))}
            </CFormSelect>
            {errorsUpdate?.companyID &&
                <p className='text-danger my-0 py-0'>{errorsUpdate?.companyID?.message}</p>
            }
        </CCol>

        <CCol md={6}>
            <CFormLabel htmlFor="inputState">Product Type</CFormLabel>
            <CFormSelect
                id="inputState"
                defaultValue=''
                {...registerUpdate('productTypeIDLevelTwo')}
                disabled
            >
                <option value='' disabled>Select product</option>
                {allLevelTwoProductTypes.map(prodType => (
                    <option key={prodType._id} value={prodType._id}>
                        {prodType.productName}
                    </option>
                ))}
            </CFormSelect>
        </CCol>

        <CCol md={3}>
            <CFormLabel htmlFor="inputState">
                Price <span style={{ color: "red" }}>*</span>
            </CFormLabel>
            <CFormInput
                type="number"
                {...registerUpdate('price')}
            />
            {errorsUpdate?.price &&
                <p className='text-danger my-0 py-0'>{errorsUpdate?.price?.message}</p>
            }
        </CCol>

        <CCol md={3}>
            <CFormLabel htmlFor="inputState">
                Quantity <span style={{ color: "red" }}>*</span>
            </CFormLabel>
            <CFormInput
                type="number"
                {...registerUpdate('quantity')}
            />
            {errorsUpdate?.quantity &&
                <p className='text-danger my-0 py-0'>{errorsUpdate?.quantity?.message}</p>
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
                        {...registerUpdate(`attributes.${field.name}`)}
                    />
                </CInputGroup>
                {errorsUpdate?.attributes?.[field.name] &&
                    <p className='text-danger my-0 py-0'>{errorsUpdate?.attributes?.[field.name]?.message}</p>
                }
            </CCol>
        ))}

        <CCol xs={6}>
            <CFormLabel>Add Image</CFormLabel>
            <CFormInput
                type="file"
                accept="image/*"
                multiple
                {...registerUpdate('selectedImages')}
            />
        </CCol>

        <div className='d-flex overflow-x-auto' style={{ gap: '10px' }}>
            {fields?.map((image, index) => (
                <div
                    key={index}
                    style={{
                        position: "relative",
                        marginRight: "10px",
                        border: "2px solid #007bff",
                        borderRadius: "5px",
                        padding: "2px"
                    }}
                    onClick={() =>
                        handleImageClick(`${API_URL}fetch-all-supplier-product-images/${image.imageURL}`)
                    }
                >
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
                            remove(index);
                        }}
                    >
                        <CIcon icon={cilTrash} className="text-danger" />
                    </CButton>

                    <img
                        src={image.imageURL
                            ? `${API_URL}fetch-all-supplier-product-images/${image.imageURL}`
                            : image.preview
                        }
                        alt={`Product ${index}`}
                        style={{
                            width: '100px',
                            height: '100px',
                            overflow: 'hidden',
                            cursor: 'pointer',
                        }}
                    />
                </div>
            ))}

            {Object.values(updateProductImages ?? {})?.map((image, index) => {
                const fileURL = URL.createObjectURL(image);
                return <div key={index}
                    style={{
                        position: "relative",
                        marginRight: "10px",
                        border: "2px solid #007bff",
                        borderRadius: "5px",
                        padding: "2px"
                    }}>
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
                            handleDeleteImage(index, false);
                        }}
                    >
                        <CIcon icon={cilTrash} className="text-danger" />
                    </CButton>

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
                </div>
            })}
        </div>

        {errorsUpdate?.[""] &&
            <p className='text-danger my-0 py-0'>{errorsUpdate?.[""]?.message}</p>
        }

        {errorsSupplierProductUpdate?.details && (
            <p className="text-danger my-0 py-0">{errorsSupplierProductUpdate?.details?.response?.data?.message}</p>
        )}
        <CCol xs={12} align='center'>
            <CButton type='submit' color="primary" size="md">Update</CButton>
        </CCol>
    </CForm>
}

export default UpdateProductForm;