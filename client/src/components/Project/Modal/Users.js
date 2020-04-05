import React, { Component } from 'react';
import Modal from 'react-modal';
import Roles from './Roles';
import { connect } from 'react-redux';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { handleAddUser } from '../../../store/actions/projectActions';
import { Icon } from 'react-icons-kit';
import { cross } from 'react-icons-kit/icomoon/cross';

// const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' },
// ];

class Users extends Component {
  componentDidMount = () => {
    this.setState({
      ...this.state,
      user: this.props.viewUser.map((u) => {
        return {
          uservalue: { ...u },
          selectedOption: this.getRole(u),
        };
      }),
      options: this.getOptions(),
    });
  };
  getRole = (user) => {
    let u = this.props.roles.filter((role) => role.userID === user.ID);
    console.log(u);
    if (u) return u[0].roleName;
    else return null;
  };

  getOptions = () => {
    let uniqueNames = [];
    this.props.roles.map(
      (role) =>
        !uniqueNames.includes(role.roleName) && uniqueNames.push(role.roleName)
    );
    console.log(uniqueNames);
    let option = uniqueNames.map((un) => {
      return {
        value: un,
        label: un,
      };
    });
    console.log(option);
    return option;
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

  addUser = (e) => {
    if (this.state.email === '') return;
    this.props.handleAddUser(this.state.email, this.props.projectID);
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
              <form onSubmit={(e) => e.preventDefault()}>
                <span>
                  <input
                    id="email"
                    // disabled={!this.props.state.flag}
                    style={{ fontWeight: 'bolder', width: '60%' }}
                    type="email"
                    value={this.state.email}
                    required
                    onChange={(e) =>
                      this.setState({ ...this.state, email: e.target.value })
                    }
                  />
                </span>
                <input
                  type="submit"
                  className="btn-det btn waves-effect"
                  value="Add User"
                  onClick={this.addUser}
                />

                <button
                  className="btn-det btn waves-effect"
                  onClick={this.openModal}
                >
                  Configure Roles
                </button>
              </form>
            </div>
            <div className="users-list">
              {this.state.user &&
                this.state.user.map((v, i) => (
                  <React.Fragment>
                    <p
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                      className="default-list"
                    >
                      {v.uservalue.Name}
                      <span
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <Dropdown
                          options={this.state.options && this.state.options}
                          onChange={(selectedOption) =>
                            this.handleChange(selectedOption, i)
                          }
                          value={v.selectedOption}
                          placeholder="Select an option"
                          className="dropdown"
                        />
                        <span style={{ color: '#c4302b', marginLeft: '4px' }}>
                          <Icon size={24} icon={cross} />
                        </span>
                      </span>
                    </p>
                    <hr />
                  </React.Fragment>
                ))}
              {this.props.pendingRegistrations.map((pr) => (
                <React.Fragment>
                  <span
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <p className="default-list">{pr} (Pending Registation)</p>{' '}
                    <span style={{ color: '#c4302b', marginLeft: '4px' }}>
                      <Icon size={24} icon={cross} />
                    </span>
                  </span>
                  <hr />
                </React.Fragment>
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
          <Roles
            roles={this.props.roles}
            options={this.state.options}
            closeModal={this.closeModal}
          />
        </Modal>
      </div>
    );
  }
}

export default connect(null, { handleAddUser })(Users);
