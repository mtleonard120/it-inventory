import React from 'react'

// Packages

// Components
import {Table} from '../../reusables/Table/Table'
import icon from '../../../content/Images/CQL-favicon.png'
// Utils

// Styles
import styles from './EmployeesListPage.module.css'

// Types
interface IEmployeesListPageProps {}

// Helpers

// Primary Component
export const EmployeesListPage: React.SFC<IEmployeesListPageProps> = props => {
    const {} = props
    function concatenateName(data: any) {
        return (
            <td className={styles.employees}>
                <img className={styles.icon} src={icon} />
                <div className={styles.alignLeft}>
                    <text className={styles.employeeName}>{data.name}</text> <br />
                    <text className={styles.role}>{data.role}</text>
                </div>
            </td>
        )
    }

    const concatenateDateHired = (data: any) => {
        return <td className={styles.alignLeftAndPadding}>{data.dateHired}</td>
    }

    const concatenateDaysEmployed = (data: any) => {
        return <td className={styles.alignLeftAndPadding}>{data.daysEmployed} days</td>
    }

    const concatenatedCost = (data: any) => {
        return <td className={styles.alignLeftAndPadding}>${data.cost}</td>
    }

    return (
        <div className={styles.App}>
            <Table
                headers={['Employees', 'Date Hired', 'Days Employed', 'Cost']}
                propData={[
                    {name: 'Bill Belichik', role: 'Sales', dateHired: '2012/09/12', daysEmployed: 0, cost: 350},
                    {name: 'Joe Montana', role: 'Sales', dateHired: '2012/09/11', daysEmployed: 1, cost: 200},
                    {name: 'Bob the Builder', role: 'Developer', dateHired: '2012/09/13', daysEmployed: 154, cost: 575},
                    {name: 'Anne Manion', role: 'PM', dateHired: '2010/09/12', daysEmployed: 16, cost: 154},
                    {name: 'Sue Z', role: 'Designer', dateHired: '2014/09/12', daysEmployed: 15, cost: 764},
                ]}
                dataKeys={['name', 'dateHired', 'daysEmployed', 'cost']}
                concatonations={[concatenateName, concatenateDateHired, concatenateDaysEmployed, concatenatedCost]}
            />
        </div>
    )
}
