import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./ContactAbout.css";

export const Contact = () => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    return (
        <div className="">
            <div className=''>
                <button className='cont-btn' onClick={toggle}>Contact</button>
            </div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Contact Information</ModalHeader>
                <ModalBody id='contactModal'>
                    <>
                        <div className='contact-modal'>
                        <h1 className='contact'><b>TheFooder</b></h1><br></br>
                            <h2>Corporate Headquarters</h2>
                            <div className='contact-address'>
                                The Fooder<br></br>
                                137 Bay Street<br></br>
                                Port St.Joe, Fl 30458
                            </div>
                            <div className='contact-gen'>
                            <h2>General Contact</h2><br></br>
                            Toll-Free: 888-888-8888<br></br>
                            Phone: 706-562-4634<br></br>
                            Email: contact@theFooder.com
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
