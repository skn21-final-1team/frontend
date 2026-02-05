'use client'

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/shared/components/ui/resizable'
import * as s from './index.style'

export default function NotebookContainer() {
  return (
    <div className={s.container()}>
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel defaultSize={20} minSize={15}>
          <div className={s.panelContent()}>
            <h2>Left Section</h2>
            <p className="space-y-4">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i}>Scrollable Content {i}</div>
              ))}
            </p>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={50} minSize={30}>
          <div className={s.panelContent()}>
            <h2>Medium Section</h2>
            <p className="space-y-4">
              {Array.from({ length: 50 }).map((_, i) => (
                <div key={i}>Main Content Area {i}</div>
              ))}
            </p>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={30} minSize={20}>
          <div className={s.panelContent()}>
            <h2>Right Section</h2>
            <p className="space-y-4">
              {Array.from({ length: 30 }).map((_, i) => (
                <div key={i}>Right Sidebar {i}</div>
              ))}
            </p>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
