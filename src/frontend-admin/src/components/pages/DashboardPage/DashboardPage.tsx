import React, {useState, useEffect} from 'react'
import {AxiosService} from '../../../services/AxiosService/AxiosService'

import {CostCard} from '../Dashboard/CostCard'
import {IoIosArrowRoundUp, IoIosArrowRoundDown, IoIosStats} from 'react-icons/io'

// Styles
import styles from './DashboardPage.module.css'

// Components

import {Card} from '../../reusables/Card/Card'
import {Group} from '../../reusables/Group/Group'
import {HorizontalBarChart} from '../../reusables/HorizontalBarChart/HorizontalBarChart'
import {DashboardTable, IDashboardTableDatum} from '../../reusables/DashboardTable/DashboardTable'

// Types
interface IDashboardPageProps {}

// Primary Component
export const DashboardPage: React.FC<IDashboardPageProps> = props => {
    const axios = new AxiosService('accessToken', 'refreshToken')

    //Liscence Bar Chart State
    const initLicenses: {
        programName: string
        CountProgInUse: number
        CountProgOverall: number
    }[] = [{programName: 'init', CountProgInUse: 5, CountProgOverall: 6}]
    const [licenses, setLicenses] = useState(initLicenses)

    //Software Table State
    let initSoftwareTableData: IDashboardTableDatum[] = [{name: 'Init', numberOf: 5, costPerMonth: 5, projected: '*'}]
    const [softwareTableData, setSoftwareTableData] = useState(initSoftwareTableData)

    //Cost Card State
    const initCosts: {costOfProgramsPerYear: number; costOfPluginsPerYear: number} = {
        costOfProgramsPerYear: 12,
        costOfPluginsPerYear: 12,
    }
    const [costs, setCosts] = useState(initCosts)

    useEffect(() => {
        // Data Fetching
        axios.get('/Programs/Licenses', setLicenses)
        axios.get('/', setSoftwareTableData) //TODO: find out endpoint name
        axios.get('/cost/dashboard', setCosts)
    }, [setLicenses])

    //Click Handling
    const softwareOnRowClick = (datum: IDashboardPageProps) => {
        //TODO: route to `/programs/${datum.name}`
    }

    return (
        <div className={styles.dashMain}>
            <div className={styles.dashColumn}>
                <Card title={'licenses'} titleClassName={styles.linkedTitle}>
                    <Group>
                        {licenses.map(i => (
                            <HorizontalBarChart
                                title={i.programName}
                                amount={i.CountProgInUse}
                                outOf={i.CountProgOverall}
                                onClick={() => {}}
                            />
                        ))}
                    </Group>
                </Card>

                <div className={styles.dashRow}>
                    <CostCard
                        cardTitle='Yearly Cost'
                        data={{programsCost: costs.costOfProgramsPerYear, pluginsCost: costs.costOfPluginsPerYear}}
                        icon={<IoIosStats className={styles.statsIcon} />}
                    />
                    <CostCard
                        cardTitle='Monthly Cost'
                        data={{
                            programsCost: costs.costOfProgramsPerYear / 12,
                            pluginsCost: costs.costOfPluginsPerYear / 12,
                        }}
                        icon={
                            <span>
                                <IoIosArrowRoundUp className={styles.upArrowIcon} />
                                <IoIosArrowRoundDown className={styles.downArrowIcon} />
                            </span>
                        }
                    />
                </div>
                <div>Replace with Department Tables</div>
            </div>

            <div className={styles.dashColumn}>
                <div>Replace with Dashboard Pies</div>

                <Card title={'software'}>
                    <DashboardTable data={softwareTableData} onRowClick={softwareOnRowClick} />
                </Card>
            </div>
        </div>
    )
}
