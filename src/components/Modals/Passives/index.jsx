import React from 'react';



export default class ModalPassives extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            modalIsHidden : false
        }

    }

    hidemodal = event => {
        event.preventDefault();
        document.getElementById('modal-overlay').style.display = "none"
        document.getElementById('modal-overlay').style.visibility = "hidden"
        document.getElementById('modal-overlay').style.opacity = 0;
    }


    render(){
        return (
        <>
        <div id="modal-overlay" className='modal-overlay'>
            <div id="myModal" className="modal">
                <h2 className="modal-headings">Characther's {this.props.modal_headings}{this.props.passive_length.length > 1 ? ' ' : <button type="button" onClick={this.props.onClick} className="modal-plus-btn">+</button>}</h2>
                <div className="modal-container">
                    {
                        this.props.passive_length.filter((f, i) => i === 0 || i === 1).map((p, idx) => (
                    <div className="modal-fields">
                        <label className="modal-labels">Passives { idx === 0 ? ' ' : <button onClick={this.props.handleRemovePassive(idx)} type="button" class="modal-decrease-button">-</button> }</label>
                        <input type="text" onChange={this.props.passive_change_handler(idx)} value={p.passive_a} className="modal-inputs" />
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