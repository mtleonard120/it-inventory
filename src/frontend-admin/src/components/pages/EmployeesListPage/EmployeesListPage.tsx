import React, {useState, useEffect, useContext} from 'react'
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom'
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

const initListData: ITableDatum[] = [
    // {name: '', role: '', dateHired: '', daysEmployed: 0, hardwareCost: 0, programCost: 0},
]
const initColumns: string[] = []
const initOptions: {value: string; label: string}[] = []

// Primary Component
export const EmployeesListPage: React.SFC<IEmployeesListPageProps> = props => {
    const {history, match} = props
    const {
        loginContextVariables: {accessToken, refreshToken},
    } = useContext(LoginContext)
    const axios = new AxiosService(accessToken, refreshToken)

    // state
    const [listData, setListData] = useState(initListData)
    const [columns, setColumns] = useState(initColumns)
    const [options, setOptions] = useState(initOptions)
    const [filtered, setFiltered] = useState(listData) //this is what is used in the list
    const [search, setSearch] = useState('')
    const [selected, setSelected] = useState({label: 'name', value: 'name'})

    useEffect(() => {
        initListData.length = 0
        axios
            .get('/list/employees')
            .then((data: any) =>
                data.map((i: any) =>
                    initListData.push({
                        name: i.employeeName,
                        role: i.role,
                        dateHired: i.hireDate,
                        daysEmployed: 0,
                        hardwareCost: i.hardwareCostForEmp,
                        programsCost: i.programCostForEmp,
                    })
                )
            )
            .catch((err: any) => console.log(err))

        setListData(initListData)
    }, [setListData])

    useEffect(() => {
        console.log(listData)
        // Search through listData based on current value
        // of search bar and save results in filtered
        let filteredTableInput = listData
        filteredTableInput = listData.filter((row: any) => {
            console.log(row)
            return (
                row[selected.value]
                    .toString()
                    .toLowerCase()
                    .search(search.toLowerCase()) !== -1
            )
        })
        console.log(listData)
        setFiltered(filteredTableInput)
        listData[0] && setColumns(Object.keys(listData[0]))
        // setColumns(['name', 'role', 'dateHired', 'daysEmployed', 'hardwareCost', 'programsCost'])
    }, [search, selected, listData])

    useEffect(() => {
        initOptions.length = 0
        columns.map(i => {
            initOptions.push({value: i, label: i.replace(/([a-zA-Z])(?=[A-Z])/g, '$1 ').toLowerCase()})
        })
        setOptions(initOptions)
    }, [columns])

    const handleClick = () => {
        history.push(`${match.url}/new`)
    }

    const handleRowClick = (id: number) => {
        history.push(`${match.url}/${id}`)
    }
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

    const concatenatedHWCost = (data: any) => {
        return <td className={styles.alignLeftAndPadding}>${data.hardwareCost}</td>
    }
    const concatenatedProgCost = (data: any) => {
        return <td className={styles.alignLeftAndPadding}>${data.programsCost}</td>
    }
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
                headers={['Employees', 'Date Hired', 'Days Employed', 'Hardware Cost', 'Programs Cost']}
                propData={filtered}
                dataKeys={columns}
                concatonations={[
                    concatenateName,
                    concatenateDateHired,
                    concatenateDaysEmployed,
                    concatenatedHWCost,
                    concatenatedProgCost,
                ]}
            />
        </div>
    )
}
