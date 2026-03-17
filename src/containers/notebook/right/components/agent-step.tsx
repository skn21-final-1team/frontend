'use client'

import { Clock, CheckCircle2, type LucideIcon } from 'lucide-react'
import { Spinner } from '@/shared/components/ui/spinner'
import { Badge } from '@/shared/components/ui/badge'
import * as S from './agent-step.style'
import Markdown from '@/shared/components/ui/markdown/markdown'

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
  badgeLabel?: string
}

/**
 * 에이전트 작업 단계를 표시하는 카드 컴포넌트.
 * 상태에 따라 강조 스타일과 배지 문구를 표시하며, 진행 중일 때만 내용을 노출합니다.
 */
function AgentStep({ title, content, status, badgeLabel }: AgentStepProps) {
  const { label, Icon } = STATUS_CONFIG[status]
  const resolvedBadgeLabel: string = badgeLabel ?? label

  return (
    <div className={S.container({ status })}>
      <div className={S.header()}>
        <span className={S.titleDot({ status })} />
        <span className={S.title({ status })}>{title}</span>
        <Badge variant="outline" className={S.statusBadge({ status })}>
          <Icon size={12} data-icon="inline-start" />
          <span>{resolvedBadgeLabel}</span>
        </Badge>
      </div>

      {status === 'working' && (
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
