import React from 'react'
import { Button, Modal } from 'react-bootstrap'

export default function ModalDelete({show, onHide, setDeleteConfirm}) {
    const handleDelete = () => {
        setDeleteConfirm(true)
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Body className="text-dark">
                <div style={{ fontSize: '20px', fontWeight: '900' }}>
                    Delete Data
                </div>
                <div style={{ fontSize: '16px', fontWeight: '500' }} className="mt-2">
                    Are you sure you want to delete this data?
                </div>
                <div className="text-end mt-5">
                    <Button onClick={handleDelete} size="sm" className="btn-success me-2" style={{ width: '135px' }}>Yes</Button>
                    <Button onClick={onHide} size="sm" className="btn-danger" style={{ width: '135px' }}>No</Button>
                </div>
            </Modal.Body>
        </Modal>
    )
}