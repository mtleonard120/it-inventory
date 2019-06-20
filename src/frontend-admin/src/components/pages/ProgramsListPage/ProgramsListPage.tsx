import React from 'react'

// Packages

// Components
import {Table} from '../../reusables/Table/Table'
import icon from '../../../content/Images/CQL-favicon.png'
// Utils

// Styles
import styles from './ProgramsListPage.module.css'

// Types
interface IProgramsListPageProps {}

// Helpers

// Primary Component
export const ProgramsListPage: React.SFC<IProgramsListPageProps> = props => {
    const {} = props
    function concatenateName(data: any) {
        return (
            <td className={styles.programs}>
                <img className={styles.icon} src={icon} />
                <text className={styles.name}>{data.name}</text>
            </td>
        )
    }

    const concatenateRenewalDate = (data: any) => {
        return <td className={styles.alignLeftAndPadding}>{data.renewalDate}</td>
    }

    const concatenateTotalUsers = (data: any) => {
        return <td className={styles.alignLeftAndPadding}>{data.totalUsers} users</td>
    }

    const concatenatedCost = (data: any) => {
        return <td className={styles.alignLeftAndPadding}>${data.cost}</td>
    }

    return (
        <div className={styles.App}>
            <Table
                headers={['Programs', 'Renewal Date', 'Total Users', 'Cost']}
                propData={[
                    {name: 'Jira', renewalDate: '2012/09/12', totalUsers: 0, cost: 350},
                    {name: 'Office 365', renewalDate: '2012/09/11', totalUsers: 1, cost: 200},
                    {name: 'Minecraft', renewalDate: '2012/09/13', totalUsers: 154, cost: 575},
                    {name: 'Adobe CC', renewalDate: '2010/09/12', totalUsers: 16, cost: 154},
                    {name: 'Atlassian', renewalDate: '2014/09/12', totalUsers: 15, cost: 764},
                ]}
                dataKeys={['name', 'renewalDate', 'totalUsers', 'cost']}
                concatonations={[concatenateName, concatenateRenewalDate, concatenateTotalUsers, concatenatedCost]}
            />
        </div>
    )
}
