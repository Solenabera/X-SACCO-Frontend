import { cilPlus, cilTrash } from "@coreui/icons"
import CIcon from "@coreui/icons-react"
import { CButton, CCol, CFormInput, CFormLabel, CFormSelect, CFormTextarea, CInputGroup, CInputGroupText, CRow } from "@coreui/react"
import { useFieldArray } from "react-hook-form"
import customColors from "../../constants/colors"
import useApiFetch from "../../hooks/useAPIFetch"
import { useEffect } from "react"

const ProductsForm = ({ nextStep, prevStep, register, errors, control, trigger, watch, setValue, getValues, units, catalogories, products }) => {
    const {
        data, isLoading, fetchData
    } = useApiFetch({ url: 'update-tenders-line-items', method: 'PUT' }, false)

    useEffect(() => {
        if (!isLoading && data) {
            nextStep()
        }
    }, [isLoading, data])

    const deliveryLocation = watch('deliveryLocation')
    const deliverySchedule = watch('deliverySchedule')

    const handleNext = async () => {
        const valid = await trigger("products")
        if (valid) {
            const values = getValues()
            fetchData({
                data: {
                    id: values?._id,
                    products: values?.products,
                }
            })
        }
    }

    const { fields, append, remove } = useFieldArray({ control, name: 'products' })
    const newProductObject = {
        name: "",
        catagory: "",
        quantity: "",
        unitOfMeasurement: "",
        deliveryLocation: deliveryLocation,
        deliverySchedule: deliverySchedule,
        additionalNotes: "",
    }

    const handleCatagoryChange = (index, value) => {
        setValue(`products.${index}.catagory`, value)
        setValue(`products.${index}.name`, '')
        setValue(`products.${index}.productID`, '')
        setValue(`products.${index}.unitOfMeasurement`, '')
        setValue(`products.${index}.attributes`, [])
    }

    const handleProductChange = (index, value) => {
        if (value) {

            const prod = products?.data?.products?.find(prod => prod._id === value)
            setValue(`products.${index}.name`, prod?.productName)
            setValue(`products.${index}.productID`, prod?._id)
            setValue(`products.${index}.unitOfMeasurement`, prod?.unit)
            setValue(`products.${index}.attributes`, prod?.attributesData?.map(attr => ({
                name: attr?.attributesName,
                value: "",
                additionalNotes: ""
            })))
        }
        else {
            setValue(`products.${index}.name`, '')
            setValue(`products.${index}.productID`, '')
            setValue(`products.${index}.unitOfMeasurement`, '')
            setValue(`products.${index}.attributes`, [])
        }
    }

    return <div className='pb-3 rounded mb-3'>
        <div className="d-flex justify-content-between align-items-center mb-3">
            <p className='fw-bold h4'>Products</p>
            <CButton color="primary" size="md" onClick={() => append(newProductObject)}> Add Product </CButton>
        </div>

        {fields?.map((product, index) => {
            const catagory = watch(`products.${index}.catagory`)
            return <CCol md={12} key={index}>
                <div className="d-flex justify-content-between align-items-center p-1 px-3 rounded mb-3"
                    style={{ color: customColors.headerTextColor, backgroundColor: customColors.headerBgColor }}>
                    <p className="h5 fw-bolder">Product {index + 1}</p>
                    <div>
                        {index > 0 &&
                            <CButton size="xl" onClick={() => remove(index)} style={{ color: 'red' }}>
                                <CIcon icon={cilTrash} />
                            </CButton>
                        }
                        <CButton size="xl" onClick={() => append(newProductObject)} style={{ color: 'blue' }}>
                            <CIcon icon={cilPlus} />
                        </CButton>
                    </div>
                </div>

                <CRow className='mb-3'>
                    <CCol md={4}>
                        <CFormLabel htmlFor="inputState">
                            Catagory <span style={{ color: "red" }}>*</span>
                        </CFormLabel>
                        <CFormSelect
                            id="inputState"
                            value={catagory}
                            onChange={(e) => { handleCatagoryChange(index, e.target.value) }}
                        >
                            <option value='' disabled>Select catagory</option>
                            {catalogories?.data?.productTypes?.map(prodType => (
                                <option key={prodType._id} value={prodType._id}>
                                    {prodType.productTypeName}
                                </option>
                            ))}
                            <option value='other'>Other</option>
                        </CFormSelect>
                    </CCol>
                    <CCol md={4}>
                        <CFormLabel htmlFor="name">
                            Product Name
                        </CFormLabel>
                        {catagory === 'other' ?
                            <CFormInput
                                id="name"
                                type="text"
                                {...register(`products.${index}.name`)}
                            />
                            :
                            <CFormSelect
                                id="inputState"
                                defaultValue=''
                                disabled={catagory === ''}
                                onChange={(e) => { handleProductChange(index, e.target.value) }}
                            >
                                <option value=''>Select product</option>
                                {products?.data?.products?.filter(prod => prod.productTypeID === catagory)?.map(prod => (
                                    <option key={prod._id} value={prod._id}>
                                        {prod.productName}
                                    </option>
                                ))}
                            </CFormSelect>
                        }

                        {errors?.products?.[index]?.name &&
                            <p className='text-danger p-0 m-0'>{errors?.products?.[index]?.name?.message}</p>
                        }
                    </CCol>
                    <CCol md={2}>
                        <CFormLabel htmlFor="quantity">
                            Quantity
                        </CFormLabel>
                        <CFormInput
                            id="quantity"
                            type="number"
                            {...register(`products.${index}.quantity`)}
                        />
                        {errors?.products?.[index]?.quantity &&
                            <p className='text-danger p-0 m-0'>{errors?.products?.[index]?.quantity?.message}</p>
                        }
                    </CCol>
                    <CCol md={2}>
                        <CFormLabel htmlFor="unitOfMeasurement">
                            Unit
                        </CFormLabel>
                        <CFormSelect
                            id="unitOfMeasurement"
                            {...register(`products.${index}.unitOfMeasurement`)}
                        >
                            <option value=''>Select Unit</option>
                            {units?.map((unit, ind) =>
                                (<option key={ind} value={unit?.UnitName}>{unit.UnitName}</option>)
                            )}
                        </CFormSelect>
                        {errors?.products?.[index]?.unitOfMeasurement &&
                            <p className='text-danger p-0 m-0'>{errors?.products?.[index]?.unitOfMeasurement?.message}</p>
                        }
                    </CCol>
                </CRow>

                <CRow className='mb-3'>
                    <CCol md={6}>
                        <CFormLabel htmlFor="deliveryLocation">
                            Delivery Location
                        </CFormLabel>
                        <CFormInput
                            id="deliveryLocation"
                            {...register(`products.${index}.deliveryLocation`)}
                        />
                        {errors?.products?.[index]?.deliveryLocation &&
                            <p className='text-danger p-0 m-0'>{errors?.products?.[index]?.deliveryLocation?.message}</p>
                        }
                    </CCol>
                    <CCol md={6}>
                        <CFormLabel htmlFor="deliverySchedule">
                            Delivery Schedule
                        </CFormLabel>
                        <CFormInput
                            id="deliverySchedule"
                            type="datetime-local"
                            {...register(`products.${index}.deliverySchedule`)}
                        />
                        {errors?.products?.[index]?.deliverySchedule &&
                            <p className='text-danger p-0 m-0'>{errors?.products?.[index]?.deliverySchedule?.message}</p>
                        }
                    </CCol>
                </CRow>

                <ProductAttributes
                    index={index}
                    register={register}
                    errors={errors}
                    control={control}
                />

                <CRow className='mb-3'>
                    <CCol md={12}>
                        <CFormLabel htmlFor="additionalNotes">
                            Additional Note
                        </CFormLabel>
                        <CFormTextarea
                            id="additionalNotes"
                            autoComplete="off"
                            {...register(`products.${index}.additionalNotes`)}
                        />
                        {errors?.products?.[index]?.additionalNotes &&
                            <p className='text-danger p-0 m-0'>{errors?.products?.[index]?.additionalNotes?.message}</p>
                        }
                    </CCol>
                </CRow>
            </CCol>
        })}
        {errors?.products &&
            <p className='text-center text-danger p-0 m-0'>{errors?.products?.message}</p>
        }
        <CCol align="center" xs={12}>
            <CButton className="mx-3" color="secondary" size="md" onClick={prevStep}> Back </CButton>
            <CButton className="mx-3" color="primary" size="md" onClick={handleNext}> Next </CButton>
        </CCol>
    </div>
}

