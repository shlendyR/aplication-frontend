import React, { useState, useEffect  } from "react";
import { CAccordion,CAccordionBody,CAccordionHeader,CAccordionItem,CTable,CTableBody,CTableHead,CTableHeaderCell,CTableRow,CTableDataCell,CPagination,CPaginationItem,CModal,CModalHeader,CModalBody,CModalFooter,CButton,CFormInput } from "@coreui/react";
import "./providers.scss";
import { fetchItems, createItem, updateItem, deleteItem, fetchProviders } from "../../services/api";


const Providers = () => {
    const [providers, setProviders] = useState([]); 
    const [modalVisible, setModalVisible] = useState(false); 
    const [newProvider, setNewProvider] = useState({ name: "", phone: "" }); 
    const [searchQuery, setSearchQuery] = useState(""); 

    const [editModalVisible, setEditModalVisible] = useState(false);
    const [providerToEdit, setProviderToEdit] = useState(null);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [providerToDelete, setProviderToDelete] = useState(null);


    useEffect(() => {
      const loadProviders = async () => {
        try {
          const providersData = await fetchProviders(); // Llama a fetchProviders
          setProviders(providersData); // Guarda los datos en el estado
        } catch (error) {
          console.error("Error al cargar los proveedores:", error.message);
        }
      };
    
      loadProviders();
    }, []);

    const filteredProviders = providers.filter(
      (provider) =>
        provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        provider.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        provider.id_provider.toString().includes(searchQuery)
    );
    
    const handleEditProvider = async () => {
      if (!providerToEdit) {
        alert("No hay proveedor seleccionado para editar.");
        return;
      }
    
      try {
        const updatedProvider = await updateItem(providerToEdit.id_provider, providerToEdit); // Llama a updateItem
        setProviders(
          providers.map((provider) =>
            provider.id_provider === updatedProvider.id_provider ? updatedProvider : provider
          )
        ); // Actualiza el estado con el proveedor editado
        setEditModalVisible(false);
      } catch (error) {
        console.error("Error al actualizar el proveedor:", error.message);
      }
    };

    const handleDeleteProvider = (id) => {
      setProviderToDelete(id); 
      setDeleteModalVisible(true); 
    };

    const confirmDeleteProvider = async () => {
      if (!providerToDelete) {
        alert("No hay proveedor seleccionado para eliminar.");
        return;
      }
    
      try {
        await deleteItem(providerToDelete); // Llama a deleteItem
        setProviders(providers.filter((provider) => provider.id_provider !== providerToDelete)); // Elimina el proveedor del estado
        setDeleteModalVisible(false);
        alert("Proveedor eliminado correctamente.");
      } catch (error) {
        console.error("Error al eliminar el proveedor:", error.message);
      }
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewProvider({ ...newProvider, [name]: value });
    };
  
    
    const handleAddProvider = async () => {
      if (!newProvider.name || !newProvider.phone) {
        alert("Por favor, completa todos los campos.");
        return;
      }
    
      const newProviderData = {
        name: newProvider.name,
        phone: newProvider.phone,
      };
    
      try {
        const createdProvider = await createItem(newProviderData); // Llama a createItem
        setProviders([...providers, createdProvider]); // Agrega el nuevo proveedor al estado
        setNewProvider({ name: "", phone: "" });
        setModalVisible(false);
      } catch (error) {
        console.error("Error al agregar el proveedor:", error.message);
      }
    };
  
  
    return (
      <>
        <h1 className="title_p">Providers List</h1>
  
        <button className="b_ap" onClick={() => setModalVisible(true)}>
          Add Provider
        </button>

        <input
          className="search-bar"
          type="text"
          placeholder="Search by ID, Name, or Phone..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
  
        <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
          <CModalHeader>
            <h5>Add Provider</h5>
          </CModalHeader>
          <CModalBody>
            <CFormInput
              type="text"
              name="name"
              placeholder="Provider Name"
              value={newProvider.name}
              onChange={handleInputChange}
              className="mb-3"
            />
            <CFormInput
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={newProvider.phone}
              onChange={handleInputChange}
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
             onClick={handleAddProvider}>
              Add
            </CButton>
          </CModalFooter>
        </CModal>

        <CModal visible={editModalVisible} onClose={() => setEditModalVisible(false)}>
          <CModalHeader>
            <h5>Edit Provider</h5>
          </CModalHeader>
          <CModalBody>
            <CFormInput
              type="text"
              name="name"
              placeholder="Provider Name"
              value={providerToEdit?.name || ""}
              onChange={(e) =>
                setProviderToEdit({ ...providerToEdit, name: e.target.value })
              }
              className="mb-3"
            />
            <CFormInput
              type="text"
              name="number"
              placeholder="Phone Number"
              value={providerToEdit?.number || ""}
              onChange={(e) =>
                setProviderToEdit({ ...providerToEdit, number: e.target.value })
              }
              className="mb-3"
            />
          </CModalBody>
          <CModalFooter>
            <CButton 
            style={{
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
                const updatedProviders = providers.map((provider) =>
                  provider.id_provider === providerToEdit.id_provider
                    ? providerToEdit
                    : provider
                );
                setProviders(updatedProviders);
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
            Are you sure you want to delete this provider?
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
           onClick={confirmDeleteProvider}>
              Delete
            </CButton>
          </CModalFooter>
        </CModal>
  
        <CAccordion>
          {filteredProviders.map((provider) => (
            <CAccordionItem itemKey={provider.id} key={provider.id}>
              <CAccordionHeader>
                Provider: {provider.id_provider}
              </CAccordionHeader>
              <CAccordionBody>
                <CTable hover>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>ID</CTableHeaderCell>
                      <CTableHeaderCell>Name</CTableHeaderCell>
                      <CTableHeaderCell>Phone</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    <CTableRow>
                      <CTableDataCell>{provider.id_provider}</CTableDataCell>
                      <CTableDataCell>{provider.name}</CTableDataCell>
                      <CTableDataCell>{provider.number}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          style={{
                            background: "rgba(46, 6, 99, 0.31)",
                            border: "solid 1px #000000",
                            borderRadius: "5px",
                            padding: "5px 10px",
                            cursor: "pointer",
                          }}
                          onClick={() => handleEditProvider(provider)}
                          className="me-2"
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
                          onClick={() => handleDeleteProvider(provider.id_provider)}
                        >
                          Delete
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  </CTableBody>
                </CTable>
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
  
  export default Providers;

