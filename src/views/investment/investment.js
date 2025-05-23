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
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButton,
  CFormInput,
} from "@coreui/react";
import useFetch from "../../hooks/useFetch"; // Importa el hook personalizado
import "./investment.scss";

const Investment = () => {
  const columns = [
    { key: "id", label: "Product" },
    { key: "amount", label: "Amount" },
    { key: "subtotal", label: "Subtotal ($)" },
  ];

  // Usa useFetch para obtener los datos
  const { data: investmentData, loading: loadingInvestments } = useFetch("http://localhost:8000/investment");
  const { data: investmentDetailData, loading: loadingDetails } = useFetch("http://localhost:8000/investment_detail");
  const { data: productData, loading: loadingProducts } = useFetch("http://localhost:8000/product");
  const { data: providerData, loading: loadingProviders } = useFetch("http://localhost:8000/provider");

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

  // Combina los datos una vez que se cargan
  useEffect(() => {
    if (investmentData && investmentDetailData && productData && providerData) {
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
          providerName: provider ? provider.name : "Unknown Provider",
        };
      });

      setInvestments(combinedInvestments);
    }
  }, [investmentData, investmentDetailData, productData, providerData]);

  // Filtra las inversiones según la búsqueda
  const filteredInvestments = investments.filter(
    (investment) =>
      investment.date.includes(searchQuery) ||
      investment.providerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditInvestment = (investment) => {
    setInvestmentToEdit(investment);
    setEditProducts(investment.products);
    setEditModalVisible(true);
  };

  const handleDeleteInvestment = (id) => {
    setInvestmentToDelete(id);
    setDeleteModalVisible(true);
  };

  const confirmDeleteInvestment = () => {
    setInvestments(investments.filter((inv) => inv.id_investment !== investmentToDelete));
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
            description: newProduct.description || "New Product",
          },
        ],
      });
      setNewProduct({ id: "", amount: "", subtotal: "" });
    } else {
      alert("Please complete all product fields.");
    }
  };

  const handleAddInvestment = () => {
    if (newInvestment.date && newInvestment.products.length > 0) {
      const provider = providerData.find((prov) => prov.id_provider === newInvestment.providerNumber);

      setInvestments([
        {
          ...newInvestment,
          providerName: provider ? provider.name : "Unknown Provider",
        },
        ...investments,
      ]);

      setNewInvestment({ date: "", providerNumber: "", products: [] });
      setModalVisible(false);
    } else {
      alert("Please enter a date and at least one product.");
    }
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

      {loadingInvestments || loadingDetails || loadingProducts || loadingProviders ? (
        <p>Loading...</p>
      ) : (
        <CAccordion>
          {filteredInvestments.map((investment, index) => (
            <CAccordionItem itemKey={index} key={index}>
              <CAccordionHeader>
                Investment: {investment.date} - Provider: {investment.providerName}
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
                <CButton onClick={() => handleEditInvestment(investment)}>Edit</CButton>
                <CButton onClick={() => handleDeleteInvestment(investment.id_investment)}>Delete</CButton>
              </CAccordionBody>
            </CAccordionItem>
          ))}
        </CAccordion>
      )}

      {/* Modales */}
      <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CModalHeader>Add Investment</CModalHeader>
        <CModalBody>
          {/* Formulario para agregar inversión */}
        </CModalBody>
        <CModalFooter>
          <CButton onClick={() => setModalVisible(false)}>Cancel</CButton>
          <CButton onClick={handleAddInvestment}>Add Investment</CButton>
        </CModalFooter>
      </CModal>

      <CModal visible={editModalVisible} onClose={() => setEditModalVisible(false)}>
        <CModalHeader>Edit Investment</CModalHeader>
        <CModalBody>
          {/* Formulario para editar inversión */}
        </CModalBody>
        <CModalFooter>
          <CButton onClick={() => setEditModalVisible(false)}>Cancel</CButton>
          <CButton>Save Changes</CButton>
        </CModalFooter>
      </CModal>

      <CModal visible={deleteModalVisible} onClose={() => setDeleteModalVisible(false)}>
        <CModalHeader>Confirm Delete</CModalHeader>
        <CModalBody>Are you sure you want to delete this investment?</CModalBody>
        <CModalFooter>
          <CButton onClick={() => setDeleteModalVisible(false)}>Cancel</CButton>
          <CButton onClick={confirmDeleteInvestment}>Delete</CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default Investment;