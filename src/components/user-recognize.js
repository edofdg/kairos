import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import './styles.css';

class UserRecognize extends Component {

    getFormattedDetails = () => {
        const { classes } = this.props;
        let data;
        try {
            data = JSON.parse(this.props.detect.name);
        } catch(e) {
            data = {};
        }
          return  <div>
               <div className="text-field"><b>Name: </b> {data.name}</div>
               <div className="text-field"><b>Father's Name: </b> {data.fatherName}</div>
               <div className="text-field"><b>Aadhar No: </b> {data.aadharNo}</div>
               <div className="text-field"><b>Type: </b> {data.type}</div>
               <div className="text-field"><b>Last Known Location: </b> {data.lastLoc}</div>
               <div className="text-field"><b>ID: </b> {data.id}</div>
               <div className="text-field"><b>Description: </b> {data.desc}</div>
               <div className="text-field"><b>Gang: </b> {data.gang}</div>
               <div className="text-field"><b>Co-Criminals: </b> {data.coCriminals}</div>
            </div>;
    }
    render() {
        if (this.props.detect.message === 'error') {
            return (<p><b>Face not in the frame or gallery is empty.</b> Please try again by occupying the frame and if the error still persists, try registering.</p>);
        } else if (this.props.detect.message === 'failure') {
            return (<p><b>Face not in gallery.</b> Please register with us <Link to={'/register'}>here</Link></p>);
        } else if (this.props.detect.message === 'success') {
            return (
                <div>
                    {this.getFormattedDetails()}
                    {/* <p><b>Profile name: </b>{this.props.detect.name}</p> */}
                    {/* <p><b>Face ID: </b>{this.props.detect.faceID}</p> */}
                </div>);
        } else {
            return <p><b>RECOGNITION STATUS</b> WILL BE DISPLAYED HERE</p>
        }
    }
}

export default UserRecognize;