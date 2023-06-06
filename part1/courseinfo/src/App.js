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

const Total = ({ parts }) => (
    <p>
        Number of exercises {parts.reduce( (acc, part) => acc + part.exercises, 0)}
    </p>

)

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }

  return (
    <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </div>
  )
}

export default App;
