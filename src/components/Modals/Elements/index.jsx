import React from 'react';


const ModalElements = props => {


        return (
        <>
        <div id="modal-overlay-elements" className='modal-overlay'>
            <div id="myModal-elements" className="modal">
                <h2 className="modal-headings">Characther's {props.modal_headings}{props.elements_length.length > 1 ? ' ' : <button type="button" onClick={props.onClick} className="modal-plus-btn">+</button>}</h2>
                <div className="modal-container">
                    {
                        props.elements_length.filter((f, i) => i === 0 || i === 1).map((p, idx) => (
                    <div className="modal-fields">
                        <label className="modal-labels">Elements { idx === 0 ? ' ' : <button onClick={props.remove(idx)} type="button" className="modal-decrease-button">-</button> }</label>
                        <input type="text" onChange={props.handleChange(idx)} value={p.element_name} className="modal-inputs" />
                    </div>
                        ))
                    }
                        
                </div>
            </div>
        </div>
        </>
        )
    }

export default ModalElements;

export const EditModalElements = props => {
    console.log(props);
    console.log(props.elements.length);
    return (
        <>
        <div id="modal-overlay-elements" className='modal-overlay'>
            <div id="myModal-elements" className="modal">
                <h2 className="modal-headings">Characther's {props.modal_headingz}{props.elements.length > 1 ? ' ' : <button type="button" onClick={props.add_more_element} className="modal-plus-btn">+</button>}</h2>
                <div className="modal-container">
                    {
                        props.elements.filter((f, i) => i === 0 || i === 1).map((p, idx) => (
                    <div key={idx} className="modal-fields">
                        <label className="modal-labels">Elements { idx === 0 ? ' ' : <button onClick={props.remove_element(idx)} type="button" className="modal-decrease-button">-</button> }</label>
                        <input type="text" onChange={props.element_handle_change(idx)} value={p.element_name} className="modal-inputs" />
                    </div>
                        ))
                    }
                        
                </div>
            </div>
        </div>
        </>
        )
}