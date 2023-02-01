import React from 'react'

function About({ about, hideAboutSection }) {
  return (
    <div className={about ? 'about-section' : 'about-section hidden'}>
        <h1>About</h1>

        <p> Words is a simple application that calls on the WordsAPI and generates results
            based on search criteria and selected options. For example, users can search for word 
            definitions, synonyms, antonyms, rhymning words, frequency of use, pronunciation and more.
        </p>
        
        <div className='about-section-close'>
            <p onClick={hideAboutSection}>Close</p>
        </div>
    </div>
  )
}

export default About