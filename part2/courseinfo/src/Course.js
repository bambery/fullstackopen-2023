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

export default Course
