import { useEffect, useRef, useState } from 'react'
import { Check, Code2, Copy, FileText } from 'lucide-react'
import { Button, Tabs, type TabListItem } from '@/shared/components'
import Markdown from '@/shared/components/ui/markdown/markdown'
import * as S from './preview-section.style'

interface PreviewSectionProps {
  content: string
}

type PreviewMode = 'markdown' | 'code'
type CopyStatus = 'idle' | 'success' | 'error'

function PreviewSection({ content }: PreviewSectionProps) {
  const [previewMode, setPreviewMode] = useState<PreviewMode>('markdown')
  const [copyStatus, setCopyStatus] = useState<CopyStatus>('idle')
  const copyResetTimerRef = useRef<number | null>(null)

  const handleMarkdownModeChange = () => {
    setPreviewMode('markdown')
  }

  const handleCodeModeChange = () => {
    setPreviewMode('code')
  }

  const handleCopyContent = async () => {
    if (copyResetTimerRef.current !== null) {
      window.clearTimeout(copyResetTimerRef.current)
    }

    try {
      await navigator.clipboard.writeText(content)
      setCopyStatus('success')
    } catch {
      setCopyStatus('error')
    }

    copyResetTimerRef.current = window.setTimeout(() => {
      setCopyStatus('idle')
      copyResetTimerRef.current = null
    }, 2000)
  }

  const tabs: TabListItem[] = [
    {
      value: 'markdown',
      label: 'Preview',
      icon: <FileText size={14} />,
      disabled: false,
      onChange: handleMarkdownModeChange,
    },
    {
      value: 'code',
      label: 'Markdown',
      icon: <Code2 size={14} />,
      disabled: false,
      onChange: handleCodeModeChange,
    },
  ]

  useEffect(() => {
    return () => {
      if (copyResetTimerRef.current !== null) {
        window.clearTimeout(copyResetTimerRef.current)
      }
    }
  }, [])

  if (!content.trim()) {
    return (
      <section className={S.section()}>
        <div className={S.inner()}>
          <div className={S.empty()}>
            미리볼 문서가 아직 없습니다. 채팅 또는 에이전트 작업을 진행해 주세요.
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={S.section()}>
      <Tabs tabs={tabs} value={previewMode} className={S.tabsRoot()}>
        <div className={S.header()}>
          <Tabs.List className={S.tabsList()} />
          <Button
            type="button"
            variant="outline"
            size="sm"
            className={S.copyButton()}
            onClick={handleCopyContent}
          >
            {copyStatus === 'success' ? <Check size={14} /> : <Copy size={14} />}
          </Button>
        </div>
        <div className={S.inner()}>
          <Tabs.Content value="markdown" className={S.content()}>
            <Markdown text={content} />
          </Tabs.Content>
          <Tabs.Content value="code" className={S.content()}>
            <pre className={S.codeBlock()}>{content}</pre>
          </Tabs.Content>
        </div>
      </Tabs>
    </section>
  )
}

export default PreviewSection
