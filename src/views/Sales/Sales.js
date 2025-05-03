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

  const [saleDetails, setSaleDetails] = useState([]); 
  const [productsMap, setProductsMap] = useState({});
  const [accountsReceivableMap, setAccountsReceivableMap] = useState({});
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [users, setUsers] = useState({}); 
  const [newRecord, setNewRecord] = useState({ id_sale: "", id_user: "", total: "0", date: "", status: "", payment: "",});
  const [visible,setvisible]=useState(false)

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [recordToEdit, setRecordToEdit] = useState(null);
  const [editProducts, setEditProducts] = useState([]);


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
        // Fetch sales data
        const salesResponse = await fetch("http://localhost:3001/sales");
        if (!salesResponse.ok) {
          throw new Error(`HTTP error! status: ${salesResponse.status}`);
        }
        const salesData = await salesResponse.json();
        setItems(salesData);
        setFilteredItems(salesData);
  
        // Fetch sale details
        const saleDetailsResponse = await fetch("http://localhost:3001/sale_detail");
        if (!saleDetailsResponse.ok) {
          throw new Error(`HTTP error! status: ${saleDetailsResponse.status}`);
        }
        const saleDetailsData = await saleDetailsResponse.json();
        setSaleDetails(saleDetailsData);
  
        // Fetch products
        const productsResponse = await fetch("http://localhost:3001/product");
        if (!productsResponse.ok) {
          throw new Error(`HTTP error! status: ${productsResponse.status}`);
        }
        const productsData = await productsResponse.json();
  
        // Map id_product to description
        const productsMap = {};
        productsData.forEach((product) => {
          productsMap[product.id_product] = product.description;
        });
        setProductsMap(productsMap);
  
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
        setUsers(usersMap);
      } catch (error) {
        console.error("Error al cargar los datos:", error.message);
      }
    };
  
    fetchData();
  }, []);

  const handleDeleteRecord = (item) => {
    setRecordToDelete(item);
    setDeleteModalVisible(true);
  };
  
  const confirmDeleteRecord = () => {
    // Elimina el registro de items y saleDetails
    setItems(items.filter((item) => item.id_sale !== recordToDelete.id_sale));
    setFilteredItems(filteredItems.filter((item) => item.id_sale !== recordToDelete.id_sale));
    setSaleDetails(saleDetails.filter((detail) => detail.id_sale !== recordToDelete.id_sale));
    setDeleteModalVisible(false);
  };

  const handleEditRecord = (item) => {
    setRecordToEdit(item);
    setEditProducts(
      saleDetails.filter((detail) => detail.id_sale === item.id_sale).map((detail) => ({
        product: detail.id_product.toString(),
        amount: detail.amount,
        subtotal: detail.subtotal,
      }))
    );
    setEditModalVisible(true);
  };
  
  const handleEditSubmit = (event) => {
    event.preventDefault();
  
    // Actualiza el registro en items
    const updatedItems = items.map((item) =>
      item.id_sale === recordToEdit.id_sale ? { ...recordToEdit } : item
    );
    setItems(updatedItems);
    setFilteredItems(updatedItems);
  
    // Actualiza los detalles de la venta
    const updatedSaleDetails = saleDetails.filter(
      (detail) => detail.id_sale !== recordToEdit.id_sale
    );
    editProducts.forEach((product) => {
      updatedSaleDetails.push({
        id_sale: recordToEdit.id_sale,
        id_product: parseInt(product.product),
        amount: product.amount,
        subtotal: product.subtotal,
      });
    });
    setSaleDetails(updatedSaleDetails);
  
    setEditModalVisible(false);
  };


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
        users[item.id_user]?.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
      expirationDate: newRecord.status === "Pending" ? expirationDate : null,
      payment: newRecord.payment,
    };
  
    // Agregar los productos al estado saleDetails
    const newSaleDetails = products.map((product) => ({
      id_sale: newId,
      id_product: parseInt(product.product), // Asegúrate de que sea un número
      amount: product.amount,
      subtotal: product.subtotal,
    }));
  
    // Actualizar accountsReceivableMap si el estado es "Pending"
    if (newRecord.status === "Pending") {
      setAccountsReceivableMap((prevMap) => ({
        ...prevMap,
        [newId]: expirationDate, // Agrega la nueva expiration_date al mapeo
      }));
    }
  
    setSaleDetails([...saleDetails, ...newSaleDetails]); // Actualiza saleDetails con los nuevos productos
    setItems([newItem, ...items]); // Agrega el nuevo registro a items
    setFilteredItems([newItem, ...items]); // Actualiza filteredItems
  
    // Restablece el formulario
    setNewRecord({ id_sale: "", id_user: "", total: "", date: "", status: "", payment: "" });
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
              value={newRecord.id_user || ""}
              onChange={handleInputChange}
              
            />

            <input
            className="b_total"
              type="text"
              name="total"
              placeholder="Total"
              value={newRecord.total || ""}
              onChange={handleInputChange}
              
            />

            <input
            className="b_date"
              type="date"
              name="date"
              placeholder="Date"
              value={newRecord.date || ""}
              onChange={handleInputChange}
              
            />

            <input
            className="b_payment"
              type="text"
              name="payment"
              placeholder="Payment method"
              value={newRecord.payment || ""}
              onChange={handleInputChange}
            />

            <input
            className="b_status"
              type="text"
              name="status"
              placeholder="Status"
              value={newRecord.status || ""}
              onChange={handleInputChange}
            
            />

            {newRecord.status === "Pending" && (
              <input
                className="b_expiration"
                type="date"
                name="expirationDate"
                placeholder="Expiration Date"
                value={expirationDate || ""}
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

        {/* {selectedRecord.products && selectedRecord.products.length > 0 && ( */}
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
              {saleDetails
                      .filter((detail) => detail.id_sale === selectedRecord.id_sale)
                      .map((detail, index) => (
                        <CTableRow key={index}>
                          <CTableDataCell>{productsMap[detail.id_product] || "Unknown"}</CTableDataCell>
                          <CTableDataCell>{detail.amount}</CTableDataCell>
                          <CTableDataCell>{detail.subtotal}</CTableDataCell>
                        </CTableRow>
                      ))}

                {/* {selectedRecord && ( */}
                  <p className="P_M" style={{marginTop: "20px"}}><strong>Payment Method:</strong> {selectedRecord.payment || "N/A"}</p>
                {/* )} */}

                {selectedRecord.status === "Pending" && (
                    <CTableRow>
                      <CTableDataCell colSpan="3">
                        <div style={{ textAlign: "center" }}>
                          <p className="E_d" style={{ marginTop: "20px" }}>
                          <strong>Expiration Date:</strong> {accountsReceivableMap[selectedRecord.id_sale] || "N/A"}
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
         {/* )} */}
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
     
          <CModal visible={deleteModalVisible} onClose={() => setDeleteModalVisible(false)}>
        <CModalHeader>
          <h2>Confirm Delete</h2>
        </CModalHeader>
        <CModalBody>
          <p>Are you sure you want to delete this record?</p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setDeleteModalVisible(false)}
            style={{
              background: "rgba(46, 6, 99, 0.31)",
              border: "solid 1px #000000",
              borderRadius: "5px",
              padding: "5px 10px",
              cursor: "pointer",
            }}>
            Cancel
          </CButton>
          <CButton color="danger" onClick={confirmDeleteRecord}
          style={{
            background: "rgba(201, 4, 4, 0.42)",
            border: "solid 1px #000000",
            borderRadius: "5px",
            padding: "5px 10px",
            cursor: "pointer",
            color:"white",
          }}
          >
            Delete
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal  visible={editModalVisible} onClose={() => setEditModalVisible(false)}
       className="m_edit">
  <CModalHeader>
    <h2 className="t_edit">Edit Record</h2>
  </CModalHeader>
  <CModalBody className="m_edit">
    <form onSubmit={handleEditSubmit}>
      <p>Seller</p>
      <input
        type="text"
        name="id_user"
        placeholder="Seller"
        value={recordToEdit?.id_user || ""}
        onChange={(e) => setRecordToEdit({ ...recordToEdit, id_user: e.target.value })}
      />
      <p>Total</p>
      <input
        type="text"
        name="total"
        placeholder="Total"
        value={recordToEdit?.total || ""}
        onChange={(e) => setRecordToEdit({ ...recordToEdit, total: e.target.value })}
      />
      <p>Date</p>
      <input
        type="date"
        name="date"
        placeholder="Date"
        value={recordToEdit?.date || ""}
        onChange={(e) => setRecordToEdit({ ...recordToEdit, date: e.target.value })}
      />
      <p>Payment Method</p>
      <input
        type="text"
        name="payment"
        placeholder="Payment method"
        value={recordToEdit?.payment || ""}
        onChange={(e) => setRecordToEdit({ ...recordToEdit, payment: e.target.value })}
      />
      <p>Status</p>
      <input
        type="text"
        name="status"
        placeholder="Status"
        value={recordToEdit?.status || ""}
        onChange={(e) => setRecordToEdit({ ...recordToEdit, status: e.target.value })}
      />
      {recordToEdit?.status === "Pending" && (
        <input
          type="date"
          name="expirationDate"
          placeholder="Expiration Date"
          value={accountsReceivableMap[recordToEdit.id_sale] || ""}
          onChange={(e) =>
            setAccountsReceivableMap({
              ...accountsReceivableMap,
              [recordToEdit.id_sale]: e.target.value,
            })
          }
        />
      )}
      <h3 style={{margin:"20px"}}>Products</h3>
      {editProducts.map((product, index) => (
  <div key={index} className="p_edit"style={{ alignItems: "center", marginBottom: "10px", marginLeft:"20px" }}>
    <input
      type="text"
      name="product"
      placeholder="Product"
      value={product.product}
      onChange={(e) =>
        setEditProducts(
          editProducts.map((p, i) =>
            i === index ? { ...p, product: e.target.value } : p
          )
        )
      }
      style={{ marginRight: "10px" }}
    />
    <input
      type="number"
      name="amount"
      placeholder="Amount"
      value={product.amount}
      onChange={(e) =>
        setEditProducts(
          editProducts.map((p, i) =>
            i === index ? { ...p, amount: e.target.value } : p
          )
        )
      }
      style={{ marginRight: "10px" }}
    />
    <input
    className="subtotal"
      type="number"
      name="subtotal"
      placeholder="Subtotal"
      value={product.subtotal}
      onChange={(e) =>
        setEditProducts(
          editProducts.map((p, i) =>
            i === index ? { ...p, subtotal: e.target.value } : p
          )
        )
      }
      style={{ marginRight: "10px" }}
    />
    <button
      type="button"
      onClick={() =>
        setEditProducts(editProducts.filter((_, i) => i !== index)) // Elimina el producto del estado
      }
      style={{
        background: "rgba(201, 4, 4, 0.42)",
        border: "solid 1px #000000",
        borderRadius: "5px",
        padding: "5px 10px",
        cursor: "pointer",
      }}
    >
      Delete
    </button>
  </div>
))}
      <button
        type="button"
        onClick={() =>
          setEditProducts([...editProducts, { product: "", amount: "", subtotal: "" }])}
          style={{
            background: "rgba(46, 6, 99, 0.31)",
            border: "solid 1px #000000",
            borderRadius: "5px",
            padding: "5px 10px",
            cursor: "pointer",
          }}
      >
        Add Product
      </button>
      <CButton type="submit" 
      style={{
        background: "rgba(46, 6, 99, 0.31)",
        border: "solid 1px #000000",
        borderRadius: "5px",
        padding: "5px 10px",
        cursor: "pointer",
        marginLeft:"10px",
      }}
      >Save Changes</CButton>
    </form>
  </CModalBody>
</CModal>

      <CTable
        columns={columns}
        items={filteredItems.map((item) => ({
          ...item,
          id_user: users[item.id_user] || "Unknown", // Muestra el user_name correspondiente
          vm: (
            <>
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
        <button
          onClick={() => handleEditRecord(item)}
          style={{
            background: "rgba(6, 99, 46, 0.31)",
            marginRight: "10px",
            border: "solid 1px #000000",
            borderRadius: "5px",
          }}
        >
          Edit
        </button>
        <button
          onClick={() => handleDeleteRecord(item)}
          style={{
            background: "rgba(201, 4, 4, 0.42)",
            border: "solid 1px #000000",
            borderRadius: "5px",
          }}
        >
          Delete
        </button>
      </>
          ),
        }))}
      />
      
    </div>
    </>
  );
};

export default Sales;


