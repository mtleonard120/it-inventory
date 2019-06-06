import React, { useState } from 'react'
import styles from './Dropdown.module.css'

//Props to pass to the Dropdown Prop renderTRigger
interface IRendererProps {
    isOpen: boolean
    close: () => void
    open: () => void
    toggle: () => void
}

interface IDropdownListProps {
    triggerElement: ((props: IRendererProps) => React.ReactNode)
    choicesList: ((props: IRendererProps) => React.ReactNode)
}

export const DropdownList: React.FC<IDropdownListProps> = (props) => {
    const {triggerElement, choicesList} = props
    const [isOpen, setIsOpen] = useState(false)

    const rendererProps: IRendererProps = {
        isOpen: isOpen,
        close: () => setIsOpen(false), 
        open: () => setIsOpen(true),
        toggle: () => setIsOpen(!isOpen)
    }

    return (
        <div className={styles.dropdownListContainer}>
            
            <div className={styles.trigger}>{triggerElement(rendererProps)}</div>
            {isOpen && ( //if dropdown isOpen then render the choices list
                <div className={styles.dropdownContent} onClick={() => setIsOpen(false)} >
                    <div className={styles.dropdownSquare} />
                    {choicesList(rendererProps)}
                </div>
            )}
        </div>
    )
}