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
import { fetchItems, createItem, updateItem, deleteItem, fetchInvestmentDetails, fetchProducts, fetchProviders } from "../../services/api";

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
  const loadInvestments = async () => {
    try {
      const [investmentData, investmentDetailData, productData, providerData] = await Promise.all([
        fetchItems(), // Obtiene las inversiones
        fetchInvestmentDetails(), // Obtiene los detalles de las inversiones
        fetchProducts(), // Obtiene los productos
        fetchProviders(), // Obtiene los proveedores
      ]);

      console.log("Investment Details:", investmentDetailData); // Verifica los datos de investment_detail
      console.log("Investments:", investmentData); // Verifica los datos de investment
      console.log("Products:", productData); // Verifica los datos de productos
      console.log("Providers:", providerData); // Verifica los datos de proveedores

      // Combina los datos
      const combinedInvestments = investmentData.map((investment) => {
        const details = investmentDetailData
          .filter((detail) => detail.id_investment === investment.id_investment) // Filtra los detalles por id_investment
          .map((detail) => ({
            ...detail,
            description: productData.find((product) => product.id_product === detail.id_product)?.description || "Unknown Product",
          }));

        const provider = providerData.find((prov) => prov.id_provider === investment.id_provider);

        return {
          ...investment,
          products: details,
          providerName: provider ? provider.name : "Unknown Provider",
        };
      });

      console.log("Combined Investments:", combinedInvestments); // Verifica los datos combinados
      setInvestments(combinedInvestments); // Guarda las inversiones combinadas en el estado
    } catch (error) {
      console.error("Error al cargar las inversiones:", error.message);
    }
  };

  loadInvestments();
}, []);

  const filteredInvestments = investments.filter(
    (investment) =>
      investment.date.includes(searchQuery) || 
      investment.providerName.toLowerCase().includes(searchQuery.toLowerCase()) 
  );

  const handleEditInvestment = async () => {
    if (!investmentToEdit) {
      alert("No hay inversión seleccionada para editar.");
      return;
    }
  
    const updatedInvestmentData = {
      ...investmentToEdit,
      products: editProducts.map((product) => ({
        id_product: product.id_product,
        amount: product.amount,
        subtotal: product.subtotal,
      })),
    };
  
    try {
      const updatedInvestment = await updateItem(investmentToEdit.id_investment, updatedInvestmentData); // Llama a updateItem
      setInvestments(
        investments.map((investment) =>
          investment.id_investment === updatedInvestment.id_investment
            ? updatedInvestment
            : investment
        )
      ); // Actualiza el estado con la inversión editada
      setEditModalVisible(false);
    } catch (error) {
      console.error("Error al actualizar la inversión:", error.message);
    }
  };

  const handleDeleteInvestment = (id) => {
    setInvestmentToDelete(id); 
    setDeleteModalVisible(true); 
  };

  const confirmDeleteInvestment = async () => {
    if (!investmentToDelete) {
      alert("No hay inversión seleccionada para eliminar.");
      return;
    }
  
    try {
      await deleteItem(investmentToDelete); // Llama a deleteItem
      setInvestments(investments.filter((investment) => investment.id_investment !== investmentToDelete)); // Elimina la inversión del estado
      setDeleteModalVisible(false);
      alert("Inversión eliminada correctamente.");
    } catch (error) {
      console.error("Error al eliminar la inversión:", error.message);
    }
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
            description: newProduct.description || "New Product", 
          },
        ],
      });
      setNewProduct({ id: "", amount: "", subtotal: "" });
    } else {
      alert("Por favor, completa todos los campos del producto.");
    }
  };

  
  const handleAddInvestment = async () => {
    if (!newInvestment.date || newInvestment.products.length === 0) {
      alert("Por favor, ingresa una fecha y al menos un producto.");
      return;
    }
  
    const newInvestmentData = {
      date: newInvestment.date,
      providerNumber: newInvestment.providerNumber,
      products: newInvestment.products.map((product) => ({
        id_product: product.id,
        amount: product.amount,
        subtotal: product.subtotal,
      })),
    };
  
    try {
      const createdInvestment = await createItem(newInvestmentData); // Llama a createItem
      setInvestments([createdInvestment, ...investments]); // Agrega la nueva inversión al estado
      setNewInvestment({ date: "", providerNumber: "", products: [] });
      setModalVisible(false);
    } catch (error) {
      console.error("Error al agregar la inversión:", error.message);
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
                {investment.products && investment.products.length > 0 ? (
              investment.products.map((product, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>{product.id_product}</CTableDataCell>
                      <CTableDataCell>{product.amount}</CTableDataCell>
                      <CTableDataCell>{product.subtotal}</CTableDataCell>
                    </CTableRow>
                  )) ) : ( 
                    <CTableRow>
                    <CTableDataCell colSpan={3}>No products available</CTableDataCell>
                  </CTableRow>
                  )}
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