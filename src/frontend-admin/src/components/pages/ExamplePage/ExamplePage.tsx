import React from 'react';

// Styles
import styles from './ExamplePage.module.css';

// Types
interface IExamplePageProps {
    exampleProp: string
}

// Primary Component
export const ExamplePage: React.FC<IExamplePageProps> = props => {

    const {exampleProp} = props

    return (
        <div className={styles.example}>I'm an example: {exampleProp}</div>
    );
};


