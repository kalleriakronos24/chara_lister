import React from "react";
import Header from "../header/index";

export default class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      hero: {
        _id: "",
        name: "",
        skills: []
      }
    };
  }

  componentDidMount() {
    this.fetchHero();
  }

  fetchHero() {
    console.log(this.props.match.params.id);
    const query = {
      query: `
                query {
                    getHero(get: "${this.props.match.params.id}"){
                        _id
                        name
                        skills{
                            skill_name
                        }
                    }
                }
            `
    };
    fetch("http://localhost:3005/data/api", {
      method: "POST",
      body: JSON.stringify(query),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(res => {
        this.setState({
          hero: {
            _id: res.data.getHero._id,
            name: res.data.getHero.name,
            skills: res.data.getHero.skills
          },
          isLoading: false
        });
        console.log(JSON.stringify(this.state.hero.skills));
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { hero } = this.state;

    return (
      <>
        <Header
          title={`Viewed Chara : ${hero.name}`}
          home="/"
          tar="Home"
          about="What's this ?"
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
          <div className="container-img"></div>
          <span className="description">Description : </span>
          <div className="description-text-field">
            <span className="desc-text">
              qweokqwoekqowekqwoekqowkeoqwkeoqkweokqweokqweokqwoekqweokqweokqweokqweokqweokqweokqweokqwoekqweokqwoek
            </span>
          </div>

          <span className="skills">Ability : </span>

          <div className="skill-list-container">
            {this.state.hero.skills.map((s, idx) => (
              <span className="skills-list">{s.skill_name}</span>
            ))}
          </div>

          <span className="element-text">Element : </span>
          <span className="element-icon-name">{hero.name}</span>
          <span className="race-text">Race : </span>
          <span className="race-name">{hero.race}</span>
        </div>
        
      </>    
    );
  }
}
