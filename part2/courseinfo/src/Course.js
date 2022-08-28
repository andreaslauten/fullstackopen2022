const Header = ({ coursename }) => <h1>{coursename}</h1>

const Total = ({ sum }) => <b>total of {sum} exercises</b>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  parts.map(part => <Part key={part.id} part={part} />)

const Course = ({course}) => {

  const sum = course.parts.reduce((prev, curr) => 
    prev + curr.exercises, 0)

  return (
    <>
      <Header coursename={course.name} />
      <Content parts={course.parts} />
      <Total sum={sum} />
    </>
  )
}

export default Course