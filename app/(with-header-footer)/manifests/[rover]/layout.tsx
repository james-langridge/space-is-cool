import React from 'react'

import Container from '@/app/ui/container'

export default function layout({children}: {children: React.ReactNode}) {
  return (
    <Container>
      <div className="p-4">{children}</div>
    </Container>
  )
}
