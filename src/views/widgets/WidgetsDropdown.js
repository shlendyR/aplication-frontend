import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { CRow, CCol, CWidgetStatsA } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilWallet, cilCart, cilNotes } from '@coreui/icons'
import useFetch from '../../hooks/useFetch'

const WidgetsDropdown = ({ className }) => {
  const { data: salesData } = useFetch('http://localhost:8000/sales')
  const { data: expensesData } = useFetch('http://localhost:8000/expenses')

  const [totalSales, setTotalSales] = useState(0)
  const [totalExpenses, setTotalExpenses] = useState(0)
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    if (salesData && Array.isArray(salesData)) {
      const total = salesData.reduce((sum, sale) => sum + sale.total, 0)
      setTotalSales(total)
    }
  }, [salesData])

  useEffect(() => {
    if (expensesData && Array.isArray(expensesData)) {
      const total = expensesData.reduce((sum, expense) => sum + expense.amount, 0)
      setTotalExpenses(total)
    }
  }, [expensesData])

  useEffect(() => {
    setBalance(totalSales - totalExpenses)
  }, [totalSales, totalExpenses])

  return (
    <CRow className={className}>
      <CCol xs={12} md={4}>
        <CWidgetStatsA
          color="secondary"
          value={
            <>
              <CIcon icon={cilWallet} className="me-2" />
              <span style={{ color: '#7CFC00', fontWeight: 'bold' }}>${balance.toFixed(2)}</span>
            </>
          }
          title="Balance"
        />
      </CCol>
      <CCol xs={12} md={4}>
        <CWidgetStatsA
          color="secondary"
          value={
            <>
              <CIcon icon={cilCart} className="me-2" />
              <span style={{ color: '#7CFC00', fontWeight: 'bold' }}>
                ${totalSales.toFixed(2)}
              </span>{' '}
            </>
          }
          title="Ventas totales"
        />
      </CCol>
      <CCol xs={12} md={4}>
        <CWidgetStatsA
          color="secondary"
          value={
            <>
              <CIcon icon={cilNotes} className="me-2" />
              <span style={{ color: ' #FF6347', fontWeight: 'bold' }}>
                ${totalExpenses.toFixed(2)}
              </span>{' '}
            </>
          }
          title="Gastos totales"
        />
      </CCol>
    </CRow>
  )
}

WidgetsDropdown.propTypes = {
  className: PropTypes.string,
}

export default WidgetsDropdown
