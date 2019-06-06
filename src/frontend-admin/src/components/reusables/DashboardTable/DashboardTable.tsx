import React from 'react';
import './DashboardTable.css';

// onRowClick = (url: string) => {window.replace(url)}
//types
export interface IDatum{
    name:string
    numberOf:number
    cost:number
    url: string
}

interface IProps{
    data:IDatum[];
    onRowClick?: (url: string) => void
}

const LastTable = (props: IProps) => {
    const {data} = props;

const onRowClick =(datum:IDatum) => {
    console.log(datum.url)
} 

    return(
        <table>
            {data.map((datum) => (
                <tr className= 'row' onClick={(e) => {onRowClick(datum)}}>
                    <td>{datum.name}</td>
                    <td>{datum.numberOf}</td>
                    <td>${datum.cost}</td>
                </tr>
            ))}
        </table>
    );
};
