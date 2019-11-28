import React from 'react';



export default class ModalElements extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            modalIsHidden : false
        }

    }

    render(){

        const props = this.props
        console.log(props)
        return (
        <>
        <div id="modal-overlay elements" className='modal-overlay'>
            <div id="myModal" className="modal">
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
}