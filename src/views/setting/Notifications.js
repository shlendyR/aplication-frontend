import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormCheck,
  CButton,
  CRow,
  CCol,
} from '@coreui/react'

const Notifications = () => {
  // Simulates the email of the logged-in user
  const userEmail = 'user@example.com'

  const [notifications, setNotifications] = useState({
    email: true, // Email notifications
    push: true, // Push notifications
    debts: true, // Pending debts
    payroll: false, // Payroll
    productShortage: true, // Product shortage
    accountsReceivable: false, // Accounts receivable
  })

  const handleInputChange = (e) => {
    const { name, checked } = e.target
    setNotifications({ ...notifications, [name]: checked })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Notification settings saved:', notifications)
    alert('Notification settings saved successfully.')
  }

  const handleCancel = () => {
    setNotifications({
      email: true,
      push: true,
      debts: true,
      payroll: false,
      productShortage: true,
      accountsReceivable: false,
    })
  }

  return (
    <CCard>
      <CCardHeader>
        <h5>Notification Settings</h5>
      </CCardHeader>
      <CCardBody>
        <p>
          Configure how you want to receive notifications. The email associated with your account
          is: <strong>{userEmail}</strong>
        </p>
        <CForm onSubmit={handleSubmit}>
          <CRow className="mb-3">
            <CCol md={12}>
              <CFormCheck
                type="checkbox"
                id="email"
                name="email"
                label="Receive email notifications"
                checked={notifications.email}
                onChange={handleInputChange}
              />
            </CCol>
            <CCol md={12}>
              <CFormCheck
                type="checkbox"
                id="push"
                name="push"
                label="Receive notifications in the panel (bell icon)"
                checked={notifications.push}
                onChange={handleInputChange}
              />
            </CCol>
          </CRow>
          <hr />
          <h6>Notification Categories</h6>
          <CRow className="mb-3">
            <CCol md={12}>
              <CFormCheck
                type="checkbox"
                id="debts"
                name="debts"
                label="Pending debts"
                checked={notifications.debts}
                onChange={handleInputChange}
              />
            </CCol>
            <CCol md={12}>
              <CFormCheck
                type="checkbox"
                id="payroll"
                name="payroll"
                label="Payroll"
                checked={notifications.payroll}
                onChange={handleInputChange}
              />
            </CCol>
            <CCol md={12}>
              <CFormCheck
                type="checkbox"
                id="productShortage"
                name="productShortage"
                label="Product shortage"
                checked={notifications.productShortage}
                onChange={handleInputChange}
              />
            </CCol>
            <CCol md={12}>
              <CFormCheck
                type="checkbox"
                id="accountsReceivable"
                name="accountsReceivable"
                label="Accounts receivable"
                checked={notifications.accountsReceivable}
                onChange={handleInputChange}
              />
            </CCol>
          </CRow>
          <div className="d-flex justify-content-end">
            <CButton type="button" color="secondary" className="me-2" onClick={handleCancel}>
              Cancel
            </CButton>
            <CButton type="submit" color="primary">
              Save
            </CButton>
          </div>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default Notifications
