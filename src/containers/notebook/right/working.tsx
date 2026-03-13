import { Button } from '@/shared/components/ui/button'
import { useAgentStatusStore } from '@/shared/store/agent-status-store'

function WorkingSection() {
  const { status, setStatus } = useAgentStatusStore()

  return (
    <div>
      working
      <Button onClick={() => setStatus('sleep')}>Cancel</Button>
    </div>
  )
}

export default WorkingSection
