import React, { useState } from 'react'
import styles from './Dropdown.module.css'
import { DropdownList } from './DropdownList'
//import title to put the button inside of the corner brackets

interface IDropdownProps {
    content: {
        name: string, 
        item?: any, 
        onClick?: Function
    }[]
}

export const Dropdown: React.FC<IDropdownProps> = (props) => {
    const {content} = props
    const [selected, setSelected] = useState(content[0])

    return (
        <div className={styles.dropdownMain}>
        
            <div className={styles.dropdownContainer}>
                <DropdownList 
                    triggerElement={({isOpen, toggle}) => (
                        <button onClick={toggle} className={styles.dropdownButton}>
                            <div className={styles.dropdownTitle}>{selected.name}
                                <div className={styles.dropdownArrow}/>
                            </div>
                        </button>
                    )}

                    choicesList={() => (
                        <ul className={styles.dropdownList}>
                            {content.map(i => (
                                <li className={styles.dropdownListItem} 
                                    key={i.name} 
                                    onClick={() => {
                                        setSelected(i)
                                        selected.onClick && selected.onClick()
                                    }
                                }>
                                    <button className={styles.dropdownListItemButton}>
                                        <div className={styles.dropdownItemLabel}>{i.name}</div>
                                    </button>
                                </li> 
                            ))}
                        </ul>
                    )}
                />
                <div/>
            </div>
            <div className={styles.selected}>{selected.item}</div>
        </div>
    )
}