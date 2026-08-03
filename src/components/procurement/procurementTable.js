import { cilChevronDoubleLeft, cilChevronDoubleRight, cilChevronLeft, cilChevronRight, cilMediaStepForward, cilPen, cilViewModule } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CButton, CFormSelect, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from "@coreui/react"
import { useNavigate } from "react-router-dom";

const ProcurementTable = ({ procurments, fetchNext, handleViewClick, handleEditClick, status }) => {
    const navigate = useNavigate();

    if (procurments?.purchaserTenders?.length === 0) {
        return <p className="text-center my-2">No tenders available.</p>
    }

    return <div>
        <CTable>
            <CTableHead>
                <CTableRow>
                    <CTableHeaderCell scope='col' style={{ width: '50px' }}>#</CTableHeaderCell>
                    <CTableHeaderCell scope='col' style={{ width: '300px' }}>Title</CTableHeaderCell>
                    <CTableHeaderCell scope='col'>Method</CTableHeaderCell>
                    <CTableHeaderCell scope='col'>Currency</CTableHeaderCell>
                    <CTableHeaderCell scope='col'>Actions</CTableHeaderCell>
                </CTableRow>
            </CTableHead>
            <CTableBody>
                {
                    procurments?.purchaserTenders?.map((proc, index) => (
                        <CTableRow key={proc?._id}>
                            <CTableDataCell className='py-3'>{index + 1}</CTableDataCell>
                            <CTableDataCell className='py-3' style={{ fontSize: '14px' }}>{proc?.GeneralInfo?.[0]?.title}</CTableDataCell>
                            <CTableDataCell className='py-3' style={{ fontSize: '14px' }}>{proc?.GeneralInfo?.[0]?.method}</CTableDataCell>
                            <CTableDataCell className='py-3' style={{ fontSize: '14px' }}>{proc?.GeneralInfo?.[0]?.currency}</CTableDataCell>
                            <CTableDataCell style={{ fontSize: '14px' }}>
                                <div className='d-flex'>
                                    <CButton className='me-1' color="primary" size="sm" title='Details' onClick={() => { handleViewClick(proc) }}>
                                        <CIcon icon={cilViewModule} />
                                    </CButton>

                                    {
                                        status === 'Draft' &&
                                        <CButton className='me-1' color="primary" size="sm" title='Update' onClick={() => { handleEditClick(proc) }}>
                                            <CIcon icon={cilPen} />
                                        </CButton>
                                    }

                                    {
                                        (status === 'Under Review' || status === "Closed") &&
                                        <CButton className='me-1' color="primary" size="sm" title='Open Bids' onClick={() => { navigate(`/procurement/bids?tenderId=${proc?._id}`) }}>
                                            <CIcon icon={cilMediaStepForward} />
                                        </CButton>
                                    }
                                </div>
                            </CTableDataCell>
                        </CTableRow>
                    ))
                }
            </CTableBody>
        </CTable>

        <div className='d-flex justify-content-between align-items-center px-3 mt-3'>
            <p>Total : <span className='text-primary'>{procurments?.totalDocs ?? 0}</span></p>

            <div className="d-flex align-items-center">
                <div className="d-flex align-items-center">
                    <CFormSelect onChange={(e) => { fetchNext(null, e.target.value) }}>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                        <option value={50}>50</option>
                    </CFormSelect>
                    <CButton onClick={() => { fetchNext(procurments?.currentPage > 1 && 1, null) }} title="First page">
                        <CIcon className='m-0 p-0' icon={cilChevronDoubleLeft} />
                    </CButton>
                    <CButton onClick={() => { fetchNext(procurments?.currentPage > 1 && procurments?.currentPage - 1, null) }} title="Previous page">
                        <CIcon className='m-0 p-0' icon={cilChevronLeft} />
                    </CButton>
                    {procurments?.currentPage > 1 &&
                        <CButton onClick={() => { fetchNext(procurments?.currentPage > 1 && procurments?.currentPage - 1, null) }} title={'Page ' + (procurments.currentPage - 1)}>
                            {procurments?.currentPage - 1}
                        </CButton>
                    }
                    <CButton variant="primary">
                        {procurments?.currentPage}
                    </CButton>
                    {procurments?.currentPage < procurments?.totalPages &&
                        <CButton onClick={() => { fetchNext(procurments?.currentPage < procurments?.totalPages && procurments?.currentPage + 1, null) }} title={'Page ' + (procurments.currentPage + 1)}>
                            {procurments?.currentPage + 1}
                        </CButton>
                    }
                    <CButton onClick={() => { fetchNext(procurments?.currentPage < procurments?.totalPages && procurments?.currentPage + 1, null) }} title="Next page">
                        <CIcon className='m-0 p-0' icon={cilChevronRight} />
                    </CButton>
                    <CButton onClick={() => { fetchNext(procurments?.currentPage < procurments?.totalPages && procurments?.totalPages, null) }} title="Last page">
                        <CIcon className='m-0 p-0' icon={cilChevronDoubleRight} />
                    </CButton>
                </div>
            </div>
        </div>
    </div>
}

export default ProcurementTable