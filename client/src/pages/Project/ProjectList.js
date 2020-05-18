import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { Button } from 'antd'
import Loader from 'components/LayoutComponents/Loader'
import { Icon } from 'react-icons-kit'
import { ic_lens } from 'react-icons-kit/md/ic_lens'
import { getAllProjects, setCurrentProject } from '../../redux/projects/projectActions'
import styles from './style.module.css'

class ProjectList extends Component {
  state = {
    selected: 'all',
    projects: [],
  }

  componentDidMount = () => {
    this.getProject()
  }

  componentDidUpdate = prevProps => {
    const { projects } = this.props
    if (projects !== prevProps.projects) this.setState({ ...this.state, projects: [...projects] })
  }

  getProject = () => {
    const { projects, profile, getAllProjects } = this.props
    if (projects === []) return
    if (profile.ID === undefined) {
      setTimeout(() => {
        this.getProject()
      }, 100)
    } else {
      getAllProjects(profile.ID)
    }
  }

  render() {
    const { auth, projects, loading, profile } = this.props
    const { selected } = this.state
    if (!auth.uid) return <Redirect to="/user/login" />

    const handleChange = e => {
      let active
      if (e.target.value === 'active') active = true
      else if (e.target.value === 'inactive') active = false
      else if (e.target.value === 'all') {
        this.setState({
          selected: e.target.value,
          projects,
        })
        return
      }
      this.setState({
        selected: e.target.value,
        projects: projects.filter(project => project.active === active),
      })
    }
    if (loading) return <Loader />

    return (
      <div className="dashboard container">
        <div className={styles.projectMainHomeNav}>
          <h4>Projects</h4>
          <Link to="/dashboard/project-details/create-project">
            <Button>Add New Project</Button>
          </Link>
        </div>
        <hr />
        <div className={styles.projectMainHome}>
          <div className={styles.projectMainHeading}>
            <h5>List of Projects</h5>

            <select
              className={styles.filter}
              style={{ display: 'block', width: '30%' }}
              value={selected}
              onChange={handleChange}
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {!projects[0] && (
            <div className={styles.projectMainSubdetails}>
              <h5>No Record Found!</h5>
            </div>
          )}
          {projects.map(project => (
            <div>
              <div className={styles.projectMainSubdetails} style={{ margin: '5px 0px' }}>
                <span
                  style={{
                    display: 'flex',

                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      color: project.active ? 'green' : '#FFFF00',
                      margin: '0 4px 3px 0',
                    }}
                  >
                    <Icon size={12} icon={ic_lens} />
                  </div>
                  {project.name}
                </span>
                <span>{project.street}</span>
                <span>{project.city}</span>
                <span>
                  {profile.project !== project.ID && (
                    <Link to="/">
                      <Button onClick={() => setCurrentProject(profile.ID, project.ID)}>Set</Button>
                    </Link>
                  )}
                  <Link to={`/dashboard/project-details/${project.ID}`}>
                    <Button>Detail</Button>
                  </Link>
                </span>
              </div>
              <hr />
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    projects: state.project.projects,
    loading: state.project.loading,
  }
}

export default connect(
  mapStateToProps,
  { getAllProjects, setCurrentProject },
)(ProjectList)
