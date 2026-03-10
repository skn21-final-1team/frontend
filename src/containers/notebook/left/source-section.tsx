import AddUrlButton from './components/add-url-button'
import SearchBookmark from './components/search-bookmark'
import Bookmarks from './components/bookmarks'
import { ExtensionCard } from '@/containers/notebook/bookalpie/components'

import * as S from './source-section.style'

interface SourceSectionProps {
  notebookId: number
}

function SourceSection({ notebookId }: SourceSectionProps) {
  return (
    <section className={S.section()}>
      <div className={S.inner()}>
        <div className={S.header()}>
          <span className={S.headerTitle()}>BOOKMARKS</span>
          <ExtensionCard notebookId={notebookId} />
        </div>
        <SearchBookmark />
        <Bookmarks notebookId={notebookId} />
        <AddUrlButton notebookId={notebookId} />
      </div>
    </section>
  )
}

export default SourceSection
