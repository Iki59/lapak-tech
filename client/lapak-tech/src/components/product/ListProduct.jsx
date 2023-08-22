import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from "react-redux"
import { getProducts, productSelectors, updateProduct, deleteProduct } from '../../features/productSlice'
import ModalAddProduct from '../modals/ModalAddProduct'
import ModalUpdateProduct from '../modals/ModalUpdateProduct'
import ModalDeleteProduct from '../modals/ModalDeleteProduct'
import {Container, Table, Image, Row, Col, Form, Button, Pagination} from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faTrash} from '@fortawesome/free-solid-svg-icons'

export default function ListProduct() {
    const dispatch = useDispatch()
    const products = useSelector(productSelectors.selectAll)

    
    const [showForm, setShowForm] = useState(false)
    const handleShowForm = () => setShowForm(true)
    const handleCloseForm = () => setShowForm(false)
    
    const [showUpdate, setShowUpdate] = useState(false)
    const [idUpdate, setIdUpdate] = useState(null)
    const handleShowUpdate = () => setShowUpdate(true)
    const handleCloseUpdate = () => setShowUpdate(false)
    const handleUpdate = (id) => {
        setIdUpdate(id)
        handleShowUpdate()
        console.log(id)
    }

    const [deleteConfirm, setDeleteConfirm] = useState(null)
    const [idDelete, setIdDelete] = useState(null)
    const [showDelete, setShowDelete] = useState(false)
    const handleShowDelete = () => setShowDelete(true)
    const handleCloseDelete = () => setShowDelete(false)
    const handleDelete = (id) => {
        setIdDelete(id)
        handleShowDelete()
    }

    // search
    const [searchProduct, setSearchProduct] = useState('');

    const filteredProducts = products.filter(product =>
          product.title.toLowerCase().includes(searchProduct.toLowerCase())
    );

    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 5

    const indexLastProduct = currentPage * productsPerPage
    const indexFirstProduct = indexLastProduct - productsPerPage
    const currentProducts = filteredProducts.slice(indexFirstProduct, indexLastProduct)

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
      }
    
    useEffect(()=>{
        dispatch(getProducts())
    }, [dispatch])

    useEffect(() => {
        if(updateProduct) {
            dispatch(getProducts())
        }
      },[updateProduct, dispatch])

    useEffect(() => {
        if (deleteConfirm) {
            handleCloseDelete()
            dispatch(deleteProduct(idDelete))
            setDeleteConfirm(null)
        }
    }, [deleteConfirm])

    return(
        <>
        <h4 className="text-center mt-5 mb-5">List of Products</h4>
        <Container>
            <Row className='mb-4'>
                <Col>
                    <div className='d-flex gap-2'>
                        <Form.Control className='w-50' type="text" placeholder='Search Product Here' onChange={(e) => setSearchProduct(e.target.value)}/>
                    </div>
                </Col>
                <Col>
                    <div className='d-flex justify-content-end'>
                        <Button onClick={handleShowForm} style={{background:"#04024B", border: "none", padding: "8px 20px"}}>Add Product</Button>
                    </div>
                </Col>
            </Row>
        <Table striped variant="datk">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Image</th>
                            <th>Tittle</th>
                            <th>Description</th>
                            <th>Selling</th>
                            <th>Purchasing</th>
                            <th>Stok</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentProducts.map((product, index) => (
                        <tr key={product.id}>
                            <td>{indexFirstProduct + index + 1}</td>
                            <td><Image style={{width: "70px", height: "70px"}} src={product.image} /></td>
                            <td>{product.title}</td>
                            <td>{product.description}</td>
                            <td>{product.selling}</td>
                            <td>{product.purchasing}</td>
                            <td>{product.quota}</td>
                            <td>
                                <div>
                                <FontAwesomeIcon icon={faPenToSquare} onClick={() => {handleUpdate(product.id)}} style={{color: "#04024b", width: "25px", height:"25px", marginRight: "12px"}}  />
                                <FontAwesomeIcon icon={faTrash} onClick={() => {handleDelete(product.id)}} style={{color: "#c01c28",width: "25px", height:"25px"}} />
                                </div>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </Table>
                    <Pagination className="justify-content-center">
                        {Array.from({ length: Math.ceil(products.length / productsPerPage) }).map((_, index) => (
                        <Pagination.Item
                            key={index}
                            active={index + 1 === currentPage}
                            onClick={() => handlePageChange(index + 1)}
                            >
                            {index + 1}
                         </Pagination.Item>
                    ))}
                    </Pagination>
        </Container>
                        <ModalAddProduct show={showForm} onHide={handleCloseForm} />
                        <ModalUpdateProduct productId={idUpdate} show={showUpdate} onHide={handleCloseUpdate} />
                        <ModalDeleteProduct setDeleteConfirm={setDeleteConfirm} show={showDelete} onHide={handleCloseDelete} />
        </>
    )
}