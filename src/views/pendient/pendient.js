import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton, CContainer, CRow, CCol, CModal, CModalHeader, CModalBody, CModalFooter, CFormInput } from "@coreui/react";
import "./pendient.scss";

const Pending = () => {

    const [pendingSales, setPendingSales] = useState([]);
    const [usersMap, setUsersMap] = useState({});
    const [accountsReceivableMap, setAccountsReceivableMap] = useState({});
    <Pending accountsReceivableMap={accountsReceivableMap} />

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [paymentToEdit, setPaymentToEdit] = useState(null);
    const [editIndex, setEditIndex] = useState(null);

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [paymentToDelete, setPaymentToDelete] = useState(null);


    const location = useLocation();
    const navigate = useNavigate();
    const selectedRecord = location.state?.record || null; 

    const [paymentDetails, setPaymentDetails] = useState([]); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newPayment, setNewPayment] = useState({
      paymentDate: "",
      amountPaid: "",
      paymentMethod: "",
    }); 
  
    if (!selectedRecord) {
      return <p>No record selected.</p>; 
    }

    useEffect(() => {
      const fetchData = async () => {
        try {
          // Fetch pending sales
          const salesResponse = await fetch("http://localhost:3001/sales");
          if (!salesResponse.ok) {
            throw new Error(`HTTP error! status: ${salesResponse.status}`);
          }
          const salesData = await salesResponse.json();
    
          // Filter only pending sales
          const pending = salesData.filter((sale) => sale.status === "Pending");
          setPendingSales(pending);
    
          // Fetch users
          const usersResponse = await fetch("http://localhost:3001/user");
          if (!usersResponse.ok) {
            throw new Error(`HTTP error! status: ${usersResponse.status}`);
          }
          const usersData = await usersResponse.json();
    
          // Map id_user to user_name
          const usersMap = {};
          usersData.forEach((user) => {
            usersMap[user.id_user] = user.user_name;
          });
          setUsersMap(usersMap);
    
          // Fetch accounts receivable
          const accountsReceivableResponse = await fetch("http://localhost:3001/accounts_receivable");
          if (!accountsReceivableResponse.ok) {
            throw new Error(`HTTP error! status: ${accountsReceivableResponse.status}`);
          }
          const accountsReceivableData = await accountsReceivableResponse.json();
    
          // Map id_sale to expiration_date
          const accountsReceivableMap = {};
          accountsReceivableData.forEach((account) => {
            accountsReceivableMap[account.id_sale] = account.expiration_date;
          });
          setAccountsReceivableMap(accountsReceivableMap);
    
          // Fetch payment details
          const paymentResponse = await fetch("http://localhost:3001/payment");
          if (!paymentResponse.ok) {
            throw new Error(`HTTP error! status: ${paymentResponse.status}`);
          }
          const paymentData = await paymentResponse.json();
    
          // Set payment details
          setPaymentDetails(paymentData);
        } catch (error) {
          console.error("Error al cargar los datos:", error.message);
        }
      };
    
      fetchData();
    }, []);
    

    const handleEditPayment = (index) => {
      setPaymentToEdit(paymentDetails[index]);
      setEditIndex(index);
      setEditModalOpen(true);
    };

    const handleDeletePayment = (index) => {
      setPaymentToDelete(index); // Configura el índice del registro a eliminar
      setDeleteModalOpen(true); // Abre el modal de confirmación
    };

    const handleAddRecord = () => {
      if (!newPayment.paymentDate || !newPayment.amountPaid || !newPayment.paymentMethod) {
        alert("Please fill in all payment fields.");
        return;
      }
    
      const newRecord = {
        payment_date: newPayment.paymentDate,
        amount_paid: newPayment.amountPaid,
        payment_method: newPayment.paymentMethod,
      };
    
      // Actualiza el estado de paymentDetails
      setPaymentDetails((prevDetails) => [...prevDetails, newRecord]);
    
      // Restablece el formulario de pago
      setNewPayment({ paymentDate: "", amountPaid: "", paymentMethod: "" });
      setIsModalOpen(false);
    };

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPayment({ ...newPayment, [name]: value }); 
      };

    
  
    return (
      <div>
        <h1 className="title_rd">Record Details</h1>
        <CContainer className="overflow-hidden">
        <CRow xs={{ gutter: 2 }}>
            <CCol xs={{ span: 6 }}>
            <div className="p-3"><p><strong>Seller:</strong> {usersMap[selectedRecord.id_user] || "Unknown"}</p></div>
            </CCol>
            <CCol xs={{ span: 6 }}>
            <div className="p-3"><p><strong>Total:</strong> {selectedRecord.total}</p></div>
            </CCol>
            <CCol xs={{ span: 6 }}>
            <div className="p-3"><p><strong>Date:</strong> {selectedRecord.date}</p></div>
            </CCol>
            <CCol xs={{ span: 6 }}>
            <div className="p-3"><p><strong>Status:</strong> {selectedRecord.status}</p></div>
            </CCol>
            <CCol xs={{ span: 6 }}>
            <div className="p-3"><p><strong>Payment Method:</strong> {selectedRecord.payment}</p></div>
            </CCol>
            <CCol xs={{ span: 6 }}>
            <div className="p-3"><p><strong>Expiration Date:</strong> {accountsReceivableMap[selectedRecord.id_sale] || "N/A"}</p></div>
            </CCol>
        </CRow>
        </CContainer>
  
        {selectedRecord.products && selectedRecord.products.length > 0 && (
          <div>
            <h2>Products</h2>
            <CTable hover className="table1">
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Product</CTableHeaderCell>
                  <CTableHeaderCell>Amount</CTableHeaderCell>
                  <CTableHeaderCell>Subtotal</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {selectedRecord.products.map((product, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{product.product}</CTableDataCell>
                    <CTableDataCell>{product.amount}</CTableDataCell>
                    <CTableDataCell>{product.subtotal}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </div>
        )}
<div>

<div>
        <h2 className="PD">Payment Details</h2>
        <CTable hover className="table1">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>Payment Date</CTableHeaderCell>
              <CTableHeaderCell>Amount Paid</CTableHeaderCell>
              <CTableHeaderCell>Payment Method</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {paymentDetails.map((detail, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{detail.payment_date}</CTableDataCell>
                <CTableDataCell>{detail.amount_paid}</CTableDataCell>
                <CTableDataCell>{detail.payment_method}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    style={{
                      background: "rgba(46, 6, 99, 0.31)",
                      border: "solid 1px #000000",
                      borderRadius: "5px",
                      padding: "5px 10px",
                      cursor: "pointer",
                    }}
                    className="me-2"
                    onClick={() => handleEditPayment(index)}
                  >
                    Edit
                  </CButton>
                  <CButton
                    style={{
                      background: "rgba(201, 4, 4, 0.42)",
                      border: "solid 1px #000000",
                      borderRadius: "5px",
                      padding: "5px 10px",
                      cursor: "pointer",
                      color:"white",
                    }}
                    onClick={() => handleDeletePayment(index)}
                  >
                    Delete
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
        
      </div>

      <CModal visible={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CModalHeader>
          <h5>Add Payment Record</h5>
        </CModalHeader>
        <CModalBody>
          <CFormInput
            type="date"
            name="paymentDate"
            placeholder="Payment Date"
            value={newPayment.paymentDate}
            onChange={handleInputChange}
            className="mb-3"
          />
          <CFormInput
            type="number"
            name="amountPaid"
            placeholder="Amount Paid"
            value={newPayment.amountPaid}
            onChange={handleInputChange}
            className="mb-3"
          />
          <CFormInput
            type="text"
            name="paymentMethod"
            placeholder="Payment Method"
            value={newPayment.paymentMethod}
            onChange={handleInputChange}
            className="mb-3"
          />
        </CModalBody>
        <CModalFooter>
          <CButton className="b_c" onClick={() => setIsModalOpen(false)}>Cancel</CButton>
          <CButton className="b_a" onClick={handleAddRecord}>Add</CButton>
        </CModalFooter>
      </CModal>

      <CModal visible={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <CModalHeader>
          <h5>Edit Payment Record</h5>
        </CModalHeader>
        <CModalBody>
          <CFormInput
            type="date"
            name="payment_date"
            placeholder="Payment Date"
            value={paymentToEdit?.payment_date || ""}
            onChange={(e) =>
              setPaymentToEdit({ ...paymentToEdit, payment_date: e.target.value })
            }
            className="mb-3"
          />
          <CFormInput
            type="number"
            name="amount_paid"
            placeholder="Amount Paid"
            value={paymentToEdit?.amount_paid || ""}
            onChange={(e) =>
              setPaymentToEdit({ ...paymentToEdit, amount_paid: e.target.value })
            }
            className="mb-3"
          />
          <CFormInput
            type="text"
            name="payment_method"
            placeholder="Payment Method"
            value={paymentToEdit?.payment_method || ""}
            onChange={(e) =>
              setPaymentToEdit({ ...paymentToEdit, payment_method: e.target.value })
            }
            className="mb-3"
          />
        </CModalBody>
        <CModalFooter>
          <CButton style={{
              background: "rgba(46, 6, 99, 0.31)",
              border: "solid 1px #000000",
              borderRadius: "5px",
              padding: "5px 10px",
              cursor: "pointer",
            }}
             onClick={() => setEditModalOpen(false)}>
            Cancel
          </CButton>
          <CButton
            style={{
              background: "rgba(46, 6, 99, 0.31)",
              border: "solid 1px #000000",
              borderRadius: "5px",
              padding: "5px 10px",
              cursor: "pointer",
            }}
            onClick={() => {
              const updatedPayments = [...paymentDetails];
              updatedPayments[editIndex] = paymentToEdit;
              setPaymentDetails(updatedPayments);
              setEditModalOpen(false);
            }}
          >
            Save Changes
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal visible={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <CModalHeader>
          <h5>Confirm Delete</h5>
        </CModalHeader>
        <CModalBody>
          Are you sure you want to delete this payment record?
        </CModalBody>
        <CModalFooter>
          <CButton style={{
              background: "rgba(46, 6, 99, 0.31)",
              border: "solid 1px #000000",
              borderRadius: "5px",
              padding: "5px 10px",
              cursor: "pointer",
            }} onClick={() => setDeleteModalOpen(false)}>
            Cancel
          </CButton>
          <CButton
            style={{
              background: "rgba(201, 4, 4, 0.42)",
              border: "solid 1px #000000",
              borderRadius: "5px",
              padding: "5px 10px",
              cursor: "pointer",
              color:"white",
            }}
            onClick={() => {
              const updatedPayments = paymentDetails.filter((_, i) => i !== paymentToDelete);
              setPaymentDetails(updatedPayments); // Actualiza el estado eliminando el registro
              setDeleteModalOpen(false); // Cierra el modal
            }}
          >
            Delete
          </CButton>
        </CModalFooter>
      </CModal>
        
      </div>

        <CButton className="b_ap_1" onClick={() => setIsModalOpen(true)}>Add Payment</CButton>
        <CButton className="b_gb" onClick={() => navigate(-1)}>Go Back</CButton>

      </div>
    );
  };
  
  export default Pending;