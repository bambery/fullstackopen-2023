import { useState } from 'react'

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const StatisticLine = ({ val, text }) => (
    <tr>
        <td>{text}</td>
        <td>{val}</td>
    </tr>
)

const Statistics = ({ good, neutral, bad }) => {
    const total = good + neutral + bad

    if(total) {
        return(
            <table>
                <tbody>
                    <StatisticLine val={good} text='good'/>
                    <StatisticLine val={neutral} text='neutral'/>
                    <StatisticLine val={bad} text='bad'/>
                    <StatisticLine val={(good - bad)/total} text='average' />
                    <StatisticLine val={`${good*100/total} %`} text='positive'/>
                </tbody>
            </table>
        )
    }
    return(
        <p>No feedback given</p>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <div>
                <h1>give feedback</h1>
                <Button handleClick={() => setGood(good + 1)} text={'good'}/>
                <Button handleClick={() => setNeutral(neutral + 1)} text={'neutral'}/>
                <Button handleClick={() => setBad(bad + 1)} text={'bad'}/>
                <h1>statistics</h1>
                <Statistics good={good} neutral={neutral} bad={bad}/>
            </div>
        </div>
    )
}

export default App
