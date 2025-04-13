import React from 'react'
import classNames from 'classnames'
import { ChartBarExample } from './ChartBarExample' // Ajusta la ruta si está en otra carpeta

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import WidgetsDropdown from '../widgets/WidgetsDropdown'

const Dashboard = () => {
  return (
    <>
      <WidgetsDropdown className="mb-4" />

      <CCard className="mb-4">
        <CCardHeader>Grafico de Ventas</CCardHeader>
        <CCol sm={5}>
          <div className="small text-body-secondary">January - July 2023</div>
        </CCol>
        <CCol sm={7} className="d-none d-md-block">
          <CButton color="primary" className="float-end">
            <CIcon icon={cilCloudDownload} />
          </CButton>
          <CButtonGroup className="float-end me-3">
            {['Day', 'Month', 'Year'].map((value) => (
              <CButton
                color="outline-secondary"
                key={value}
                className="mx-0"
                active={value === 'Month'}
              >
                {value}
              </CButton>
            ))}
          </CButtonGroup>
        </CCol>
        <CCardBody>
          <ChartBarExample />
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard
