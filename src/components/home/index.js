import React , { Component } from 'react'
import { Link } from "react-router-dom";
import Header from '../header/index';

export default class HeroList extends Component {
    constructor(props){
        super(props)
        this.state = {
            heros : [],
            isLoading : true,
            isZeroResult : true
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
                isLoading : false,
                isZeroResult : false
            })
        console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    }

    render() {

        const { isZeroResult } = this.state
        
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
                    
                    <div className={`${isZeroResult ? 'result-not-found' : 'is-hidden'}`}>
                            <span className="not-found-text">404 - Not Found</span>
                    </div>
        <div> 
               {
                   this.state.heros.map((hero, i) => {
                       return (
                      
                          <div className="hero-container" style={{ backgroundImage : `url("${hero.thumbnail}")`, backgroundSize : 'cover' }}>
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

