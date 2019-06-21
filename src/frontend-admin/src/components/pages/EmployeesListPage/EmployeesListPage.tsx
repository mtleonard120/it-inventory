import React, {useState, useEffect, useContext} from 'react'
import {AxiosService} from '../../../services/AxiosService/AxiosService'

// Components
import {FilteredSearch} from '../../reusables/FilteredSearch/FilteredSearch'
import {Button} from '../../reusables/Button/Button'
import {Group} from '../../reusables/Group/Group'

import {Table} from '../../reusables/Table/Table'
import icon from '../../../content/Images/CQL-favicon.png'

// Context
import {LoginContext} from '../../App/App'

// Styles
import styles from './EmployeesListPage.module.css'

// Types
interface IEmployeesListPageProps {
    history: any
    match: any
}

interface ITableDatum {
    name: string
    role: string
    dateHired: string
    daysEmployed: number
    hardwareCost: number
    programsCost: number
}

// Primary Component
export const EmployeesListPage: React.SFC<IEmployeesListPageProps> = props => {
    const {history, match} = props
    const {
        loginContextVariables: {accessToken, refreshToken},
    } = useContext(LoginContext)
    const axios = new AxiosService(accessToken, refreshToken)

    // state
    const [listData, setListData] = useState<any[]>([])
    const [filteredData, setFilteredData] = useState<any[]>([]) //this is what is used in the list
    const [search, setSearch] = useState('')
    const [selected, setSelected] = useState({label: 'name', value: 'name'})

    const columns = ['name', 'role', 'dateHired', 'daysEmployed', 'hardwareCost', 'programsCost']
    const options = columns.map(c => ({label: c, value: c}))

    useEffect(() => {
        axios
            .get('/list/employees')
            .then((data: any) => {
                const employees: any[] = []
                data.map((i: any) =>
                    employees.push({
                        name: i.employeeName,
                        role: i.role,
                        dateHired: i.hireDate,
                        daysEmployed: 0, //TODO: calculate days employed
                        hardwareCost: i.hardwareCostForEmp,
                        programsCost: i.programCostForEmp,
                    })
                )
                setListData(employees)
            })
            .catch((err: any) => console.error(err))
    }, [])

    useEffect(() => {
        // Search through listData based on current value
        // of search bar and save results in filtered
        var filteredTableInput = listData.filter((row: any) => {
            return (
                row[selected.value]
                    .toString()
                    .toLowerCase()
                    .search(search.toLowerCase()) !== -1
            )
        })
        setFilteredData(filteredTableInput)
    }, [listData, search, selected])

    const handleClick = () => {
        history.push(`${match.url}/new`)
    }

    const handleRowClick = (id: number) => {
        history.push(`${match.url}/${id}`)
    }

    function concatenateName(data: any) {
        return (
            <td className={styles.employees}>
                <img className={styles.icon} src={icon} alt={''} />
                <div className={styles.alignLeft}>
                    <div className={styles.employeeName}>{data.name}</div> <br />
                    <div className={styles.role}>{data.role}</div>
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

    const concatenatedHWCost = (data: any) => {
        return <td className={styles.alignLeftAndPadding}>${data.hardwareCost}</td>
    }

    const concatenatedProgCost = (data: any) => {
        return <td className={styles.alignLeftAndPadding}>${data.programsCost}</td>
    }

    const rows: any[] = []

    filteredData.forEach(rowObj => {
        rows.push(Object.values(rowObj).map((val: any) => <td>{val}</td>))
    })

    return (
        <div className={styles.employeesListMain}>
            <Group direction='row' justify='between'>
                <Button text='Add' icon='add' onClick={handleClick} />

                <FilteredSearch
                    search={search}
                    setSearch={setSearch}
                    options={options}
                    selected={selected}
                    setSelected={setSelected}
                />
            </Group>

            <Table
                headers={['Employees', 'Roles', 'Date Hired', 'Days Employed', 'Hardware Cost', 'Programs Cost']}
                rows={rows}
                dataKeys={columns}
            />
        </div>
    )
}
