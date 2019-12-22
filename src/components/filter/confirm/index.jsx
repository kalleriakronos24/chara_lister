import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class ConfirmFilter extends Component {
    constructor(props){
        super(props)
            this.state={}
    }
    
    
    handleConfirmFilter = () => {

        const props = this.props;
        const heros = props.state;
        switch(props.opt_type){

            case 'name_asc':
                let name_asc = heros.sort((a,b) => {
                    const val_a = a.name.toUpperCase()
                    const val_b = b.name.toUpperCase()
                    return val_b.localeCompare(val_a)
                })
                this.setState({
                    heros : name_asc
                })
                break;
            case 'name_desc':
                let name_desc = heros.sort((a,b) => {
                    const val_a = a.name.toUpperCase()
                    const val_b = b.name.toUpperCase()
                    return val_a.localeCompare(val_b)
                })
                this.setState({
                    heros : name_desc
                })
                break;
            default:

                let def_opt = heros.sort((a,b) => {
                    const val_a = a.name.toUpperCase()
                    const val_b = b.name.toUpperCase()
                    return val_b.localeCompare(val_a)
                })
                this.setState({
                    heros : def_opt
                });
            }
    }

    render() {
        return (
            <button type="button" className="btn-confirm-filter" onClick={this.handleConfirmFilter}>Ok.</button>
        )
    }
}

ConfirmFilter.propTypes = {
    state : PropTypes.array.isRequired,
    opt_type : PropTypes.string.isRequired
}