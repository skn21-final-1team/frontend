import { useState } from 'react'
import WorkingSection from '@/containers/notebook/right/working'
import PendingSection from '@/containers/notebook/right/pending'
import { useAgentStatusStore } from '@/shared/store/agent-status-store'
import * as S from './agent.style'

function AgentSection() {
  const { status } = useAgentStatusStore()

  return (
    <section className={S.section()}>
      <div className={S.inner()}>
        {/* {status === 'working' ? <WorkingSection /> : <PendingSection />} */}
        <WorkingSection />
      </div>
    </section>
  )
}

export default AgentSection
