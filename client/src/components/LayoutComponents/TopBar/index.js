import React from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
// import { FormattedMessage } from 'react-intl'
import HomeMenu from './HomeMenu'
// import ProjectManagement from './ProjectManagement'
// import IssuesHistory from './IssuesHistory'
// import LiveSearch from './LiveSearch'
// import BitcoinPrice from './BitcoinPrice'
import ProfileMenu from './ProfileMenu'
import LanguageSelector from './LanguageSelector'
import styles from './style.module.scss'

class TopBar extends React.Component {
  render() {
    return (
      <div className={styles.topbar}>
        <div className="mr-4">{/* <IssuesHistory /> */}</div>
        <div className="mr-4">{/* <ProjectManagement /> */}</div>
        <div className="mr-auto">{/* <LiveSearch /> */}</div>
        <Link to="/dashboard/project-details/create-project" className="mr-4 d-none d-sm-inline">
          <Button type="danger">Add New Project</Button>
        </Link>
        <div className="mr-4">{/* <BitcoinPrice /> */}</div>
        <div className="mr-4">
          <LanguageSelector />
        </div>
        <div className="mr-4">
          <HomeMenu />
        </div>
        <ProfileMenu />
      </div>
    )
  }
}

export default TopBar
