import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createProduct } from '../../features/productSlice'
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

  const dispatch = useDispatch()
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === 'file' ? e.target.files : e.target.value,
    });
  };


  const saveProduct = async (e) => {
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
    await dispatch(createProduct({formData, config}))
  }
  return (
    <>
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Body>
        <Container fluid>
          <h3 className="text-center mt-5">Add Product</h3>
          <Form onSubmit={saveProduct}>
            <Form.Group className='mb-2'>
              <Form.Label>Title</Form.Label>
              <Form.Control type='text' name='title' onChange={handleChange} />
            </Form.Group>
            <Form.Group className='mb-2'>
              <Form.Label>Selling</Form.Label>
              <Form.Control type='number' name='selling' onChange={handleChange} />
            </Form.Group>
            <Form.Group className='mb-2'>
              <Form.Label>Purchasing</Form.Label>
              <Form.Control type='number' name='purchasing' onChange={handleChange} />
            </Form.Group>
            <Form.Group className='mb-2'>
              <Form.Label>Stok</Form.Label>
              <Form.Control type='number' name='quota' onChange={handleChange} />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Description</Form.Label>
              <Form.Control as='textarea' type='text' name='description' onChange={handleChange} />
            </Form.Group>
            <InputGroup className="mb-4">
                <Form.Control type="file" id="upload" name='image' onChange={handleChange}></Form.Control>
            </InputGroup>
            <div className='mb-3'>
              <Button onClick={props.onHide} type='submit'>Add Product</Button>
            </div>
          </Form>
        </Container>
      </Modal.Body>
    </Modal>
    </>
  )
}
