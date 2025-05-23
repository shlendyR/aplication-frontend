import React, { useState } from 'react'
import { ChartBarExample } from './ChartBarExample' // Ajusta la ruta si es necesario
import { CButton, CButtonGroup, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCloudDownload } from '@coreui/icons'
import WidgetsDropdown from '../widgets/WidgetsDropdown'

const Dashboard = () => {
  // Estado para controlar el modo del gráfico: 'week' para 7 días y 'Month' para 12 meses.
  const [chartMode, setChartMode] = useState('Month')

  return (
    <>
      <CRow className="mb-4">
        <WidgetsDropdown />
      </CRow>
      <CCard className="mb-4">
        <CCardHeader>Grafico de Ventas</CCardHeader>
        <CCol sm={5}>
          <div className="small text-body-secondary">
            {chartMode === 'week' ? 'Últimos 7 días' : 'Enero - Diciembre'}
          </div>
        </CCol>
        <CCol sm={7} className="d-none d-md-block">
          <CButton color="primary" className="float-end">
            <CIcon icon={cilCloudDownload} />
          </CButton>
          <CButtonGroup className="float-end me-3">
            {['week', 'Month'].map((value) => (
              <CButton
                color="outline-secondary"
                key={value}
                className="mx-0"
                active={value === chartMode}
                onClick={() => setChartMode(value)}
              >
                {value}
              </CButton>
            ))}
          </CButtonGroup>
        </CCol>
        <CCardBody>
          <ChartBarExample mode={chartMode} />
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard
