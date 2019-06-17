import React, {useContext} from 'react'
import styles from './HelloUser.module.css'
import dropdownStyles from '../reusables/Dropdown/Dropdown.module.css'
import {DropdownList} from '../reusables/Dropdown/DropdownList'
import {concatStyles as s} from '../../utilities/mikesConcat'
import {LoginContext, initialValues} from '../App/App'

interface IHelloUserProps {
    name: string
    className?: string
}

export const HelloUser: React.FC<IHelloUserProps> = props => {
    const {name, className = ''} = props

    const userContext = useContext(LoginContext)
    return (
        <div className={s(styles.helloMain, className)}>
            <div className={(dropdownStyles.dropdownContainer, styles.helloContainer)}>
                <DropdownList
                    triggerElement={({isOpen, toggle}) => (
                        <button onClick={toggle} className={dropdownStyles.dropdownButton}>
                            <div className={dropdownStyles.dropdownTitle}>
                                <div className={styles.helloMessage}>Hello, {name}</div>
                                <div className={s(dropdownStyles.dropdownArrow, styles.dropdownArrow)} />
                            </div>
                        </button>
                    )}
                    choicesList={() => (
                        <ul className={dropdownStyles.dropdownList}>
                            <li
                                className={dropdownStyles.dropdownListItem}
                                key={'logout'}
                                onClick={() => {
                                    userContext.setLoginContextVariables(initialValues)
                                    window.location.reload()
                                    //return <Redirect to='/login' />
                                }}
                            >
                                <button className={dropdownStyles.dropdownListItemButton}>
                                    <div className={dropdownStyles.dropdownItemLabel}>Logout</div>
                                </button>
                            </li>
                        </ul>
                    )}
                />
                <div />
            </div>
        </div>
    )
}
