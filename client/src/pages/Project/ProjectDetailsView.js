import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { notification, Button, Modal } from 'antd'
import { Icon } from 'react-icons-kit'
import { arrowLeft2 } from 'react-icons-kit/icomoon/arrowLeft2'
import Loader from 'components/LayoutComponents/Loader'
import data from './Functions/PreDefinedState/State'
import {
  updateProject,
  getThisProject,
  createProject,
  deleteProject,
} from '../../redux/projects/projectActions'
import HandleSubmit from './Functions/HandleSubmit'
import HandleMarker from './Functions/HandleMarker'
import General from './Views/General'
import Management from './Views/Management'
import Settings from './Views/Settings'
import Users from './Modal/Users'
import styles from './style.module.css'

class ProjectDetailsView extends Component {
  state = { ...data }

  componentDidMount = () => {
    const {
      match: { params },
      getThisProject,
      profile: { Name },
      id,
    } = this.props

    if (params.id === 'create-project')
      this.setState({
        ...data,
        createdby: Name,
        flag: true,
        viewUser: [],
        pendingRegistrations: [],
      })
    else {
      getThisProject(id)
    }
  }

  componentDidUpdate = prevProps => {
    const { project, match, profile, viewUser } = this.props

    if (project === prevProps.project && match.params.id === prevProps.match.params.id) return

    if (match.params.id === 'create-project') {
      this.setState({
        ...data,
        createdby: profile.Name,
        flag: true,
        viewUser: [],
        pendingRegistrations: [],
      })
      return
    }

    this.setState({ ...project, viewUser, flag: false })
  }

  handleEdit = () => {
    const { project, profile } = this.props

    const userRole = project.roles.filter(role => role.usersID.includes(profile.ID))

    if (userRole[0].projectRule === 'WRITE') this.setState({ ...this.state, flag: true })
    else notification.error({ message: 'You are not Authorized to Edit Project !' })
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    })
  }

  handleSubmit = () => {
    const { name, city, street, zip, state, location, projectDescription, createdby } = this.state
    const { match, createProject, updateProject, history, profile } = this.props
    const inputError =
      !name || !city || !street || !zip || !state || !location || !projectDescription || !createdby

    if (inputError) {
      notification.error({
        message: 'Input Error',
        description: 'Please Fill in All Details',
      })
      return
    }

    HandleSubmit(this.state, match, createProject, updateProject, history, profile)

    this.setState({ flag: false })
  }

  handleDeleteProject = () => {
    const { match, project, deleteProject, history, profile } = this.props

    if (match.params.id === 'create-project') return

    if (project.userID === profile.ID) {
      deleteProject(project.ID)
      history.push('/list')
    }
  }

  handleLatLng = e => {
    const { state } = this.props

    this.setState({ ...state, lat: '', lng: '' })
    this.handleChange(e)
  }

  handleActive = () => {
    const { active } = this.state

    this.setState({
      ...this.state,
      active: !active,
    })
  }

  openModal = () => {
    const { project, profile } = this.props
    const userRole = project.roles.filter(role => role.usersID.includes(profile.ID))

    if (userRole[0].rolesRule === 'WRITE') this.setState({ ...this.state, isOpen: true })
    else notification.error({ message: 'You are not Authorized to configure Users !' })
  }

  closeModal = () => {
    this.setState({ ...this.state, isOpen: false })
  }

  handleMarker = (lat, lng) => {
    HandleMarker(lat, lng, this.state)
      .then(data =>
        this.setState({
          ...this.state,
          lng,
          lat,
          street: data.street,
          state: data.adminArea3,
          zip: data.postalCode,
          city: data.adminArea5,
          location: `${data.street} ${data.adminArea5}`,
        }),
      )
      .catch(err => console.log(err))
  }

  render() {
    const { auth, profile, match, id, loading, history, project } = this.props
    const { name, flag, viewUser, isOpen, pendingRegistrations } = this.state

    if (!auth.uid) return <Redirect to="/signin" />

    if (!profile.isEmpty && match.params.id !== 'create-project') {
      if (!profile.projects.includes(id)) return <Redirect to="/dashboard/list" />
    }

    if (loading) return <Loader />

    return (
      <div>
        <div className="dashboard container">
          <div className={styles.projectMainHomeNav}>
            <div
              style={{
                color: 'rgb(76, 77, 75)',
              }}
              onClick={() => history.goBack()}
              onKeyPressCapture={() => history.goBack()}
            >
              <Icon size={34} icon={arrowLeft2} />
            </div>

            {name ? <h4>{`Construction of ${name}`}</h4> : <h4>Project Details</h4>}

            {flag ? (
              <span>
                <Button onClick={this.handleSubmit}>
                  {match.params.id === 'create-project' ? 'Save' : 'Update'}
                </Button>
                {/* <Button
                    className="btn-det btn waves-effect"
                    onClick={() => getThisProject(id)}
                  >
                    Discard Changes
                  </Button> */}
              </span>
            ) : (
              <span>
                <Button onClick={this.handleEdit}>Edit</Button>
              </span>
            )}
          </div>
          <hr />
        </div>

        <div className={styles.detailsGridWrapper}>
          <General
            state={this.state}
            handleChange={this.handleChange}
            handleMarker={this.handleMarker}
            handleLatLng={this.handleLatLng}
          />

          <Management
            state={this.state}
            viewUser={viewUser}
            match={match}
            handleChange={this.handleChange}
            openModal={this.openModal}
          />
          <Settings
            state={this.state}
            match={match}
            handleChange={this.handleChange}
            handleActive={this.handleActive}
            deleteProject={this.handleDeleteProject}
          />
        </div>
        <Modal
          title={
            <span>
              <h5 style={{ margin: '0', padding: '0' }}>Users</h5>
              <p style={{ margin: '0', padding: '0' }}>Configuration of Users and their Roles</p>
            </span>
          }
          visible={isOpen}
          onOk={this.closeModal}
          onCancel={this.closeModal}
          width="640px"
        >
          <Users
            viewUser={viewUser}
            pendingRegistrations={pendingRegistrations}
            userID={profile.ID}
            projectID={project.ID}
            roles={project.roles}
            definedRoles={project.definedRoles}
            closeModal={this.closeModal}
          />
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    projects: state.project.projects,
    project: state.project.project,
    loading: state.project.loading,
    viewUser: state.project.viewUser,
  }
}

export default connect(
  mapStateToProps,
  {
    updateProject,
    getThisProject,
    createProject,
    deleteProject,
  },
)(ProjectDetailsView)
