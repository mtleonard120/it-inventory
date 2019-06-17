import React, {useState} from 'react'
import {PieChart, Pie, Cell} from 'recharts'
import {CustomLabel} from './CustomLabel/CustomLabel'
import styles from './PieChart.module.css'

// Types
export interface IRechartPieDatum {
    name: string
    value: number
    id: string //the id is to rout to the dept detail page
}

export interface IPieDataProps {
    headingName: string
    data: IRechartPieDatum[]
}

interface IRechartPieProps {
    pieChartData: IPieDataProps[]
    initialColors: string[]
    onSliceClick?: any
}

export const RechartPieChart: React.FunctionComponent<IRechartPieProps> = props => {
    const {pieChartData, initialColors, onSliceClick} = props

    const [colors, setColors] = useState(initialColors)
    //colors off of invision: ['#009EFF', '#FF9340', '#3D4599', '#1425CC', '#CC4A14']

    const onMouseOver = (data: IRechartPieDatum[], index: number) => {
        const updatedColors = [...initialColors] // Create clone of initial colors array
        updatedColors[index] = '#555555' // Change particular index in our cloned array
        setColors(updatedColors) // Set new color array
    }

    const onMouseOut = (data: IRechartPieDatum[], index: number) => {
        setColors(initialColors)
    }

    //axios stuff for dashboard
    // const axios = new AxiosService("access token", "refresh token");
    // let x: {
    //   pieChartData: IDataProps[];
    // } = {
    //   pieChartData: [{ headingName: "", data: [{ name: "", value: 0, id: "" }] }]
    // };
    // const [val, setVal] = useState(x);
    // useEffect(() => {
    //   axios.get("cost/CostPieChart", setVal);
    // }, [setVal]);
    // console.log(val);

    return (
        <div className={styles.pieContainer}>
            {/* Headers */}
            <div className={styles.inline} style={{}}>
                {pieChartData.map(datum => (
                    <h3 key={datum.headingName} className={styles.header}>
                        {datum.headingName}
                    </h3>
                ))}
            </div>

            {/* Pie Charts */}
            <div className={styles.inline}>
                <PieChart width={380 * pieChartData.length} height={300}>
                    {pieChartData.map((datum, i) => (
                        <Pie
                            key={datum.headingName}
                            data={datum.data}
                            cx={190 + 380 * i}
                            cy={150}
                            dataKey='value'
                            fill='#8884d8'
                            labelLine={false}
                            label={<CustomLabel data={datum.data} />}
                            isAnimationActive={false}
                            onMouseOver={onMouseOver}
                            onMouseOut={onMouseOut}
                        >
                            {datum.data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={colors[index]}
                                    onClick={
                                        onSliceClick
                                            ? () => {
                                                  onSliceClick(entry.name)
                                              }
                                            : undefined
                                    }
                                />
                            ))}
                        </Pie>
                    ))}
                </PieChart>
            </div>

            {/* Legend */}
            <div className={styles.inline}>
                {pieChartData[0].data.map((datum, index) => (
                    <div
                        key={index}
                        className={styles.legendList}
                        onClick={
                            onSliceClick
                                ? () => {
                                      onSliceClick(datum.name)
                                  }
                                : undefined
                        }
                    >
                        <div className={styles.circle} style={{backgroundColor: colors[index]}} />
                        {datum.name}
                    </div>
                ))}
            </div>
        </div>
    )
}
