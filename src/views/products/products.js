import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CCol,
  CCardImage,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CFormLabel,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from '@coreui/react'
import useFetch from '../../hooks/useFetch'
import CIcon from '@coreui/icons-react'
import { cilOptions } from '@coreui/icons'

const Products = () => {
  const [categories, setCategories] = useState([])
  const navigate = useNavigate()
  const { data } = useFetch('http://localhost:8000/category')

  // Estados para modal de agregar categoría
  const [visibleCategoryAdd, setVisibleCategoryAdd] = useState(false)
  const [addCategoryFormData, setAddCategoryFormData] = useState({
    name_category: '',
    image: '',
  })

  // Estados para edición
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [editFormData, setEditFormData] = useState({ name_category: '', image: '' })
  const [visibleEditModal, setVisibleEditModal] = useState(false)

  useEffect(() => {
    if (data) {
      setCategories(data) // Actualiza las categorías con los datos obtenidos de la API
    }
  }, [data])

  const handleAddCategoryFormChange = (e) => {
    setAddCategoryFormData({
      ...addCategoryFormData,
      [e.target.name]: e.target.value,
    })
  }

  // Función para agregar categoría
  const handleAddCategory = async () => {
    try {
      const response = await fetch('http://localhost:8000/category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addCategoryFormData),
      })
      if (!response.ok) {
        throw new Error('Error al agregar la categoría')
      }
      const newCategory = await response.json()
      // Actualiza el state para incluir la nueva categoría:
      setCategories((prevCategories) => [...prevCategories, newCategory])
      alert('Categoría agregada correctamente')
      setVisibleCategoryAdd(false)
    } catch (error) {
      console.error(error)
      alert('Error agregando la categoría')
    }
  }

  // Función para editar categoría (abrir modal de edición)
  const handleEditCategory = (category) => {
    setSelectedCategory(category)
    setEditFormData({ name_category: category.name_category, image: category.image })
    setVisibleEditModal(true)
  }

  // Función para actualizar la categoría
  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:8000/category/${selectedCategory.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editFormData),
      })
      if (!response.ok) {
        throw new Error('Error al actualizar la categoría')
      }
      const updatedCategory = await response.json()
      const updatedCategories = categories.map((category) =>
        category.id === selectedCategory.id ? updatedCategory : category,
      )
      setCategories(updatedCategories)
      setVisibleEditModal(false)
    } catch (error) {
      console.error(error)
      alert('Error actualizando la categoría')
    }
  }

  const handleDeleteCategory = async (categoryId) => {
    try {
      const response = await fetch(`http://localhost:8000/category/${categoryId}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Error al eliminar usuario')
      }
      const updatedCategories = categories.filter((category) => category.id !== categoryId)
      setCategories(updatedCategories)
    } catch (error) {
      console.error(error)
      alert('Error eliminando el usuario')
    }
  }

  return (
    <div>
      <CCard className="mb-4">
        <div>
          <CModal visible={visibleCategoryAdd} onClose={() => setVisibleCategoryAdd(false)}>
            <CModalHeader>
              <CModalTitle>Nueva Categoría</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CForm>
                <CFormLabel>Nombre de la Categoría</CFormLabel>
                <CFormInput
                  type="text"
                  name="name_category"
                  placeholder="Nombre de la Categoría"
                  value={addCategoryFormData.name_category}
                  onChange={handleAddCategoryFormChange}
                />
                <CFormLabel>Imagen</CFormLabel>
                <CFormInput
                  type="text"
                  name="image"
                  placeholder=""
                  value={addCategoryFormData.image}
                  onChange={handleAddCategoryFormChange}
                />
              </CForm>
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setVisibleCategoryAdd(false)}>
                Cerrar
              </CButton>
              <CButton color="primary" onClick={handleAddCategory}>
                Guardar Categoría
              </CButton>
            </CModalFooter>
          </CModal>

          <CModal visible={visibleEditModal} onClose={() => setVisibleEditModal(false)}>
            <CModalHeader>
              <CModalTitle>Editar Categoría</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CForm>
                <CFormLabel>Nombre de la Categoría</CFormLabel>
                <CFormInput
                  type="text"
                  name="name_category"
                  value={editFormData.name_category}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, [e.target.name]: e.target.value })
                  }
                />
                <CFormLabel>Imagen</CFormLabel>
                <CFormInput
                  type="text"
                  name="image"
                  value={editFormData.image}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, [e.target.name]: e.target.value })
                  }
                />
              </CForm>
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setVisibleEditModal(false)}>
                Cancelar
              </CButton>
              <CButton color="primary" onClick={handleUpdate}>
                Guardar cambios
              </CButton>
            </CModalFooter>
          </CModal>
        </div>
        <CCardHeader>
          <CButton
            color="success"
            className="float-end p-2 ms-2"
            onClick={() => setVisibleCategoryAdd(true)}
          >
            Add Category
          </CButton>
        </CCardHeader>
        <CCardBody>
          <CRow>
            {categories.map((category) => (
              <CCol sm="6" md="4" lg="3" key={category.id} className="mb-4">
                <CCard>
                  <div style={{ position: 'relative' }}>
                    <CCardImage
                      orientation="top"
                      src={category.image || 'https://via.placeholder.com/150'}
                      alt={category.name_category}
                    />
                    {/* Menú de opciones en la esquina superior derecha */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '5px',
                        right: '5px',
                        zIndex: 10,
                      }}
                    >
                      <CDropdown>
                        <CDropdownToggle color="link" size="sm" caret={false}>
                          <CIcon icon={cilOptions} />
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem onClick={() => handleEditCategory(category)}>
                            Editar
                          </CDropdownItem>
                          <CDropdownItem onClick={() => handleDeleteCategory(category.id)}>
                            Eliminar
                          </CDropdownItem>
                        </CDropdownMenu>
                      </CDropdown>
                    </div>
                  </div>
                  <CCardHeader>{category.name_category}</CCardHeader>
                  <CCardBody>
                    <CButton
                      color="primary"
                      onClick={() =>
                        navigate(`/products/category/${category.id}/${category.name_category}`)
                      }
                    >
                      Ver detalles
                    </CButton>
                  </CCardBody>
                </CCard>
              </CCol>
            ))}
          </CRow>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default Products
