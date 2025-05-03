import React, { useState, useEffect } from "react";
import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
  CPagination,
  CPaginationItem,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButton,
  CFormInput,
} from "@coreui/react";
import "./investment.scss";

const Investment = () => {
  const columns = [
    { key: "id", label: "Product" },
    { key: "amount", label: "Amount" },
    { key: "subtotal", label: "Subtotal ($)" },
  ];

  const [investments, setInvestments] = useState([]); 
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [newInvestment, setNewInvestment] = useState({
    date: "",
    providerNumber: "",
    products: [],
  }); 
  const [newProduct, setNewProduct] = useState({ id: "", amount: "", subtotal: "" }); 

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [investmentToEdit, setInvestmentToEdit] = useState(null);
  const [editProducts, setEditProducts] = useState([]);

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
const [investmentToDelete, setInvestmentToDelete] = useState(null);


  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        // Fetch data from db.json
        const [investmentRes, investmentDetailRes, productRes, providerRes] = await Promise.all([
          fetch("http://localhost:3001/investment"),
          fetch("http://localhost:3001/investment_detail"),
          fetch("http://localhost:3001/product"),
          fetch("http://localhost:3001/provider"),
        ]);
  
        if (!investmentRes.ok || !investmentDetailRes.ok || !productRes.ok || !providerRes.ok) {
          throw new Error("Error al cargar los datos");
        }
  
        const [investmentData, investmentDetailData, productData, providerData] = await Promise.all([
          investmentRes.json(),
          investmentDetailRes.json(),
          productRes.json(),
          providerRes.json(),
        ]);
  
        // Combinar datos de investment, investment_detail, product y provider
        const combinedInvestments = investmentData.map((investment) => {
          const details = investmentDetailData
            .filter((detail) => detail.id_investment === investment.id_investment)
            .map((detail) => ({
              ...detail,
              description: productData.find((product) => product.id_product === detail.id_product)?.description || "Unknown Product",
            }));
  
          const provider = providerData.find((prov) => prov.id_provider === investment.id_provider);
  
          return {
            ...investment,
            products: details,
            providerName: provider ? provider.name : "Unknown Provider", // Asocia el nombre del proveedor
          };
        });
  
        setInvestments(combinedInvestments); // Actualiza el estado con los datos combinados
      } catch (error) {
        console.error("Error al cargar las inversiones:", error.message);
      }
    };
  
    fetchInvestments();
  }, []);

  const filteredInvestments = investments.filter(
    (investment) =>
      investment.date.includes(searchQuery) || // Busca por fecha
      investment.providerName.toLowerCase().includes(searchQuery.toLowerCase()) // Busca por nombre del proveedor
  );

  const handleEditInvestment = (investment) => {
    setInvestmentToEdit(investment);
    setEditProducts(investment.products);
    setEditModalVisible(true);
  };

  const handleDeleteInvestment = (id) => {
    setInvestmentToDelete(id); // Configura la inversión a eliminar
    setDeleteModalVisible(true); // Abre el modal de confirmación
  };

  const confirmDeleteInvestment = () => {
    handleDeleteInvestment(investmentToDelete);
    setDeleteModalVisible(false);
  };
 
  const handleAddProduct = () => {
    if (newProduct.id && newProduct.amount && newProduct.subtotal) {
      setNewInvestment({
        ...newInvestment,
        products: [
          ...newInvestment.products,
          {
            id: newProduct.id,
            amount: newProduct.amount,
            subtotal: newProduct.subtotal,
            description: newProduct.description || "New Product", // Agrega una descripción si no existe
          },
        ],
      });
      setNewProduct({ id: "", amount: "", subtotal: "" });
    } else {
      alert("Por favor, completa todos los campos del producto.");
    }
  };

  
  const handleAddInvestment = () => {
    if (newInvestment.date && newInvestment.products.length > 0) {
      // Busca el proveedor correspondiente
      const provider = investments.find((inv) => inv.providerNumber === newInvestment.providerNumber);
  
      // Asegúrate de que los productos tengan la estructura correcta
      const formattedProducts = newInvestment.products.map((product) => ({
        id_product: product.id,
        amount: product.amount,
        subtotal: product.subtotal,
        description: product.description || "New Product", // Agrega una descripción si no existe
      }));
  
      // Agrega el nuevo registro al inicio del estado
      setInvestments([
        {
          ...newInvestment,
          products: formattedProducts,
          providerName: provider ? provider.providerName : "Unknown Provider", // Asocia el nombre del proveedor
        },
        ...investments,
      ]);
  
      // Limpia el formulario
      setNewInvestment({ date: "", providerNumber: "", products: [] });
      setModalVisible(false);
    } else {
      alert("Por favor, ingresa una fecha y al menos un producto.");
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleDateChange = (e) => {
    setNewInvestment({ ...newInvestment, date: e.target.value });
  };

  const handleInvestmentChange = (e) => {
    const { name, value } = e.target;
    setNewInvestment({ ...newInvestment, [name]: value });
  };

  return (
    <>
      <h1 className="title_i">Investment History</h1>

      <button className="i_button" onClick={() => setModalVisible(true)}>
        Add Investment
      </button>

      <input
        className="search-bar2"
        type="text"
        placeholder="Search by Date or Provider Name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CModalHeader>
          <h5>Add Investment</h5>
        </CModalHeader>
        <CModalBody>
          <CFormInput
            type="date"
            name="date"
            placeholder="Investment Date"
            value={newInvestment.date}
            onChange={handleDateChange}
            className="mb-3"
          />
          <CFormInput
            type="text"
            name="providerNumber"
            placeholder="Provider Number"
            value={newInvestment.providerNumber}
            onChange={handleInvestmentChange}
            className="mb-3"
          />
          <h6>Add Product</h6>
          <CFormInput
            type="text"
            name="id"
            placeholder="Product"
            value={newProduct.id}
            onChange={handleInputChange}
            className="mb-3"
          />
          <CFormInput
            type="number"
            name="amount"
            placeholder="Amount"
            value={newProduct.amount}
            onChange={handleInputChange}
            className="mb-3"
          />
          <CFormInput
            type="number"
            name="subtotal"
            placeholder="Subtotal ($)"
            value={newProduct.subtotal}
            onChange={handleInputChange}
            className="mb-3"
          />
          <CButton style={{
              background: "rgba(46, 6, 99, 0.31)",
              border: "solid 1px #000000",
              borderRadius: "5px",
              padding: "5px 10px",
              cursor: "pointer",
            }}
             onClick={handleAddProduct}>
            Add Product
          </CButton>
          <ul>
            {newInvestment.products.map((product, index) => (
              <li key={index}>
                {product.id} - {product.amount} - ${product.subtotal}
              </li>
            ))}
          </ul>
        </CModalBody>
        <CModalFooter>
          <CButton style={{
              background: "rgba(46, 6, 99, 0.31)",
              border: "solid 1px #000000",
              borderRadius: "5px",
              padding: "5px 10px",
              cursor: "pointer",
            }}
             onClick={() => setModalVisible(false)}>
            Cancel
          </CButton>
          <CButton style={{
              background: "rgba(46, 6, 99, 0.31)",
              border: "solid 1px #000000",
              borderRadius: "5px",
              padding: "5px 10px",
              cursor: "pointer",
            }}
             onClick={handleAddInvestment}>
            Add Investment
          </CButton>
        </CModalFooter>
      </CModal>

            <CModal visible={editModalVisible} onClose={() => setEditModalVisible(false)}>
        <CModalHeader>
          <h5>Edit Investment</h5>
        </CModalHeader>
        <CModalBody>
          <CFormInput
            type="date"
            name="date"
            placeholder="Investment Date"
            value={investmentToEdit?.date || ""}
            onChange={(e) =>
              setInvestmentToEdit({ ...investmentToEdit, date: e.target.value })
            }
            className="mb-3"
          />
          <CFormInput
            type="text"
            name="providerNumber"
            placeholder="Provider Number"
            value={investmentToEdit?.providerNumber || ""}
            onChange={(e) =>
              setInvestmentToEdit({ ...investmentToEdit, providerNumber: e.target.value })
            }
            className="mb-3"
          />
          <h6>Edit Products</h6>
          {editProducts.map((product, index) => (
            <div key={index} style={{ display: "flex", marginBottom: "10px" }}>
              <CFormInput
                type="text"
                name="id"
                placeholder="Product"
                value={product.id_product}
                onChange={(e) =>
                  setEditProducts(
                    editProducts.map((p, i) =>
                      i === index ? { ...p, id_product: e.target.value } : p
                    )
                  )
                }
                className="me-2"
              />
              <CFormInput
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
                className="me-2"
              />
              <CFormInput
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
                className="me-2"
              />
              <CButton
                style={{
                  background: "rgba(201, 4, 4, 0.42)",
                  border: "solid 1px #000000",
                  borderRadius: "5px",
                  padding: "5px 10px",
                  cursor: "pointer",
                  color:"white",
                }}
                onClick={() =>
                  setEditProducts(editProducts.filter((_, i) => i !== index))
                }
              >
                Delete
              </CButton>
            </div>
          ))}
          <CButton
            style={{
              background: "rgba(46, 6, 99, 0.31)",
              border: "solid 1px #000000",
              borderRadius: "5px",
              padding: "5px 10px",
              cursor: "pointer",
            }}
            onClick={() =>
              setEditProducts([...editProducts, { id_product: "", amount: "", subtotal: "" }])
            }
          >
            Add Product
          </CButton>
        </CModalBody>
        <CModalFooter>
          <CButton style={{
              background: "rgba(46, 6, 99, 0.31)",
              border: "solid 1px #000000",
              borderRadius: "5px",
              padding: "5px 10px",
              cursor: "pointer",
            }}
             onClick={() => setEditModalVisible(false)}>
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
              const updatedInvestments = investments.map((inv) =>
                inv.id_investment === investmentToEdit.id_investment
                  ? { ...investmentToEdit, products: editProducts }
                  : inv
              );
              setInvestments(updatedInvestments);
              setEditModalVisible(false);
            }}
          >
            Save Changes
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal visible={deleteModalVisible} onClose={() => setDeleteModalVisible(false)}>
        <CModalHeader>
          <h5>Confirm Delete</h5>
        </CModalHeader>
        <CModalBody>
          Are you sure you want to delete this investment?
        </CModalBody>
        <CModalFooter>
          <CButton style={{
              background: "rgba(46, 6, 99, 0.31)",
              border: "solid 1px #000000",
              borderRadius: "5px",
              padding: "5px 10px",
              cursor: "pointer",
            }}
             onClick={() => setDeleteModalVisible(false)}>
            Cancel
          </CButton>
          <CButton style={{
            background: "rgba(201, 4, 4, 0.42)",
            border: "solid 1px #000000",
            borderRadius: "5px",
            padding: "5px 10px",
            cursor: "pointer",
            color:"white",
          }}
           onClick={confirmDeleteInvestment}>
            Delete
          </CButton>
        </CModalFooter>
      </CModal>

      <CAccordion>
        {filteredInvestments.map((investment, index) => (
          <CAccordionItem itemKey={index} key={index}>
            <CAccordionHeader>
            Investment: {investment.date} - 
              <button className="b_prov">Provider: {investment.providerName}  </button>
            </CAccordionHeader>
            <CAccordionBody>
              <CTable hover>
                <CTableHead>
                  <CTableRow>
                    {columns.map((column) => (
                      <CTableHeaderCell key={column.key}>{column.label}</CTableHeaderCell>
                    ))}
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {investment.products.map((product, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>{product.id_product}</CTableDataCell>
                      <CTableDataCell>{product.amount}</CTableDataCell>
                      <CTableDataCell>{product.subtotal}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
              <CButton style={{
              background: "rgba(46, 6, 99, 0.31)",
              border: "solid 1px #000000",
              borderRadius: "5px",
              padding: "5px 10px",
              cursor: "pointer",
            }}
             onClick={() => handleEditInvestment(investment)}>
          Edit
        </CButton>
        <CButton style={{
            background: "rgba(201, 4, 4, 0.42)",
            border: "solid 1px #000000",
            borderRadius: "5px",
            padding: "5px 10px",
            cursor: "pointer",
            color:"white",
            marginLeft:"10px"
          }}
           onClick={() => handleDeleteInvestment(investment.id_investment)}>
          Delete
        </CButton>
            </CAccordionBody>
          </CAccordionItem>
        ))}
      </CAccordion>

      {/* <CPagination aria-label="Page navigation example" style={{ marginTop: "20px", marginBottom: "20px" }}>
        <CPaginationItem>Previous</CPaginationItem>
        <CPaginationItem>1</CPaginationItem>
        <CPaginationItem>2</CPaginationItem>
        <CPaginationItem>3</CPaginationItem>
        <CPaginationItem>Next</CPaginationItem>
      </CPagination> */}
    </>
  );
};

export default Investment;