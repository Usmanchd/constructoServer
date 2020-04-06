import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  handleRole,
  handleUpdateRole,
} from '../../../store/actions/projectActions';

class Roles extends Component {
  state = { edit: true, showSetting: false, currentRole: {} };
  handleRole = (roleName) => {
    console.log(this.props.roles, roleName);
    let currentRole = this.props.definedRoles.filter(
      (role) => role.roleName === roleName.value
    );
    this.setState(
      {
        ...this.state,
        currentRole: currentRole[0],
        showSetting: true,
        edit: true,
      },
      (s) => console.log(s)
    );
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
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridGap: '20px',
        }}
      >
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
          <div className="users-list" style={{ height: '265px' }}>
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

            <div className="users-list" style={{ height: '265px' }}>
              <React.Fragment>
                <p className="default-list">
                  Diary
                  <span
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <button
                      className={
                        this.state.currentRole.diaryRule === 'READ'
                          ? 'btn-det-yellow btn waves-effect '
                          : 'btn-det btn waves-effect'
                      }
                      onClick={() => {
                        this.setState({
                          ...this.state,
                          currentRole: {
                            ...this.state.currentRole,
                            diaryRule: 'READ',
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
                        this.state.currentRole.diaryRule === 'WRITE'
                          ? 'btn-det-yellow btn waves-effect'
                          : 'btn-det btn waves-effect'
                      }
                      onClick={() => {
                        this.setState({
                          ...this.state,
                          currentRole: {
                            ...this.state.currentRole,
                            diaryRule: 'WRITE',
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
                        this.state.currentRole.diaryRule === 'DISABLE'
                          ? 'btn-det-yellow btn waves-effect'
                          : 'btn-det btn waves-effect'
                      }
                      onClick={() => {
                        this.setState({
                          ...this.state,
                          currentRole: {
                            ...this.state.currentRole,
                            diaryRule: 'DISABLE',
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
                <p className="default-list">
                  Documentation
                  <span
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <button
                      className={
                        this.state.currentRole.documentationRule === 'READ'
                          ? 'btn-det-yellow btn waves-effect'
                          : 'btn-det btn waves-effect'
                      }
                      onClick={() => {
                        this.setState({
                          ...this.state,
                          currentRole: {
                            ...this.state.currentRole,
                            documentationRule: 'READ',
                          },
                        });
                      }}
                      style={{
                        margin: '6px 0',
                        borderRadius: '5px 0px 0px 5px',
                      }}
                    >
                      Read
                    </button>
                    <button
                      className={
                        this.state.currentRole.documentationRule === 'WRITE'
                          ? 'btn-det-yellow btn waves-effect'
                          : 'btn-det btn waves-effect'
                      }
                      onClick={() => {
                        this.setState({
                          ...this.state,
                          currentRole: {
                            ...this.state.currentRole,
                            documentationRule: 'WRITE',
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
                        this.state.currentRole.documentationRule === 'DISABLE'
                          ? 'btn-det-yellow btn waves-effect'
                          : 'btn-det btn waves-effect'
                      }
                      onClick={() => {
                        this.setState({
                          ...this.state,
                          currentRole: {
                            ...this.state.currentRole,
                            documentationRule: 'DISABLE',
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
                    {/* {this.state.currentRole.roleName},
                  {this.state.currentRole.rolesRule},
                  {this.state.currentRole.projectRule} */}
                  </span>
                </p>
                <hr />
                <p className="default-list">
                  Roles
                  <span
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <button
                      className={
                        this.state.currentRole.rolesRule === 'READ'
                          ? 'btn-det-yellow btn waves-effect '
                          : 'btn-det btn waves-effect'
                      }
                      onClick={() => {
                        this.setState({
                          ...this.state,
                          currentRole: {
                            ...this.state.currentRole,
                            rolesRule: 'READ',
                          },
                        });
                      }}
                      style={{
                        margin: '6px 0',
                        borderRadius: '5px 0px 0px 5px',
                      }}
                    >
                      Read
                    </button>
                    <button
                      className={
                        this.state.currentRole.rolesRule === 'WRITE'
                          ? 'btn-det-yellow btn waves-effect '
                          : 'btn-det btn waves-effect'
                      }
                      onClick={() => {
                        this.setState({
                          ...this.state,
                          currentRole: {
                            ...this.state.currentRole,
                            rolesRule: 'WRITE',
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
                        this.state.currentRole.rolesRule === 'DISABLE'
                          ? 'btn-det-yellow btn waves-effect '
                          : 'btn-det btn waves-effect'
                      }
                      onClick={() => {
                        this.setState({
                          ...this.state,
                          currentRole: {
                            ...this.state.currentRole,
                            rolesRule: 'DISABLE',
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
                    {/* {this.state.currentRole.roleName},
                  {this.state.currentRole.rolesRule},
                  {this.state.currentRole.projectRule} */}
                  </span>
                </p>
                <hr />
              </React.Fragment>
            </div>

            <button
              className="btn-det btn waves-effect"
              // onClick={this.props.closeModal}
              style={{ width: '90%', marginTop: '6px' }}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { handleRole, handleUpdateRole })(Roles);
