const Header = ({ course }) => (
    <h1>
        {course}
    </h1>
)

const Part = ({ part }) => (
    <p>
        {part.name} {part.exercises}
    </p>
)

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map( part => <Part part={part} />)}
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
    const part1 = {
        name: 'Fundamentals of React',
        exercises: 10
    }
    const part2 = {
        name: 'Using props to pass data',
        exercises: 7
    }
    const part3 = {
        name: 'State of a component',
        exercises: 14
    }

  return (
    <div>
        <Header course={course} />
        <Content parts={[part1, part2, part3]} />
        <Total exerciseTotal={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  )
}

export default App;
