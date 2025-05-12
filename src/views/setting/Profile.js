import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CFormLabel,
  CButton,
  CRow,
  CCol,
  CFormText,
} from '@coreui/react'

const Profile = () => {
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'user@example.com',
    password: '',
    confirmPassword: '',
    profilePicture: null, // State for profile picture
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfileData({ ...profileData, [name]: value })
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setProfileData({ ...profileData, profilePicture: file })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (profileData.password !== profileData.confirmPassword) {
      alert('Passwords do not match.')
      return
    }
    console.log('Profile data saved:', profileData)
    alert('Profile updated successfully.')
  }

  const handleCancel = () => {
    setProfileData({
      firstName: 'John',
      lastName: 'Doe',
      email: 'user@example.com',
      password: '',
      confirmPassword: '',
      profilePicture: null,
    })
  }

  return (
    <CCard>
      <CCardHeader>
        <h5>Profile Settings</h5>
      </CCardHeader>
      <CCardBody>
        <CForm onSubmit={handleSubmit}>
          <CRow className="mb-3">
            <CCol md={12} className="text-center">
              <CFormLabel htmlFor="profilePicture">Profile Picture</CFormLabel>
              <div className="mb-3">
                {profileData.profilePicture ? (
                  <img
                    src={URL.createObjectURL(profileData.profilePicture)}
                    alt="Profile Picture"
                    className="img-thumbnail"
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                  />
                ) : (
                  <div
                    className="img-thumbnail"
                    style={{
                      width: '150px',
                      height: '150px',
                      backgroundColor: '#e9ecef',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      color: '#6c757d',
                    }}
                  >
                    No Picture
                  </div>
                )}
              </div>
              <CFormInput
                type="file"
                id="profilePicture"
                name="profilePicture"
                accept="image/*"
                onChange={handleFileChange}
              />
              <CFormText>Upload an image for your profile picture.</CFormText>
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="firstName">First Name</CFormLabel>
              <CFormInput
                type="text"
                id="firstName"
                name="firstName"
                value={profileData.firstName}
                onChange={handleInputChange}
                placeholder="Enter your first name"
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="lastName">Last Name</CFormLabel>
              <CFormInput
                type="text"
                id="lastName"
                name="lastName"
                value={profileData.lastName}
                onChange={handleInputChange}
                placeholder="Enter your last name"
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={12}>
              <CFormLabel htmlFor="email">Email Address</CFormLabel>
              <CFormInput
                type="email"
                id="email"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
                placeholder="Enter your email address"
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="password">New Password</CFormLabel>
              <CFormInput
                type="password"
                id="password"
                name="password"
                value={profileData.password}
                onChange={handleInputChange}
                placeholder="Enter a new password"
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="confirmPassword">Confirm Password</CFormLabel>
              <CFormInput
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={profileData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your new password"
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

export default Profile
