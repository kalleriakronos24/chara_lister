import React , { Component } from 'react'
import { Link } from "react-router-dom";
import Header from '../header/index.jsx';
import LazyLoad from 'react-lazyload';
import FilterOptions from '../filter/options/index';
import Preloading from '../loader/pre/index';
import PageNotFound from '../notfoundpage/index';
import CHARA_API_URL from '../../api/url';
import Save from '../others/save.jsx';

export default class HeroList extends Component {
    constructor(props){
        super(props)
        this.state = {
            charas : [],
            isLoading : true,
            isZeroResult : true,
            isFilter : false,
            filter_type : '',
            filter_opt : '',
            user_data : {
                _id : '',
                name : '',
                savedChara : []
            },
            saved : false
        }
    }
    componentDidMount(){
        this.validateUser();
        this.fetchHero();
    }
    componentDidUpdate(){
        this.checkIfUserHasSavedChara();
    }
     
    handleSaveChara = idx => event => {

        event.preventDefault();
        const { charas } = this.state;
        const data = [];
        
        charas.filter((h, i) => {
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

    handleUnsaveChara = id => event => {
        event.preventDefault();
        const { user_data } = this.state;

        const data = {
            'user_id' : user_data._id,
            'saved_id' : id
        }
        console.log(data);

        fetch('http://localhost:3005/user/unsave', {
            method : "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(data)
        })
        .then(res => {
            return res.json();
        })
        .then(res => {
            console.log(res);
        })
        .catch(error => {
            console.log(error);
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

        const { charas, filter_opt } = this.state;

        switch(filter_opt){

            case 'name_asc':
                let name_asc = charas.sort((a,b) => {
                    const val_a = a.name.toUpperCase()
                    const val_b = b.name.toUpperCase()
                    return val_b.localeCompare(val_a)
                })
                this.setState({
                    charas : name_asc
                })
                break;
            case 'name_desc':
                let name_desc = charas.sort((a,b) => {
                    const val_a = a.name.toUpperCase()
                    const val_b = b.name.toUpperCase()
                    return val_a.localeCompare(val_b)
                })
                this.setState({
                    charas : name_desc
                })
                break;
            default:

                let def_opt = charas.sort((a,b) => {
                    const val_a = a.name.toUpperCase()
                    const val_b = b.name.toUpperCase()
                    return val_b.localeCompare(val_a)
                })
                this.setState({
                    charas : def_opt
                });
            }
    }
    
    fetchHero = () => {
        
        try {
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
                charas : res.data.Heros,
                isLoading : false,
                isZeroResult : false
            })
        })
        .catch(err => {
            console.log(err);
        })
    }
    catch(error){
        throw error;
    }
}


    validateUser = () => {
    
    const query_2 = {
        query:
        `
        query{
            getUser(get : "5dbc3b6706e1362294c87c6f"){
                _id
              name
              savedHero{
                name
              }
            }
          }

        `
      };
        fetch(CHARA_API_URL, {
            method : "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(query_2)
        })
        .then(res => {
            console.log(res)
            return res.json();
        })
        .then(res => {

            const data = res.data.getUser;

            this.setState({
                user_data : {
                    _id : data._id,
                    name : data.name,
                    savedHero : data.savedHero
                }
            })
        })
        .catch(error => {
            throw error;
        })
    }

    checkIfUserHasSavedChara = () => {

        const { user_data, charas } = this.state;

        const user_saved_chara = user_data.savedHero.map(sh => {
            charas.map(h => {
                if(sh.name !== h.name){
                    console.log('gada yg sama')
                }else{
                    console.log('ada sama')
                }
                return h;
            })
            return sh;
        })
        return user_saved_chara;
    }

    render() {

        const { isZeroResult,isLoading, user_data } = this.state;
        
        return (
            <>

            <Header 
            title="Granblue Chara List"
            tar="Add New Chara"
            home="add-new-hero"
            about="What's this ?"
            searchActive={false}
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
                   this.state.charas.map((char, i) => {
                       return (
                        <LazyLoad height={100} offset={[-100, 100]} key={i}>
                          <div className="chara-grid" style={{ backgroundImage : `url("${char.thumbnail}")`, backgroundSize : 'cover' }}>
                          <Save index={i} save_handler={this.handleSaveChara(i)} unsave_handler={this.handleUnsaveChara(char._id)} saved_char={user_data.savedHero} char_name={char.name} />
                              <Link to={`/view/${char.name}`} style={{ textTransform : 'capitalize' }} className="hero-name" key={char.name}>{char.name}</Link>
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

