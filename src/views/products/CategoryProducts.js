import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CCard, CCardBody, CCardHeader, CCardTitle, CRow, CCol, CCardImage } from '@coreui/react'

const CategoryProducts = () => {
  const { id, name_category } = useParams() // Obtiene el ID de la categoría desde la URL
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8000/product') // Ruta relativa al archivo db.json
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        // Filtra los productos que pertenecen a la categoría seleccionada
        const filteredProducts = Array.isArray(data)
          ? data.filter((product) => String(product.id_category) === String(id))
          : data.product.filter((product) => String(product.id_category) === String(id))
        setProducts(filteredProducts)
      } catch (error) {
        console.error('Error al cargar los productos:', error)
      }
    }

    fetchProducts()
  }, [id]) // Dependencias para volver a ejecutar el efecto si cambian

  return (
    <div>
      <h1 className="mb-4">Categoria: {name_category}</h1>
      <CRow>
        {products.length > 0 ? (
          products.map((product) => (
            <CCol sm="6" md="4" lg="3" key={product.id_product} className="mb-4">
              <CCard>
                <CCardImage
                  orientation="top"
                  src="https://via.placeholder.com/150" // Puedes agregar imágenes reales aquí
                  alt={product.description}
                />
                <CCardHeader>{product.description}</CCardHeader>
                <CCardBody>
                  <CCardTitle>Precio: ${product.price_sale.toFixed(2)}</CCardTitle>
                  <p>Stock: {product.stock}</p>
                </CCardBody>
              </CCard>
            </CCol>
          ))
        ) : (
          <p>No hay productos en esta categoría.</p>
        )}
      </CRow>
    </div>
  )
}

export default CategoryProducts
