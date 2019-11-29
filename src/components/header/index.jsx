import React, { Component } from 'react';
import '../../styles/main.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Header extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }
    render(){
        const props = this.props;
        return (
            <div className="header">
                <ul>
                    <li style={{ position: 'absolute', marginLeft : '150px'}}>{props.title}</li>
                    <li style={{ position:'absolute', marginLeft: '850px' }}><Link className="nav-link" to={`${props.home}`}>{this.props.tar}</Link></li>
                    <li style={{ position:'absolute', marginLeft : '1100px' }}><Link className="nav-link" to="/about">{props.about}</Link></li>
                    {props.searchActive ? <li style={{ position:'absolute', marginLeft : '1100px' }}><input type="text" onChange={props.handleChangeSearch} className="search-input" value={props.search} placeholder="Search.." /></li> : '' }
                    {props.searchActive ? <li style={{ position:'absolute', marginLeft : '1100px' }}><Link className="nav-link" to={`/view/${props.search_val}`}>Go.</Link></li> : '' }
                </ul>
            </div>
        )
    }
}

export default Header;

Header.propTypes = {
    title : PropTypes.string.isRequired,
    tar : PropTypes.string.isRequired,
    about : PropTypes.string.isRequired,
    searchActive : PropTypes.bool.isRequired,
    handleChangeSearch : PropTypes.func,
    search_val : PropTypes.string,
    search : PropTypes.string
}