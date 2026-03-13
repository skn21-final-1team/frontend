import { useState } from 'react'
import WorkingSection from '@/containers/notebook/right/working'
import PendingSection from '@/containers/notebook/right/pending'
import { useAgentStatusStore } from '@/shared/store/agent-status-store'
import * as S from './agent.style'

function AgentSection() {
  const { isWorking } = useAgentStatusStore()

  return (
    <section className={S.section()}>
      <div className={S.inner()}>{isWorking ? <WorkingSection /> : <PendingSection />}</div>
    </section>
  )
}

export default AgentSection
