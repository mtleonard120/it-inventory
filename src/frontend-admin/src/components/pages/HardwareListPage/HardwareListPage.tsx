import React, {useState, useEffect} from 'react'
import {Switch, Route} from 'react-router-dom'

// Components
import {FilteredSearch} from '../../reusables/FilteredSearch/FilteredSearch'
import {Button} from '../../reusables/Button/Button'
import {Group} from '../../reusables/Group/Group'
import {Table} from '../../reusables/Table/Table'
import icon from '../../../content/Images/CQL-favicon.png'

// Styles
import styles from './HardwareListPage.module.css'

// Types
interface IHardwareListPageProps {
    history: any
}

//TODO: replace any w/ real type
const initListData: any[] = []

// Primary Component
export const HardwareListPage: React.SFC<IHardwareListPageProps> = props => {
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
        history.push('/hardware/new')
    }

    const handleRowClick = (name: string) => {
        history.push(`/hardware/${name}`)
    }
    const {} = props
    function concatenateName(data: any) {
        return (
            <td className={styles.hardware}>
                <img className={styles.icon} src={icon} />
                <div className={styles.alignLeft}>
                    <text className={styles.name}>{data.name}</text> <br />
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
        <div className={styles.hardwareListMain}>
            <Switch>
                {/*TODO: replace divs w/ detail page */}
                <Route path='/hardware/new' render={props => <div>New Employee Detail Page</div>} />
                <Route path='/hardware/:name' render={props => <div>{props.match.params.name} Detail Page</div>} />
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
                headers={['Hardware', 'Renewal Date', 'Days Employed', 'Cost']}
                propData={[
                    {name: 'Bill Belichik', role: 'Sales', dateHired: '2012/09/12', daysEmployed: 0, cost: 350},
                    {name: 'Joe Montana', role: 'Sales', dateHired: '2012/09/11', daysEmployed: 1, cost: 200},
                    {name: 'Bob the Builder', role: 'Developer', dateHired: '2012/09/13', daysEmployed: 154, cost: 575},
                    {name: 'Anne Manion', role: 'PM', dateHired: '2010/09/12', daysEmployed: 16, cost: 154},
                    {name: 'Sue Z', role: 'Designer', dateHired: '2014/09/12', daysEmployed: 15, cost: 764},
                ]}
                dataKeys={['name', 'dateHired', 'daysEmployed', 'cost']}
                concatonations={[concatenateName, concatenateDateHired, concatenateDaysEmployed, concatenatedCost]}
            /> */}
        </div>
    )
}
