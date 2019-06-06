import React, { useState } from 'react'
import styles from './Dropdown.module.css'
import { DropdownList } from './DropdownList'
//import title to put the button inside of the corner brackets

interface IDropdownProps {
    content: {name: string, item: any, }[]
}

export const Dropdown: React.FC<IDropdownProps> = (props) => {
    const {content} = props
    const [list] = useState(content)
    const [title, setTitle] = useState(content[0].name)

    const getIndex = () => {
        return content.indexOf( content.filter(i => i.name===title)[0] );
    }

    return (
        <div className={styles.dropdownMain}>
        
            <div className={styles.dropdownContainer}>
                <DropdownList 
                    triggerElement={({isOpen, toggle}) => (
                        <button onClick={toggle} className={styles.dropdownButton}>
                            <div className={styles.dropdownTitle}>{title}
                                <div className={styles.dropdownArrow}/>
                            </div>
                        </button>
                    )}

                    choicesList={() => (
                        <ul className={styles.dropdownList}>
                            {list.map(i => (
                                <li className={styles.dropdownListItem} key={i.name} onClick={() => setTitle(i.name)}>
                                    <a href="#0">
                                        <div className={styles.dropdownItemLabel}>{i.name}</div>
                                    </a>
                                </li> 
                            ))}

                        </ul>
                    )}
                />
                <div/>
                
            </div>
            <div className={styles.selected}>{content[getIndex()].item}</div>
        </div>
    )
}