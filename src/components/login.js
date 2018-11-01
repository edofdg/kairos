import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/register.css';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { withRouter } from 'react-router-dom'
class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            pin: ''
        };
    }
    handleInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    login = () => {
        let userNames = ['DCPEAST', 'OFDG', 'ADLCP', 'USER'];
        if(this.state.pin === '1234' &&  userNames.indexOf(this.state.name) > -1) {

            this.props.history.push("/home");
            // window.location.href = "/home";
            // window.history.pushState(window.location.href, null,'/home');
        } else {
            alert('Wrong credentials');
        }
    }

    render() {
        return (
           <div className="padding-20">
                <TextField
                    name="name"
                    hintText="Name"
                    floatingLabelText="Name"
                    fullWidth
                    onChange={(event) => this.handleInput(event)}
                />
                <TextField
                    name="pin"
                    hintText="Pin"
                    floatingLabelText="Pin"
                    fullWidth
                    onChange={(event) => this.handleInput(event)}
                />
                <div className="margin-top-30 margin-left-30">

                    {/* <Link to={'/home'} className='register-button'>Login</Link> */}


                    <RaisedButton className='register-button' onClick={this.login} label="LOGIN" primary={true} style={{ 'margin': 16 }} />
                </div>
           </div>
        );
    }
}

export default Login;