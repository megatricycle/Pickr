

// Import dependencies
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';

import NavBar from '../components/NavBar.jsx';

//import classListJS from '../../externalDependencies/js/classList.js';

// IMPORTANT! Materialize functions are exposed in window object, so you might want to assign that to a Materialize variable.
const Materialize = window.Materialize;
const $ = window.$;

// Be sure to rename your class name
class ClassList extends React.Component {
    componentDidMount() {
        $('.modal-trigger').leanModal();
        $('.carousel').carousel();

        let carousel = document.getElementById('classCarousel');
        carousel.style.visibility = "hidden";

        let cards = document.getElementById('classCards');
        cards.style.visibility = "visible";
    }

    handleClick(){
        let carousel = document.getElementById('classCarousel');
        let cards = document.getElementById('classCards');
        if(carousel.style.visibility == 'visible'){
            carousel.style.visibility = 'hidden';
        }else{
            carousel.style.visibility = 'visible';
        }
        if(cards.style.visibility == 'visible'){
            cards.style.visibility = 'hidden';
        }else{
            cards.style.visibility = 'visible';
        }
    }

    render() {
        return (
            <div>
                <div style={{
                    textAlign: 'center',
                    margin: 'auto',
                    paddingTop: '8%'
                }}>
                    <Link className="waves-effect waves-light btn modal-trigger green" to="#addclass">Add Class</Link>
                    <button className="btn waves-effect waves-light grey darken-3" type="submit" name="action" onClick={this.handleClick} >Toggle View</button>
                </div>
                <div className="container">
                    <h4>Classes</h4>
                    <div id="classCarousel" className="carousel" style={{position: 'relative', top: '-50px'}}>
                        <Link className="carousel-item" to="/classroom">
                            <div className="classroomPallete">
                                <i className="material-icons right">delete</i>
                                <h5>CMSC 170</h5>
                                <h6>U-6l</h6>
                                <br/>
                                <h6>Artificial Intelligence</h6>
                            </div>
                            <div className="notes">Due Friday Activity: Karakot dakot na activity about probability</div>
                        </Link>
                        <Link className="carousel-item" to="/classroom">
                            <div className="classroomPallete">
                                <i className="material-icons right">delete</i>
                                <h5>CMSC 132</h5>
                                <h6>T-1L</h6>
                                <br/>
                                <h6>Kristine Elaine Bautista</h6>
                            </div>
                            <div className="notes">Due Tomorrow Activity: Sequential circuit</div>
                        </Link>
                        <Link className="carousel-item" to="/classroom">
                            <div className="classroomPallete">
                                <i className="material-icons right">delete</i>
                                <h5>CMSC 125</h5>
                                <h6>ST-1l</h6>
                                <br/>
                                <h6>John Emmanuel Encinas</h6>
                            </div>
                            <div className="notes"></div>
                        </Link>
                        <Link className="carousel-item" to="/classroom">
                            <div className="classroomPallete">
                                <i className="material-icons right">delete</i>
                                <h5>CMSC 141</h5>
                                <h6>2L</h6>
                                <br/>
                                <h6>Donna Drio</h6>
                            </div>
                            <div className="notes"></div>
                        </Link>

                    </div>

                    <div id="classCards" className="container" style={{position: 'relative', top: '-400px'}}>
                        <div className="row">
                            <ul>
                                <li>
                                    <div className="col s12 m6 l4">
                                        <div className="card-panel green darken-2 class-card">
                                            <h5>
                                                <Link to="/classroom">CMSC 128</Link>
                                            </h5>
                                            <h6>AB-3L</h6>
                                            <p>
                                                Introduction to Software Engineering
                                            </p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="col s12 m6 l4">
                                        <div className="card-panel green darken-2 class-card">
                                            <h5>
                                                <Link to="/classroom">CMSC 128</Link>
                                            </h5>
                                            <h6>AB-3L</h6>
                                            <p>
                                                Introduction to Software Engineering
                                            </p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="col s12 m6 l4">
                                        <div className="card-panel green darken-2 class-card">
                                            <h5>
                                                <Link to="/classroom">CMSC 128</Link>
                                            </h5>
                                            <h6>AB-3L</h6>
                                            <p>
                                                Introduction to Software Engineering
                                            </p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="col s12 m6 l4">
                                        <div className="card-panel green darken-2 class-card">
                                            <h5>
                                                <Link to="/classroom">CMSC 128</Link>
                                            </h5>
                                            <h6>AB-3L</h6>
                                            <p>
                                                Introduction to Software Engineering
                                            </p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="col s12 m6 l4">
                                        <div className="card-panel green darken-2 class-card">
                                            <h5>
                                                <Link to="/classroom">CMSC 128</Link>
                                            </h5>
                                            <h6>AB-3L</h6>
                                            <p>
                                                Introduction to Software Engineering
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div id="addclass" className="modal">
                    <div className="modal-content">
                        <h3>Add Class</h3>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="className" type="text" className="validate"/>
                                <label htmlFor="className">Class Name</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="classSection" type="text" className="validate"/>
                                <label htmlFor="classSection">Class Section</label>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <Link to="#" className="waves-effect waves-red btn-flat modal-action modal-close">Cancel</Link>
                        <Link to="#" className="waves-effect waves-green btn-flat modal-action modal-close">Add Class</Link>
                    </div>
                </div>
            </div>
        );
    }
}

// connect to redux store
export default ClassList;