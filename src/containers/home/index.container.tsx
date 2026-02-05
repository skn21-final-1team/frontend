'use client'

import * as s from './index.style'

export default function HomeContainer() {
  return (
    <main className={s.main()}>
      <div className={s.descriptionContainer()}>
        <p className={s.description()}>
          Get started by editing&nbsp;
          <code className={s.code()}>src/containers/home/index.container.tsx</code>
        </p>
      </div>
    </main>
  )
}
