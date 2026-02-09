import type { Bookmark } from './types/bookmarks'
import AddUrlButton from './components/add-url-button'
import SearchBookmark from './components/search-bookmark'
import Bookmarks from './components/bookmarks'

import * as S from './source-section.style'

interface SourceSectionProps {
  data: Bookmark[]
}

function SourceSection({ data }: SourceSectionProps) {
  return (
    <section className={S.section()}>
      <div className={S.inner()}>
        <div className={S.header()}>
          <span className={S.headerTitle()}>BOOKMARKS</span>
        </div>
        <SearchBookmark />
        <Bookmarks data={data} />
        <AddUrlButton />
      </div>
    </section>
  )
}

export default SourceSection
