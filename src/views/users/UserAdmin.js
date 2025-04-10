import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  CAvatar,
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormInput,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPeople, cilPencil, cilTrash, cilCloudDownload } from '@coreui/icons'

const UserAdmin = () => {
  const { id } = useParams() // Obtiene el ID del rol desde la URL
  const [users, setUsers] = useState([])
  const [visible, setVisible] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [editFormData, setEditFormData] = useState({
    user_name: '',
    email: '',
    phone: '',
    birthdate: '',
  })

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/db.json')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        // Filtra los usuarios que pertenecen al rol seleccionado
        const filteredUsers = data.user.filter((user) => user.id_role === parseInt(id))
        setUsers(filteredUsers)
      } catch (error) {
        console.error('Error al cargar los usuarios:', error)
      }
    }

    fetchUsers()
  }, [id])

  // Función para simular la eliminación de un usuario
  const handleDelete = (userId) => {
    const updatedUsers = users.filter((user) => user.id_user !== userId)
    setUsers(updatedUsers)
    // Simula la actualización del archivo db.json
    updateDbJson({ user: updatedUsers })
  }

  // Función para abrir el modal de edición
  const handleEdit = (user) => {
    setSelectedUser(user)
    setEditFormData({
      user_name: user.user_name,
      email: user.email,
      phone: user.phone,
      birthdate: user.birthdate,
    })
    setVisible(true)
  }

  // Función para manejar los cambios en el formulario de edición
  const handleEditFormChange = (event) => {
    setEditFormData({ ...editFormData, [event.target.name]: event.target.value })
  }

  // Función para simular la actualización de un usuario
  const handleUpdate = () => {
    const updatedUsers = users.map((user) =>
      user.id_user === selectedUser.id_user ? { ...user, ...editFormData } : user,
    )
    setUsers(updatedUsers)
    setVisible(false)
    // Simula la actualización del archivo db.json
    updateDbJson({ user: updatedUsers })
  }

  // Función para simular la actualización del archivo db.json
  const updateDbJson = (newData) => {
    // Aquí deberías implementar la lógica para actualizar el archivo db.json
    // Esto es solo una simulación, ya que no puedes escribir directamente en el archivo
    // desde el frontend.
    console.log('Simulando actualización de db.json con:', newData)
    // En una aplicación real, podrías enviar estos datos a un backend
    // que se encargue de actualizar el archivo db.json o una base de datos.
  }

  return (
    <CCard className="mb-4">
      <CCardHeader>
        Users{' '}
        <CButton color="primary" className="float-end">
          <CIcon icon={cilCloudDownload} />
        </CButton>
      </CCardHeader>
      <CCardBody>
        <CTable align="middle" className="mb-0 border" hover responsive>
          <CTableHead color="black">
            <CTableRow>
              <CTableHeaderCell className="text-center">
                <CIcon icon={cilPeople} />
              </CTableHeaderCell>
              <CTableHeaderCell>User</CTableHeaderCell>
              <CTableHeaderCell>Email</CTableHeaderCell>
              <CTableHeaderCell>Phone</CTableHeaderCell>
              <CTableHeaderCell>birthdate</CTableHeaderCell>
              <CTableHeaderCell>Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {users.map((user) => (
              <CTableRow key={user.id_user}>
                <CTableDataCell className="text-center">
                  <CAvatar size="md" src={`avatars/${user.id_user}.jpg`} />
                </CTableDataCell>
                <CTableDataCell>
                  <div>{user.user_name}</div>
                </CTableDataCell>
                <CTableDataCell>
                  <div>{user.email}</div>
                </CTableDataCell>
                <CTableDataCell>
                  <div>{user.phone}</div>
                </CTableDataCell>
                <CTableDataCell>
                  <div>{user.birthdate}</div>
                </CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="primary"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(user)}
                  >
                    <CIcon icon={cilPencil} />
                  </CButton>
                  <CButton color="danger" size="sm" onClick={() => handleDelete(user.id_user)}>
                    <CIcon icon={cilTrash} />
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Edit User</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormInput
            type="text"
            name="user_name"
            label="User Name"
            value={editFormData.user_name}
            onChange={handleEditFormChange}
          />
          <CFormInput
            type="email"
            name="email"
            label="Email"
            value={editFormData.email}
            onChange={handleEditFormChange}
          />
          <CFormInput
            type="text"
            name="phone"
            label="Phone"
            value={editFormData.phone}
            onChange={handleEditFormChange}
          />
          <CFormInput
            type="text"
            name="birthdate"
            label="Birthdate"
            value={editFormData.birthdate}
            onChange={handleEditFormChange}
          />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={handleUpdate}>
            Save changes
          </CButton>
        </CModalFooter>
      </CModal>
    </CCard>
  )
}

export default UserAdmin
