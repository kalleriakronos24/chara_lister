import React , { Component } from 'react'
import { Link } from "react-router-dom";
import Header from '../header/index';

export default class HeroList extends Component {
    constructor(props){
        super(props)
        this.state = {
            heros : [],
            isLoading : true
        }
    }
    componentDidMount(){
        this.fetchHero();
    }
    
    fetchHero = () => {
        
        const query = {
            query : `
                query {
                    Heros{
                        _id
                        name
                        skills{
                            skill_name
                            description
                        }
                    }
                }
            `
        }
       
        fetch('http://localhost:3005/data/api', {
            method : "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(query)
        })
        .then(res => {
            console.log(res);
            return res.json();
        })
        .then(res => {
            this.setState({ 
                heros : res.data.Heros,
                isLoading : false
            })
        console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    }

    render() {

           
        
        return (
            <>
            <Header 
            title="Granblue Chara List"
            tar="Add New Chara"
            home="add-new-hero"
            about="What's this ?"
            />

            
                    <div className={`${this.state.isLoading ? 'preloader' : 'preloader-is-done'}`}>
                        <span className={`${this.state.isLoading ? 'preloader-text' : 'preloader-text-is-done'}`}>Loading ... </span>
                    </div>

            <div>
               {
                   this.state.heros.map((hero, i) => {
                       return (
                         
                          <div className="hero-container">
                              <Link to={`/view/${hero._id}`} className="hero-name" key={hero._id}>{hero.name}</Link>
                          </div>
                       )
                   })
               }
                
            </div>
            </>
        )
    }
    
}

