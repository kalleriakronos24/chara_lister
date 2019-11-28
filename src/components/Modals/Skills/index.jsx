import React from 'react';



export default class ModalSkills extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            modalIsHidden : false
        }

    }

    render(){
        const props = this.props

        return (
        <>
        <div id="modal-overlay skills" className='modal-overlay'>
            <div id="myModal" className="modal">
                <h2 className="modal-headings">Characther's {props.modal_headings}{props.skills_length.length > 1 ? ' ' : <button type="button" onClick={this.props.onClick} className="modal-plus-btn">+</button>}</h2>
                <div className="modal-container">
                    {
                        props.skills_length.filter((f, i) => i === 0 || i === 1).map((p, idx) => (
                    <div className="modal-fields">
                        <label className="modal-labels">Skill { idx === 0 ? ' ' : <button onClick={props.handleRemoveSkills(idx)} type="button" class="modal-decrease-button">-</button> }</label>
                        <input type="text" onChange={props.skill_change_handler(idx)} value={p.skill_name} className="modal-inputs" />
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