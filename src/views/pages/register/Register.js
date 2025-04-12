import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Register = () => {
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center" >
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4" style={{background:"rgb(28, 23, 31)", border:"solid 1px rgb(72, 4, 128)"}}>
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>
                  <CInputGroup className="mb-3" style={{border:"solid 1px rgb(72, 4, 128)", borderRadius: "7px"}}>
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="Username" autoComplete="username" />
                  </CInputGroup>
                  <CInputGroup className="mb-3" style={{border:"solid 1px rgb(72, 4, 128)", borderRadius: "7px"}}>
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput placeholder="Email" autoComplete="email" />
                  </CInputGroup>
                  <CInputGroup className="mb-3" style={{border:"solid 1px rgb(72, 4, 128)", borderRadius: "7px"}}>
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4" style={{border:"solid 1px rgb(72, 4, 128)", borderRadius: "7px"}}>
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                    />
                  </CInputGroup>
                  <button style={{background:"rgb(72, 4, 128)",border:"solid 1px rgb(72, 4, 128)", borderRadius:"5px", marginTop: "0px", marginBottom:"30px", marginLeft:"150px"}}>
                    Admin
                  </button>
                  <button style={{background:"rgb(72, 4, 128)",border:"solid 1px rgb(72, 4, 128)", borderRadius:"5px", marginTop: "0px", marginBottom:"30px", marginLeft:"30px"}}>
                    seller
                  </button>
                  <div className="d-grid">
                    <CButton style={{background:"rgb(72, 4, 128)"}}>Create Account</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
