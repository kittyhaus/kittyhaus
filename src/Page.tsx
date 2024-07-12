import KittyProfiles from './pages/KittyProfiles'
import About from './pages/About'
import Contact from './pages/Contact'
import Donate from './pages/Donate'
import { PAGES } from './constants'

interface PageProps {
  pageName: string,
  setPageName: (pageName: string) => void,
  currentSeason: object
}

export default function Page({ pageName }: PageProps) {

  const renderPage = (pageName: string) => {
    switch(pageName) {
      case PAGES.MAIN:
        return 
      case PAGES.ABOUT:
        return <About />
      case PAGES.KITTENS:
        return <KittyProfiles />
      case PAGES.CONTACT:
        return <Contact />
      case PAGES.DONATE:
        return <Donate />
      default:
        return <></>
    }
  }

  return(
    <>
      {renderPage(pageName) }
    </>
  )
}