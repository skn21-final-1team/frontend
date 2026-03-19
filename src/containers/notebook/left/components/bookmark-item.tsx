import { useState, useRef, useEffect } from 'react'

import { ChevronRightIcon, FolderIcon } from 'lucide-react'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Button,
  Checkbox,
  ConfirmationDialog,
} from '@/shared/components'

import type { FlatBookmarkNode } from '../types/bookmarks.types'
import { useBookmarkStore } from '../store/bookmarks.store'
import { useSearchContext } from '../contexts/search-context'
import HeaderActions from './hover-actions'
import BookmarkUrl from './bookmark-url'
import * as S from './bookmark-item.style'

type BookmarkItemProps = {
  id: number
}

function BookmarkItem({ id }: BookmarkItemProps) {
  const data = useBookmarkStore((state) => state.bookmarks[id])
  const toggleExpand = useBookmarkStore((state) => state.toggleExpand)
  const toggleCheck = useBookmarkStore((state) => state.toggleCheck)
  const deleteBookmark = useBookmarkStore((state) => state.deleteBookmark)
  const renameBookmark = useBookmarkStore((state) => state.renameBookmark)
  const { matchedIds } = useSearchContext()

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(data?.title || '')
  const inputRef = useRef<HTMLInputElement>(null)
  const isEscaping = useRef(false)

  useEffect(() => {
    if (isEditing) inputRef.current?.focus()
  }, [isEditing])

  if (!data) return null

  const handleEditStart = () => {
    setIsEditing(true)
    setEditValue(data.title)
  }
  const handleRename = async () => {
    if (isEscaping.current) {
      isEscaping.current = false
      return
    }
    const trimmed = editValue.trim()
    if (trimmed && trimmed !== data.title) {
      await renameBookmark(id, trimmed)
    }
    setIsEditing(false)
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return
    if (e.key === 'Enter') {
      handleRename()
    } else if (e.key === 'Escape') {
      isEscaping.current = true
      setIsEditing(false)
      setEditValue(data.title)
    }
  }
  const handleDelete = async () => {
    await deleteBookmark(data.id)
    setIsDeleteDialogOpen(false)
  }

  if (data.type === 'folder') {
    const isSearching = matchedIds !== null
    const isOpen = isSearching || data.isExpanded

    const visibleChildren = isSearching
      ? data.children.filter((childId) => matchedIds.has(childId))
      : data.children

    return (
      <>
        <Collapsible key={data.id} open={isOpen}>
          <div className={S.folderRow()}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={S.folder()}
                onClick={() => !isEditing && toggleExpand(data.id)}
              >
                <span className={S.fileLeft()}>
                  <ChevronRightIcon className={S.chevron()} />
                  <FolderIcon />
                  {isEditing ? (
                    <input
                      ref={inputRef}
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={handleRename}
                      onKeyDown={handleKeyDown}
                      onClick={(e) => e.stopPropagation()}
                      className={S.editInput()}
                    />
                  ) : (
                    data.title
                  )}
                </span>
                <HeaderActions
                  onClickDelete={() => setIsDeleteDialogOpen(true)}
                  onClickEdit={handleEditStart}
                />
              </Button>
            </CollapsibleTrigger>

            <Checkbox
              checked={data.isChecked}
              onCheckedChange={(checked) => toggleCheck(data.id, !!checked)}
            />
          </div>
          <CollapsibleContent className={S.subList()}>
            <span className={S.subFolder()}>
              {visibleChildren.map((childId) => (
                <BookmarkItem key={childId} id={childId} />
              ))}
            </span>
          </CollapsibleContent>
        </Collapsible>

        <ConfirmationDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          title="폴더 삭제"
          description={`"${data.title}" 폴더와 하위의 모든 북마크가 삭제됩니다. 이 작업은 되돌릴 수 없습니다. 계속하시겠습니까?`}
          confirmLabel="삭제"
          onConfirm={handleDelete}
        />
      </>
    )
  }

  return <BookmarkUrl data={data} />
}

export default BookmarkItem
