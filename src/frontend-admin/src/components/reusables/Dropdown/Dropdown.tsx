import React, { useState } from 'react'
import styles from './Dropdown.module.css'
import { DropdownList } from './DropdownList'

interface IDropdownProps {
    content: string[]
}

export const Dropdown: React.FC<IDropdownProps> = (props) => {
    const { content } = props;
    const [list] = useState(content)
    const [title, setTitle] = useState(content[0])

    return (
        <div className={styles.dropdownContainer}>
            <DropdownList 
                triggerElement={({isOpen, toggle}) => (
                    <button onClick={toggle} className={styles.dropdownButton}>
                        <div className={styles.dropdownTitle}>{title/*add arrow icon here, use isOpen to determine direction*/}</div>
                    </button>
                )}

                choicesList={() => (
                    <ul className={styles.dropdownList}>
                        {list.map(i => (
                            <li className={styles.dropdownListItem} key={i} onClick={() => {setTitle(i)}}>
                                <a href="#0" className={title === i? styles.isActive : styles.none}>
                                    {i}
                                </a>
                            </li> 
                        ))}

                    </ul>
                )}
            />
        </div>
    )
}