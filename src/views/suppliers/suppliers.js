import React from 'react'
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CButton,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPhone } from '@coreui/icons'
import useFetch from '../../hooks/useFetch'

const Suppliers = () => {
  // Se asume que el endpoint es /supplier (ajústalo si es necesario).
  const { data: suppliers, loading, error } = useFetch('http://localhost:8000/supplier')

  if (loading) return <div>Cargando proveedores...</div>
  if (error) return <div>Error al cargar proveedores.</div>
  if (!suppliers || !Array.isArray(suppliers)) return <div>No se encontraron proveedores.</div>

  return (
    <CRow>
      <CCol xs={12}>
        <CCard>
          <CCardHeader>
            <strong>Proveedores</strong>
          </CCardHeader>
          <CCardBody>
            <CTable hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Nombre del Proveedor</CTableHeaderCell>
                  <CTableHeaderCell>Teléfono</CTableHeaderCell>
                  <CTableHeaderCell>Acciones</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {suppliers.map((supplier) => (
                  <CTableRow key={supplier.id_suppliers}>
                    <CTableDataCell>{supplier.name}</CTableDataCell>
                    <CTableDataCell>
                      {supplier.number}{' '}
                      <CButton color="primary" size="sm" className="ml-2" title="Llamar">
                        <CIcon icon={cilPhone} />
                      </CButton>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton color="primary" size="sm">
                        products
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Suppliers
