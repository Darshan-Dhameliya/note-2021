import React from 'react'
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import { Formik, Form } from 'formik';
import { Button } from "@material-ui/core"


export default function AddModal({ addNote, openModal, setopenModal }) {
    return (
        <>
            <Formik
                initialValues={{ title: '', desc: '' }}
                onSubmit={addNote}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,

                }) => (
                    <Form>
                        <Modal isOpen={openModal} toggle={() => setopenModal(false)} >
                            <ModalBody>
                                Title
                                <input
                                    type="text"
                                    name="title"
                                    value={values.title}
                                    className="form-control shadow-none"
                                    onChange={handleChange}
                                />
                                <span className="mt-2">   Note : </span>
                                <textarea className="w-100 form-control shadow-none notes-textarea" rows="12"
                                    value={values.desc}
                                    name="desc"
                                    onChange={handleChange}
                                ></textarea>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" type="submit" variant="outlined" className="mr-2" onClick={handleSubmit} >Add</Button>
                            </ModalFooter>
                        </Modal>
                    </Form>
                )}
            </Formik>
        </>
    )
}
