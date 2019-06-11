import React from 'react'
import ReactDOM from 'react-dom'
import {HorizontalBarChart, IHorizontalBarChartProps as Props} from './HorizontalBarChart'

const props: Props = {
    title: 'Test',
    amount: 8,
    outOf: 10,
    onClick: () => {},
}

it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<HorizontalBarChart {...props} />, div)
    ReactDOM.unmountComponentAtNode(div)
})

it('renders without crashing when amount > outOf', () => {
    const div = document.createElement('div')
    ReactDOM.render(<HorizontalBarChart {...{...props, outOf: 4}} />, div)
    ReactDOM.unmountComponentAtNode(div)
})
