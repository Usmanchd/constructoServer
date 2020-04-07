import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  handleRole,
  handleUpdateRole,
  deleteRole,
} from '../../../store/actions/projectActions';

const rolesArray = [
  'diaryRule',
  'documentationRule',
  'rolesRule',
  'projectRule',
];

class Roles extends Component {
  state = { edit: true, showSetting: false, currentRole: {} };
  handleRole = (roleName) => {
    let currentRole = this.props.definedRoles.filter(
      (role) => role.roleName === roleName.value
    );
    this.setState({
      ...this.state,
      currentRole: currentRole[0],
      showSetting: true,
      edit: true,
    });
  };
  handleDeleteRole = () => {
    const { roleName } = this.state.currentRole;
    if (roleName === 'ADMINISTRATOR' || roleName === 'ORDINARY') return;
    else this.props.deleteRole(roleName, this.props.projectID);
  };

  handleAddNewRole = () => {
    let currentRole = this.props.definedRoles.filter(
      (role) => role.roleName === 'ORDINARY'
    );
    this.setState({
      ...this.state,
      currentRole: { ...currentRole[0], roleName: 'New Role' },
      showSetting: true,
      edit: false,
    });
  };

  saveRole = () => {
    if (this.state.currentRole.roleName === undefined) return;
    if (this.state.edit)
      this.props.handleUpdateRole(this.state.currentRole, this.props.projectID);
    else this.props.handleRole(this.state.currentRole, this.props.projectID);
  };
  render() {
    return (
      <div className="roles-grid">
        <div>
          <h5 style={{ margin: '0', padding: '0' }}>Users</h5>
          <p style={{ margin: '0 0 4px 0', padding: '0' }}>
            Configuration of Roles
          </p>
          <button
            className="btn-det btn waves-effect"
            onClick={this.handleAddNewRole}
            style={{ width: '90%', marginBottom: '14px' }}
          >
            Add New
          </button>
          <div className="users-list" style={{ height: '300px' }}>
            {this.props.options.map((option) => (
              <React.Fragment>
                <p
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                  className="default-list"
                  onClick={() => this.handleRole(option)}
                >
                  {option.label}
                </p>
                <hr />
              </React.Fragment>
            ))}
          </div>
          <button
            className="btn-det btn waves-effect"
            onClick={this.props.closeModal}
            style={{ width: '90%', marginTop: '6px' }}
          >
            Close
          </button>
        </div>
        {this.state.showSetting && (
          <div>
            <h5 style={{ margin: '0', padding: '0' }}>Roles Settings</h5>
            <p style={{ margin: '0', padding: '0' }}>Setting of Roles</p>
            <input
              id="roleName"
              // disabled={!this.props.state.flag}
              style={{ fontWeight: 'bolder', width: '60%' }}
              type="text"
              value={
                this.state.currentRole.roleName &&
                this.state.currentRole.roleName
              }
              required
              onChange={(e) =>
                this.setState({
                  ...this.state,
                  currentRole: {
                    ...this.state.currentRole,
                    roleName: e.target.value,
                  },
                })
              }
            />
            {this.state.edit ? (
              <button
                className="btn-det btn waves-effect"
                onClick={this.saveRole}
              >
                Update
              </button>
            ) : (
              <button
                className="btn-det btn waves-effect"
                onClick={this.saveRole}
              >
                Save
              </button>
            )}

            <div className="users-list" style={{ height: '300px' }}>
              {rolesArray.map((role) => (
                <React.Fragment>
                  <p className="default-list">
                    {role}
                    <span
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <button
                        className={
                          this.state.currentRole[role] === 'READ'
                            ? 'btn-det-yellow btn waves-effect '
                            : 'btn-det btn waves-effect'
                        }
                        onClick={() => {
                          this.setState({
                            ...this.state,
                            currentRole: {
                              ...this.state.currentRole,
                              [role]: 'READ',
                            },
                          });
                        }}
                        style={{
                          margin: '6px 0',
                          borderRadius: '5px 0px 0px 5px',
                          backgroundColor: 'red',
                        }}
                      >
                        Read
                      </button>
                      <button
                        className={
                          this.state.currentRole[role] === 'WRITE'
                            ? 'btn-det-yellow btn waves-effect'
                            : 'btn-det btn waves-effect'
                        }
                        onClick={() => {
                          this.setState({
                            ...this.state,
                            currentRole: {
                              ...this.state.currentRole,
                              [role]: 'WRITE',
                            },
                          });
                        }}
                        style={{
                          margin: '6px 0',
                          borderRadius: '0',
                        }}
                      >
                        Write
                      </button>
                      <button
                        className={
                          this.state.currentRole[role] === 'DISABLE'
                            ? 'btn-det-yellow btn waves-effect'
                            : 'btn-det btn waves-effect'
                        }
                        onClick={() => {
                          this.setState({
                            ...this.state,
                            currentRole: {
                              ...this.state.currentRole,
                              [role]: 'DISABLE',
                            },
                          });
                        }}
                        style={{
                          margin: '6px 0',
                          borderRadius: '0px 5px 5px 0px',
                        }}
                      >
                        Disable
                      </button>
                    </span>
                  </p>
                  <hr />
                </React.Fragment>
              ))}
            </div>
            {this.state.edit && (
              <button
                className="btn-det btn waves-effect"
                // onClick={this.props.closeModal}
                onClick={this.handleDeleteRole}
                style={{ width: '90%', marginTop: '6px' }}
              >
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, {
  handleRole,
  handleUpdateRole,
  deleteRole,
})(Roles);
