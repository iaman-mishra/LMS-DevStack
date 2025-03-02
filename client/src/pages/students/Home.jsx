import React from 'react'
import Hero from '../../components/students/Hero'
import Companies from '../../components/students/Companies'
import CourseSection from '../../components/students/CourseSection'
import TestinomialsSection from '../../components/students/TestinomialsSection'
import CallToAction from '../../components/students/CallToAction'
const Home = () => {
  return (
    <div className='flex flex-col items-center space-y-7 text-center'>
      <Hero/>
      <Companies/>
      <CourseSection/>
      <TestinomialsSection/>
      <CallToAction/>
    </div>
  )
}

export default Home