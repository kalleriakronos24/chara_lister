import React, { Component } from 'react';
import '../../styles/main.css';
import { Link } from 'react-router-dom';


class Header extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }
    render(){
        return (
            <div className="header">
                <ul>
                    <li style={{ position: 'absolute', marginLeft : '150px'}}>{this.props.title}</li>
                    <li style={{ position:'absolute', marginLeft: '850px' }}><Link className="nav-link" to={`${this.props.home}`}>{this.props.tar}</Link></li>
                    <li style={{ position:'absolute', marginLeft : '1100px' }}><Link className="nav-link" to="/">{this.props.about}</Link></li>
                </ul>
            </div>
        )
    }
}

export default Header;