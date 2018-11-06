import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            characterList: []
         }
    }
    componentDidMount() {
        axios.get('/api/got-characters/').then( res => {
            console.log(res.data)
            this.setState({
                characterList: res.data
            })
        }).catch(err => console.log('err', err));
            
            // this.setState({
            //     characterList: res.data
            // })
        
    }
    testLogOut() {
        console.log('fired');
        
        axios.post('/api/logout')
            .then(res => {
                window.location.href = '/'
            })
            .catch(err => console.log('Err in testLogout', err))
    }
    render() { 
        console.log(this.state.characterList)
        let mappedCharacters = this.state.characterList.map((character, i) => {
            return (
                <Link to={`/character/${character.id}`}>
                    <div className="each-character-container">
                        <h1 className="character-name">{character.name}</h1>
                        <p className="character-alias">Alias:  {character.alias}</p>
                        <p className="character-played-by">Played by: {character.playedby}</p>
                    </div>
                </Link>

            )
        }
            
        )
        return ( 
            <div className="home-page">
                
                <h1>Game of Thrones Characters</h1>
                <h2>List of characters</h2>
                {mappedCharacters}
                {/* <Link to="/character">See characters</Link> */}
                <button onClick={this.testLogOut}>Logout</button>
            </div>
            
         );
    }
}
 
export default Home;