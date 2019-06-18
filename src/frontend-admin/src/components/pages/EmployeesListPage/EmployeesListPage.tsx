import React, {useState, useEffect} from 'react'

// Packages

// Components
import {FilteredSearch, IFilteredSearchProps} from '../../reusables/FilteredSearch/FilteredSearch'

// Utils

// Styles
import styles from './EmployeesListPage.module.css'

// Types
interface IEmployeesListPageProps {}

const initListData: any[] = []

// Primary Component
export const EmployeesListPage: React.SFC<IEmployeesListPageProps> = props => {
    const {} = props

    const [listData, setListData] = useState(initListData)
    const [filtered, setFiltered] = useState(listData)
    const [search, setSearch] = useState('')
    const [selected, setSelected] = useState({label: 'name', value: 'name'})

    useEffect(() => {
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
    }, [search, selected])

    return (
        <div className={styles.employeesListMain}>
            {/*<AddButton />*/}

            <FilteredSearch
                search={search}
                setSearch={setSearch}
                options={[
                    {label: 'name', value: 'name'},
                    {label: 'date Hired', value: 'dateHired'},
                    {label: 'days Employed', value: 'daysEmployed'},
                    {label: 'cost', value: 'cost'},
                ]} //TODO: get real column names
                selected={selected}
                setSelected={setSelected}
                className={styles.search}
            />

            {/*<List />*/}
        </div>
    )
}
