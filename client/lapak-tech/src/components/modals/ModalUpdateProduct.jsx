import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts, productSelectors, updateProduct } from '../../features/productSlice'
import { useParams, useNavigate } from 'react-router-dom'
import {Modal, Container, InputGroup, Form, Button} from 'react-bootstrap'

export default function ModalAddProduct(props) {
  const [form, setForm] = useState({
    title: "",
    quota: "",
    selling: "",
    purchasing: "",
    description: "",
    image: "",
  })

  const id = props.productId


  const dispatch = useDispatch()
  const product = useSelector((state) => productSelectors.selectById(state, id))
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === 'file' ? e.target.files : e.target.value,
    });
  };


  const handleUpdate = async (e) => {
    e.preventDefault()
    const config = {
                headers: {
                  'Content-type': 'multipart/form-data',
                },
              };
    const formData = new FormData()
    formData.set("title", form.title)
    formData.set("quota", form.quota)
    formData.set("selling", form.selling)
    formData.set("purchasing", form.purchasing)
    formData.set("description", form.description)
    formData.set("image", form.image[0], form.image[0].name)
    await dispatch(updateProduct({formData, config, id}))
  }

  useEffect(() => {
    dispatch(getProducts())
  },[dispatch])

  useEffect(() => {
    if(product) {
        setForm({
            title: product.title || '',
            quota: product.quota || '',
            selling: product.selling || '',
            purchasing: product.purchasing || '',
            description: product.description || '',
            image: product.image || '',
        })
    }
  },[product])

  return (
    <>
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Body>
        <Container fluid>
          <h3 className="text-center mt-5">Update Product</h3>
          <Form onSubmit={handleUpdate}>
            <Form.Group className='mb-2'>
              <Form.Label>Title</Form.Label>
              <Form.Control type='text' value={form.title} name='title' onChange={handleChange} />
            </Form.Group>
            <Form.Group className='mb-2'>
              <Form.Label>Selling</Form.Label>
              <Form.Control type='number' name='selling' value={form.selling} onChange={handleChange} />
            </Form.Group>
            <Form.Group className='mb-2'>
              <Form.Label>Purchasing</Form.Label>
              <Form.Control type='number' name='purchasing' value={form.purchasing} onChange={handleChange} />
            </Form.Group>
            <Form.Group className='mb-2'>
              <Form.Label>Stok</Form.Label>
              <Form.Control type='number' name='quota' value={form.quota} onChange={handleChange} />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Description</Form.Label>
              <Form.Control as='textarea' type='text' name='description' value={form.description} onChange={handleChange} />
            </Form.Group>
            <InputGroup className="mb-4">
                <Form.Control type="file" id="upload" name='image'  onChange={handleChange}></Form.Control>
            </InputGroup>
            <div className='mb-3'>
              <Button type='submit'>Update Product</Button>
            </div>
          </Form>
        </Container>
      </Modal.Body>
    </Modal>
    </>
  )
}