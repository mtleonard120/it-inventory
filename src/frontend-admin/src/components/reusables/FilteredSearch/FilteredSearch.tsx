import React from 'react'
import Select, {components} from 'react-select'
import {MdSearch} from 'react-icons/md'

// Styles
import styles from './FilteredSearch.module.css'

// Types
export interface IFilteredSearchProps {
    search: string
    setSearch: any
    options: {label: string; value: string}[]
    selected: any
    setSelected: any
    className?: any
}

// Primary Component
export const FilteredSearch: React.SFC<IFilteredSearchProps> = props => {
    const {search, setSearch, options, selected, setSelected, className} = props

    const customStyles = {
        container: (provided: any, state: any) => ({
            ...provided,
            width: `${10 * (selected.label.length + 10)}px`,
            border: '0px',
            height: '45px',
            color: '#9b9b9b',
        }),
        control: (provided: any, state: any) => ({
            ...provided,
            color: '#9b9b9b',
            height: '45px',
            border: '0px ',
            borderRadius: '4px',
            boxShadow: '0',
        }),
        menu: (provided: any, state: any) => ({
            ...provided,
            margin: '-5px',
            boxShadow: '-1px 5px 7px 0 rgba(0,0,0,0.5)',
        }),
        indicatorSeparator: (provided: any) => ({
            ...provided,
            display: 'none',
        }),
        isFocused: (provided: any) => ({
            ...provided,

            border: '0px',
        }),
        singleValue: (provided: any) => ({
            ...provided,
            color: '#9b9b9b',
        }),
    }

    const DropdownIndicator = (props: any) => {
        return (
            components.DropdownIndicator && (
                <components.DropdownIndicator {...props}>
                    <div className={styles.dropdownIndicator} />
                </components.DropdownIndicator>
            )
        )
    }

    return (
        <div className={className}>
            <form className={styles.searchContainer} onSubmit={e => e.preventDefault()}>
                <input
                    className={styles.searchBar}
                    value={search}
                    placeholder={'Search'}
                    onChange={e => {
                        setSearch(e.target.value)
                    }}
                />
                <div className={styles.searchIconContainer}>
                    {/* <button type='submit' className={styles.searchIconButton}> */}
                    <MdSearch className={styles.searchIcon} size={30} />
                    {/* </button> */}
                </div>
                <div className={styles.filterBy}>By</div>
                <Select
                    defaultValue={options[0]}
                    className={styles.searchFilter}
                    options={options}
                    onChange={(cur: any) => setSelected(cur)}
                    components={{DropdownIndicator}}
                    styles={customStyles}
                    theme={theme => ({
                        ...theme,
                        borderRadius: 0,
                        colors: {
                            ...theme.colors,
                            text: '#9b9b9b',
                            primary: '#009EFF;',
                        },
                    })}
                    isSearchable={false}
                />
            </form>
        </div>
    )
}
