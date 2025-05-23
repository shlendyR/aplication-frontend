import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormLabel,
  CButton,
  CRow,
  CCol,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  useColorModes, // Importamos el hook
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSun, cilMoon, cilContrast } from '@coreui/icons'

const General = () => {
  const [formData, setFormData] = useState({
    language: 'en', // Default language
    timezone: 'UTC', // Default timezone
    trackLocation: false, // Track location option
    dateFormat: 'YYYY-MM-DD', // Default date format
    timeFormat: '24h', // Default time format
  })

  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme') // Usamos el hook

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value })
  }

  const handleColorModeChange = (mode) => {
    setColorMode(mode) // Cambiamos el tema globalmente
    console.log(`Color mode changed to: ${mode}`)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Settings saved:', formData)
    alert('Settings saved successfully.')
  }

  const handleCancel = () => {
    setFormData({
      language: 'en',
      timezone: 'UTC',
      trackLocation: false,
      dateFormat: 'YYYY-MM-DD',
      timeFormat: '24h',
    })
    setColorMode('light') // Reiniciamos el tema a 'light'
  }

  return (
    <CCard>
      <CCardHeader>
        <h5>General Settings</h5>
      </CCardHeader>
      <CCardBody>
        <CForm onSubmit={handleSubmit}>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="language">Language</CFormLabel>
              <select
                id="language"
                name="language"
                value={formData.language}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
              </select>
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="timezone">Timezone</CFormLabel>
              <select
                id="timezone"
                name="timezone"
                value={formData.timezone}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="UTC">UTC</option>
                <option value="America/Caracas">Caracas</option>
              </select>
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="dateFormat">Date Format</CFormLabel>
              <select
                id="dateFormat"
                name="dateFormat"
                value={formData.dateFormat}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="YYYY-MM-DD">YYYY-MM-DD (2025-04-22)</option>
                <option value="DD-MM-YYYY">DD-MM-YYYY (22-04-2025)</option>
                <option value="MM-DD-YYYY">MM-DD-YYYY (04-22-2025)</option>
              </select>
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="timeFormat">Time Format</CFormLabel>
              <select
                id="timeFormat"
                name="timeFormat"
                value={formData.timeFormat}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="24h">24 Hours</option>
                <option value="12h">12 Hours (AM/PM)</option>
              </select>
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={12}>
              <CFormLabel style={{ marginBottom: '10px', display: 'block' }}>Theme </CFormLabel>
              <CDropdown className="mt-2">
                <CDropdownToggle color="secondary" className="w-100">
                  {colorMode === 'light' && 'Light Mode'}
                  {colorMode === 'dark' && 'Dark Mode'}
                  {colorMode === 'auto' && 'Auto Mode'}
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem
                    active={colorMode === 'light'}
                    onClick={() => handleColorModeChange('light')}
                  >
                    <CIcon className="me-2" icon={cilSun} size="lg" /> Light
                  </CDropdownItem>
                  <CDropdownItem
                    active={colorMode === 'dark'}
                    onClick={() => handleColorModeChange('dark')}
                  >
                    <CIcon className="me-2" icon={cilMoon} size="lg" /> Dark
                  </CDropdownItem>
                  <CDropdownItem
                    active={colorMode === 'auto'}
                    onClick={() => handleColorModeChange('auto')}
                  >
                    <CIcon className="me-2" icon={cilContrast} size="lg" /> Auto
                  </CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
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

export default General
