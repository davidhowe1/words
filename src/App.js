import './App.css';
import './darkMode.css';
import './index.css'
import Alert from './components/Alert';
import { useState, useEffect } from 'react';
import WordDetails from './components/WordDetails';
import Header from './components/Header';
import About from './components/About';
import { Sliders } from 'react-feather';
import OptionsButtons from './components/OptionsButtons';

function App() {

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '9603a07fddmshcaf5226272bacb3p17b7f0jsnc4e2e135c51f',
      'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
    }
  };

  const [searchQuery, setSearchQuery] = useState('')
  const [searchParameter, setSearchParameter] = useState('definitions')
  const [data, setData] = useState('')
  const [word, setWord] = useState('')
  const [wordDetails, setWordDetails] = useState(false)

  const [definitions, setDefinitions] = useState('')
  const [examples, setExamples] = useState('')
  const [rhymes, setRhymes] = useState('')
  const [synonyms, setSynonyms] = useState('')
  const [antonyms, setAntonyms] = useState('')
  const [syllables, setSyllables] = useState('')
  const [frequency, setfFequency] = useState('')
  const [pronunciation, setPronunciation] = useState('')
  
  const url = 'https://wordsapiv1.p.rapidapi.com/words/' + searchQuery + '/' + searchParameter

  const [alert, setAlert] = useState(false)
  const [settings, setSettings] = useState(false)
  const closeWordDetails = () => setWordDetails(false)
  const showSettingsPanel = () => {
    setSettings(!settings)
    setWordDetails(false)
  }
  
  const fetchWord = () => {
    if (searchQuery.length < 1) {
      setAlert(true)
      setTimeout(() => {setAlert(false)}, 3000)
    } else {
      fetch(url, options)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(err => console.error(err)); 
      setWordDetails(true)
      setSettings(false)
      }
  }

  useEffect(() => {
    setWord(data.word)
    setDefinitions(data.definitions)
    setExamples(data.examples)
    setRhymes(data.rhymes)
    setSynonyms(data.synonyms)
    setAntonyms(data.antonyms)
    setSyllables(data.syllables)
    setfFequency(data.frequency)
    setPronunciation(data.pronunciation)
  }, [data])

  console.log(syllables)

  const [about, setAbout] = useState(false)
  const showAboutSection = () => setAbout(true)
  const hideAboutSection = () => setAbout(false)

  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      setTheme('light')
      localStorage.setItem('theme', 'light')
    }
  }

  const setThemeOnRender = () => {
    const theme = localStorage.getItem('theme')
    if (theme == 'light') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  useEffect(() => {
    document.body.className = theme;
    setThemeOnRender()
  }, [theme])

  return (
    <div className='App'>
      <Header 
        theme={theme}
        toggleTheme={toggleTheme}
        showAboutSection={showAboutSection}
      />

      <Alert 
        alert={alert}
      />

      {wordDetails ? <WordDetails
        word={word}
        definitions={definitions}
        examples={examples}
        rhymes={rhymes}
        synonyms={synonyms}
        antonyms={antonyms}
        syllables={syllables}
        frequency={frequency}
        pronunciation={pronunciation}
        data={data}
        searchParameter={searchParameter}
        closeWordDetails={closeWordDetails}
      /> : <></>
      }

      <div className='search-bar'>
        <input
          placeholder='Search...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}></input>

        <div className='button-container'>
          <button className='submit' onClick={fetchWord}>Search Word</button>

          <button 
            onClick={showSettingsPanel}
            title='Toggle Search Settings'
            className={settings ? 'settings active' : 'settings'}><Sliders /></button>
        </div>
      </div>

      <OptionsButtons 
        setSearchParameter={setSearchParameter}
        settings={settings}
        searchParameter={searchParameter}
      />

      <About
        about={about}
        hideAboutSection={hideAboutSection}
      />
    </div>
  );
}

export default App;
