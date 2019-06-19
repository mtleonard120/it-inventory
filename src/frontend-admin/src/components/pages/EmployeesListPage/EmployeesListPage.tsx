import React, {useState, useEffect, useContext} from 'react'
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom'
import {AxiosService} from '../../../services/AxiosService/AxiosService'

// Components
import {FilteredSearch} from '../../reusables/FilteredSearch/FilteredSearch'
import {Button} from '../../reusables/Button/Button'
import {Group} from '../../reusables/Group/Group'
//import {Table, ITableDatum} from '../../reusables/Table/Table'

// Context
import {LoginContext} from '../../App/App'

// Styles
import styles from './EmployeesListPage.module.css'

// Types
interface IEmployeesListPageProps {
    history: any
    match: any
}

//TODO: remove this
interface ITableDatum {
    name: string
    dept: string
    dateHired: string
    hardwareCost: number
    programCost: number
}

const initListData: ITableDatum[] = [{name: '', dept: '', dateHired: '', hardwareCost: 0, programCost: 0}]
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
        let list: ITableDatum[] = []
        axios
            .get('/list/employees')
            .then((data: any) =>
                data.map((i: any) =>
                    list.push({
                        name: i.employeeName,
                        dept: i.role,
                        dateHired: i.hireDate,
                        hardwareCost: i.hardwareCostForEmp,
                        programCost: i.programCostForEmp,
                    })
                )
            )
            .catch((err: any) => console.log(err))

        setListData(list)
    }, [setListData])

    useEffect(() => {
        // Search through listData based on current value
        // of search bar and save results in filtered
        let filteredTableInput = listData
        filteredTableInput = listData.filter((row: any) => {
            return (
                row[selected.value]
                    .toString()
                    .toLowerCase()
                    .search(search.toLowerCase()) !== -1
            )
        })
        setFiltered(filteredTableInput)
        listData[0] && setColumns(Object.keys(listData[0]))
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
            {/*<List />*/}
        </div>
    )
}
