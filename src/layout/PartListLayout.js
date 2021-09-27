import React from 'react'
import { AppSidebar, AppFooter, AppHeader } from '../components/index'
import PartListContent from '../components/PartListContent'

const PartListLayout = () => {
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <PartListContent title="List of Parts" />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default PartListLayout
