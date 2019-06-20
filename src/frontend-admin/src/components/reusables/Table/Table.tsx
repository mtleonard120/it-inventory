import React, {useState} from 'react'

import {concatStyles} from '../../../utilities/mikesConcat'
import styles from './Table.module.css'

import {cloneDeep} from 'lodash'

// to use this component you need:
// 1 - an array of strings of the header names for each column
// 2 - propdata of any type and any length
// 3 - an array of strings of dataKeys that match the name of each datum in propdata
// 4 - array of arrow functions for the concatenations of each datum in propdata that is
// returned in a single <td> with whatever styling you want

interface ITableProps {
    headers: string[]
    propData: any[]
    dataKeys: string[]
    concatonations: Function[]
    onRowClick?: (datum: any) => void
}

export const Table = (props: ITableProps) => {
    const {concatonations, dataKeys, headers, propData, onRowClick} = props
    const isClickable = Boolean(onRowClick)
    const [data, setData] = useState(propData)
    var tempData = cloneDeep(data)
    const [justGonnaSendIt, setJustGonnaSendIt] = useState(0)
    //0 --> descending or default | 1 --> ascending
    //used to descend/ascend and flip the arrow icon

    function quickSortAscend(low: number, high: number, keyName: string) {
        //TODO: override the comparison for strings maybe??? so this can be reused
        let i = low
        let j = high
        let pivot = high
        while (i <= j) {
            // check if number on left of pivot is > than the pivot
            // and swap it if it is
            while (tempData[i][keyName] < tempData[pivot][keyName]) {
                i++
            }
            while (tempData[j][keyName] > tempData[pivot][keyName]) {
                j--
            }
            if (i <= j) {
                //exchange the numbers then increment again
                ;[tempData[i], tempData[j]] = [tempData[j], tempData[i]]
                i++
                j--
            }
        }
        if (low < j) {
            quickSortAscend(low, j, keyName)
        }
        if (i < high) {
            quickSortAscend(i, high, keyName)
        }
    }

    function quickSortDescend(low: number, high: number, keyName: string) {
        let i = low
        let j = high
        let pivot = high

        while (i <= j) {
            // check if number on left of pivot is < than the pivot
            // and swap it if it is
            while (tempData[i][keyName] > tempData[pivot][keyName]) {
                i++
            }
            while (tempData[j][keyName] < tempData[pivot][keyName]) {
                j--
            }
            if (i <= j) {
                //exchange the numbers then increment again
                ;[tempData[i], tempData[j]] = [tempData[j], tempData[i]]
                i++
                j--
            }
        }
        if (low < j) {
            quickSortDescend(low, j, keyName)
        }
        if (i < high) {
            quickSortDescend(i, high, keyName)
        }
    }

    function resetArrows() {
        //resets all the arrows to the bars
        for (let key of dataKeys) {
            let arrow = document.getElementById(key) as HTMLElement
            arrow.style.borderLeft = '8px solid #636363'
            arrow.style.borderRight = '8px solid #636363'
            arrow.style.borderTop = '2px solid #636363'
            arrow.style.borderBottom = 'none'
            arrow.style.top = '15px'
        }
    }

    function sortTable(keyName: any) {
        if (data.length > 0) {
            //low, high, and pivot are indices
            var low = 0
            var high = data.length - 1

            if (justGonnaSendIt == 0) {
                //--> ascending order
                quickSortAscend(low, high, keyName)
                resetArrows()
                //set specific arrow to pointing upwards
                let arrow = document.getElementById(keyName) as HTMLElement
                arrow.style.borderTop = '8px solid transparent'
                arrow.style.borderBottom = '8px solid #636363'
                arrow.style.borderLeft = '8px solid transparent'
                arrow.style.borderRight = '8px solid transparent'
                arrow.style.top = '0px'
            } else if (justGonnaSendIt == 1) {
                //--> descending order
                quickSortDescend(low, high, keyName)
                resetArrows()
                //set specific arrow to pointing downwards
                let arrow = document.getElementById(keyName) as HTMLElement
                arrow.style.borderTop = '8px solid #636363'
                arrow.style.borderBottom = '8px solid transparent'
                arrow.style.borderLeft = '8px solid transparent'
                arrow.style.borderRight = '8px solid transparent'
                arrow.style.top = '15px'
            }

            setJustGonnaSendIt((justGonnaSendIt + 1) % 2)
            setData(tempData)
        }
        return
    }

    return (
        <table id='myTable' className={concatStyles(styles.table, {[styles.clickable]: isClickable})}>
            <thead>
                <tr>
                    {headers.map((datum, i) => (
                        <td onClick={e => sortTable(dataKeys[i])} key={datum}>
                            <div className={styles.header}>
                                {headers[i]}
                                <div id={dataKeys[i]} className={styles.arrow} />{' '}
                            </div>
                        </td>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((datum, i) => (
                    <tr
                        id='row'
                        key={datum.name}
                        className={concatStyles(styles.tr, {[styles.clickable]: isClickable})}
                        onClick={
                            onRowClick
                                ? e => {
                                      onRowClick(datum)
                                  }
                                : undefined
                        }
                    >
                        {concatonations.map((concat, j) => concat(datum))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
