import React from 'react';



export default class ModalPassives extends React.Component {
    constructor(props){
        super(props);
        this.state = {}
    }



    render(){
        return (
        <>
            <div className="modal">
                <h2 className="modal-headings">Characther's Passives<button className="modal-plus-btn">+</button></h2>
            </div>
        </>
        )
    }
}