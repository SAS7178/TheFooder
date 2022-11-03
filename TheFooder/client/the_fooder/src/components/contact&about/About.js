import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./ContactAbout.css";

export const About = () => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    return (
        <div className="">
            <div className=''>
                <button className='abt-btn' onClick={toggle}>About us</button>
            </div>

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Learn About Us</ModalHeader>
                <ModalBody>
                    <>
                        <h1 className='contact'><b>TheFooder</b></h1><br></br>
                        <div className='contact-modal'>
                            <h2>Origin Story...</h2>
                            <div className='contact-address'>
                                Under Construction...


                            </div>
                        </div>
                    </>
                </ModalBody>
                <ModalFooter>

                </ModalFooter>
            </Modal>
        </div>
    );
}
