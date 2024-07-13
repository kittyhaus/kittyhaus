import PageBaseContainer from './pages/PageBaseContainer'
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
        return <PageBaseContainer><About /></PageBaseContainer>
      case PAGES.KITTENS:
        return <PageBaseContainer><KittyProfiles /></PageBaseContainer>
      case PAGES.CONTACT:
        return <PageBaseContainer><Contact /></PageBaseContainer>
      case PAGES.DONATE:
        return <PageBaseContainer><Donate /></PageBaseContainer>
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