import React, { Component } from 'react';
import Modal from 'react-modal';
import Roles from './Roles';

class Users extends Component {
  state = { isOpen: false };
  openModal = () => {
    this.setState({ ...this.state, isOpen: true });
  };

  // afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  //   subtitle.style.color = '#f00';
  // }

  closeModal = () => {
    this.setState({ ...this.state, isOpen: false });
  };

  render() {
    return (
      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '440px',
          }}
        >
          <span>
            <h5 style={{ margin: '0', padding: '0' }}>Users</h5>
            <p style={{ margin: '0', padding: '0' }}>
              Configuration of Users and their Roles
            </p>

            <p
              htmlFor="name"
              style={{
                margin: '25px 0 0 0',
                padding: '0',
                fontSize: '12px',
              }}
            >
              New User Email
            </p>
            <div
              className="input-field"
              style={{
                width: '100%',

                marginTop: '0',
              }}
            >
              <span>
                <input
                  id="name"
                  // disabled={!this.props.state.flag}
                  style={{ fontWeight: 'bolder', width: '61%' }}
                  type="text"
                  // value={this.props.state.name}
                  // required
                  // onChange={this.props.handleChange}
                />
              </span>
              <button
                className="btn-det btn waves-effect"
                // onClick={this.handleSubmit}
              >
                Add Users
              </button>
              <button
                className="btn-det btn waves-effect"
                onClick={this.openModal}
              >
                Configure Roles
              </button>
            </div>
            <div className="users-list">
              {this.props.viewUser.map((v) => (
                <p>{v.Name}</p>
              ))}
            </div>
          </span>
          <button
            className="btn-det btn waves-effect"
            onClick={this.props.closeModal}
          >
            Close Modal
          </button>
        </div>
        <Modal
          isOpen={this.state.isOpen}
          onRequestClose={this.closeModal}
          className="ModalRoles"
          overlayClassName="Overlay"
          shouldCloseOnOverlayClick
        >
          <Roles />
        </Modal>
      </div>
    );
  }
}

export default Users;
