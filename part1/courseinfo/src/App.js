const Header = ({ course }) => (
    <h1>
        {course}
    </h1>
)

const Part = ({ partName, exerciseNum }) => (
    <p>
        {partName} {exerciseNum}
    </p>
)

const Content = ({ parts, exercises }) => {
    return (
        <div>
            <Part partName={parts[0]} exerciseNum={exercises[0]} />
            <Part partName={parts[1]} exerciseNum={exercises[1]} />
            <Part partName={parts[2]} exerciseNum={exercises[2]} />
        </div>
    )
}

const Total = ({ exerciseTotal }) => (
    <p>
        Number of exercises {exerciseTotal}
    </p>

)

const App = () => {
    const course = 'Half Stack application development'
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14

  return (
    <div>
        <Header course={course} />
        <Content parts={[part1, part2, part3]} exercises={[exercises1, exercises2, exercises3]} />
        <Total exerciseTotal={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App;