export default ProductsForm;

const ProductAttributes = ({ index, register, errors, control }) => {
    const { fields: fieldsAttribute, append: appendAttribute, remove: removeAttribute } = useFieldArray({ control, name: `products.${index}.attributes` })

    const newAttributeObject = {
        name: "",
        value: "",
        additionalNotes: ""
    }
    return <CRow>
        <CCol md={12} className="d-flex">
            <p className="h4">Attributes</p>
            <div>
                <CButton color="primary" className="ms-3 px-1 py-0" onClick={() => appendAttribute(newAttributeObject)}><CIcon icon={cilPlus} /></CButton>
            </div>
        </CCol>
        {fieldsAttribute.map((field, attributeIndex) => (
            <CCol md={12} key={attributeIndex}>
                <CRow className='mb-3'>
                    <CCol md={6}>
                        <CFormLabel htmlFor="name">
                            Attribute
                        </CFormLabel>
                        <CFormInput
                            id="name"
                            {...register(`products.${index}.attributes.${attributeIndex}.name`)}
                        />
                        {errors?.products?.[index]?.attributes?.[attributeIndex]?.name &&
                            <p className='text-danger p-0 m-0'>{errors?.products?.[index]?.attributes?.[attributeIndex]?.name?.message}</p>
                        }
                    </CCol>
                    <CCol md={6}>
                        <CFormLabel htmlFor="value">
                            Value
                        </CFormLabel>
                        <CInputGroup>
                            <CFormInput
                                id="value"
                                {...register(`products.${index}.attributes.${attributeIndex}.value`)}
                            />
                            <CInputGroupText className="ms-2" onClick={() => removeAttribute(attributeIndex)}>
                                <CIcon icon={cilTrash} style={{ color: customColors.deleteBtnColor }} />
                            </CInputGroupText>

                            <CInputGroupText className="ms-2" onClick={() => appendAttribute(newAttributeObject)}>
                                <CIcon icon={cilPlus} />
                            </CInputGroupText>
                        </CInputGroup>
                        {errors?.products?.[index]?.attributes?.[attributeIndex]?.value &&
                            <p className='text-danger p-0 m-0'>{errors?.products?.[index]?.attributes?.[attributeIndex]?.value?.message}</p>
                        }
                    </CCol>
                </CRow>
            </CCol>
        ))}
    </CRow>
}