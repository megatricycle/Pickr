import React, {PropTypes} from 'react';
import { connect } from 'react-redux';

import Tag from './Tag.jsx';

import { modifyStudents } from '../actions/controlpanelActions';

class StudentFilterForm extends React.Component {

    componentWillMount() {
        this.studentsToCall = [];
    }

    addStudent(student) {
        if(this.studentsToCall.indexOf(student) != -1) {
            return;
        }
        this.studentsToCall.push(student);
        this.props.modifyStudents(this.studentsToCall);
    }

    render() {
        return (
            <ul className="collapsible" data-collapsible="accordion">
                <li>
                    <div className="collapsible-header">
                        Add student to call
                        <i className="material-icons">add</i>
                    </div>
                    <div className="collapsible-body">
                        <ul className="collection">
                        {this.props.students.map((studentItem) => {
                            let img;
                            if(!studentItem.image) {
                                img = '/img/defaultPP.png';
                            }
                            else {
                                img = '/uploads/' + studentItem.image;
                            }

                            return (
                                <li key={studentItem.id} className="collection-item">
                                    <div className="row">
                                        <div className="right">
                                            <a className="btn-flat" onClick={() => this.addStudent(studentItem)}><i className="material-icons">add</i></a>
                                        </div>
                                        <img className="img-avatar" src={img} alt=""  style={{float: 'left', height: '45px', width: '45px', marginRight:'10px'}}/>
                                        {studentItem.fname + " " + studentItem.mname + " " + studentItem.lname}
                                        <div className="font-w400 text-muted">
                                            <small>
                                                {studentItem.tags.map((tag) =>
                                                    <Tag
                                                        key={tag}
                                                        name={tag}/>
                                                )}
                                            </small>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                        </ul>
                    </div>
                </li>
            </ul>
        );
    }
}

StudentFilterForm.propTypes = {
    students: PropTypes.array.isRequired,
    modifyStudents: PropTypes.func.isRequired
};

export default connect(
    state => ({ controlPanelState: state.controlPanelState }),
    { modifyStudents }
)(StudentFilterForm);
