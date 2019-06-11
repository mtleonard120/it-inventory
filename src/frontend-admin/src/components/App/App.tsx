import React from 'react'

// Packages
import {IoIosArrowRoundUp, IoIosArrowRoundDown, IoIosStats} from 'react-icons/io'

// Styles
import styles from './App.module.css'

//Components
import {CostCard} from '../pages'

// Primary Component
export const App: React.FC = () => {
    return (
        <div className={styles.app}>
            <CostCard
                cardTitle='Yearly Cost'
                data={{
                    programsCost: 200,
                    pluginsCost: 100,
                }}
                icon={<IoIosStats />}
            />
            <CostCard
                cardTitle='Monthly Cost'
                data={{programsCost: 100, pluginsCost: 200}}
                icon={
                    <span>
                        <IoIosArrowRoundUp />
                        <IoIosArrowRoundDown />
                    </span>
                }
            />
        </div>
    )
}
