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

const Products = () => {
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
        setCategories(data.category) // Extraer solo la sección "category"
      } catch (error) {
        console.error('Error al cargar las categorías:', error)
      }
    }

    fetchCategories()
  }, [])

  return (
    <div>
      <h1 className="mb-4">Productos de Inventario</h1>
      <CRow>
        {categories.map((category) => (
          <CCol sm="6" md="4" lg="3" key={category.id_category} className="mb-4">
            <CCard>
              <CCardImage
                orientation="top"
                src={category.image || 'https://via.placeholder.com/150'}
                alt={category.name_category}
              />
              <CCardHeader>{category.name_category}</CCardHeader>
              <CCardBody>
                <CCardTitle>ID: {category.id_category}</CCardTitle>
                <CButton
                  color="primary"
                  onClick={() => navigate(`/products/category/${category.id_category}`)}
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

export default Products
