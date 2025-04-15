import React, { useState } from "react";
import { CModal, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell} from "@coreui/react";
import "./Sale.scss";
import {Modal} from "@coreui/coreui";
import { CModalHeader, CModalBody,CModalFooter,CButton} from '@coreui/react';

const Sales = () => {
  const columns = [
    { key: "id", label: "#" },
    { key: "class", label: "Seller" },
    { key: "total", label: "Total" },
    { key: "date", label: "Date" },
    { key: "status", label: "Status" },
    { key: "vm", label: "View More" },
  ];

  const initialItems = [
        { id: 10, class: "David", total: "500,00", date: "2025-04-06", status: "Paid"},
        { id: 9, class: "Olivia", total: "320,00", date: "2025-04-05", status: "Paid"},
        { id: 8, class: "Chris", total: "120,00", date: "2025-04-04", status: "Paid"},
        { id: 7, class: "Emma", total: "200,00", date: "2025-04-04", status: "Paid"},
        { id: 6, class: "Michael", total: "450,00", date: "2025-04-04", status: "Pending"},
        { id: 5, class: "Sarah", total: "300,00", date: "2025-04-03", status: "Paid"},
        { id: 4, class: "Joe", total: "100,00", date: "2025-04-03", status: "Paid"},
        { id: 3, class: "Allison", total: "250,00", date: "2025-04-02", status: "Paid"},
        { id: 2, class: "Frank", total: "50,00", date: "2025-04-02", status: "Paid"},
        { id: 1, class: "Matt", total: "140,00", date: "2025-04-02", status: "Paid"},
      ];

      const columns2 = [
        { key: "id", label: "Product" },
        { key: "amount", label: "Amount" },
        { key: "subtotal", label: "Subtotal ($)" },
      ];

      const i_colums2 = [
        { id: 1, amount: "10", subtotal: "50" },
        { id: 5, amount: "10", subtotal: "320" },
        { id: 6, amount: "20", subtotal: "130" },
      ];

  const [items, setItems] = useState(initialItems);
  const [filteredItems, setFilteredItems] = useState(initialItems);
  const [newRecord, setNewRecord] = useState({ id: "", class: "", total: "", date: "", status: "" });
  const [visible,setvisible]=useState(false)

  const [viewMoreVisible, setViewMoreVisible] = useState(false); 

  const [searchSeller, setSearchSeller] = useState("");
  const [searchTotal, setSearchTotal] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchStatus, setSearchStatus] = useState("");

  const [selectedRecord, setSelectedRecord] = useState(null);


  const handleSearch = () => {
    if (!searchSeller && !searchTotal && !searchDate && !searchStatus) {
      setFilteredItems(items);
      return;
    }
  
    const filtered = items.filter((item) => {
      return (
        (searchSeller === "" || item.class.toLowerCase().includes(searchSeller.toLowerCase())) &&
        (searchTotal === "" || item.total.toLowerCase().includes(searchTotal.toLowerCase())) &&
        (searchDate === "" || item.date.toLowerCase().includes(searchDate.toLowerCase())) &&
        (searchStatus === "" || item.status.toLowerCase().includes(searchStatus.toLowerCase()))
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

      const newId = items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1;
      const newItem = { ...newRecord, id: newId };
    
    setItems([newItem, ...items]);
    setFilteredItems([newItem, ...items]);
  
  setNewRecord({ id: "", class: "", total: "", date: "", status: "" });
  setvisible(false);
  };


  const handleAddRecord = () => {
    setNewRecord({ id: "", class: "", total: "", date: "", status: "" });
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
            <h2 className="title2">Add New Record</h2>
        </CModalHeader>
        <CModalBody>

            <form onSubmit={handleSubmit}>
            <input
              className="b_seller"
              type="text"
              name="class"
              placeholder="Seller"
              value={newRecord.class}
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
            className="b_status"
              type="text"
              name="status"
              placeholder="Status"
              value={newRecord.status}
              onChange={handleInputChange}
            
            />

              <CButton  className="b_close" onClick={() => setvisible(false)}> Close </ CButton > 

              <button className="b_save" type="submit">Add</button>
          </form>


        </CModalBody>​​
      </CModal>

     <CModal visible={viewMoreVisible} onClose={() => setViewMoreVisible(false)}>
        <CModalHeader>
          <h2 className="title2">Record Details</h2>
        </CModalHeader>
              <CModalBody>

              <CTable hover>
            <CTableHead>
              <CTableRow>
                {columns2.map((column) => (
                  <CTableHeaderCell key={column.key}>{column.label}</CTableHeaderCell>
                ))}
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {i_colums2.map((item) => (
                <CTableRow key={item.id}>
                  <CTableDataCell>{item.id}</CTableDataCell>
                  <CTableDataCell>{item.amount}</CTableDataCell>
                  <CTableDataCell>{item.subtotal}</CTableDataCell>
                </CTableRow>
              ))}
              {selectedRecord && (
                <div>
                 {selectedRecord.status === "Pending" && (
                  <p><strong>Expiration Date:</strong> 2025-05-20</p>
                )}
              </div>
              )}
            </CTableBody>
          </CTable>

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
          placeholder="Search Seller..."
          value={searchSeller}
          onChange={(e) => {
            setSearchSeller(e.target.value);
            handleSearch();
          }}
        />
        <input
          className="search-bar"
          type="text"
          placeholder="Search Total..."
          value={searchTotal}
          onChange={(e) => {
            setSearchTotal(e.target.value);
            handleSearch();
          }}
        />
        <input
          className="search-bar"
          type="text"
          placeholder="Search Date..."
          value={searchDate}
          onChange={(e) => {
            setSearchDate(e.target.value);
            handleSearch();
          }}
        />
        <input
          className="search-bar"
          type="text"
          placeholder="Search Status..."
          value={searchStatus}
          onChange={(e) => {
            setSearchStatus(e.target.value);
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