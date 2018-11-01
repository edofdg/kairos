import React, { Component } from 'react';
import Webcam from 'react-webcam';
import '../styles/register.css';

import axios from 'axios';
import { Grid, Row, Col } from 'react-flexbox-grid';

import { connect } from 'react-redux';
import { registerUser, clearDisplayData } from '../actions';

import UserRegister from './user-register';

// material-ui components
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';

import { APP_ID, APP_KEY } from '../constants/credentials';

// loader styling
const style = {
    container: {
        position: 'absolute',
    },
    refresh: {
        display: 'inline-block',
        position: 'absolute',
    },
    hide: {
        display: 'none',
        position: 'absolute',
    },
};

const videoConstraints = {
    facingMode: { exact: "environment" }
  };

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // username: '',
            name: '',
            fatherName: '',
            aadharNo: '',
            mo: '',
            type: '',
            lastLoc: '',
            id: '',
            desc: '',
            gang: '',
            coCriminals: '',
            encodedData: '',
            load: false
        };
    }

    componentDidMount() {
        this.props.clearDisplayData();
    }

    setRef = (webcam) => {
        this.webcam = webcam;
    }

    getEncodedData = () => {
        let data = {
            name: this.state.name,
            fatherName: this.state.fatherName,
            aadharNo: this.state.aadharNo,
            mo: this.state.mo,
            type: this.state.type,
            lastLoc: this.state.lastLoc,
            id: this.state.id,
            desc: this.state.desc,
            gang: this.state.gang,
            coCriminals: this.state.coCriminals,
            // encodedData: this.state.encodedData,
        };
        return JSON.stringify(data);
    }

    capture = () => {

        if (this.state.name.trim().length === 0) {
            alert('Name cannot be empty');
            return;
        }

        this.setState({
            load: true
        });

        const imageSrc = this.webcam.getScreenshot();

        axios.post(`https://api.kairos.com/enroll`, {
            gallery_name: 'newCameriaGallery',
            image: imageSrc,
            subject_id: this.getEncodedData()
        }, {
                headers: {
                    app_id: APP_ID,
                    app_key: APP_KEY
                }
            }).then((response) => {
                console.log(response);
                this.props.registerUser(response.data);
                this.setState({
                    load: false
                });
            });
    }

    resetGallery = () => {

        this.setState({
            load: true
        });

        axios.post(`https://api.kairos.com/gallery/remove`, {
            gallery_name: "newCameriaGallery"
        }, {
                headers: {
                    app_id: APP_ID,
                    app_key: APP_KEY
                }
            }).then((response) => {
                alert('Gallery has been reset. Feel free to register now');
                this.setState({
                    load: false
                });
            });
    }

    handleInput(e) {
        console.log(e.target.name);
        // name
        // fatherName
        // aadharNo
        // mo
        // type
        // lastLoc
        // id
        // desc
        // gang
        // coCriminals
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleUserMedia = () => {
        const videoTrack = this.webcam.stream.getVideoTracks()[0];
        const constraints = videoTrack.getConstraints();
        constraints.facingMode = { exact: "environment" };
        videoTrack.applyConstraints(constraints);
      }

    render() {
        return (
            <Grid fluid>
                <Row>
                    <Col xs={12} md={4} mdOffset={4}>
                        <div style={{ 'textAlign': 'center' }}>
                            <h3>REGISTER FACE</h3>
                            <Webcam
                                audio={false}
                                height={320}
                                ref={this.setRef}
                                screenshotFormat="image/png"
                                width={320}
                                videoConstraints={videoConstraints}
                                onUserMedia={this.handleUserMedia}
                            />
                            <br />
                            <RaisedButton className='register-button' onClick={this.capture} label="REGISTER" primary={true} style={{ 'margin': 16 }} />
                            <RaisedButton className='register-button' onClick={this.resetGallery} label="RESET GALLERY" primary={true} style={{ 'margin': 16 }} />
                            <UserRegister detect={this.props.regData} />
                            <div style={{ 'margin': '0 auto!important' }}>
                                <TextField
                                    name="name"
                                    hintText="Name"
                                    floatingLabelText="Name"
                                    onChange={(event) => this.handleInput(event)}
                                />
                                <TextField
                                    name="fatherName"
                                    hintText="Father's Name"
                                    floatingLabelText="Father's Name"
                                    onChange={(event) => this.handleInput(event)}
                                />
                                <TextField
                                    name="aadharNo"
                                    hintText="Aadhar No"
                                    floatingLabelText="Aadhar No"
                                    onChange={(event) => this.handleInput(event)}
                                />
                                <TextField
                                    name="mo"
                                    hintText="MO"
                                    floatingLabelText="MO"
                                    onChange={(event) => this.handleInput(event)}
                                />
                                <TextField
                                    name="type"
                                    hintText="Type"
                                    floatingLabelText="Type"
                                    onChange={(event) => this.handleInput(event)}
                                />
                                <TextField
                                    name="lastLoc"
                                    hintText="Last Known Location"
                                    floatingLabelText="Last Known Location"
                                    onChange={(event) => this.handleInput(event)}
                                />
                                <TextField
                                    name="id"
                                    hintText="ID"
                                    floatingLabelText="ID"
                                    onChange={(event) => this.handleInput(event)}
                                />
                                <TextField
                                    name="desc"
                                    hintText="Description"
                                    floatingLabelText="Description"
                                    onChange={(event) => this.handleInput(event)}
                                />
                                <TextField
                                    name="gang"
                                    hintText="Gang"
                                    floatingLabelText="Gang"
                                    onChange={(event) => this.handleInput(event)}
                                />
                                <TextField
                                    name="coCriminals"
                                    hintText="Co-Criminals"
                                    floatingLabelText="Co-Criminals"
                                    onChange={(event) => this.handleInput(event)}
                                />
                            </div>
                            <br />
                            <RefreshIndicator
                                className='css-loader'
                                size={80}
                                left={70}
                                top={0}
                                loadingColor="#ADD8E6"
                                status="loading"
                                style={(this.state.load === false) ? style.hide : style.refresh}
                            />
                            <br />
                        </div>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

function mapStateToProps(state) {
    return {
        regData: state.regData
    }
}

export default connect(mapStateToProps, { registerUser, clearDisplayData })(Register);
