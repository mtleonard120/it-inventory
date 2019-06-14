import React, {useState} from 'react'
import styles from './Dropdown.module.css'
import {DropdownList} from './DropdownList'
import {Title} from '../../reusables/Title/Title'
import {Card} from '../Card/Card'

export interface IDropdownItem {
    id: number
    name: string
    component?: any
    onClick?: Function
}

interface IDropdownProps {
    content: IDropdownItem[]
    titleClassName?: string
}

export const Dropdown: React.FC<IDropdownProps> = props => {
    const {content, titleClassName} = props
    const [selected, setSelected] = useState(content[0])

    return (
        <div className={styles.dropdownMain}>
            <Title
                title={
                    <div className={styles.dropdownContainer}>
                        <DropdownList
                            triggerElement={({isOpen, toggle}) => (
                                <button onClick={toggle} className={styles.dropdownButton}>
                                    <div className={styles.dropdownTitle}>
                                        <div className={titleClassName}>{selected.name}</div>
                                        <div className={styles.dropdownArrow} />
                                    </div>
                                </button>
                            )}
                            choicesList={() => (
                                <ul className={styles.dropdownList}>
                                    {content.map(i => (
                                        <li
                                            className={styles.dropdownListItem}
                                            key={i.name}
                                            onClick={() => {
                                                setSelected(i)
                                                selected.onClick && selected.onClick()
                                            }}
                                        >
                                            <button className={styles.dropdownListItemButton}>
                                                <div className={styles.dropdownItemLabel}>{i.name}</div>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        />
                        <div />
                    </div>
                }
            />
            <Card className={styles.selected}>
                {selected
                    ? selected.component
                        ? selected.component
                        : selected.onClick && selected.onClick(selected.id)
                    : null}
            </Card>
        </div>
    )
}
