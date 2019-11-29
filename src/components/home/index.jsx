import React , { Component } from 'react'
import { Link } from "react-router-dom";
import Header from '../header/index.jsx';
import LazyLoad from 'react-lazyload';
import FilterOptions from '../filter/options/index';
import Preloading from '../loader/pre/index';
import PageNotFound from '../notfoundpage/index';
import CHARA_API_URL from '../../api/url';

export default class HeroList extends Component {
    constructor(props){
        super(props)
        this.state = {
            heros : [],
            isLoading : true,
            isZeroResult : true,
            isFilter : false,
            filter_type : '',
            filter_opt : '',
            user_data : ''
        }
    }
    componentDidMount(){
        this.fetchHero();
    }
     
    handleSaveChara = idx => event => {
        event.preventDefault();
        const { heros } = this.state;
        const data = [];
        
        heros.filter((h, i) => {
            if(idx === i){
                data.push(h)
            }
            return h
        })

        fetch('http://localhost:3005/api/save', {
            method : "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(data)
        })
    }

    handleSwitchFilter = event => {
        this.setState({
            filter_type : event.target.value
        }) 
    }

    handleOptionValue = event => {
        this.setState({
            filter_opt: event.target.value
        })    
    }

    handleProceedFilter = () => {

        const { heros, filter_opt } = this.state;

        switch(filter_opt){

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
    
    fetchHero = () => {
        
        const query = {
            query : `
                query {
                    Heros{
                        _id
                        name
                        sprite
                        thumbnail
                        skills{
                            skill_name
                            description
                        }
                    }
                }
            `
        }
       
        fetch(CHARA_API_URL, {
            method : "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(query)
        })
        .then(res => {
            return res.json();
        })
        .then(res => {
            this.setState({ 
                heros : res.data.Heros,
                isLoading : false,
                isZeroResult : false
            })
        })
        .catch(err => {
            console.log(err);
        })
    }

    validateUser = () => {
        const { user_data } = this.state;
        const query = {
            query : `

            getUser(get : '5dbc4237760587191851a3d9'){
                _id
                name
                savedItems{
                    name
                }
            }

            `
        }
        fetch('http://localhost:3005/data/api', {
            method : 'POST',
            body : JSON.stringify(query),
            header : {

            }
        })
        .then(res => {
            return res.json();
        })
        .then(res => {
            this.setState({
                user_data : res.get.Users
            })
        })
        .catch(error => {
            throw error;
        })
    }


    render() {

        const { isZeroResult,isLoading } = this.state;

        return (
            <>

            <Header 
            title="Granblue Chara List"
            tar="Add New Chara"
            home="add-new-hero"
            about="What's this ?"
            isSearchActive={false}
            />

            
            {isLoading ? <Preloading/> : ''}
            {isZeroResult ? <PageNotFound /> : ''}
                        
                    <div className="menu-bar">
                        <span className="filter-by-text">Filter By </span>
                        <select className="filter-option" onChange={this.handleSwitchFilter}>
                            <option className="opt-value" value="name">Name</option>
                            <option className="opt-value" value="element">Element</option>
                        </select>

            <FilterOptions 
                changeOptValue={this.handleOptionValue}
                type={this.state.filter_type}
            />

                        <button type="button" className="btn-confirm-filter" onClick={this.handleProceedFilter}>Ok.</button>
                    </div>
        <div> 
               {
                   this.state.heros.map((hero, i) => {
                       return (
                        <LazyLoad height={100} offset={[-100, 100]} key={i}>
                          <div className="hero-container" style={{ backgroundImage : `url("${hero.thumbnail}")`, backgroundSize : 'cover' }}>
                              <button key={i}  type="button" onClick={this.handleSaveChara(i)} className="btn-save">S</button>
                              <Link to={`/view/${hero.name}`} className="hero-name" key={hero.name}>{hero.name}</Link>
                          </div>
                        </LazyLoad>
                       )
                   })
               }
         </div>
            </>
        )
    }
    
}

