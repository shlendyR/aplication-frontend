const API_URL = "http://localhost:8000"; // Cambia esto según tu backend

// Obtener todos los registros
export const fetchItems = async () => {
  const response = await fetch("http://localhost:8000/sales");
  if (!response.ok) {
    throw new Error("Error al obtener los datos de ventas");
  }
  return response.json();
};

export const fetchUsers = async () => {
  const response = await fetch("http://localhost:8000/user");
  if (!response.ok) {
    throw new Error("Error al obtener los datos de usuarios");
  }
  return response.json();
};

export const fetchProduct = async () => {
  const response = await fetch("http://localhost:8000/sale_detail");
  if (!response.ok) {
    throw new Error("Error al obtener los detalles de las ventas");
  }
  return response.json();
};

export const fetchProducts = async () => {
  const response = await fetch("http://localhost:8000/product");
  if (!response.ok) {
    throw new Error("Error al obtener los productos");
  }
  return response.json();
};

export const fetchInvestments = async () => {
  const response = await fetch("http://localhost:8000/investment");
  if (!response.ok) {
    throw new Error("Error al obtener las inversiones");
  }
  return response.json();
};

export const fetchInvestmentDetails = async () => {
  const response = await fetch("http://localhost:8000/investment_detail");
  if (!response.ok) {
    throw new Error("Error al obtener los detalles de las inversiones");
  }
  return response.json();
};

export const fetchProviders = async () => {
  const response = await fetch("http://localhost:8000/provider");
  if (!response.ok) {
    throw new Error("Error al obtener los proveedores");
  }
  return response.json();
};

// Crear un nuevo registro
export const createItem = async (item) => {
  const response = await fetch("http://localhost:8000/sales", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  if (!response.ok) {
    throw new Error("Error al crear el registro");
  }
  return response.json(); // Devuelve el registro creado
};

// Actualizar un registro existente
export const updateItem = async (id, updatedItem) => {
  const response = await fetch(`${API_URL}/items/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedItem),
  });
  if (!response.ok) {
    throw new Error("Error al actualizar el registro");
  }
  return response.json();
};

// Eliminar un registro
export const deleteItem = async (id) => {
  const response = await fetch(`${API_URL}/items/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Error al eliminar el registro");
  }
  return response.json();
};