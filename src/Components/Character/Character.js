import React, { Component } from 'react';
import axios from 'axios';

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
            <div>
                character page
                <h1>{this.state.character.name}</h1>
                <p> {this.state.character.alias}</p>
                <p> {this.state.character.playedby}</p>
            </div>
         );
    }
}
 
export default Character;