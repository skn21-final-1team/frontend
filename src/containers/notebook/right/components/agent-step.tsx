'use client'

import { Clock, CheckCircle2, type LucideIcon } from 'lucide-react'
import { Spinner } from '@/shared/components/ui/spinner'
import { Badge } from '@/shared/components/ui/badge'
import * as S from './agent-step.style'
import Markdown from '@/shared/components/ui/markdown/markdown'
import { Button } from '@/shared/components'

/** 에이전트 단계의 진행 상태 */
export type StepStatus = 'working' | 'pending' | 'completed'

const STATUS_CONFIG: Record<StepStatus, { label: string; Icon: LucideIcon | typeof Spinner }> = {
  working: { label: '진행중', Icon: Spinner },
  pending: { label: '대기', Icon: Clock },
  completed: { label: '완료', Icon: CheckCircle2 },
}

interface AgentStepProps {
  title: string
  content: string
  status: StepStatus
}

/**
 * 에이전트 작업 단계를 표시하는 카드 컴포넌트.
 * 상태(진행중/대기/완료)에 따라 색상이 변경되며, 클릭으로 content를 토글할 수 있습니다.
 * 진행중 상태일 때 기본적으로 content가 열려 있습니다.
 */
function AgentStep({ title, content, status }: AgentStepProps) {
  const { label, Icon } = STATUS_CONFIG[status]
  const isOpen = status === 'working'

  return (
    <div className={S.container({ status })}>
      <div className={S.header()}>
        <span className={S.titleDot({ status })} />
        <span className={S.title({ status })}>{title}</span>
        <Badge variant="outline" className={S.statusBadge({ status })}>
          <Icon className="w-3 h-3" data-icon="inline-start" />
          {label}
        </Badge>
      </div>

      {isOpen && (
        <div className={S.content()}>
          <div className={S.contentInner()}>
            <Markdown text={content} />
          </div>
        </div>
      )}
    </div>
  )
}

export default AgentStep
