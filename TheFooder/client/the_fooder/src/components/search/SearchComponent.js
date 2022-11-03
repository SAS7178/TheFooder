import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Recipe from '../recipe/Recipe';
import "./Search.css";

export const SearchComponent = ({ recipeObject, getAllRecipes }) => {
    const [quickModal, setQuickModal] = useState(false);
    const quickToggle = () => setQuickModal(!quickModal);
    const bool = false;
    return (
        <div className="searchBarDrop">
            <div className='johns'>
                <img alt="" src="https://www.pngall.com/wp-content/uploads/11/Horizontal-Line-PNG-Image.png" width="100%" height="35em"></img>
                <strong>{recipeObject.name}</strong>
                <Button id="dropDown" color="danger" onClick={quickToggle}>
                    View Recipe
                </Button>
            </div>
            <img alt="" src="https://www.pngall.com/wp-content/uploads/11/Horizontal-Line-PNG-Image.png" width="100%" height="35em"></img>

            <Modal isOpen={quickModal} toggle={quickToggle} {...recipeObject}>
                <ModalHeader className='quickView' toggle={quickToggle}>Quick View</ModalHeader>
                <ModalBody id='modal-content'>
                    <>
                        <section>{getAllRecipes}</section>
                        <section className='quickSearchView'>
                            <Recipe recipe={recipeObject} key={recipeObject.id} isSavedRecipe={bool} />
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
