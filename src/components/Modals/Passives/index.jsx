import React from 'react';



const ModalPassives = props => {

        return (
        <>
        <div id="modal-overlay" className='modal-overlay'>
            <div id="myModal" className="modal">
                <h2 className="modal-headings">Characther's {props.modal_headings}{props.passive_length.length > 1 ? ' ' : <button type="button" onClick={props.onClick} className="modal-plus-btn">+</button>}</h2>
                <div className="modal-container">
                    {
                        props.passive_length.filter((f, i) => i === 0 || i === 1).map((p, idx) => (
                    <div className="modal-fields">
                        <label className="modal-labels">Passives { idx === 0 ? ' ' : <button onClick={props.handleRemovePassive(idx)} type="button" class="modal-decrease-button">-</button> }</label>
                        <input type="text" onChange={props.passive_change_handler(idx)} value={p.passive_a} className="modal-inputs" />
                    </div>
                        ))
                    }
                        
                </div>
            </div>
        </div>
        </>
        )
}
export default ModalPassives;

export const EditModalPassives = props => {
    console.log(props);
    return (
        <>
        <div id="modal-overlay" className='modal-overlay'>
            <div id="myModal" className="modal">
                <h2 className="modal-headings">Characther's {props.modal_headingz}{props.passives.length > 1 ? ' ' : <button type="button" onClick={props.add_more_passive} className="modal-plus-btn">+</button>}</h2>
                <div className="modal-container">
                    {
                        props.passives.filter((f, i) => i === 0 || i === 1).map((p, idx) => (
                    <div key={idx} className="modal-fields">
                        <label className="modal-labels">Passives { idx === 0 ? ' ' : <button onClick={props.remove_passive(idx)} type="button" className="modal-decrease-button">-</button> }</label>
                        <input type="text" onChange={props.passive_handle_change(idx)} value={p.passive_name} className="modal-inputs" />
                    </div>
                        ))
                    }
                        
                </div>
            </div>
        </div>
        </>
        )
}