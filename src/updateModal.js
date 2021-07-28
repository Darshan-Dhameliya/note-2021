import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import { Formik, Form } from 'formik';
import { Button } from "@material-ui/core"


export default function UpdateModal({ upadteNote, opeUpdatemodal, setopeUpdatemodal, noteData }) {
    return (
        <>
            <Formik
                enableReinitialize
                initialValues={noteData}
                onSubmit={upadteNote}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    touched,
                    handleBlur
                }) => (
                    <Form Form >
                        <Modal isOpen={opeUpdatemodal} toggle={() => setopeUpdatemodal(false)}>
                            <ModalBody>
                                Title
                                <input
                                    type="text"
                                    name="title"
                                    value={values.title}
                                    className="form-control  shadow-none"
                                    onChange={handleChange}
                                    onClick={handleBlur}
                                />
                                <span className="mt-2">Note : </span>
                                <textarea className="w-100 form-control shadow-none notes-textarea" rows="12"
                                    value={values.desc}
                                    name="desc"
                                    onChange={handleChange}
                                    onClick={handleBlur}
                                ></textarea>
                            </ModalBody>
                            <ModalFooter>
                                {touched.desc || touched.title ? <Button color="primary" type="submit" variant="outlined" className="mr-2" onClick={handleSubmit} >Update</Button>
                                    : <Button color="secondary" type="button" variant="outlined" onClick={() => setopeUpdatemodal(false)}>Close</Button>
                                }</ModalFooter>
                        </Modal>
                    </Form>
                )}
            </Formik>
        </>


    )
}
