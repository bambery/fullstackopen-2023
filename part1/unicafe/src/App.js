import { useState } from 'react'

const Statistics = ({ good, neutral, bad }) => {
    if(good || neutral || bad){
        return(
            <>
                <div>average {(good - bad)/(good + neutral + bad)}</div>
                <div>positive {good * 100/(good + neutral + bad)} %</div>
            </>
        )
    }
}

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const Count = ({ count, text }) => <div>{text} {count}</div>

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [total, setTotal] = useState(good + neutral + bad)

    console.log(total)
    return (
        <div>
            <div>
                <h1>give feedback</h1>
                <Button handleClick={() => setGood(good + 1)} text={'good'}/>
                <Button handleClick={() => setNeutral(neutral + 1)} text={'neutral'}/>
                <Button handleClick={() => setBad(bad + 1)} text={'bad'}/>
            </div>
            <div>
                <h1>statistics</h1>
                <Count count={good} text='good'/>
                <Count count={neutral} text='neutral'/>
                <Count count={bad} text='bad'/>
                <Statistics good={good} neutral={neutral} bad={bad} />
            </div>
        </div>
    )
}

export default App