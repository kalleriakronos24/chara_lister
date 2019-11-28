import React from 'react';
import PropTypes from 'prop-types';

const FilterOptions = props => {

    switch(props.type){
        case 'name':
        return (
            <select className="filter-option" onChange={props.changeOptValue}>
                <option className="opt-value" value="name_asc">Z ~ A</option>
                <option className="opt-value" value="name_desc">A ~ Z</option>
            </select>
        )
        case 'element':
            return (
                <select className="filter-option">
                    <option className="opt-value" value="element_asc">Fire,Water,Earth,Wind,Light,Dark</option>
                    <option className="opt-value" value="element_desc">Dark,Light,Wind,Earth,Water,Fire</option>
                </select>
            )
        default:
                return (
                    <select className="filter-option" onChange={props.changeOptValue}>
                        <option className="opt-value" value="name_desc">A ~ Z</option>
                        <option className="opt-value" value="name_asc">Z ~ A</option>
                    </select>
           )
    }
}

FilterOptions.propTypes = {
    changeOptValue : PropTypes.func.isRequired,
    type : PropTypes.string.isRequired
}


export default FilterOptions;