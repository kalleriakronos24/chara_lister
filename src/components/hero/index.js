import React , { Component } from 'react'


export default class Hero extends Component {
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

    fetchHero(){
       
        fetch('http://localhost:3005/data/api', {
            method : "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                query : `
                    query {
                        Heros{
                            _id
                            name
                            hp
                            mana
                            skills
                            passives
                            race
                            creator{
                                name
                                contributor
                            }
                        }
                    }
                `
            })
        })
        .then(res => {
            console.log(res);
            return res.json();
        })
        .then(res => {
            this.setState({ 
                isLoading : false,
                heros : res.data.Heros
            })
        })
        .catch(err => {
            console.log(err);
        })
    }

    render() {

        if(this.state.isLoading){
                return (
                    <div>
                        <h2>Loading ... </h2>
                    </div>
                )
        }   
        
        return (
            <div>
               {
                   this.state.heros.map(hero => {
                       return (
                           <div key={hero._id}>
                           <p>Hero Name : {hero.name}</p>
                           <p>Hero Skills : {hero.skills.join(', ')}</p>
                           <p>Creator : {hero.creator.name}</p>
                           <p>Contributor : {hero.creator.contributor.join(', ')}</p>
                           </div>
                       )
                   })
               }
                
            </div>
        )
    }
    
}

