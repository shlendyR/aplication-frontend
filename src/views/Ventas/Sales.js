import React, { useState } from "react";
import { CTable } from "@coreui/react";
import "./Sale.css";

const Sales = () => {
  const columns = [
    { key: "id", label: "#" },
    { key: "class", label: "Seller" },
    { key: "total", label: "Total" },
    { key: "date", label: "Date" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions" },
  ];

  const initialItems = [
        { id: 10, class: "David", total: "500,00", date: "2025-04-06", status: "Paid", viewMore: "View more" },
        { id: 9, class: "Olivia", total: "320,00", date: "2025-04-05", status: "Paid", viewMore: "View more" },
        { id: 8, class: "Chris", total: "120,00", date: "2025-04-04", status: "Paid", viewMore: "View more" },
        { id: 7, class: "Emma", total: "200,00", date: "2025-04-04", status: "Paid", viewMore: "View more" },
        { id: 6, class: "Michael", total: "450,00", date: "2025-04-04", status: "Pending", viewMore: "View more" },
        { id: 5, class: "Sarah", total: "300,00", date: "2025-04-03", status: "Paid", viewMore: "View more" },
        { id: 4, class: "Joe", total: "100,00", date: "2025-04-03", status: "Paid", viewMore: "View more" },
        { id: 3, class: "Allison", total: "250,00", date: "2025-04-02", status: "Paid", viewMore: "View more" },
        { id: 2, class: "Frank", total: "50,00", date: "2025-04-02", status: "Paid", viewMore: "View more" },
        { id: 1, class: "Matt", total: "140,00", date: "2025-04-02", status: "Paid", viewMore: "View more" },
      ];

  const [items, setItems] = useState(initialItems);
  const [filteredItems, setFilteredItems] = useState(initialItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [newRecord, setNewRecord] = useState({ id: "", class: "", total: "", date: "", status: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);


  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = items.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(value)
      )
    );
    setFilteredItems(filtered);
  };

  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewRecord({ ...newRecord, [name]: value });
  };


const handleSubmit = (event) => {
    event.preventDefault();
  
    if (isEditing) {
      const updatedItems = items.map((item) =>
        item.id === editId ? { ...item, ...newRecord } : item
      );
      setItems(updatedItems);
      setFilteredItems(updatedItems);
      setIsEditing(false);
      setEditId(null);
    } else {
    const newId = items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1;
    const newItem = { ...newRecord, id: newId };

    
    setItems([newItem, ...items]);
    setFilteredItems([newItem, ...items]);
  }
  
    setNewRecord({ id: "", class: "", total: "", date: "", status: "" });
  };

  const handleDelete = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    setFilteredItems(updatedItems);
  };


  const handleEdit = (id) => {
    const recordToEdit = items.find((item) => item.id === id);
    setNewRecord(recordToEdit);
    setIsEditing(true);
    setEditId(id);
  };

  return (
    <div>
      <h1 className="title">Sales History</h1>
      <input
        className="search-bar"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <CTable
        columns={columns}
        items={filteredItems.map((item) => ({
          ...item,
          actions: (
            <>
              <button onClick={() => handleEdit(item.id)} style={{ marginRight: "10px" }}>
                Edit
              </button>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </>
          ),
        }))}
      />
      <h2>{isEditing ? "Edit Record" : "Add New Record"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="class"
          placeholder="Seller"
          value={newRecord.class}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="total"
          placeholder="Total"
          value={newRecord.total}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="date"
          placeholder="Date"
          value={newRecord.date}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="status"
          placeholder="Status"
          value={newRecord.status}
          onChange={handleInputChange}
        />
        <button type="submit">{isEditing ? "Update" : "Add"}</button>
      </form>
    </div>
  );
};

export default Sales;