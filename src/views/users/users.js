import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CRow,
  CCol,
  CCardImage,
  CButton,
} from '@coreui/react'

const Users = () => {
  const [categories, setCategories] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/db.json') // Ruta relativa al archivo db.json
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setCategories(data.role) // Extraer solo la sección "category"
      } catch (error) {
        console.error('Error al cargar las categorías:', error)
      }
    }

    fetchCategories()
  }, [])

  return (
    <div>
      <CCard className="mb-4">
        <CCardHeader>Users</CCardHeader>
      </CCard>

      <CRow className="justify-content-center">
        {categories.map((role) => (
          <CCol sm="2" md="2" lg="2" key={role.id_role} className="mb-4">
            <CCard>
              <CCardImage
                orientation="top"
                src={role.image || 'https://via.placeholder.com/150'}
                alt={role.name_role}
              />
              <CCardHeader>{role.name_role}</CCardHeader>
              <CCardBody>
                <CButton
                  color="primary" //users\UserAdmin.js   products/category/${category.id_category}`)
                  onClick={() => navigate(`/users/role/${role.id_role}`)}
                >
                  Ver detalles
                </CButton>
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>
    </div>
  )
}

export default Users
