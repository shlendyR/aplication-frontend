import React, { useEffect, useState } from 'react'
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
  CContainer,
  CForm,
  CNavbar,
  CFormLabel,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPeople, cilPencil, cilTrash, cilCloudDownload, cilPlus } from '@coreui/icons'

const Users = () => {
  const [users, setUsers] = useState([])
  const [roles, setRoles] = useState([])
  const [visible, setVisible] = useState(false) // Estado para el modal de edición
  const [visibleAdd, setVisibleAdd] = useState(false) // Estado para el modal de agregar
  const [selectedUser, setSelectedUser] = useState(null)
  const [editFormData, setEditFormData] = useState({
    user_name: '',
    email: '',
    phone: '',
    birthdate: '',
    id_role: '',
  })
  const [addFormData, setAddFormData] = useState({
    user_name: '',
    email: '',
    phone: '',
    birthdate: '',
    id_role: '',
    password: '',
  })

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/db.json')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        // Mostrar todos los usuarios sin filtrar
        setUsers(data.user)
        setRoles(data.role)
      } catch (error) {
        console.error('Error al cargar los usuarios:', error)
      }
    }

    fetchUsers()
  }, [])

  const handleDelete = (userId) => {
    const updatedUsers = users.filter((user) => user.id_user !== userId)
    setUsers(updatedUsers)
    // Simula la actualización del archivo db.json
    updateDbJson({ user: updatedUsers })
  }

  const handleEdit = (user) => {
    setSelectedUser(user)
    setEditFormData({
      user_name: user.user_name,
      email: user.email,
      phone: user.phone,
      birthdate: user.birthdate,
      id_role: user.id_role || '',
    })
    setVisible(true)
  }

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

  // Funciones para el modal de agregar
  const handleAddFormChange = (event) => {
    setAddFormData({ ...addFormData, [event.target.name]: event.target.value })
  }

  const handleAdd = () => {
    // Aquí implementarías la lógica para agregar el nuevo usuario
    // Por ahora, solo simulamos la actualización del estado
    const newUserId = users.length > 0 ? users[users.length - 1].id_user + 1 : 1
    const newUser = { id_user: newUserId, ...addFormData }
    setUsers([...users, newUser])
    setVisibleAdd(false)
    updateDbJson({ user: [...users, newUser] }) // Actualiza el "db.json" simulado
  }

  // Función para obtener el nombre del rol según el ID
  const getRoleName = (roleId) => {
    const role = roles.find((role) => role.id_role === parseInt(roleId))
    return role ? role.name_role : 'Unknown Role' // Ajusta para usar name_role
  }

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <CButton color="success" className="float-end" onClick={() => setVisibleAdd(true)}>
          <CIcon icon={cilPlus} /> <CIcon icon={cilPeople} className="ms-1 me-2" />
        </CButton>
        <CButton color="primary" className="float-end me-2">
          <CIcon icon={cilCloudDownload} />
        </CButton>

        <CContainer fluid>
          <CForm className="d-flex" style={{ maxWidth: '300px' }}>
            <CFormInput type="search" className="me-2" placeholder="Search" />
            <CButton type="submit" color="success" variant="outline">
              Search
            </CButton>
          </CForm>
        </CContainer>
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
              <CTableHeaderCell>Rol</CTableHeaderCell>
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
                  <div>{getRoleName(user.id_role)}</div>
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

      {/* Modal de Editar Usuario */}
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Edit User</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormLabel>User Name</CFormLabel> {/* Agregué etiquetas */}
          <CFormInput
            type="text"
            name="user_name"
            value={editFormData.user_name}
            onChange={handleEditFormChange}
          />
          <CFormLabel>Email</CFormLabel>
          <CFormInput
            type="email"
            name="email"
            label="Email"
            value={editFormData.email}
            onChange={handleEditFormChange}
          />
          <CFormLabel>Phone</CFormLabel>
          <CFormInput
            type="text"
            name="phone"
            label="Phone"
            value={editFormData.phone}
            onChange={handleEditFormChange}
          />
          <CFormLabel>Birthdate</CFormLabel>
          <CFormInput
            type="text"
            name="birthdate"
            label="Birthdate"
            value={editFormData.birthdate}
            onChange={handleEditFormChange}
          />
          <CFormLabel>Rol</CFormLabel>
          <CFormInput
            type="number"
            name="id_role"
            label="Rol"
            value={editFormData.id_role}
            onChange={handleEditFormChange}
          />
          <CFormLabel>Password</CFormLabel>
          <CFormInput
            type="password"
            name="password"
            value={addFormData.password}
            onChange={handleAddFormChange}
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

      {/* Modal de Agregar Usuario */}
      <CModal visible={visibleAdd} onClose={() => setVisibleAdd(false)}>
        <CModalHeader>
          <CModalTitle>Add User</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormLabel>User Name</CFormLabel>
          <CFormInput
            type="text"
            name="user_name"
            value={addFormData.user_name}
            onChange={handleAddFormChange}
          />
          <CFormLabel>Email</CFormLabel>
          <CFormInput
            type="email"
            name="email"
            value={addFormData.email}
            onChange={handleAddFormChange}
          />
          <CFormLabel>Phone</CFormLabel>
          <CFormInput
            type="text"
            name="phone"
            value={addFormData.phone}
            onChange={handleAddFormChange}
          />
          <CFormLabel>Birthdate</CFormLabel>
          <CFormInput
            type="text"
            name="birthdate"
            value={addFormData.birthdate}
            onChange={handleAddFormChange}
          />
          <CFormLabel>Rol</CFormLabel>
          <CFormInput
            type="number"
            name="id_role"
            value={addFormData.id_role}
            onChange={handleAddFormChange}
          />
          <CFormLabel>Password</CFormLabel>
          <CFormInput
            type="password"
            name="password"
            value={addFormData.password}
            onChange={handleAddFormChange}
          />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleAdd(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={handleAdd}>
            Add User
          </CButton>
        </CModalFooter>
      </CModal>
    </CCard>
  )
}

export default Users
