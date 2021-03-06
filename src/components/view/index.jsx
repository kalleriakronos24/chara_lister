import React from "react";
import Header from "../header/index.jsx";
import Preloading from '../loader/pre/index.jsx'

export default class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      hero: {
        name: "",
        skills: [],
        thumbnail : '',
        sprites : [],
        elements : [],
        race : '',
        about : '',
        search : '',
        isSearch : false
      }
    };
  }

  componentDidMount() {
    this.fetchHero();
  }

  handleChangeThumbnail = id => event => {
    
  }

  fetchHero = () => {

    try {

    const query = {
      query: `
                query {
                    getHero(get: "${this.props.match.params.name}"){
                        name
                        thumbnail
                        race
                        about
                        elements{
                          element_name
                        }
                        sprite
                        skills{
                            skill_name
                        }
                    }
                }
            `
    };

    fetch('http://localhost:3005/data/api' , {
      method: "POST",
      body : JSON.stringify(query),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        const data = res.data.getHero;

        this.setState({
          hero: {
            name: data.name,
            skills: data.skills,
            elements : data.elements,
            about : data.about,
            race : data.race,
            thumbnail : data.thumbnail,
            sprites : data.sprite
          },
          isLoading: false
        });
      })
      .catch(err => {
        console.log(err);
      });
    }
    catch(error) {
      throw error;
    }
  }
  handleSearch = async event => {
    try{
    const no_idea = event.target.value.toLowerCase();
    console.log(no_idea)
    this.setState({
      search : no_idea,
      isSearch : true
    })
  }
  catch(error){
    throw error;
    }
  }
   
  render() {
    const { hero, search, isLoading } = this.state;

    return (
      <>
        <Header
          title={`${hero.name}`}
          home="/"
          tar="Home"
          search_val={search}
          handleChangeSearch={this.handleSearch}
          linkTo={search}
          searchActive={true}
        />
        {isLoading ? <Preloading/> : ''}

        <div className="details-hero">
          <div className="container-img" style={{ backgroundImage : `url("${this.state.hero.thumbnail}")`, backgroundSize : 'cover' }}></div>
          <div className="chara-sprites-container">
            {
                this.state.hero.sprites.map((s, i) => (

              <img className="chara-sprites" key={i} alt="chara-sprites" src={s}/>

                ))
            }
          </div>
          <span className="description">About : </span>
          <div className="description-text-field">
            <span className="desc-text">
              {hero.about ? hero.about : 'No Data Available.'}
            </span>
          </div>

          <span className="skills">Skills : </span>

          <div className="skill-list-container">
            {this.state.hero.skills.map((s, idx) => (
              <span key={idx} className="skills-list">{s.skill_name ? s.skill_name : 'No Data Available.'}</span>
            ))}
          </div>

          <span className="element-text">Element : </span>
          {
            hero.elements.map((e, i) => (
              <span key={i} className="element-icon-name">{e.element_name ? '- ' + e.element_name : 'No Data Available.'}</span>
            ))
          }
          <span className="race-text">Race : </span>
          <span className="race-name">{hero.race ? '- ' + hero.race : 'No Data Available.'}</span>
        </div>
        
      </>    
    );
  }
}
