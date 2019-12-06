import React from 'react';



const ModalSkills = props => {

        return (
        <>
        <div id="modal-overlay-skills" className='modal-overlay'>
            <div id="myModal-skills" className="modal">
                <h2 className="modal-headings">Characther's {props.modal_headings}{props.skills_length.length > 1 ? ' ' : <button type="button" onClick={this.props.onClick} className="modal-plus-btn">+</button>}</h2>
                <div className="modal-container">
                    {
                        props.skills_length.filter((f, i) => i === 0 || i === 1).map((p, idx) => (
                    <div className="modal-fields">
                        <label className="modal-labels">Skill { idx === 0 ? ' ' : <button onClick={props.handleRemoveSkills(idx)} type="button" className="modal-decrease-button">-</button> }</label>
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
export default ModalSkills;

export const EditModalSkills = props => {
    console.log(props);

    return (
        <>
        <div id="modal-overlay-skills" className='modal-overlay'>
            <div id="myModal-skills" className="modal">
                <h2 className="modal-headings">Characther's {props.modal_headingz}{props.skills.length > 1 ? ' ' : <button type="button" onClick={props.add_more_skill} className="modal-plus-btn">+</button>}</h2>
                <div className="modal-container">
                    {
                        props.skills.filter((f, i) => i === 0 || i === 1).map((p, idx) => (
                    <div key={idx} className="modal-fields">
                        <label className="modal-labels">Skill { idx === 0 ? ' ' : <button onClick={props.remove_skill(idx)} type="button" className="modal-decrease-button">-</button> }</label>
                        <input type="text" onChange={props.skill_handle_change(idx)} value={p.skill_name} className="modal-inputs" />
                    </div>
                        ))
                    }
                        
                </div>
            </div>
        </div>
        </>
        )

}