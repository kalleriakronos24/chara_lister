import React from 'react';
import Header from '../header/index';

export default class AddNewHero extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            hero_name : "",
            hp : 100,
            mana : 100,
            skills : [{ skill_name : "" }],
            passives : [{ passive_a : "", passive_b : "" }],
            thumb : "",
            heros : [],
            isLoading : true
        }
    }

    componentDidMount(){
        this.fetchHero();
    }

    fetchHero(){
        const query = {

            query : `
                query{
                    Heros{
                        name
                        skills{
                            skill_name
                        }
                    }
                }
            `
        }
        fetch('http://localhost:3005/data/api',{
            method : "POST",
            headers : {
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
                isLoading : false
            })
        })
        .catch(err => {
            console.log(err);
        })
    }
     handleSubmit = async event => {
        event.preventDefault();
        const { hero_name, skills, hp, mana, thumb } = this.state

       var skill = [];
       for(var i in skills){
            skill.push(skills[i])
       }
//        const query = {

//         query : `
//         mutation createHeroMutation($skills : [{ skill_name : String }]){ 
//             createHero(name : "${hero_name}", hp: ${hp}, mana : ${mana}, skills : $skills ){
//                 name
//                 hp
//                 mana
//                 skills{
//                     skill_name
//                 }
//             }
//         }
//     `
// }

    const formdata = new FormData();
    const thumb_arr = [];
    
    formdata.append('hero_name', hero_name);
    formdata.append('hp', hp);
    formdata.append('mana', mana);
    formdata.append('skills', skill)
    
    for(const key of Object.keys(thumb)){
        thumb_arr.push(thumb[key])
    }
    formdata.append('thumbnail', thumb);
        console.log(thumb_arr);
        console.log(thumb)

        fetch('http://localhost:3005/api_hero/add-new-hero', {
            method : "POST",
            mode : 'no-cors',
            body : formdata
        })
        .then(res => {
            return res.json();
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    }

    handleSkillsChange = idx => event => {
        const newSkills = this.state.skills.map((skill, index) => {
            if( idx !== index) return skill;
            return { ...skill, skill_name : event.target.value }
        })
        this.setState({ skills : newSkills });

    }

    handleAddMoreSkills = () => {
        this.setState({
            skills : this.state.skills.concat([{ skill_name : "" }])
        })
    }

    handleRemoveSkills = index => () => {
        this.setState({
            skills: this.state.skills.filter((s, i) => index !== i)
        })
    }

    handleHeroNameChange = event => {
        this.setState({
            hero_name : event.target.value
        })
    }

    handleThumbnailChange = e => {
        this.setState({
            thumb : e.target.value
        })
    }

    handleAddMorePassives = () => {
        this.setState({
            passives : this.state.passives.concat([{ passive_a : "", passive_b : "" }])
        })
    }

    handlePassiveAChange = index => event => {
        var val = event.target.value;
        console.log(val);
        this.setState(prev => ({
            passives : prev.passives.map((p, i) => ( index === i ? Object.assign(p, { passive_a : val }) : p ))
        }))
    }
    
    handlePassiveBChange = index => event => {
        var val = event.target.value;
        this.setState(prev => ({
            passives : prev.passives.map((p, i) => ( index === i ? Object.assign(p, { passive_b : val } ) : p ))
        }))
    }

    handleRemovePassive = index => () => {
        this.setState({
            passives : this.state.passives.filter((p, i) =>  index !== i )
        })
    }

    handleResetButton = () => {
        this.setState({
            hero_name : '',
            skills : [{
                skill_name : ''
            }],
            passives : [{
                passive_a : '',
                passive_b : ''
            }]
        })
    }


    render(){
            
        return ( 
            
            <>
            <Header 
            title="Add New Hero"
            home="/"
            tar="Home"
            about="What's this ?"
            />


            <form onSubmit={this.handleSubmit} className="container-add-hero">
                
                <label>Hero Name</label>
                <input type="text" name="hero-name" autoComplete="off" onChange={this.handleHeroNameChange} value={this.state.hero_name} placeholder="Ex. Gratia" />

                {this.state.skills.map((skill, index) => (
                    <div className="add-more-skills-field" key={index}>
                <label className="add-more-skills-label">Skills <button className="add-more-skills-decrease" type="button" onClick={this.handleRemoveSkills(index)}>-</button></label>
                <input className="add-more-skills-input" type="text" onChange={this.handleSkillsChange(index)} placeholder={`Skill #${index + 1}`} value={skill.skill_name} name="hero-name" />
                </div>
                    ))}
                
                {this.state.passives.map((p, i) => (
                    <div className="add-more-skills-field" key={i}>
                <label className="add-more-skills-label">Passives <button onClick={this.handleRemovePassive(i)} className="add-more-skills-decrease">-</button></label>
                <input type="text" className="add-more-skills-input" onChange={this.handlePassiveAChange(i)} value={p.passive_a} placeholder={`Passive A #${i + 1}`} name="hero-name" />
                <input type="text" className="add-more-skills-input" onChange={this.handlePassiveBChange(i)} value={p.passive_b} placeholder={`Passive B #${i + 1}`} name="hero-name" />
                    </div>
                ))}    
                <label>Thumbnail  <button>-</button></label>
                <input type="file" onChange={this.handleThumbnailChange} name="thumbnail" multiple />

                <label>Race <button>-</button></label>
                <input type="text" name="hero-name" />

                
                <button className="add-hero-button-submit" type="submit">Submit</button>
                
                <button className="add-hero-button-reset" onClick={this.handleResetButton} type="button">Reset</button>
            </form>
                
                <div className="add-button-container">
                        <button type="button" onClick={this.handleAddMoreSkills} className="add-new-skills">Add New Skills</button>
                        <button type="button" onClick={this.handleAddMorePassives} className="add-new-passives">Add New Passives</button>
                        <button type="button" className="add-new-races">Add New Races</button>
                </div>
            <div className="hero-index">
                <div className="added-hero-container">

                    

                <div className={this.state.isLoading ? 'added-hero' : 'is-hidden'}>

                    <span className="added-hero-name">
                        Retrieving Data
                    </span>
                    <span className="added-hero-skills">
                        Please Wait
                    </span>

                    <span className="dot-sign">...</span>

                </div>   
  
                    {this.state.heros.map((h, i) => (

                    <div className="added-hero">
                        <span className="added-hero-name">
                            {h.name}
                        </span>
                        {h.skills.map(s => (
                        <span className="added-hero-skills">
                            {s.skill_name}
                        </span>
                        ))}
                        <span className="dot-sign"></span>
                    </div>

                    ))}
                    <div className="added-hero">
                        <span className="added-hero-name">
        {this.state.hero_name ? this.state.hero_name : 'Hero Name'}
                        </span>
                        {this.state.skills.filter((sk, index) => index === 0 || index === 1).map((skill, i) => (
                            <div key={i}>
                        <span className="added-hero-skills">
                            {skill.skill_name ? skill.skill_name : 'Skills Appears Here'}
                        </span>
                            </div>
                        ))}

                        <span className="dot-sign"></span>
                    </div>
                    
                </div>
            </div>
            
            </>
        )
    }
}