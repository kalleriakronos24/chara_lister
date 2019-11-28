import React from 'react';
import axios from 'axios';
import Header from '../header/index';
import propTypes from 'prop-types'
import ModalPassives from '../Modals/Passives'
import ModalSkills from '../Modals/Skills'
import ModalElements from '../Modals/Elements'

export default class AddNewHero extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            hero_name : "",
            hp : 100,
            mana : 100,
            race : '',
            skills : [{ skill_name : "" }],
            passives : [{ passive_name : "" }],
            sprite : "",
            heros : [],
            isLoading : true,
            thumbnail : "",
            about : '',
            elements : [{
                element_name : ''
            }]
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
        const { hero_name, skills, hp, mana, sprite, thumbnail, about, race, elements, passives } = this.state

       var skill = [];
       for(var i in skills){
            skill.push(skills[i])
       } 

    const formdata = new FormData();

    formdata.append('hero_name', hero_name);
    formdata.append('hp', hp);
    formdata.append('mana', mana);
    formdata.append('race', race);
    formdata.append('about', about)

    for(let x of Object.keys(thumbnail)){
        formdata.append('thumbnail', thumbnail[x])
        console.log(thumbnail[x])
    }

    for(var j in skills){
        formdata.append('skills[]', JSON.stringify(skills[j]))
    }
    for( var s in passives ) {
        formdata.append('passives[]', JSON.stringify(passives[s]))
    }
    for( var e in elements ){
        formdata.append('elements[]', JSON.stringify(elements[e]))
    }
    for(let key of Object.keys(sprite)){
        formdata.append('sprite', sprite[key]);
        console.log(sprite[key])
    }

        axios.post('http://localhost:3005/api_hero/add-new-hero', formdata, {})
        .then(res => {
            console.log(res);
            return res.json();
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
        const { skills } = this.state

        if(skills.length > 3){
            return;
        }

        this.setState({
            skills : skills.concat([{ skill_name : "" }])
        })
    }
    handleRaceChange = event => {
        this.setState({
            race : event.target.value
        })
    }

    handleRemoveSkills = index => () => {
        this.setState({
            skills: this.state.skills.filter((s, i) => index !== i)
        })
    }
    handleMainImage = event => {
        this.setState({
            thumbnail : event.target.files
        })
    }
    handleHeroNameChange = event => {
        this.setState({
            hero_name : event.target.value
        })
    }

    handleSpriteChange = e => {
        this.setState({
            sprite : e.target.files
        })
    }

    handleAddMorePassives = () => {
        const { passives } = this.state

        if(passives.length > 2){
            return;
        }

        this.setState({
            passives : passives.concat([{ passive_name: '' }])
        })
    }

    handlePassiveAChange = index => event => {
        var val = event.target.value;
        console.log(val);
        this.setState(prev => ({
            passives : prev.passives.map((p, i) => ( index === i ? Object.assign(p, { passive_name : val }) : p ))
        }))
    }
    

    handleRemovePassive = index => () => {
        this.setState({
            passives : this.state.passives.filter((p, i) =>  index !== i )
        })
    }

    handleAboutChange = event => {
        this.setState({
            about: event.target.value
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
    
    handleAddMoreElements = () => {


        console.log('clicked ?');
        
        const { elements } = this.state

        if(elements.length > 2){
            return 2;
        }

        this.setState({
            elements : elements.concat([{ element_name: '' }])
        })
    }

    handleElementsChange = index => event => {
        const val = event.target.value;
        this.setState(prev => ({
            elements : prev.elements.map((e, i) => ( index === i ? Object.assign(e, { element_name : val }) : e ))
        }))
    }

    handleRemoveElements = idx => () => {
        const { elements } = this.state;
        
        this.setState({
            elements : elements.filter((e, i) => idx !== i)
        })
        
    }

    openPassiveModal = event => {

        event.preventDefault();
        document.getElementById('modal-overlay').style.display = "block"
        document.getElementById('modal-overlay').style.visibility = "visible"
        document.getElementById('modal-overlay').style.opacity = 1;
        var modal = document.getElementById('modal-overlay');

        window.onclick = function(e){
            if ( e.target === modal) modal.style.display = "none"
        }
    }

    openSkillModal = event => {

        event.preventDefault();
        document.getElementById('modal-overlay skills').style.display = "block"
        document.getElementById('modal-overlay skills').style.visibility = "visible"
        document.getElementById('modal-overlay skills').style.opacity = 1;
        var modal = document.getElementById('modal-overlay skills');

        window.onclick = function(e){
            if ( e.target === modal ) modal.style.display = "none"
        }
    }

    openElementsModal = event => {

        event.preventDefault();
        document.getElementById('modal-overlay elements').style.display = "block"
        document.getElementById('modal-overlay elements').style.visibility = "visible"
        document.getElementById('modal-overlay elements').style.opacity = 1;
        var modal = document.getElementById('modal-overlay elements');

        window.onclick = function(e){
            if ( e.target === modal ) modal.style.display = "none"
        }
        
    }


    render(){
        
        const { passives, skills, elements, race } = this.state;

        return ( 
            
            <>
            <Header 
            title="Add New Hero"
            home="/"
            tar="Home"
            about="What's this ?"
            />
            
            <ModalElements
            elements_length={elements}
            handleChange={this.handleElementsChange}
            modal_headings="Elements"
            remove={this.handleRemoveElements}
            onClick={this.handleAddMoreElements}
            
            />
            
            <ModalPassives
            passive_length={passives}
            passive_change_handler={this.handlePassiveAChange}
            modal_headings="Passives"
            handleRemovePassive={this.handleRemovePassive}
            onClick={this.handleAddMorePassives}
            />

            <ModalSkills
            skills_length={skills}
            skill_change_handler={this.handleSkillsChange}
            modal_headings="Skills"
            handleRemoveSkills={this.handleRemoveSkills}
            onClick={this.handleAddMoreSkills}
            
            />
             


            <form onSubmit={this.handleSubmit} className="container-add-hero">
                

                <div className="chara-name-container">

                <label className="chara-name-label">Hero Name</label>
                <input type="text" name="hero-name" autoComplete="off" className="chara-name-input" onChange={this.handleHeroNameChange} value={this.state.hero_name} placeholder="Ex. Gratia" />

                </div>

                    <div className="skills-container">
                <label className="skills-label">Skills </label>
                <input className="skills-input" autoComplete="off" onClick={this.openSkillModal} type="button" value="Click Here.." name="hero-name" />
                </div>
                
                    <div className="passives-container">
                <label className="passives-container-label">Passives</label>
                <input type="button" className="passives-container-input" onClick={this.openPassiveModal} autoComplete="off" value="Click Here.." placeholder="" name="hero-name" />
                    </div>

                <div className="main-image-container">

                <label className="main-img-label">Main Image </label>
                <input type="file" onChange={this.handleMainImage} className="main-img-input" autoComplete="off" name="thumbnail" />

                </div>


                <div className="sprites-container">

                <label className="sprites-label">Battle Pose <small>( Max : 2 )</small></label>
                <input type="file" onChange={this.handleSpriteChange} className="sprites-input" autoComplete="off" name="thumbnail" multiple />

                </div>

                <div className="race-container">

                <label className="race-label">Race : </label>
                <input type="text" onChange={this.handleRaceChange} value={race} className="race-input" autoComplete="off" />

                </div>
               
                  
                <div className="elements-container">
                    <label className="elements-label">Elements <button className="btn-modal-elements">+</button></label>
                        <input type="button" className="elements-input" onClick={this.openElementsModal} value="Click Here.." autoComplete="off" />
                </div>

                <div className="about-container">

                <label className="about-label">About: </label>
                <textarea className="about-input" onChange={this.handleAboutChange} autoComplete="off" />

                </div>
                
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

                    <div key={i} className="added-hero">
                        <span className="added-hero-name">
                            {h.name}
                        </span>
                        {h.skills.map((s, i) => (
                        <span key={i} className="added-hero-skills">
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