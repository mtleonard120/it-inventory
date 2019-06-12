import React, {useState, useEffect} from 'react'
import {AxiosService} from '../../../services/AxiosService/AxiosService'

import {IoIosArrowRoundUp, IoIosArrowRoundDown, IoIosStats} from 'react-icons/io'

// Styles
import styles from './DashboardPage.module.css'

// Components
import {Dropdown, IDropdownItem} from '../../reusables/Dropdown/Dropdown'
import {Card} from '../../reusables/Card/Card'
import {Group} from '../../reusables/Group/Group'
import {HorizontalBarChart} from '../../reusables/HorizontalBarChart/HorizontalBarChart'
import {DashboardTable, IDashboardTableDatum} from '../../reusables/DashboardTable/DashboardTable'
import {RechartPieChart, IPieDataProps} from '../../reusables/PieChart/PieChart'
import {CostCard} from '../Dashboard/CostCard'

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
    const initCosts: {
        costOfProgramsPerYear: number
        costOfPluginsPerYear: number
    } = {
        costOfProgramsPerYear: 12,
        costOfPluginsPerYear: 12,
    }
    const [costs, setCosts] = useState(initCosts)

    //Pie State
    const initPieData: IPieDataProps[] = [
        {
            headingName: 'Software',
            data: [
                {name: 'one', value: 20, id: ''},
                {name: 'two', value: 50, id: ''},
                {name: 'three', value: 35, id: ''},
                {name: 'four', value: 4, id: ''},
            ],
        },
        {
            headingName: 'Hardware',
            data: [
                {name: 'one', value: 20, id: ''},
                {name: 'two', value: 50, id: ''},
                {name: 'three', value: 35, id: ''},
                {name: 'four', value: 4, id: ''},
            ],
        },
    ]
    const [pieData, setPieData] = useState(initPieData)

    //Department Tables State

    const initDeptList: {departmentName: string; departmentID: number}[] = [
        {departmentName: 'example', departmentID: -1},
    ]
    const initDeptTable: {} = {}
    const initDropdownContent: IDropdownItem[] = [
        {name: 'init', component: <DashboardTable data={softwareTableData} onRowClick={() => {}} />},
    ]
    const [deptList, setDeptList] = useState(initDeptList)
    const [deptTable, setDeptTable] = useState(initDeptTable)
    const [dropdownContent, setDropdownContent] = useState(initDropdownContent)

    //Click Handling
    const softwareOnRowClick = (datum: IDashboardPageProps) => {
        //TODO: route to `/programs/${datum.name}`
    }

    const deptOnRowClick = (datum: IDashboardPageProps) => {
        //TODO: route to `/programs/${datum.name}`
    }

    const pickDepartment = () => {
        //axios.get(`/departmentTable/${departmentID}`, setDeptTable)
        return <DashboardTable data={softwareTableData} onRowClick={deptOnRowClick} />
    }

    useEffect(() => {
        // Data Fetching
        axios.get('/Programs/Licenses', setLicenses)
        axios.get('/programs/softwareTable', setSoftwareTableData) //TODO: find out endpoint name
        axios.get('/cost/dashboard', setCosts)
        axios.get('/cost/CostPieChart', setPieData)
        axios.get('/departmentTable?$select=departmentName,departmentID', setDeptList)
        let array: IDropdownItem[] = []
        deptList.map(i => {
            array.push({name: i.departmentName, onClick: pickDepartment})
        })
        setDropdownContent(array)
    }, [setLicenses, setSoftwareTableData, setCosts, setPieData, setDeptList])

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
                        data={{
                            programsCost: costs.costOfProgramsPerYear,
                            pluginsCost: costs.costOfPluginsPerYear,
                        }}
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
                <Card>
                    <Dropdown content={dropdownContent} titleClassName={styles.linkedTitle} />
                </Card>
            </div>

            <div className={styles.dashColumn}>
                <Card title={'Departments'} titleClassName={styles.linkedTitle}>
                    <RechartPieChart
                        pieChartData={initPieData}
                        initialColors={['#009EFF', '#FF9340', '#3D4599', '#1425CC', '#CC4A14']}
                    />
                </Card>
                <Card title={'software'} titleClassName={styles.linkedTitle}>
                    <DashboardTable data={softwareTableData} onRowClick={softwareOnRowClick} />
                </Card>
            </div>
        </div>
    )
}
