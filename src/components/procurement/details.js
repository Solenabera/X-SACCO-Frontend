import customColors from "../../constants/colors"
import { CCard, CCardBody, CCardHeader, CCol, CFormCheck, CFormInput, CFormLabel, CFormTextarea, CInputGroup, CInputGroupText, CRow, CTab, CTabContent, CTabList, CTabPanel, CTabs } from "@coreui/react"
import { formatDate } from "../../utils/dateFormatter"

const Details = ({ procurement }) => {
    return <CCard>
        <CCardHeader
            className="d-flex justify-content-between align-items-center"
            style={{ color: customColors.headerTextColor, backgroundColor: customColors.headerBgColor, position: 'relative' }}
        >
            <div style={{ flexGrow: 1, textAlign: 'center' }}>
                <strong style={{ fontSize: '1.5rem' }}>Procurement Details</strong>
            </div>
        </CCardHeader>
        <CCardBody>
            <CTabs defaultActiveItemKey="generalInfo">
                <CTabList variant="tabs">
                    <CTab className="fw-bold" itemKey="generalInfo">General</CTab>
                    <CTab className="fw-bold" itemKey="timeline">Timeline</CTab>
                    <CTab className="fw-bold" itemKey="requirement">Requirement</CTab>
                    <CTab className="fw-bold" itemKey="evaluationCriteria">Evaluation Criterias</CTab>
                    <CTab className="fw-bold" itemKey="financialInformaion">Financial</CTab>
                    {procurement?.GeneralInfo?.[0]?.type?.includes('product') && <CTab className="fw-bold" itemKey="product">Product</CTab>}
                    {procurement?.GeneralInfo?.[0]?.type?.includes('service') && <CTab className="fw-bold" itemKey="service">Service</CTab>}
                    <CTab className="fw-bold" itemKey="administrative">Administratives</CTab>
                </CTabList>
                <CTabContent>
                    <CTabPanel className="p-3" itemKey="generalInfo">
                        <CRow className='mb-3'>
                            <CCol md={6}>
                                <CFormLabel htmlFor="method">
                                    Title
                                </CFormLabel>
                                <CFormInput
                                    id="method"
                                    value={procurement?.GeneralInfo?.[0]?.title}
                                    disabled
                                />
                            </CCol>
                        </CRow>
                        <CRow className='mb-3'>
                            <CCol md={4}>
                                <CFormLabel htmlFor="method">
                                    Method
                                </CFormLabel>
                                <CFormInput
                                    id="method"
                                    value={procurement?.GeneralInfo?.[0]?.method}
                                    disabled
                                />
                            </CCol>
                            <CCol md={4}>
                                <CFormLabel htmlFor="method">
                                    Currency
                                </CFormLabel>
                                <CFormInput
                                    id="method"
                                    value={procurement?.GeneralInfo?.[0]?.currency}
                                    disabled
                                />
                            </CCol>
                            <CCol md={4}>
                                <CFormLabel htmlFor="method">
                                    Type
                                </CFormLabel>
                                <CFormInput
                                    id="method"
                                    value={procurement?.GeneralInfo?.[0]?.type?.map(w =>
                                        w?.charAt(0).toUpperCase() + w?.slice(1).toLowerCase()
                                    ).join(', ')}
                                    disabled
                                />
                            </CCol>
                        </CRow>
                        <CRow className='mb-3'>
                            <CCol md={12}>
                                <CFormLabel htmlFor="method">
                                    Description
                                </CFormLabel>
                                <CFormTextarea
                                    id="description"
                                    rows={2}
                                    disabled
                                    value={procurement?.GeneralInfo?.[0]?.description}
                                />
                            </CCol>
                        </CRow>
                    </CTabPanel>
                    <CTabPanel className="p-3" itemKey="timeline">
                        <CRow className='mb-3'>
                            <CCol md={6}>
                                <CFormLabel htmlFor="method">
                                    Publish Date
                                </CFormLabel>
                                <CFormInput
                                    id="method"
                                    value={formatDate(procurement?.Timeline?.[0]?.publishDate)}
                                    disabled
                                />
                            </CCol>
                            <CCol md={6}>
                                <CFormLabel htmlFor="method">
                                    Opening Date
                                </CFormLabel>
                                <CFormInput
                                    id="method"
                                    value={formatDate(procurement?.Timeline?.[0]?.openingDate)}
                                    disabled
                                />
                            </CCol>
                        </CRow>
                        <CRow className='mb-3'>
                            <CCol md={6}>
                                <CFormLabel htmlFor="method">
                                    Closing Date
                                </CFormLabel>
                                <CFormInput
                                    id="method"
                                    value={formatDate(procurement?.Timeline?.[0]?.closingDate)}
                                    disabled
                                />
                            </CCol>
                            <CCol md={6}>
                                <CFormLabel htmlFor="method">
                                    Clarification Date
                                </CFormLabel>
                                <CFormInput
                                    id="method"
                                    value={formatDate(procurement?.Timeline?.[0]?.clarificationDate)}
                                    disabled
                                />
                            </CCol>
                        </CRow>
                    </CTabPanel>
                    <CTabPanel className="p-3" itemKey="requirement">
                        <CRow className='mb-3'>
                            <CCol md={12}>
                                <CFormLabel htmlFor="requiredDocuments">
                                    Required Documents
                                </CFormLabel>
                                <div className="d-flex flex-wrap align-items-center border rounded" style={{ minHeight: '40px' }}>
                                    {procurement?.Requirement?.[0]?.existingDocuments?.map((field, index) => {
                                        return <div className="d-flex border rounded m-2 py-1 px-2" key={index}>
                                            {field?.name}
                                        </div>
                                    })}
                                    {procurement?.Requirement?.[0]?.otherDocuments?.map((field, index) => {
                                        return <div className="d-flex border rounded m-2 py-1 px-2" key={index}>
                                            {field?.name}
                                        </div>
                                    })}
                                </div>
                            </CCol>
                        </CRow>

                        <CRow className='mb-3'>
                            <CCol md={6}>
                                <CFormLabel htmlFor="minimumExperience">
                                    Minimum Experience (in years)
                                </CFormLabel>
                                <CFormInput
                                    id="minimumExperience"
                                    value={procurement?.Requirement?.[0]?.minimumExperience}
                                    disabled
                                />
                            </CCol>
                        </CRow>

                        <CRow className='mb-3'>
                            <CCol md={6}>
                                <CFormLabel htmlFor="deliveryLocation">
                                    Delivery Location
                                </CFormLabel>
                                <CFormInput
                                    id="deliveryLocation"
                                    value={procurement?.Requirement?.[0]?.deliveryLocation}
                                    disabled
                                />
                            </CCol>

                            <CCol md={6}>
                                <CFormLabel htmlFor="deliverySchedule">
                                    Delivery Date
                                </CFormLabel>
                                <CFormInput
                                    id="deliverySchedule"
                                    value={formatDate(procurement?.Requirement?.[0]?.deliverySchedule)}
                                    disabled
                                />
                            </CCol>
                        </CRow>
                    </CTabPanel>
                    <CTabPanel className="p-3" itemKey="evaluationCriteria">
                        {procurement?.EvaluationCriteria?.[0]?.evaluationCriteria?.map((criteria, index) => (
                            <CRow className='mb-3' key={index}>
                                <CCol md={6}>
                                    <CFormLabel htmlFor="criteria">
                                        Criteria
                                    </CFormLabel>
                                    <CFormInput
                                        id="criteria"
                                        value={criteria?.criteria}
                                        disabled
                                    />
                                </CCol>
                                <CCol md={6}>
                                    <CFormLabel htmlFor="percentage">
                                        Percentage
                                    </CFormLabel>
                                    <CFormInput
                                        id="percentage"
                                        value={criteria?.percentage}
                                        disabled
                                    />
                                </CCol>
                            </CRow>
                        ))}

                        <CRow className='mb-3'>
                            <CCol md={12}>
                                <CFormLabel htmlFor="scoringGuidelines">
                                    Scoring Guidelines
                                </CFormLabel>
                                <CFormTextarea
                                    id="scoringGuidelines"
                                    autoComplete="off"
                                    rows={3}
                                    value={procurement?.EvaluationCriteria?.[0]?.scoringGuidelines}
                                    disabled
                                />
                            </CCol>
                        </CRow>
                    </CTabPanel>
                    <CTabPanel className="p-3" itemKey="financialInformaion">
                        <CRow className='mb-3'>
                            <CCol md={6}>
                                <CFormLabel htmlFor="budget">Budget</CFormLabel>
                                <CFormInput
                                    id="budget"
                                    value={procurement?.FinancialInformation?.[0]?.budget}
                                />
                            </CCol>
                        </CRow>

                        <CRow className='mb-3'>
                            <CCol md={6}>
                                <CFormCheck
                                    id="bidSecurityRequired"
                                    style={{ border: '2px solid #b0bbff' }}
                                    value={procurement?.FinancialInformation?.[0]?.bidSecurityRequired}
                                    disabled
                                />
                                <CFormLabel htmlFor="bidSecurityRequired" className="ms-2">
                                    Bid Security Required
                                </CFormLabel>
                            </CCol>
                        </CRow>

                        {procurement?.FinancialInformation?.[0]?.bidSecurityRequired &&
                            <CRow className='mb-3'>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="bidSecurityAmount">
                                        Amount
                                    </CFormLabel>
                                    <CFormInput
                                        id="bidSecurityAmount"
                                        value={procurement?.FinancialInformation?.[0]?.bidSecurityAmount}
                                    />
                                </CCol>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="bidSecurityFrom">
                                        From
                                    </CFormLabel>
                                    <CFormInput
                                        id="bidSecurityFrom"
                                        value={procurement?.FinancialInformation?.[0]?.bidSecurityFrom}
                                    />
                                </CCol>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="paymentTerm">
                                        Payment Term
                                    </CFormLabel>
                                    <CFormInput
                                        id="paymentTerm"
                                        value={procurement?.FinancialInformation?.[0]?.paymentTerm}
                                    />
                                </CCol>
                            </CRow>
                        }
                    </CTabPanel>
                    {procurement?.GeneralInfo?.[0]?.type?.includes('product') &&
                        <CTabPanel className="p-3" itemKey="product">
                            {procurement?.LineItems?.map((product, index) => {
                                return <CCol md={12} key={index}>
                                    <CRow className='mb-3'>
                                        <CCol md={6}>
                                            <CFormLabel htmlFor="name">
                                                Product Name
                                            </CFormLabel>
                                            <CFormInput
                                                id="name"
                                                value={product?.name}
                                                disabled
                                            />
                                        </CCol>
                                        <CCol md={3}>
                                            <CFormLabel htmlFor="quantity">
                                                Quantity
                                            </CFormLabel>
                                            <CFormInput
                                                id="quantity"
                                                value={product?.quantity}
                                                disabled
                                            />
                                        </CCol>
                                        <CCol md={3}>
                                            <CFormLabel htmlFor="unitOfMeasurement">
                                                Unit
                                            </CFormLabel>
                                            <CFormInput
                                                id="unitOfMeasurement"
                                                value={product?.unitOfMeasurement}
                                                disabled
                                            />
                                        </CCol>
                                    </CRow>

                                    <CRow className='mb-3'>
                                        <CCol md={6}>
                                            <CFormLabel htmlFor="deliveryLocation">
                                                Delivery Location
                                            </CFormLabel>
                                            <CFormInput
                                                id="deliveryLocation"
                                                value={product?.deliveryLocation}
                                                disabled
                                            />
                                        </CCol>
                                        <CCol md={6}>
                                            <CFormLabel htmlFor="deliverySchedule">
                                                Delivery Schedule
                                            </CFormLabel>
                                            <CFormInput
                                                id="deliverySchedule"
                                                value={formatDate(product?.deliverySchedule)}
                                                disabled
                                            />
                                        </CCol>
                                    </CRow>

                                    <CRow>
                                        {product?.attributes?.map((attribute, attributeIndex) => (
                                            <CCol md={12} key={attributeIndex}>
                                                <CRow className='mb-3'>
                                                    <CCol md={6}>
                                                        <CFormLabel htmlFor="name">
                                                            Attribute
                                                        </CFormLabel>
                                                        <CFormInput
                                                            id="name"
                                                            value={attribute?.name}
                                                            disabled
                                                        />
                                                    </CCol>
                                                    <CCol md={6}>
                                                        <CFormLabel htmlFor="value">
                                                            Value
                                                        </CFormLabel>
                                                        <CFormInput
                                                            id="value"
                                                            value={attribute?.value}
                                                            disabled
                                                        />
                                                    </CCol>
                                                </CRow>
                                            </CCol>
                                        ))}
                                    </CRow>

                                    <CRow className='mb-3'>
                                        <CCol md={12}>
                                            <CFormLabel htmlFor="additionalNotes">
                                                Additional Note
                                            </CFormLabel>
                                            <CFormTextarea
                                                id="additionalNotes"
                                                autoComplete="off"
                                                value={product?.additionalNotes}
                                                disabled
                                            />
                                        </CCol>
                                    </CRow>

                                    <hr className="mx-3" />
                                </CCol>
                            })}
                        </CTabPanel>
                    }
                    {procurement?.GeneralInfo?.[0]?.type?.includes('service') &&
                        <CTabPanel className="p-3" itemKey="service">
                            {procurement?.Services?.map((service, index) => {
                                return <CCol md={12} key={index}>
                                    <CRow className='mb-3'>
                                        <CCol md={6}>
                                            <CFormLabel htmlFor="name">
                                                Service Name
                                            </CFormLabel>
                                            <CFormInput
                                                id="name"
                                                value={service?.name}
                                                disabled
                                            />
                                        </CCol>
                                        <CCol md={6}>
                                            <CFormLabel htmlFor="personnel">
                                                Number of Perssonnel
                                            </CFormLabel>
                                            <CFormInput
                                                id="personnel"
                                                value={service?.personnel}
                                                disabled
                                            />
                                        </CCol>
                                    </CRow>

                                    <CRow className='mb-3'>
                                        <CCol md={6}>
                                            <CFormLabel htmlFor="deliveryLocation">
                                                Delivery Location
                                            </CFormLabel>
                                            <CFormInput
                                                id="deliveryLocation"
                                                value={service?.deliveryLocation}
                                                disabled
                                            />
                                        </CCol>
                                    </CRow>

                                    <CRow className='mb-3'>
                                        <CCol md={6}>
                                            <CFormLabel htmlFor="deliveryLocation">
                                                Start Date
                                            </CFormLabel>
                                            <CFormInput
                                                id="startDate"
                                                value={formatDate(service?.startDate)}
                                                disabled
                                            />
                                        </CCol>
                                        <CCol md={6}>
                                            <CFormLabel htmlFor="deliverySchedule">
                                                End Date
                                            </CFormLabel>
                                            <CFormInput
                                                id="endDate"
                                                value={formatDate(service?.endDate)}
                                                disabled
                                            />
                                        </CCol>
                                    </CRow>

                                    {service?.tasks?.map((task, taskIndex) => (
                                        <CCol key={taskIndex} className='my-1' md={6}>
                                            <CFormLabel htmlFor="taskName">
                                                Task {taskIndex + 1}
                                            </CFormLabel>
                                            <CFormInput
                                                id="taskName"
                                                value={task?.name}
                                                disabled
                                            />
                                        </CCol>
                                    ))}

                                    {service?.deliverables.map((deliverable, deliverableIndex) => (
                                        <CCol key={deliverableIndex} className='my-1' md={6}>
                                            <CFormLabel htmlFor="taskName">
                                                Deliverable {deliverableIndex + 1}
                                            </CFormLabel>
                                            <CFormInput
                                                id="taskName"
                                                value={deliverable?.name}
                                                disabled
                                            />
                                        </CCol>
                                    ))}

                                    <CRow className='mb-3'>
                                        <CCol md={12}>
                                            <CFormLabel htmlFor="additionalNotes">
                                                Additional Note
                                            </CFormLabel>
                                            <CFormTextarea
                                                id="additionalNotes"
                                                autoComplete="off"
                                                value={service?.name}
                                                disabled
                                            />
                                        </CCol>
                                    </CRow>

                                    <hr className="mx-3" />
                                </CCol>
                            })}
                        </CTabPanel>
                    }
                    <CTabPanel className="p-3" itemKey="administrative">
                        {procurement?.Administratives?.[0]?.contactPerson?.map((contactPerson, index) => {
                            return <CCol md={12} key={index}>
                                <CRow className='mb-3'>
                                    <CCol md={3}>
                                        <CFormLabel htmlFor="name">
                                            Contact Person Name
                                        </CFormLabel>
                                        <CFormInput
                                            id="name"
                                            value={contactPerson?.name}
                                            disabled
                                        />
                                    </CCol>
                                    <CCol md={4}>
                                        <CFormLabel htmlFor="phoneNumber">
                                            Phone Number
                                        </CFormLabel>
                                        <CInputGroup>
                                            <CInputGroupText>+251</CInputGroupText>
                                            <CFormInput
                                                id="phoneNumber"
                                                value={contactPerson?.phoneNumber?.slice(-9)}
                                                disabled
                                            />
                                        </CInputGroup>
                                    </CCol>
                                    <CCol md={5}>
                                        <CFormLabel htmlFor="email">
                                            Email
                                        </CFormLabel>
                                        <CFormInput
                                            id="email"
                                            value={contactPerson?.email}
                                            disabled
                                        />
                                    </CCol>
                                </CRow>
                            </CCol>
                        })}

                        <CRow className='mb-3'>
                            <CCol md={6}>
                                <CFormLabel htmlFor="approvalReference">
                                    Approval Reference
                                </CFormLabel>
                                <CFormInput
                                    id="approvalReference"
                                    value={procurement?.approvalReference}
                                    disabled
                                />
                            </CCol>
                        </CRow>
                    </CTabPanel>
                </CTabContent>
            </CTabs>
        </CCardBody>
    </CCard>
}

export default Details