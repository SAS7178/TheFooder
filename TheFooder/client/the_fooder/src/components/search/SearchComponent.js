import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export const SearchComponent = ({ recipeObject, getAllRecipes }) => {
    const [quickModal, setQuickModal] = useState(false);
    const quickToggle = () => setQuickModal(!quickModal);

    return (
        <div className="searchBarDrop">
            <div className='johns'>
                <strong>{recipeObject.name}</strong>
                <Button id="dropDown" color="danger" onClick={quickToggle}>
                    View Recipe
                </Button>
                <img alt="" src="https://www.pngall.com/wp-content/uploads/11/Horizontal-Line-PNG-Image.png" width="100%" height="35em"></img>
            </div>

            <Modal isOpen={quickModal} toggle={quickToggle} {...recipeObject}>
                <ModalHeader toggle={quickToggle}>Quick View</ModalHeader>
                <ModalBody>
                    <>
                        <section>{getAllRecipes}</section>
                        <section className='quickView'>
                            <strong>{recipeObject.name}</strong>
                            <br />
                            name:&nbsp;{recipeObject.name}&nbsp;&nbsp;
                        </section>
                    </>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={quickToggle}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}
