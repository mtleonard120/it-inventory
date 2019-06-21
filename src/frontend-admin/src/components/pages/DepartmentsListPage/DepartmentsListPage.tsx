import React, {useState, useEffect} from 'react'
import {Route, Switch} from 'react-router-dom'

// Components
import {FilteredSearch} from '../../reusables/FilteredSearch/FilteredSearch'
import {Button} from '../../reusables/Button/Button'
import {Group} from '../../reusables/Group/Group'

import {Table} from '../../reusables/Table/Table'
import icon from '../../../content/Images/CQL-favicon.png'

// Styles
import styles from './DepartmentsListPage.module.css'

// Types
interface IDepartmentsListPageProps {
    history: any
}

//TODO: replace any w/ real type
const initListData: any[] = []

// Primary Component
export const DepartmentsListPage: React.SFC<IDepartmentsListPageProps> = props => {
    const {history} = props
    const [listData, setListData] = useState(initListData)
    const [filtered, setFiltered] = useState(listData) //this is what is used in the list
    const [search, setSearch] = useState('')
    const [selected, setSelected] = useState({label: 'name', value: 'name'})

    useEffect(() => {
        //TODO: replace w/ real type
        let data: any[] = []
        //TODO: fetch data
        setListData(data)
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
    }, [search, selected, listData])

    const handleClick = () => {
        history.push('/departments/new')
    }

    const handleRowClick = (name: string) => {
        history.push(`/departments/${name}`)
    }
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
        <div className={styles.deptsListMain}>
            <Switch>
                {/*TODO: replace divs w/ detail page */}
                <Route path='/departments/new' render={props => <div>New Department Detail Page</div>} />
                <Route path='/departments/:name' render={props => <div>{props.match.params.name} Detail Page</div>} />
            </Switch>
            <Group direction='row' justify='between'>
                <Button text='Add' icon='add' onClick={handleClick} />

                <FilteredSearch
                    search={search}
                    setSearch={setSearch}
                    options={[
                        //TODO: replace w/ real options
                        {label: 'name', value: 'name'},
                        {label: 'cost', value: 'cost'},
                    ]}
                    selected={selected}
                    setSelected={setSelected}
                />
            </Group>

            {/*<List />*/}

            {/* <Table
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
            /> */}
        </div>
    )
}
