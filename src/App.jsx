import { useCallback, useState } from 'react'
import { Header } from './components/Header'
import { Opening } from './components/Opening'
import { Hero } from './components/Hero'
import { Intro } from './components/Intro'
import { Place } from './components/Place'
import { Numbers } from './components/Numbers'
import { Journey } from './components/Journey'
import { PhotoFragments } from './components/PhotoFragments'
import { Stories } from './components/Stories'
import { UnseenContributions } from './components/UnseenContributions'
import { BehindTheScene } from './components/BehindTheScene'
import { FinalChapter } from './components/FinalChapter'
import { FinalMoment } from './components/FinalMoment'
import { PostCredits } from './components/PostCredits'
import { Outtakes } from './components/Outtakes'
import { Footer } from './components/Footer'
import { site } from './data/content'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isOpeningComplete, setIsOpeningComplete] = useState(false)
  const closeMenu = () => setMenuOpen(false)
  const toggleMenu = useCallback(() => setMenuOpen((open) => !open), [])
  const completeOpening = useCallback(() => setIsOpeningComplete(true), [])

  return (
    <>
      <div className="app-shell" aria-hidden={!isOpeningComplete} inert={!isOpeningComplete}>
        <a className="skip-link" href="#cerita">Lewati ke cerita</a>
        <Header village={site.village} year={site.year} menuOpen={menuOpen} onMenuToggle={toggleMenu} onNavigate={closeMenu} />
        <main>
          <Hero ready={isOpeningComplete} />
          <Intro />
          <Place />
          <Numbers />
          <Journey />
          <PhotoFragments />
          <Stories />
          <UnseenContributions />
          <BehindTheScene />
          <FinalChapter />
          <FinalMoment />
          <PostCredits />
          <Outtakes />
        </main>
        <Footer />
      </div>
      <div className="film-grain" aria-hidden="true" />
      {!isOpeningComplete && <Opening src={site.openingVideoUrl} village={site.village} year={site.year} onComplete={completeOpening} />}
    </>
  )
}
