import React from 'react'
import Heros from './Heros'
import Footer from './Footer'
import Body from './Body'

function LandingPage() {
  return (
    <>
    <div style={{
        alignContent : "center"
    }}>

        <Heros />
        <Body />
        <Footer />
    </div>
    </>
  )
}

export default LandingPage