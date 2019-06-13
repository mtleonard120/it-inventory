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
        costOfProgramsPerYear: 12,
        costOfPluginsPerYear: 12,
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
    let initDeptTable: IDashboardTableDatum[] = [{name: 'Item 1', numberOf: 6, costPerMonth: 4, projected: '*'}]
    let initDeptTable2: IDashboardTableDatum[] = [
        ...initDeptTable,
        {name: 'Item 5', numberOf: 5, costPerMonth: 5, projected: ''},
    ]
    let initDropdownContent: IDropdownItem[] = [
        {id: 1, name: 'init', onClick: () => <DashboardTable data={initDeptTable} onRowClick={() => {}} />},
        {id: 2, name: 'init 2', onClick: () => <DashboardTable data={initDeptTable2} onRowClick={() => {}} />},
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

    const pickDepartment = (id: number) => {
        axios
            .get(`/departmentTable/${id}`)
            .then((data: any) => {
                let x: IDashboardTableDatum[] = []
                data &&
                    data.map((i: any) =>
                        x.push({
                            name: i.programName,
                            numberOf: i.programCount,
                            costPerMonth: i.programCostPerYear / 12,
                            projected: i.programIsCostPerYear ? '' : '*',
                        })
                    )
                console.log(x)
                //setDeptTableData(x) //This causes infinite loop
            })
            .catch((err: any) => console.log(err))

        return <DashboardTable data={deptTableData} onRowClick={deptOnRowClick} />
    }

    const updateDropdownContent = () => {
        let array: IDropdownItem[] = []
        deptList &&
            deptList.map(i =>
                array.push({
                    id: i.DepartmentId,
                    name: i.DepartmentName,
                    onClick: pickDepartment,
                })
            )

        console.log(array)
        setDropdownContent(array)
    }

    useEffect(() => {
        // Data Fetching

        axios
            .get('/Programs/Licenses')
            .then((data: any) => {
                console.log(data)
                setLicenses(data)
            })
            .catch((err: any) => console.log(err))

        // axios
        //     .get('/Programs/softwareTable')//TODO: get real endpoint
        //     .then((data: any) => {
        //         console.log(data)
        //     })
        //     .catch((err: any) => console.log(err))

        // axios
        //     .get('/Cost/CostBreakdown')
        //     .then((data: any) => {
        //         console.log(data)
        //         data && setCosts(data)
        //         console.log(costs)
        //     })
        //     .catch((err: any) => console.log(err))

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
                    data[0].data.map((i: any) => {
                        x[0].data.push({
                            name: i.departmentName,
                            value: i.costOfPrograms ? i.costOfPrograms : 0,
                            id: i.departmentId,
                        })
                    })

                data[1].data2 &&
                    data[1].data2.map((i: any) => {
                        x[1].data.push({
                            name: i.departmentName,
                            value: i.costOfPrograms ? i.costOfPrograms : 0,
                            id: i.departmentId,
                        })
                    })
                //console.log(x)
                setPieData(x)
            })
            .catch((err: any) => console.log(err))

        // axios
        //     .get('/departmentTable?$select=departmentName,departmentID', setDeptList)
        //     .then((data: any) => setDeptList(data))
        //     .catch((err: any) => console.log(err))

        axios
            .get('/departmentTable?$select=departmentName,departmentID')
            .then((data: any) => {
                setDeptList(data)
            })
            .catch((err: any) => console.log(err))
    }, [])

    useEffect(updateDropdownContent, [deptList])

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
                        pieChartData={pieData}
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
