import React from 'react'
import {useSwipeable} from 'react-swipeable'

type PhotoSwipeProps = {
  getNextPhoto: () => void
  getPrevPhoto: () => void
  toggleSidebar: () => void
  isSidebarOpen: boolean
  children: React.ReactNode
}

export default function PhotoSwipe({
  getNextPhoto,
  getPrevPhoto,
  toggleSidebar,
  isSidebarOpen,
  children,
}: PhotoSwipeProps) {
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (!isSidebarOpen) {
        getNextPhoto()
      }
    },
    onSwipedRight: () => {
      if (!isSidebarOpen) {
        getPrevPhoto()
      }
    },
    onSwipedUp: () => {
      if (!isSidebarOpen) {
        toggleSidebar()
      }
    },
    onSwipedDown: () => {
      if (isSidebarOpen) {
        toggleSidebar()
      }
    },
  })

  return <div {...handlers}>{children}</div>
}
