import React, {useState, useEffect} from 'react'
import {Route, Switch} from 'react-router-dom'

// Components
import {FilteredSearch} from '../../reusables/FilteredSearch/FilteredSearch'
import {Button} from '../../reusables/Button/Button'
import {Group} from '../../reusables/Group/Group'
import {Table} from '../../reusables/Table/Table'
import icon from '../../../content/Images/CQL-favicon.png'

// Styles
import styles from './ProgramsListPage.module.css'

// Types
interface IProgramsListPageProps {
    history: any
}

//TODO: replace any w/ real type
const initListData: any[] = []

// Primary Component
export const ProgramsListPage: React.SFC<IProgramsListPageProps> = props => {
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
        history.push('/programs/new')
    }

    const handleRowClick = (name: string) => {
        history.push(`/programs/${name}`)
    }
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
        <div className={styles.programsListMain}>
            <Switch>
                {/*TODO: replace divs w/ detail page */}
                <Route path='/programs/new' render={props => <div>New Employee Detail Page</div>} />
                <Route path='/programs/:name' render={props => <div>{props.match.params.name} Detail Page</div>} />
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
            /> */}
        </div>
    )
}
