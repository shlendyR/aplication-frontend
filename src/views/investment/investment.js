import React, { useState } from "react";
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
} from "@coreui/react";
import "./investment.scss";




const Investment = () => {

  const columns = [
    { key: "id", label: "Product" },
    { key: "amount", label: "Amount" },
    { key: "subtotal", label: "Subtotal ($)" },
  ];

  const items = [
    { id: 1, amount: "10", subtotal: "50" },
    { id: 5, amount: "10", subtotal: "40" },
    { id: 6, amount: "20", subtotal: "120" },
  ];

  const items2 = [
    { id: 3, amount: "50", subtotal: "50" },
    { id: 7, amount: "80", subtotal: "300" },
    { id: 4, amount: "20", subtotal: "230" },
  ];

  const items3 = [
    { id: 5, amount: "25", subtotal: "50" },
    { id: 2, amount: "70", subtotal: "210" },
    { id: 1, amount: "110", subtotal: "330" },
  ];

  const items4 = [
    { id: 7, amount: "18", subtotal: "160" },
    { id: 6, amount: "10", subtotal: "40" },
    { id: 2, amount: "40", subtotal: "120" },
  ];

  const items5 = [
    { id: 4, amount: "20", subtotal: "60" },
    { id: 1, amount: "60", subtotal: "60" },
    { id: 3, amount: "24", subtotal: "240" },
  ];

  const items6 = [
    { id: 8, amount: "10", subtotal: "50" },
    { id: 5, amount: "10", subtotal: "40" },
    { id: 2, amount: "20", subtotal: "120" },
  ];

  const items7 = [
    { id: 3, amount: "10", subtotal: "50" },
    { id: 7, amount: "10", subtotal: "40" },
    { id: 4, amount: "20", subtotal: "120" },
  ];

  const items8 = [
    { id: 1, amount: "10", subtotal: "50" },
    { id: 5, amount: "10", subtotal: "40" },
    { id: 2, amount: "20", subtotal: "120" },
  ];

  const items9 = [
    { id: 6, amount: "10", subtotal: "50" },
    { id: 4, amount: "10", subtotal: "40" },
    { id: 8, amount: "20", subtotal: "120" },
  ];

  const items10 = [
    { id: 2, amount: "10", subtotal: "50" },
    { id: 4, amount: "10", subtotal: "40" },
    { id: 5, amount: "20", subtotal: "120" },
  ];

  return (
    <>

  <h1 className="title_i">Investment History</h1>

  <button className="i_button">
        Add Investment
      </button>

      <input
        className="search-bar"
        type="text"
        placeholder="Search..."
      />

  <CAccordion>
      <CAccordionItem itemKey={10}>
        <CAccordionHeader className="accordion">
          Inverstment: 2025-04-11
          <button className="b_prov">Provider</button>
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
              {items.map((item) => (
                  <CTableRow key={item.id}>
                    <CTableDataCell>{item.id}</CTableDataCell>
                    <CTableDataCell>{item.amount}</CTableDataCell>
                    <CTableDataCell>{item.subtotal}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CAccordionBody>
        </CAccordionItem>

       
      <CAccordionItem itemKey={9}>
        <CAccordionHeader>
          Inverstment: 2025-04-11
          <button className="b_prov">Provider</button>
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
              {items2.map((items2) => (
                  <CTableRow key={items2.id}>
                    <CTableDataCell>{items2.id}</CTableDataCell>
                    <CTableDataCell>{items2.amount}</CTableDataCell>
                    <CTableDataCell>{items2.subtotal}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CAccordionBody>
        </CAccordionItem>

      
      <CAccordionItem itemKey={8}>
        <CAccordionHeader>
          Inverstment: 2025-04-10
          <button className="b_prov">Provider</button>
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
              {items3.map((items3) => (
                  <CTableRow key={items3.id}>
                    <CTableDataCell>{items3.id}</CTableDataCell>
                    <CTableDataCell>{items3.amount}</CTableDataCell>
                    <CTableDataCell>{items3.subtotal}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CAccordionBody>
        </CAccordionItem>

       
      <CAccordionItem itemKey={7}>
        <CAccordionHeader>
          Inverstment: 2025-04-10
          <button className="b_prov">Provider</button>
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
              {items4.map((items4) => (
                  <CTableRow key={items4.id}>
                    <CTableDataCell>{items4.id}</CTableDataCell>
                    <CTableDataCell>{items4.amount}</CTableDataCell>
                    <CTableDataCell>{items4.subtotal}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CAccordionBody>
        </CAccordionItem>

      
      <CAccordionItem itemKey={6}>
        <CAccordionHeader>
          Inverstment: 2025-04-10
          <button className="b_prov">Provider</button>
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
              {items5.map((items5) => (
                  <CTableRow key={items5.id}>
                    <CTableDataCell>{items5.id}</CTableDataCell>
                    <CTableDataCell>{items5.amount}</CTableDataCell>
                    <CTableDataCell>{items5.subtotal}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CAccordionBody>
        </CAccordionItem>

      
      <CAccordionItem itemKey={5}>
        <CAccordionHeader>
          Inverstment: 2025-04-08
          <button className="b_prov">Provider</button>
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
              {items6.map((items6) => (
                  <CTableRow key={items6.id}>
                    <CTableDataCell>{items6.id}</CTableDataCell>
                    <CTableDataCell>{items6.amount}</CTableDataCell>
                    <CTableDataCell>{items6.subtotal}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CAccordionBody>
        </CAccordionItem>

      
      <CAccordionItem itemKey={4}>
        <CAccordionHeader>
          Inverstment: 2025-04-07
          <button className="b_prov">Provider</button>
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
              {items7.map((items7) => (
                  <CTableRow key={items7.id}>
                    <CTableDataCell>{items7.id}</CTableDataCell>
                    <CTableDataCell>{items7.amount}</CTableDataCell>
                    <CTableDataCell>{items7.subtotal}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CAccordionBody>
        </CAccordionItem>

        
      <CAccordionItem itemKey={3}>
        <CAccordionHeader>
          Inverstment: 2025-04-07
          <button className="b_prov">Provider</button>
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
              {items8.map((items8) => (
                  <CTableRow key={items8.id}>
                  <CTableDataCell>{items8.id}</CTableDataCell>
                    <CTableDataCell>{items8.amount}</CTableDataCell>
                    <CTableDataCell>{items8.subtotal}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CAccordionBody>
        </CAccordionItem>

       
      <CAccordionItem itemKey={2}>
        <CAccordionHeader>
          Inverstment: 2025-04-07
          <button className="b_prov">Provider</button>
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
              {items9.map((items9) => (
                  <CTableRow key={items9.id}>
                    <CTableDataCell>{items9.id}</CTableDataCell>
                    <CTableDataCell>{items9.amount}</CTableDataCell>
                    <CTableDataCell>{items9.subtotal}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CAccordionBody>
        </CAccordionItem>

        
      <CAccordionItem itemKey={1}>
        <CAccordionHeader>
          Inverstment: 2025-04-06
          <button className="b_prov">Provider</button>
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
              {items10.map((items10) => (
                  <CTableRow key={items10.id}>
                  <CTableDataCell>{items10.id}</CTableDataCell>
                    <CTableDataCell>{items10.amount}</CTableDataCell>
                    <CTableDataCell>{items10.subtotal}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CAccordionBody>
        </CAccordionItem>
  </CAccordion>
                
  <CPagination aria-label="Page navigation example" style={{marginTop:"20px",marginBottom:"20px"}}>
      <CPaginationItem>Previous</CPaginationItem>
      <CPaginationItem>1</CPaginationItem>
      <CPaginationItem>2</CPaginationItem>
      <CPaginationItem>3</CPaginationItem>
      <CPaginationItem>Next</CPaginationItem>
    </CPagination>
    </>

     
  );
  };
  
  export default Investment; 