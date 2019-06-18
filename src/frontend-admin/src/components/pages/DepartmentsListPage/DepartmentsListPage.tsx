import React, {useState, useEffect} from 'react'

// Components
import {FilteredSearch} from '../../reusables/FilteredSearch/FilteredSearch'

// Styles
import styles from './DepartmentsListPage.module.css'

// Types
interface IDepartmentsListPageProps {}

//TODO: replace any w/ real type
const initListData: any[] = []

// Primary Component
export const DepartmentsListPage: React.SFC<IDepartmentsListPageProps> = props => {
    const [listData, setListData] = useState(initListData)
    const [filtered, setFiltered] = useState(listData) //this is what is used in the list
    const [search, setSearch] = useState('')
    const [selected, setSelected] = useState({label: 'name', value: 'name'})

    useEffect(() => {
        //TODO: fetch data
    }, [])

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
    }, [search, selected])

    return (
        <div>
            {/*<Button />*/}

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

            {/*<List />*/}
        </div>
    )
}
