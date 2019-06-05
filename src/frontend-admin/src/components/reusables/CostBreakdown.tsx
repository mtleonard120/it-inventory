import React from 'react';

interface IProps{
    iconPathArray: string[];//this is an array of paths for an icon
                            //you can find an icon in a library and 
                            //inspect (ctrl+i) it for it's path
    cost: number;
    color: string;
    width: string;
    height: string;
}

export const CostBreakdown = (props:IProps) => {
    const {iconPathArray, cost, color, width, height} = props;

    //reference for what we are using
    //color: #FF9340
    //stats bar path: M184 448h48c4.4 0 8-3.6 8-8V72c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v368c0 4.4 3.6 8 8 8zM88 448h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8H88c-4.4 0-8 3.6-8 8v144c0 4.4 3.6 8 8 8zM280.1 448h47.8c4.5 0 8.1-3.6 8.1-8.1V232.1c0-4.5-3.6-8.1-8.1-8.1h-47.8c-4.5 0-8.1 3.6-8.1 8.1v207.8c0 4.5 3.6 8.1 8.1 8.1zM368 136.1v303.8c0 4.5 3.6 8.1 8.1 8.1h47.8c4.5 0 8.1-3.6 8.1-8.1V136.1c0-4.5-3.6-8.1-8.1-8.1h-47.8c-4.5 0-8.1 3.6-8.1 8.1z
    //stats bar width: 125      stats bar heigh: 75
    //up arrows path: M348.3 216.4c-5 5.1-13.3 5.1-18.4.1L269 155.8v231.3c0 7.1-5.8 12.9-13 12.9s-13-5.8-13-12.9V155.8l-60.9 60.8c-5.1 5-13.3 4.9-18.4-.1-5-5.1-5-13.2.1-18.3l83-82.4c1.2-1.1 2.5-2 4.1-2.7 1.6-.7 3.3-1 5-1 3.4 0 6.6 1.3 9.1 3.7l83 82.4c5.2 4.9 5.3 13.1.3 18.2z
    //down arrows path: M348.3 295.6c-5-5.1-13.3-5.1-18.4-.1L269 356.2V124.9c0-7.1-5.8-12.9-13-12.9s-13 5.8-13 12.9v231.3l-60.9-60.8c-5.1-5-13.3-4.9-18.4.1-5 5.1-5 13.2.1 18.3l83 82.4c1.2 1.1 2.5 2 4.1 2.7 1.6.7 3.3 1 5 1 3.4 0 6.6-1.3 9.1-3.7l83-82.4c5.2-4.9 5.3-13.1.3-18.2z
    //arrows width: 75       arrows height: 125
    
    return(
        <div>
            {iconPathArray.map((iconPath) => (
                <svg viewBox="0 0 550 500" preserveAspectRatio="none" width={width} height={height} fill={color}>
                    <path d={iconPath}></path>
                </svg>
            ))};
        
        <h1 style={{color:color}}>${cost}</h1>
        </div>
    );
};