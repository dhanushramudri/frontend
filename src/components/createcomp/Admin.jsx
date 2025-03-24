import React from 'react'
import CreateModules from './CreateModules'
import CreateQuiz from './CreateQuizz'
import CreateSlides from './CreateSlides'
const Admin = () => {
  return (
    <div>
        <CreateModules />
        <CreateQuiz />
        <CreateSlides />
    </div>
  )
}

export default Admin