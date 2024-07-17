import { useState, useRef, useEffect } from 'react'
import './PageBaseContainer.css'

interface PageBaseContainerProps {
  children: any
}

export default function PageBaseContainer({ children }: PageBaseContainerProps) {
  const [isAtPageBottom, setIsAtPageBottom] = useState(false)
  const [isAtPageTop, setIsAtPageTop] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const [hasScroll, setHasScroll] = useState(false)

  useEffect(() => {
    if (containerRef.current && containerRef.current.scrollHeight - containerRef.current.clientHeight > 10) {
      setHasScroll(true)
    }
  }, [])

  const onScroll = (e: React.ChangeEvent<any>) => {
    if (e.target.scrollTop + e.target.offsetHeight >= e.target.scrollHeight) {
      setIsAtPageBottom(true)
    } else {
      setIsAtPageBottom(false)
    }

    if (e.target.scrollTop === 0) {
      setIsAtPageTop(true)
    } else {
      setIsAtPageTop(false)
    }
  }

  const onResize = () => {
    if (containerRef.current && containerRef.current.scrollHeight > containerRef.current.clientHeight) {
      setHasScroll(true)
    }
  }

  return(
    <div style={{ position: 'relative' }}>
      <div
        ref={containerRef}
        onScroll={onScroll}
        onResize={onResize}
        id='page-base-container'
        className='nes-container is-dark is-rounded'
      >
        {children}
      </div>
      {hasScroll && !isAtPageTop && <div className='scroll-arrow up'>▲</div> }
      {hasScroll && !isAtPageBottom && <div className='scroll-arrow down'>▼</div> }
    </div>
  )
}