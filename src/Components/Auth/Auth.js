import React, { Component } from 'react';
//import {handleUsername} from '../../redux/reducer';
import axios from 'axios';
import './Auth.css';

class Auth extends Component {

      login = () => {
        console.log('herro2');
        const redirectUri = encodeURIComponent(`${window.location.origin}/callback`);
        console.log(redirectUri);
        console.log(process.env);
        window.location = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`
      }



    // handleRegister(username, password) {
    //     axios.post('/api/register-user', {username, password}).then(res => {
    //         this.props.history.push('/dashboard')
    //     })
    // }

    // handlePassword(input) {
    //     this.setState ({
    //         password: input
    //     });
    // }

    render() { 
        return (  
            <div className="auth-container">
                <h1 className="auth-title">Auth</h1>
                <h2>Login to check out a list of characters from Game of Thrones</h2>
                <button className='login' 
                onClick={this.login}>Login</button>
                <img className="second-img" src="../../media/game-of-thrones-poster_85627-1920x1200.jpg" />
            </div>
            
        );
    }
}
 
export default Auth;