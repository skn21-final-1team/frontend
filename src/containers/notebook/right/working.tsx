import { Button } from '@/shared/components/ui/button'
import { useAgentStatusStore } from '@/shared/store/agent-status-store'

function WorkingSection() {
  const { setIsWorking } = useAgentStatusStore()
  return (
    <div>
      working
      <Button onClick={() => setIsWorking(false)}>Cancel</Button>
    </div>
  )
}

export default WorkingSection
