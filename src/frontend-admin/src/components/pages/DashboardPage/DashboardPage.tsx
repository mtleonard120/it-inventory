import React, {useState, useEffect, useContext} from 'react'
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

// Context
import {LoginContext} from '../../App/App'

// Types
interface IDashboardPageProps {
    history: any
}

// Initial props
let initLicenses: {
    programName: string
    countProgInUse: number
    countProgOverall: number
}[] = []
let initSoftwareTableData: IDashboardTableDatum[] = [{name: 'Init', numberOf: 5, costPerMonth: 5, projected: '*'}]
let initCosts: {
    costOfProgramsPerYear: number
    costOfPluginsPerYear: number
} = {
    costOfProgramsPerYear: 0,
    costOfPluginsPerYear: 0,
}
let initPieData: IPieDataProps[] = [
    {
        headingName: 'Software',
        data: [
            {name: 'one', value: 0, id: ''},
            {name: 'two', value: 0, id: ''},
            {name: 'three', value: 0, id: ''},
            {name: 'four', value: 0, id: ''},
        ],
    },
    {
        headingName: 'Hardware',
        data: [
            {name: 'one', value: 0, id: ''},
            {name: 'two', value: 0, id: ''},
            {name: 'three', value: 0, id: ''},
            {name: 'four', value: 0, id: ''},
        ],
    },
]
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

// Primary Component
export const DashboardPage: React.FC<IDashboardPageProps> = props => {
    const {history} = props
    const {
        loginContextVariables: {accessToken, refreshToken},
    } = useContext(LoginContext)
    const axios = new AxiosService(accessToken, refreshToken)

    //Liscence Bar Chart State
    const [licenses, setLicenses] = useState(initLicenses)

    //Software Table State
    const [softwareTableData, setSoftwareTableData] = useState(initSoftwareTableData)

    //Cost Card State
    const [costs, setCosts] = useState(initCosts)

    //Pie State
    const [pieData, setPieData] = useState(initPieData)

    //Department Tables State
    const [deptList, setDeptList] = useState(initDeptList)
    const [deptTableData, setDeptTableData] = useState(initDeptTable)
    const [dropdownContent, setDropdownContent] = useState(initDropdownContent)

    //TODO: get dropdown working once enpoint works

    //Click Handling
    const onRowClick = (datum: IDashboardTableDatum) => {
        history.push(`/programs/${datum.name}`)
    }

    const onBarClick = (id: string) => {
        history.push(`/programs/${id}`)
    }

    const onSliceClick = (id: string) => {
        history.push(`/departments/${id}`)
    }

    const getDeptTables = () => {
        initDeptTable = []
        deptList &&
            deptList.map(i =>
                axios
                    .get(`/departmentTable/${i.DepartmentId}`)
                    .then((data: any) => {
                        let y: IDashboardTableDatum[] = []
                        data &&
                            data.map((cur: any) =>
                                y.push({
                                    name: cur.programName,
                                    numberOf: cur.programCount,
                                    costPerMonth: cur.programCostPerYear / 12,
                                    projected: cur.programIsCostPerYear ? '' : '*',
                                })
                            )
                        initDeptTable.push({id: i.DepartmentId, name: i.DepartmentName, tableData: y})
                    })
                    .catch((err: any) => console.log(err))
            )
        setDeptTableData(initDeptTable)
    }

    const updateDropdownContent = () => {
        initDropdownContent.pop()

        deptTableData.map((i: any) =>
            initDropdownContent.push({
                id: i.id,
                name: i.name,
                component: (
                    <div className={styles.software}>
                        <DashboardTable data={i.tableData} onRowClick={onRowClick} />
                        <div className={styles.softwareKey}>
                            <div>Cost Per Year* = Projected</div>
                        </div>
                    </div>
                ),
            })
        )
        //console.log(initDropdownContent)
        setDropdownContent(initDropdownContent)
    }

    useEffect(() => {
        axios
            .get('/Programs/Licenses')
            .then((data: any) => {
                setLicenses(data)
            })
            .catch((err: any) => console.log(err))

        axios
            .get('/Programs/softwareTable')
            .then((data: any) => {
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
                setPieData(x)
            })
            .catch((err: any) => console.log(err))

        axios
            .get('/departmentTable?$select=departmentName,departmentID')
            .then((data: any) => setDeptList(data))
            .catch((err: any) => console.log(err))
    }, [])

    useEffect(getDeptTables, [deptList])
    useEffect(updateDropdownContent, [deptTableData, getDeptTables, dropdownContent])

    return (
        <div className={styles.dashMain}>
            <div className={styles.dashColumn}>
                <Card
                    title={'licenses'}
                    titleClassName={styles.linkedTitle}
                    titleOnClick={() => {
                        history.push('/programs')
                    }}
                >
                    <Group>
                        {licenses &&
                            licenses.map(i => (
                                <HorizontalBarChart
                                    key={i.programName}
                                    title={i.programName}
                                    amount={i.countProgInUse}
                                    outOf={i.countProgOverall}
                                    onClick={onBarClick}
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
                            programsCost: costs.costOfProgramsPerYear / 12,
                            pluginsCost: costs.costOfPluginsPerYear / 12,
                        }}
                        icon={<IoIosStats className={styles.statsIcon} />}
                    />
                </div>
                <Card>
                    <Dropdown content={dropdownContent} titleClassName={styles.linkedTitle} />
                </Card>
            </div>

            <div className={styles.dashColumn}>
                <Card
                    title={'Departments'}
                    titleClassName={styles.linkedTitle}
                    className={styles.pieCard}
                    titleOnClick={() => {
                        history.push('/departments')
                    }}
                >
                    <RechartPieChart
                        pieChartData={pieData}
                        initialColors={['#009EFF', '#FF9340', '#3D4599', '#1425CC', '#CC4A14', '#255200', '#888']}
                        onSliceClick={onSliceClick}
                    />
                </Card>
                <Card
                    title={'software'}
                    titleClassName={styles.linkedTitle}
                    titleOnClick={() => {
                        history.push('/programs')
                    }}
                >
                    <div className={styles.software}>
                        <DashboardTable data={softwareTableData} onRowClick={onRowClick} />
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
