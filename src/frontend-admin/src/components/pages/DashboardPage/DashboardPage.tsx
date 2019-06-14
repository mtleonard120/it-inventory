import React, {useState, useEffect} from 'react'
import {AxiosService} from '../../../services/AxiosService/AxiosService'

import {IoIosArrowRoundUp, IoIosArrowRoundDown, IoIosStats} from 'react-icons/io'
//import {TiPin} from 'react-icons/ti'

// Styles
import styles from './DashboardPage.module.css'

// Components
import {Dropdown, IDropdownItem} from '../../reusables/Dropdown/Dropdown'
import {Card} from '../../reusables/Card/Card'
import {Group} from '../../reusables/Group/Group'
import {HorizontalBarChart} from '../../reusables/HorizontalBarChart/HorizontalBarChart'
import {DashboardTable, IDashboardTableDatum} from '../../reusables/DashboardTable/DashboardTable'
import {RechartPieChart, IPieDataProps} from '../../reusables/PieChart/PieChart'
import {CostCard} from '../Dashboard/CostCard/CostCard'

// Types
interface IDashboardPageProps {}

// Primary Component
export const DashboardPage: React.FC<IDashboardPageProps> = props => {
    const axios = new AxiosService('accessToken', 'refreshToken')

    //Liscence Bar Chart State
    let initLicenses: {
        programName: string
        countProgInUse: number
        countProgOverall: number
    }[] = [{programName: 'init', countProgInUse: 5, countProgOverall: 6}]
    const [licenses, setLicenses] = useState(initLicenses)

    //Software Table State
    let initSoftwareTableData: IDashboardTableDatum[] = [{name: 'Init', numberOf: 5, costPerMonth: 5, projected: '*'}]
    const [softwareTableData, setSoftwareTableData] = useState(initSoftwareTableData)

    //Cost Card State
    let initCosts: {
        costOfProgramsPerYear: number
        costOfPluginsPerYear: number
    } = {
        costOfProgramsPerYear: 0,
        costOfPluginsPerYear: 0,
    }
    const [costs, setCosts] = useState(initCosts)

    //Pie State
    let initPieData: IPieDataProps[] = [
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
    let initDeptList: {DepartmentName: string; DepartmentId: number}[] = []
    let initDeptTable: {id: number; name: string; tableData: IDashboardTableDatum[]}[] = [
        {
            id: -1,
            name: 'Select a Department',
            tableData: [],
        },
    ]

    let initDropdownContent: IDropdownItem[] = [
        {
            id: initDeptTable[0].id,
            name: initDeptTable[0].name,
            component: <DashboardTable data={initDeptTable[0].tableData} onRowClick={() => {}} />,
        },
    ]

    const [deptList, setDeptList] = useState(initDeptList)
    const [deptTableData, setDeptTableData] = useState(initDeptTable)
    const [dropdownContent, setDropdownContent] = useState(initDropdownContent)

    //TODO: get dropdown working once enpoint works

    //Click Handling
    const softwareOnRowClick = (datum: IDashboardPageProps) => {
        //TODO: route to `/programs/${datum.name}`
    }

    const deptOnRowClick = (datum: IDashboardPageProps) => {
        //TODO: route to `/programs/${datum.name}`
    }

    const getDeptTables = () => {
        let deptTables: {id: number; name: string; tableData: IDashboardTableDatum[]}[] = []
        deptList &&
            deptList.map(i =>
                axios
                    .get(`/departmentTable/${i.DepartmentId}`)
                    .then((data: any) => {
                        let y: IDashboardTableDatum[] = []
                        //console.log(data)
                        data &&
                            data.map((cur: any) =>
                                y.push({
                                    name: cur.programName,
                                    numberOf: cur.programCount,
                                    costPerMonth: Number((cur.programCostPerYear / 12).toFixed(2)),
                                    projected: cur.programIsCostPerYear ? '' : '*',
                                })
                            )
                        deptTables.push({id: i.DepartmentId, name: i.DepartmentName, tableData: y})
                    })
                    .catch((err: any) => console.log(err))
            )
        //console.log(deptTables)
        setDeptTableData(deptTables)
    }

    const updateDropdownContent = () => {
        let x: IDropdownItem[] = []

        deptTableData.map((i: any) =>
            x.push({
                id: i.id,
                name: i.name,
                component: (
                    <div className={styles.software}>
                        <DashboardTable data={i.tableData} onRowClick={deptOnRowClick} />
                        <div className={styles.softwareKey}>
                            <div>Cost Per Year* = Projected</div>
                        </div>
                    </div>
                ),
            })
        )

        //console.log(x)
        setDropdownContent(x)
    }

    useEffect(() => {
        // Data Fetching
        axios
            .get('/Programs/Licenses')
            .then((data: any) => {
                setLicenses(data)
            })
            .catch((err: any) => console.log(err))

        axios
            .get('/Programs/softwareTable')
            .then((data: any) => {
                //console.log(data)

                let x: IDashboardTableDatum[] = []
                data &&
                    data.map((i: any) =>
                        x.push({
                            name: i.isPinned ? i.softwareName + '*' : i.softwareName + '',
                            numberOf: i.numberOfUsers,
                            costPerMonth: i.costPerMonth,
                            projected: i.isProjected ? '*' : '',
                        })
                    )
                setSoftwareTableData(x)
            })
            .catch((err: any) => console.log(err))

        axios
            .get('/Cost/CostBreakdown')
            .then((data: any) => {
                console.log(data)
                data && setCosts(data[0])
            })
            .catch((err: any) => console.log(err))

        axios
            .get('/Cost/CostPieCharts')
            .then((data: any) => {
                let x: IPieDataProps[] = [
                    {
                        headingName: data[0].headingName,
                        data: [],
                    },
                    {
                        headingName: data[1].headingName,
                        data: [],
                    },
                ]
                data[0].data &&
                    data[0].data.map((i: any) =>
                        x[0].data.push({
                            name: i.departmentName,
                            value: i.costOfPrograms !== null ? i.costOfPrograms : 0,
                            id: i.departmentId,
                        })
                    )

                data[1].data2 &&
                    data[1].data2.map((i: any) =>
                        x[1].data.push({
                            name: i.departmentName,
                            value: i.costOfHardware !== null ? i.costOfHardware : 0,
                            id: i.departmentId,
                        })
                    )
                //console.log(data)
                setPieData(x)
            })
            .catch((err: any) => console.log(err))

        axios
            .get('/departmentTable?$select=departmentName,departmentID')
            .then((data: any) => setDeptList(data))
            .catch((err: any) => console.log(err))
    }, [])

    useEffect(getDeptTables, [deptList])
    //console.log(deptTableData)
    // let initDropdownContent: IDropdownItem[] = deptTableData[0] && [
    //     {name: deptTableData[0].name, id: deptTableData[0].id},
    // ]
    // const [dropdownContent, setDropdownContent] = useState(initDropdownContent)
    useEffect(updateDropdownContent, [deptTableData, dropdownContent])

    return (
        <div className={styles.dashMain}>
            <div className={styles.dashColumn}>
                <Card title={'licenses'} titleClassName={styles.linkedTitle}>
                    <Group>
                        {licenses &&
                            licenses.map(i => (
                                <HorizontalBarChart
                                    key={i.programName}
                                    title={i.programName}
                                    amount={i.countProgInUse}
                                    outOf={i.countProgOverall}
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
                        icon={
                            <span>
                                <IoIosArrowRoundUp className={styles.upArrowIcon} />
                                <IoIosArrowRoundDown className={styles.downArrowIcon} />
                            </span>
                        }
                    />
                    <CostCard
                        cardTitle='Monthly Cost'
                        data={{
                            programsCost: Number((costs.costOfProgramsPerYear / 12).toFixed(2)), //TODO: round the numbers 4 decimal places
                            pluginsCost: Number((costs.costOfPluginsPerYear / 12).toFixed(2)),
                        }}
                        icon={<IoIosStats className={styles.statsIcon} />}
                    />
                </div>
                <Card>
                    <Dropdown content={dropdownContent} titleClassName={styles.linkedTitle} />
                </Card>
            </div>

            <div className={styles.dashColumn}>
                <Card title={'Departments'} titleClassName={styles.linkedTitle} className={styles.pieCard}>
                    <RechartPieChart
                        pieChartData={pieData}
                        initialColors={['#009EFF', '#FF9340', '#3D4599', '#1425CC', '#CC4A14', '#255200', '#888']}
                    />
                </Card>
                <Card title={'software'} titleClassName={styles.linkedTitle}>
                    <div className={styles.software}>
                        <DashboardTable data={softwareTableData} onRowClick={softwareOnRowClick} />
                        <div className={styles.softwareKey}>
                            <div>Name* = Pinned</div>
                            <div>Cost Per Year* = Projected</div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}
