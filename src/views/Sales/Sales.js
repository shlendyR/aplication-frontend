import React, { useState, useEffect } from "react";
import { CModal, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell} from "@coreui/react";
import "./Sale.scss";
import { CModalHeader, CModalBody,CModalFooter,CButton} from '@coreui/react';
import { useNavigate } from 'react-router-dom'


const Sales = () => {
  const navigate = useNavigate();

  const columns = [
    { key: "id_sale", label: "#" },
    { key: "id_user", label: "Seller" },
    { key: "total", label: "Total" },
    { key: "date", label: "Date" },
    { key: "status", label: "Status" },
    { key: "vm", label: "View More" },
  ];

  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [newRecord, setNewRecord] = useState({ id_sale: "", id_user: "", total: "", date: "", status: "", payment: "",});
  const [visible,setvisible]=useState(false)

  const [viewMoreVisible, setViewMoreVisible] = useState(false); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const [expirationDate, setExpirationDate] = useState("");
  const [selectedRecord, setSelectedRecord] = useState(null);

  const [products, setProducts] = useState([]); 
  const [productModalVisible, setProductModalVisible] = useState(false);
  const [newProduct, setNewProduct] = useState({ product: "", amount: "", subtotal: "" }); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/sales"); // Cambia la URL según tu configuración
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setItems(data);
        setFilteredItems(data);
      } catch (error) {
        console.error("Error al cargar los datos:", error.message);
      }
    };

    fetchData();
  }, []);


  const handleNavigateToPending = () => {
    navigate("/pending", { state: { record: selectedRecord } });
  };


  const handleSearch = () => {
    if (!searchQuery) {
      setFilteredItems(items); 
      return;
    }
  
    const filtered = items.filter((item) => {
      return (
        item.class.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.total.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.status.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    setFilteredItems(filtered);
  };

  
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewRecord({ ...newRecord, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newId = items.length > 0 ? Math.max(...items.map((item) => item.id_sale)) + 1 : 1;
    const newItem = {
      ...newRecord,
      id_sale: newId,
      expirationDate: newRecord.status === "Pending" ? expirationDate : null, products,
      payment: newRecord.payment,
    };
    
    setItems([newItem, ...items]);
    setFilteredItems([newItem, ...items]);
  
  setNewRecord({ id_sale: "", id_user: "", total: "", date: "", status: "", payment: ""});
  setExpirationDate("");
  setProducts([]);
  setvisible(false);
  };

  const handleAddRecord = () => {
    setNewRecord({ id_sale: "", id_user: "", total: "", date: "", status: "" });
    setvisible(true); 
  };

  const handleViewMore = (item) => {
    setSelectedRecord(item); 
    setViewMoreVisible(true); 
  };


  return (

    <>

    <div>
      <h1 className="title">Sales History</h1>
     
      <button onClick={handleAddRecord} className="m_button">
        Add Record
      </button>
  
      <CModal visible={visible} onClose={()=>setvisible(false)}>
        <CModalHeader>
            <h2 className="title2_anr">Add New Record</h2>
        </CModalHeader>
        <CModalBody>

            <form onSubmit={handleSubmit}>
            <input
              className="b_seller"
              type="text"
              name="id_user"
              placeholder="Seller"
              value={newRecord.id_user}
              onChange={handleInputChange}
              
            />

            <input
            className="b_total"
              type="text"
              name="total"
              placeholder="Total"
              value={newRecord.total}
              onChange={handleInputChange}
              
            />

            <input
            className="b_date"
              type="date"
              name="date"
              placeholder="Date"
              value={newRecord.date}
              onChange={handleInputChange}
              
            />

            <input
            className="b_payment"
              type="text"
              name="payment"
              placeholder="Payment method"
              value={newRecord.payment}
              onChange={handleInputChange}
            />

            <input
            className="b_status"
              type="text"
              name="status"
              placeholder="Status"
              value={newRecord.status}
              onChange={handleInputChange}
            
            />

            {newRecord.status === "Pending" && (
              <input
                className="b_expiration"
                type="date"
                name="expirationDate"
                placeholder="Expiration Date"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
              />
            )}

            <button
              className="b_add_product"
              type="button"
              onClick={() => setProductModalVisible(true)}
            >
              Add Product
            </button>

              <CButton  className="b_close" onClick={() => setvisible(false)}> Close </ CButton > 

              <button className="b_save" type="submit">Add</button>
          </form>

        </CModalBody>
      </CModal>


          <CModal visible={productModalVisible} onClose={() => setProductModalVisible(false)}>
      <CModalHeader>
        <h2 className="title2_p">Add Product</h2>
      </CModalHeader>
      <CModalBody>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setProducts([...products, newProduct]); 
            setNewProduct({ product: "", amount: "", subtotal: "" }); 
            setProductModalVisible(false); 
          }}
        >
          <input
            className="b_product"
            type="text"
            name="product"
            placeholder="Product"
            value={newProduct.product}
            onChange={(e) => setNewProduct({ ...newProduct, product: e.target.value })}
          />
          <input
            className="b_amount"
            type="number"
            name="amount"
            placeholder="Amount"
            value={newProduct.amount}
            onChange={(e) => setNewProduct({ ...newProduct, amount: e.target.value })}
          />
          <input
            className="b_subtotal"
            type="number"
            name="subtotal"
            placeholder="Subtotal"
            value={newProduct.subtotal}
            onChange={(e) => setNewProduct({ ...newProduct, subtotal: e.target.value })}
          />
          <CButton type="submit" className="b_save_product">
            Save Product
          </CButton>
        </form>
      </CModalBody>
    </CModal>


     <CModal visible={viewMoreVisible} onClose={() => setViewMoreVisible(false)}>
        <CModalHeader>
          <h2 className="title2_rd">Record Details</h2>
        </CModalHeader>
        <CModalBody>
    {selectedRecord && (
      <div>

        {selectedRecord.products && selectedRecord.products.length > 0 && (
          <div>
            <h3>Products</h3>
            <CTable hover>
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

                {selectedRecord && (
                  <p className="P_M" style={{marginTop: "20px"}}><strong>Payment Method:</strong> {selectedRecord.payment}</p>
                )}

                {selectedRecord.status === "Pending" && (
                    <CTableRow>
                      <CTableDataCell colSpan="3">
                        <div style={{ textAlign: "center" }}>
                          <p className="E_d" style={{ marginTop: "20px" }}>
                            <strong>Expiration Date:</strong> {selectedRecord.expirationDate}
                          </p>
                          <CButton onClick={handleNavigateToPending} className="b_payment2">
                            Payment
                          </CButton>
                        </div>
                      </CTableDataCell>
                    </CTableRow>
                  )}
              </CTableBody>
            </CTable>
          </div>
        )}
      </div>
    )}
  </CModalBody>
        <CModalFooter>
          <CButton className="b_close2" onClick={() => setViewMoreVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
    </CModal>

        <input
          className="search-bar"
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            handleSearch();
          }}
        />
     

      <CTable
        columns={columns}
        items={filteredItems.map((item) => ({
          ...item,
          vm: (
            <button
              onClick={() => handleViewMore(item)}
              style={{
                background: item.status === "Pending" ? "rgba(201, 4, 4, 0.42)" : "rgba(46, 6, 99, 0.31)", 
                marginRight: "10px",
                border: "solid 1px #000000",
                borderRadius: "5px",
              }}
            >
              View More
            </button>
          ),
        }))}
      />
      
    </div>
    </>
  );
};

export default Sales;


