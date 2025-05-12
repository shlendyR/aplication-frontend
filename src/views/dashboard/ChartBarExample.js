import React, { useEffect, useRef, useState } from 'react'
import { getStyle } from '@coreui/utils'
import { CChart } from '@coreui/react-chartjs'
import useFetch from '../../hooks/useFetch'

export const ChartBarExample = ({ mode }) => {
  const chartRef = useRef(null)
  // Se obtiene el listado completo de ventas:
  const { data: rawSales } = useFetch('http://localhost:8000/sales')
  const [aggregatedData, setAggregatedData] = useState([])

  const labels =
    mode === 'week'
      ? ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
      : ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

  const aggregateSales = (sales, mode) => {
    if (!sales || !Array.isArray(sales)) return []
    if (mode === 'week') {
      const totals = Array(7).fill(0) // indexes 0: lunes, 6: domingo
      sales.forEach((sale) => {
        const date = new Date(sale.fecha)
        // getDay(): 0 = domingo, 1 = lunes, …, 6 = sábado.
        // Para alinear: si getDay() === 0 (domingo), lo asignamos al índice 6; de lo contrario, restamos 1.
        const day = date.getDay()
        const index = day === 0 ? 6 : day - 1
        totals[index] += sale.total
      })
      return totals
    } else {
      const totals = Array(12).fill(0) // índices 0 = enero ... 11 = diciembre
      sales.forEach((sale) => {
        const date = new Date(sale.fecha)
        const month = date.getMonth() // 0-based
        totals[month] += sale.total
      })
      return totals
    }
  }

  // Cada vez que rawSales o mode cambien, se agregan/agrupan los datos.
  useEffect(() => {
    if (rawSales) {
      const aggregated = aggregateSales(rawSales, mode)
      setAggregatedData(aggregated)
    }
  }, [rawSales, mode])

  // Construcción del objeto de datos para el gráfico.
  // Si no hay datos agregados se usan valores de ejemplo.
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: mode === 'week' ? 'Ventas diarias' : 'Ventas mensuales',
        backgroundColor: '#9966CC',
        borderColor: '#9966CC',
        data: aggregatedData.length
          ? aggregatedData
          : mode === 'week'
            ? [10, 20, 30, 40, 30, 20, 10]
            : [100, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220],
      },
    ],
  }

  const options = {
    plugins: {
      legend: {
        labels: {
          color: getStyle('--cui-body-color'),
        },
      },
    },
    scales: {
      x: {
        grid: { color: getStyle('--cui-border-color-translucent') },
        ticks: { color: getStyle('--cui-body-color') },
        type: 'category',
      },
      y: {
        grid: { color: getStyle('--cui-border-color-translucent') },
        ticks: { color: getStyle('--cui-body-color') },
        beginAtZero: true,
      },
    },
  }

  useEffect(() => {
    const handleColorSchemeChange = () => {
      const chartInstance = chartRef.current
      if (chartInstance) {
        const { options } = chartInstance
        if (options.plugins?.legend?.labels) {
          options.plugins.legend.labels.color = getStyle('--cui-body-color')
        }
        if (options.scales?.x) {
          if (options.scales.x.grid) {
            options.scales.x.grid.color = getStyle('--cui-border-color-translucent')
          }
          if (options.scales.x.ticks) {
            options.scales.x.ticks.color = getStyle('--cui-body-color')
          }
        }
        if (options.scales?.y) {
          if (options.scales.y.grid) {
            options.scales.y.grid.color = getStyle('--cui-border-color-translucent')
          }
          if (options.scales.y.ticks) {
            options.scales.y.ticks.color = getStyle('--cui-body-color')
          }
        }
        chartInstance.update()
      }
    }
    document.documentElement.addEventListener('ColorSchemeChange', handleColorSchemeChange)
    return () => {
      document.documentElement.removeEventListener('ColorSchemeChange', handleColorSchemeChange)
    }
  }, [])

  return <CChart type="bar" data={chartData} options={options} ref={chartRef} />
}
