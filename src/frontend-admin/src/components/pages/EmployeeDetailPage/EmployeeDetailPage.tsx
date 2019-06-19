import React from 'react'

// Packages

// Components

// Utils

// Styles
import styles from './EmployeeDetailPage.module.css'

// Types
interface IEmployeeDetailPageProps {
    match: any
    history: any
}

// Helpers

// Primary Component
export const EmployeeDetailPage: React.SFC<IEmployeeDetailPageProps> = props => {
    const {history, match} = props
    return <div>The is {match.params.id}'s detail page</div>
}
