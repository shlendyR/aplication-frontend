import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton, CContainer, CRow, CCol, CModal, CModalHeader, CModalBody, CModalFooter, CFormInput } from "@coreui/react";
import "./pendient.scss";

const Pending = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const selectedRecord = location.state?.record || null; // Obtén los datos del registro seleccionado

    const [paymentDetails, setPaymentDetails] = useState([]); // Estado para la nueva tabla
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newPayment, setNewPayment] = useState({
      paymentDate: "",
      amountPaid: "",
      paymentMethod: "",
    }); // Estado para el nuevo registro
   
  
    if (!selectedRecord) {
      return <p>No record selected.</p>; // Maneja el caso en que no se pasen datos
    }

    const handleAddRecord = () => {
        setPaymentDetails([...paymentDetails, newPayment]); // Agrega el nuevo registro a la tabla
        setNewPayment({ paymentDate: "", amountPaid: "", paymentMethod: "" }); // Resetea el formulario
        setIsModalOpen(false); // Cierra el modal
      };

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPayment({ ...newPayment, [name]: value }); // Actualiza los valores del nuevo registro
      };

    
  
    return (
      <div>
        <h1 className="title_rd">Record Details</h1>
        <CContainer className="overflow-hidden">
        <CRow xs={{ gutter: 2 }}>
            <CCol xs={{ span: 6 }}>
            <div className="p-3"><p><strong>Seller:</strong> {selectedRecord.class}</p></div>
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
            <div className="p-3"><p><strong>Expiration Date:</strong> {selectedRecord.expirationDate}</p></div>
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
                <CTableDataCell>{detail.paymentDate}</CTableDataCell>
                <CTableDataCell>{detail.amountPaid}</CTableDataCell>
                <CTableDataCell>{detail.paymentMethod}</CTableDataCell>
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
        
      </div>

        <CButton className="b_ap" onClick={() => setIsModalOpen(true)}>Add Payment</CButton>
        <CButton className="b_gb" onClick={() => navigate(-1)}>Go Back</CButton>

      </div>
    );
  };
  
  export default Pending;