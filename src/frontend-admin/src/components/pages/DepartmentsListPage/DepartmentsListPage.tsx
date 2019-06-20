import React from 'react'

// Packages

// Components
import {Table} from '../../reusables/Table/Table'
import icon from '../../../content/Images/CQL-favicon.png'
// Utils

// Styles
import styles from './DepartmentsListPage.module.css'

// Types
interface IDepartmentsListPageProps {}

// Helpers

// Primary Component
export const DepartmentsListPage: React.SFC<IDepartmentsListPageProps> = props => {
    const {} = props
    function concatenateName(data: any) {
        return (
            <td className={styles.departments}>
                <img className={styles.icon} src={icon} />
                <text className={styles.name}>{data.name}</text>
            </td>
        )
    }

    const concatenateTotalEmployees = (data: any) => {
        return <td className={styles.alignLeftAndPadding}>{data.totalEmployees} employees</td>
    }

    const concatenatedCost = (data: any) => {
        return <td className={styles.alignLeftAndPadding}>${data.cost}</td>
    }

    return (
        <div className={styles.App}>
            <Table
                headers={['Departments', 'Total Employees', 'Cost']}
                propData={[
                    {name: 'Developers', totalEmployees: 0, cost: 350},
                    {name: 'Designers', totalEmployees: 1, cost: 200},
                    {name: 'Project Managers', totalEmployees: 154, cost: 575},
                    {name: 'Sales', role: 'PM', totalEmployees: 16, cost: 154},
                    {name: 'Information Technology', totalEmployees: 15, cost: 764},
                ]}
                dataKeys={['name', 'totalEmployees', 'cost']}
                concatonations={[concatenateName, concatenateTotalEmployees, concatenatedCost]}
            />
        </div>
    )
}
