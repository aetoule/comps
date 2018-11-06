import React, { Component } from 'react';
import axios from 'axios';
import './Character.css';

class Character extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            character: {}
         }
    }
    componentDidMount() {
        axios.get(`/api/got-one-character/${this.props.match.params.id}`)
        .then(res => {
            console.log(res.data[0])
            this.setState({ character: res.data[0] });
        })
    }
    render() { 
        return ( 
            <div className="character-page">
                <div className="character-img"></div>
                <div className="character-info-container">
                    <h1 className="character-name-character">{this.state.character.name}</h1>
                    <p className="character-alias-character"> {this.state.character.alias}</p>
                    <p className="character-playedby-character"> {this.state.character.playedby}</p>
                </div>
                <footer>Game of Thrones Characters</footer>
            </div>
         );
    }
}
 
export default Character;