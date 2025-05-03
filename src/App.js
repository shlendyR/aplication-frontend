import React, { Suspense, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  CSpinner,
  useColorModes,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormInput,
  CButton,
  CInputGroup,
  CInputGroupText, 
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import './scss/style.scss'
import './scss/examples.scss'
import Sales from './views/Sales/Sales';
import Pending from './views/pendient/pendient';

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginModalVisible, setLoginModalVisible] = useState(true);
  const [users, setUsers] = useState([]);
  const [loginData, setLoginData] = useState({ user_name: "", password: "" });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3001/user");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const userData = await response.json();
        console.log("Fetched Users:", userData); // Verifica los datos obtenidos
        setUsers(userData);
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };
  
    fetchUsers();
  }, []);



  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)

  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);

  // Estado para el login
  const [isAuthenticated, setIsAuthenticated] = useState(false) // Controla si el usuario está autenticado
  const [username, setUsername] = useState('') // Almacena el nombre de usuario
  const [password, setPassword] = useState('') // Almacena la contraseña

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]

    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }

    setColorMode(storedTheme)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Función para manejar el login
  const handleLogin = () => {
    // Permitir acceso sin validar credenciales
    setIsLoggedIn(true);
    setIsAuthenticated(true);
    setLoginModalVisible(false);
  };
  // const handleLogin = () => {
  //   const user = users.find(
  //     (u) => u.user_name === loginData.user_name && u.password.toString() === loginData.password
  //   );
  
  //   if (user) {
  //     setIsLoggedIn(true);
  //     setIsAuthenticated(true); // Asegúrate de actualizar este estado también
  //     setLoginModalVisible(false);
  //   } else {
  //     alert("Invalid username or password. Please try again.");
  //   }
  // };

  return (
    <BrowserRouter>
      <CModal className="" 
     visible={!isAuthenticated} backdrop="static" keyboard={false} onClose={() => {}}>
        <CModalHeader>
          <CModalTitle>Login</CModalTitle>
        </CModalHeader>
        <CModalBody>
          
          <CInputGroup className="mb-3">
            <CInputGroupText style={{height:"38px", border: "solid 1px rgb(107, 6, 238)"}}>
                <CIcon icon={cilUser}/>
            </CInputGroupText>
           <CFormInput style={{border: "solid 1px rgb(107, 6, 238)"}} 
            type="text"
            name="user_name"
            placeholder="Username"
            value={loginData.user_name}
            onChange={(e) => setLoginData({ ...loginData, user_name: e.target.value })}
            className="mb-3"
          />
          </CInputGroup>

            <CInputGroup className="mb-4">
              <CInputGroupText style={{border: "solid 1px rgb(107, 6, 238)"}}>
                <CIcon icon={cilLockLocked} />
              </CInputGroupText>
          <CFormInput
            style={{border: "solid 1px rgb(107, 6, 238)"}}
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
          />
          </CInputGroup>
        
        </CModalBody>
        <CModalFooter>
        <CButton
          className="px-0"
          style={{ marginRight: "70%", color: "rgb(160, 91, 250)" }}
          onClick={() => setIsForgotPasswordModalOpen(true)}>
              Forgot password?
        </CButton>
          <CButton onClick={handleLogin} style={{marginLeft:"px", background:"rgb(64, 5, 141)", border: "solid 1px #000000", borderRadius: "5px"}}>
            Login
          </CButton>
        </CModalFooter>
      </CModal>

            <CModal
        visible={isForgotPasswordModalOpen}
        onClose={() => setIsForgotPasswordModalOpen(false)}>
        <CModalHeader>
          <CModalTitle>Forgot Password</CModalTitle>
        </CModalHeader>
        <CModalBody style={{height:"180px"}}>
          <p style={{marginTop:"30px"}}>Please enter your email address to reset your password:</p>
          <CFormInput
            type="email"
            placeholder="Email Address"
            className="mb-3"
          />
        </CModalBody>
        <CModalFooter style={{height:"90px"}}>
          <CButton
            color="secondary"
            style={{marginLeft:"px", background:"rgb(64, 5, 141)", border: "solid 1px #000000", borderRadius: "5px"}}
            onClick={() => setIsForgotPasswordModalOpen(false)}
          >
            Cancel
          </CButton>
          <CButton color="primary" style={{marginLeft:"px", background:"rgb(64, 5, 141)", border: "solid 1px #000000", borderRadius: "5px"}}>Submit</CButton>
        </CModalFooter>
      </CModal>

      {isAuthenticated && (
        <Suspense
          fallback={
            <div className="pt-3 text-center">
              <CSpinner color="primary" variant="grow" />
            </div>
          }
        >
          <Routes>
            <Route path="/pending" element={<Pending />} />
            <Route path="*" element={<DefaultLayout />} />

            <Route
              path="*"
              element={
                <DefaultLayout>
                  <Routes>
                    <Route path="/sales" element={<Sales />} />
                  </Routes>
                </DefaultLayout>
              }/>
          </Routes>

        </Suspense>
      )}
    </BrowserRouter>
  )
}

export default App