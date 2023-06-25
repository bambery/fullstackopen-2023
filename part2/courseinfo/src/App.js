const Header = ({ course }) => (
    <h2>
        {course}
    </h2>
)

const Part = ({ part }) => (
    <p>
        {part.name} {part.exercises}
    </p>
)

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map( part => <Part key={part.id} part={part} />)}
        </div>
    )
}

const Total = ({ parts }) => (
    <p>
        <b>total of {parts.reduce( (acc, part) => acc + part.exercises, 0)} exercises</b>
    </p>

)

const Course = ({ course }) => (
    <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </div>
)

const App = () => {
    const courses = [
    {
        id: 1,
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
                id: 1
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
                id: 2
            },
            {
                name: 'State of a component',
                exercises: 14,
                id: 3
            },
            {
                name: 'Redux',
                exercises: 11,
                id: 4
            }
        ]
    },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                }
            ]
        }
    ]

    return(
        <div>
            <h1>Web development cirriculum</h1>
            {courses.map(course => <Course key={course.id} course={course} />)}
        </div>
    )
}

export default App;
