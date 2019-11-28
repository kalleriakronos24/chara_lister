import React from "react";
import Header from "../header/index.jsx";

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
        params : this.props.match.params.name,
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

  fetchHero() {
    console.log(this.props.match.params)
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
        console.log(res);
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
  handleSearch = event => {
    this.setState({
      search : event.target.value,
      isSearch : true
    })
  }
   
  render() {
    const { hero,search } = this.state;

    return (
      <>
        <Header
          title={`${hero.name}`}
          home="/"
          tar="Home"
          search_val={search}
          handleChange={this.handleSearch}
          linkTo={search}
        />
        <div
          className={`${
            this.state.isLoading ? "preloader" : "preloader-is-done"
          }`}
        >
          <span
            className={`${
              this.state.isLoading ? "preloader-text" : "preloader-text-is-done"
            }`}
          >
            Loading ...
          </span>
        </div>

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

          <span className="skills">Ability : </span>

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
