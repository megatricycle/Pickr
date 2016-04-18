import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
const Materialize = window.Materialize;
import { editClass } from '../actions/classListActions.js';
import {Modal} from 'react-materialize';

class ClassEditModal extends React.Component {
    edit(e) {
        e.preventDefault();
        let newClass = {
            id: this.props.classData.id,
            classCode: $('#eclassCode'+this.props.classData.id).val(),
            className: $('#eclassName'+this.props.classData.id).val(),
            AccountId: this.props.classData.AccountId
        };
        this.props.editClass(newClass).then((res) => {
            Materialize.toast('Successfully edited class.', 4000, 'toast-success');
        })
        .catch((err) => {
            Materialize.toast('Error editing class.', 4000, 'toast-error');
        });
    }

    render() {
        return (
          <Modal trigger={<i className="material-icons right green">mode_edit</i>} header="Edit Student">
                <form onSubmit={(e) => this.edit(e)}>
                    <div className="modal-content">
                      <div className="row">
                          <div className="input-field col s12">
                              <label>Class Code</label>
                              <input id={"eclassCode"+this.props.classData.id} type="text" className="validate" defaultValue={this.props.classData.classCode}/>
                          </div>
                      </div>
                      <div className="row">
                          <div className="input-field col s12">
                              <label>Clas Name</label>
                              <input id={"eclassName"+this.props.classData.id} type="text" className="validate" defaultValue={this.props.classData.className}/>
                          </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                        <Link to="#" className="waves-effect waves-red btn-flat modal-action modal-close">Cancel</Link>
                        <button type="submit" className="waves-effect waves-green btn-flat modal-action modal-close">Edit Class</button>
                    </div>
                </form>
          </Modal>
        );
    }
}

ClassEditModal.propTypes = {
    classData: PropTypes.object.isRequired,
    editClass: PropTypes.func.isRequired
};
export default connect(
state => ({ classroomListState: state.classListAppState }),
    { editClass }
)(ClassEditModal);