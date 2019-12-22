import React from 'react';
import axios from 'axios';
import Header from '../../header/index';
import { EditModalPassives } from '../../Modals/Passives'
import { EditModalSkills } from '../../Modals/Skills'
import { EditModalElements } from '../../Modals/Elements'
import $ from 'jquery';
import PageNotFound from '../../notfoundpage/index';


export default class EditChara extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading : true,
                name : '',
                about : '',
                race : '',
                skills : [],
                passives : [],
                elements : [],
                sprites: '',
                thumbnail : '',
                charas : []
            
        }
    }

    componentDidMount(){
        this.fetchHero();
        this.fetchChar();
    }

    fetchChar = () => {

        try {
           
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
                    charas: res.data.Heros
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

    fetchHero(){

        try {
        const query = {

            query : `
                query{
                    getHero(get: "${this.props.match.params.name}"){
                        name
                        race
                        skills{
                            skill_name
                        }
                        passives{
                            passive_name
                        }
                        elements{
                            element_name
                        }
                        about
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
            const data = res.data.getHero;

            this.setState({
                name : data.name,
                about : data.about,
                race : data.race,
                skills : data.skills,
                passives : data.passives,
                elements : data.elements,
                isLoading : false
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

     handleSubmit = event => {
        event.preventDefault();
        const { name,race,about,thumbnail,sprites,skills,elements,passives } = this.state

    const formdata = new FormData();

    formdata.append('hero_name', name);
    formdata.append('race', race);
    formdata.append('about', about)

    for(let x of Object.keys(thumbnail)){
        formdata.append('thumbnail', thumbnail[x])
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
    for(let key of Object.keys(sprites)){
        formdata.append('sprite', sprites[key]);
    } 
 
        axios.post(`http://localhost:3005/api_hero/chara/edit/${this.props.match.params.name}`, formdata, {})
        .then(res => {
            console.log(res);
            return res.json();
        })
        .catch(err => {
            console.log(err);
        })
    }

    handleSkillsChange = idx => event => {
        let val = event.target.value;
        this.setState({
                skills : this.state.skills.map((s, i) => ( idx === i ? Object.assign(s, { skill_name : val }) : s))         
        })
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
        const arr_skills = this.state.skills;
        this.setState({
                skills : arr_skills.filter((s,i) => index !== i)
        })
    }
    handleMainImage = event => {
        this.setState({
                thumbnail : event.target.files
        })
    }
    handleHeroNameChange = event => {
        this.setState({
                name : event.target.value
        })
    }

    handlespritesChange = e => {
        this.setState({
                sprites : e.target.files
        })
    }

    handleAddMorePassives = () => {
        const { passives } = this.state
        const arr_passives = passives;

        if(arr_passives.length > 2){
            return;
        }

        this.setState({
                passives : arr_passives.concat([{ passive_name : "" }])
        })
    }

    handlePassiveAChange = index => event => {
        var val = event.target.value;

        this.setState(prev => ({
                passives : prev.passives.map((p, i) => ( index === i ? Object.assign(p, { passive_name : val }) : p))
        }))
    }
    

    handleRemovePassive = index => () => {
        
        const { passives } = this.state
        const arr_passives = passives;

        this.setState({
                passives : arr_passives.filter((p,i) => index !== i)
        })
    }

    handleAboutChange = event => {
        this.setState({
                about : event.target.value
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
        const arr_elements = elements;
        if(arr_elements.length > 2){
            return 2;
        }

        this.setState({
                elements : arr_elements.concat([{ element_name : '' }])
        })
    }

    handleElementsChange = index => event => {
        const val = event.target.value;
        this.setState(prev => ({
                elements : prev.elements.map((e, i) => ( index === i ? Object.assign(e, { element_name : val }): e))
        }))
    }

    handleRemoveElements = idx => () => {
        const { elements } = this.state;
        
        this.setState({
                elements : elements.filter((e,i) => idx !== i)
        })
        
    }

    openPassiveModal = () => {

            document.getElementById('modal-overlay').style.visibility = "visible"
            document.getElementById('modal-overlay').style.opacity = 1;
           $('#modal-overlay').fadeIn(450);
           $('#myModal').fadeIn(450);

        var modal = document.getElementById('modal-overlay');

        window.onclick = function(e){
           if( e.target === modal )
            $('#modal-overlay').fadeOut(450);
        }
    }

    openSkillModal = () => {

            document.getElementById('modal-overlay-skills').style.visibility = "visible"
            document.getElementById('modal-overlay-skills').style.opacity = 1;
           $('#modal-overlay-skills').fadeIn(450);
           $('#myModal-skills').fadeIn(450);

        var modal = document.getElementById('modal-overlay-skills');

        window.onclick = function(e){
           if( e.target === modal )
            $('#modal-overlay-skills').fadeOut(450);
        }
    }

    openElementsModal = () => {

            document.getElementById('modal-overlay-elements').style.visibility = "visible"
            document.getElementById('modal-overlay-elements').style.opacity = 1;
           $('#modal-overlay-elements').fadeIn(450);
           $('#myModal-elements').fadeIn(450);
      

        var modal = document.getElementById('modal-overlay-elements');

        window.onclick = function(e){
           if( e.target === modal )
            $('#modal-overlay-elements').fadeOut(450);
        }
        
    }


    render(){
        
        const { elements, passives, skills, charas } = this.state;

        charas.map(async c => {

            const param = this.props.match.params.name;

            if(param !== c.name){
                return <PageNotFound />
            } else {
                
                $('#result-not-found').css('display','none')
                $('#result-not-found').css('visibility','hidden')

                return ( 
            
                    <>
                    
                    <Header 
                    title={`Edit : ${this.props.match.params.name}`}
                    home="/"
                    tar="Home"
                    about="What's this ?"
                    searchActive={false}
                    />
                    
                    <EditModalElements
                    elements={elements}
                    element_handle_change={this.handleElementsChange}
                    modal_headingz="Elements"
                    remove_element={this.handleRemoveElements}
                    add_more_element={this.handleAddMoreElements}
                    
                    />
                    
                    <EditModalPassives
                    passives={passives}
                    passive_handle_change={this.handlePassiveAChange}
                    modal_headingz="Passives"
                    remove_passive={this.handleRemovePassive}
                    add_more_passive={this.handleAddMorePassives}
                    />
        
                    <EditModalSkills
                    skills={skills}
                    skill_handle_change={this.handleSkillsChange}
                    modal_headingz="Skills"
                    remove_skill={this.handleRemoveSkills}
                    add_more_skill={this.handleAddMoreSkills}
                    
                    /> 
        
                    
                     
        
        
                    <form onSubmit={this.handleSubmit} className="container-add-hero">
                        
        
                        <div className="chara-name-container">
        
                        <label className="chara-name-label">Chara Name</label>
                        <input type="text" autoComplete="off" style={{ textTransform : 'capitalize'}} className="chara-name-input" onChange={this.handleHeroNameChange} value={`${this.state.name ? this.state.name : ''}`} placeholder="Ex. Gratia" />
        
                        </div>
        
                            <div className="skills-container">
                        <label className="skills-label">Skills </label>
                        <input className="skills-input" id="btn-show-modal-skills" onClick={this.openSkillModal} autoComplete="off" type="button" value="Click Here.." name="hero-name" />
                        </div>
                        
                            <div className="passives-container">
                        <label className="passives-container-label">Passives</label>
                        <input type="button" id="btn-show-modal-passives" onClick={this.openPassiveModal} className="passives-container-input" autoComplete="off" value="Click Here.." placeholder="" name="hero-name" />
                            </div>
        
                        <div className="main-image-container">
        
                        <label className="main-img-label">Main Image </label>
                        <input type="file" onChange={this.handleMainImage} className="main-img-input" autoComplete="off" name="thumbnail" />
        
                        </div> 
        
        
                        <div className="sprites-container">
        
                        <label className="sprites-label">Battle Pose <small>( Max : 2 )</small></label>
                        <input type="file" onChange={this.handlespritesChange} className="sprites-input" autoComplete="off" name="thumbnail" multiple />
        
                        </div>
        
                        <div className="race-container">
        
                        <label className="race-label">Race : </label>
                        <input type="text" onChange={this.handleRaceChange} className="race-input" value={`${this.state.race ? this.state.race : ''}`} autoComplete="off" />
        
                        </div>
                       
                          
                        <div className="elements-container">
                            <label className="elements-label">Elements <button className="btn-modal-elements">+</button></label>
                                <input type="button" className="elements-input" onClick={this.openElementsModal} id="btn-show-modal-elements" value="Click Here.." autoComplete="off" />
                        </div>
        
                        <div className="about-container">
        
                        <label className="about-label">About: </label>
                        <input type="text" style={{ textTransform: 'capitalize' }} className="about-input" onChange={this.handleAboutChange} value={`${this.state.about ? this.state.about : ''}`} autoComplete="off" />
        
                        </div>
                        
                        <button className="add-hero-button-submit" type="submit">Submit</button>
                        
                        <button className="add-hero-button-reset" onClick={this.handleResetButton} type="button">Reset</button>
                    </form>
                        
                        <div className="add-button-container">
                                <button type="button" className="add-new-skills">What</button>
                                <button type="button" className="add-new-passives">Are</button>
                                <button type="button" className="add-new-races">These For ?</button>
                        </div>
                    
                    </>
                )
        
            }

        })              
    }
}