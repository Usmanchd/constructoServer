import React, { Component } from 'react';
import Modal from 'react-modal';
import Roles from './Roles';
import { connect } from 'react-redux';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { handleAddUser } from '../../../store/actions/projectActions';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

class Users extends Component {
  componentDidMount = () => {
    this.setState({
      ...this.state,
      user: this.props.viewUser.map((u) => {
        return {
          uservalue: { ...u },
          selectedOption: null,
        };
      }),
    });
  };

  state = { isOpen: false, email: '', selectedOption: null, user: [] };
  openModal = () => {
    this.setState({ ...this.state, isOpen: true });
  };

  // afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  //   subtitle.style.color = '#f00';
  // }
  handleChange = (selectedOption, i) => {
    this.setState({
      ...this.state,
      user: this.state.user.map((u, index) => {
        if (i === index) {
          return { ...u, selectedOption };
        } else return u;
      }),
    });
  };

  closeModal = () => {
    this.setState({ ...this.state, isOpen: false });
  };

  addUser = () => {
    this.props.handleAddUser(this.state.email, this.props.projectID);
  };

  render() {
    console.log(this.props.userID, this.props.projectID);
    console.log(this.state);
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
                  id="email"
                  // disabled={!this.props.state.flag}
                  style={{ fontWeight: 'bolder', width: '61%' }}
                  type="text"
                  value={this.state.email}
                  // required
                  onChange={(e) =>
                    this.setState({ ...this.state, email: e.target.value })
                  }
                />
              </span>
              <button
                className="btn-det btn waves-effect"
                onClick={this.addUser}
              >
                Add User
              </button>
              <button
                className="btn-det btn waves-effect"
                onClick={this.openModal}
              >
                Configure Roles
              </button>
            </div>
            <div className="users-list">
              {this.state.user &&
                this.state.user.map((v, i) => (
                  <p
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    {v.uservalue.Name}
                    <Dropdown
                      options={options}
                      onChange={(selectedOption) =>
                        this.handleChange(selectedOption, i)
                      }
                      value={v.selectedOption}
                      placeholder="Select an option"
                      className="dropdown"
                    />
                  </p>
                ))}
              {this.props.pendingRegistrations.map((pr) => (
                <p>{pr}</p>
              ))}
            </div>
          </span>
          <button
            className="btn-det btn waves-effect"
            onClick={this.props.closeModal}
          >
            Close
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

export default connect(null, { handleAddUser })(Users);
