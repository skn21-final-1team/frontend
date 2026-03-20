import AddUrlButton from './components/add-url-button'
import SearchBookmark from './components/search-bookmark'
import Bookmarks from './components/bookmarks'
import { ExtensionCard } from '@/containers/notebook/bookalpie/components'
import { Checkbox } from '@/shared/components'
import { useBookmarkStore } from './store/bookmarks.store'

import * as S from './source-section.style'

interface SourceSectionProps {
  notebookId: number
}

function SourceSection({ notebookId }: SourceSectionProps) {
  const toggleCheckAll = useBookmarkStore((s) => s.toggleCheckAll)
  const hasBookmarks = useBookmarkStore((s) => s.rootIds.length > 0)
  const allChecked = useBookmarkStore((s) => {
    const sources = Object.values(s.bookmarks).filter((n) => n.type === 'source')
    return sources.length > 0 && sources.every((n) => n.isChecked)
  })

  return (
    <section className={S.section()}>
      <div className={S.inner()}>
        <div className={S.header()}>
          <div className={S.headerLeft()}>
            {hasBookmarks && (
              <Checkbox className="border-muted-foreground shadow-none data-[state=checked]:bg-muted-foreground data-[state=checked]:text-background" checked={allChecked} onCheckedChange={(checked) => toggleCheckAll(!!checked)} />
            )}
            <span className={S.headerTitle()}>BOOKMARKS</span>
          </div>
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
