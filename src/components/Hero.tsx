import { logo } from '../assets';
import { DiGithubBadge } from 'react-icons/di';

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <img src={logo} alt="logo" className="w-28 object-contain" />
        <button
          type="button"
          className="black-btn"
          formTarget="_blank"
          onClick={() => {window.open('https://github.com/Shivelle/text-summarizer')}}>
            <DiGithubBadge size={18}/> GitHub
        </button>
      </nav>
      <h1 className="head-text">Summarize your text <br className="max-md:hidden" />
      <span className="orange-gradient">with the help of AI</span></h1>
      <h2 className="desc">
        Shorten your time reading long articles and documents with the AI Text Summarizer, an open-source text summarizer that transforms the text you are reading into a shorter version.
      </h2>
    </header>
  )
}

export default Hero