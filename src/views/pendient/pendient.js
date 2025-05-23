import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton, CContainer, CRow, CCol, CModal, CModalHeader, CModalBody, CModalFooter, CFormInput } from "@coreui/react";
import "./pendient.scss";
import { fetchItems, createItem, updateItem, deleteItem } from "../../services/api";

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
  const loadPayments = async () => {
    try {
      const payments = await fetchItems(); // Llama a fetchItems para obtener los datos
      setPaymentDetails(payments.filter((payment) => payment.id_sale === selectedRecord?.id_sale)); // Filtra los pagos por id_sale
    } catch (error) {
      console.error("Error al cargar los pagos:", error.message);
    }
  };

  if (selectedRecord) {
    loadPayments();
  }
}, [selectedRecord]);
    

const handleEditPayment = async () => {
  if (!paymentToEdit) {
    alert("No payment selected for editing.");
    return;
  }

  try {
    const updatedPayment = await updateItem(paymentToEdit.id, paymentToEdit); // Llama a updateItem
    setPaymentDetails(
      paymentDetails.map((payment) =>
        payment.id === updatedPayment.id ? updatedPayment : payment
      )
    ); // Actualiza el estado con el pago editado
    setEditModalOpen(false);
  } catch (error) {
    console.error("Error al actualizar el pago:", error.message);
  }
};

const handleDeletePayment = async (index) => {
  const paymentToDelete = paymentDetails[index]; // Obtén el pago a eliminar

  if (!paymentToDelete || !paymentToDelete.id) {
    alert("No se puede eliminar el registro porque no tiene un ID válido.");
    return;
  }

  try {
    await deleteItem(paymentToDelete.id); // Llama a deleteItem
    setPaymentDetails(paymentDetails.filter((_, i) => i !== index)); // Elimina el pago del estado
    setDeleteModalOpen(false);
    alert("Registro eliminado correctamente.");
  } catch (error) {
    console.error("Error al eliminar el pago:", error.message);
    alert("Hubo un error al intentar eliminar el registro.");
  }
};

    const handleAddRecord = async () => {
      if (!newPayment.paymentDate || !newPayment.amountPaid || !newPayment.paymentMethod) {
        alert("Please fill in all payment fields.");
        return;
      }
    
      const newRecord = {
        payment_date: newPayment.paymentDate,
        amount_paid: newPayment.amountPaid,
        payment_method: newPayment.paymentMethod,
        id_sale: selectedRecord.id_sale, // Relaciona el pago con el registro seleccionado
      };
    
      try {
        const createdPayment = await createItem(newRecord); // Llama a createItem
        setPaymentDetails([...paymentDetails, createdPayment]); // Agrega el nuevo pago al estado
        setNewPayment({ paymentDate: "", amountPaid: "", paymentMethod: "" });
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error al agregar el pago:", error.message);
      }
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
              handleDeletePayment(index);
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