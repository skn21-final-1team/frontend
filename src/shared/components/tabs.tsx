'use client'

import {
  type ComponentPropsWithoutRef,
  type ReactNode,
  createContext,
  useContext,
} from 'react'
import {
  Tabs as BaseTabs,
  TabsContent as BaseTabsContent,
  TabsList as BaseTabsList,
  TabsTrigger as BaseTabsTrigger,
} from '@/shared/components/ui/tabs'

interface TabListItem {
  onChange: (value: string) => void
  value: string
  label: ReactNode
  disabled: boolean
  icon: ReactNode
}

interface TabsContextValue {
  tabs: TabListItem[]
}

interface TabsRootProps extends ComponentPropsWithoutRef<typeof BaseTabs> {
  tabs: TabListItem[]
}

type TabsListProps = ComponentPropsWithoutRef<typeof BaseTabsList>
type TabsContentProps = ComponentPropsWithoutRef<typeof BaseTabsContent>

const TabsContext = createContext<TabsContextValue | null>(null)

function useTabsContext(): TabsContextValue {
  const context = useContext(TabsContext)

  if (context === null) {
    throw new Error('Tabs compound components must be used within Tabs.')
  }

  return context
}

function renderTabTrigger(tab: TabListItem): ReactNode {
  const { disabled, icon, label, value } = tab

  return (
    <BaseTabsTrigger key={value} value={value} disabled={disabled}>
      {icon}
      <span>{label}</span>
    </BaseTabsTrigger>
  )
}

function TabsRoot({ tabs, ...props }: TabsRootProps) {
  const { onValueChange, ...baseTabsProps } = props

  const handleValueChange = (value: string) => {
    const selectedTab = tabs.find((tab) => tab.value === value)

    selectedTab?.onChange(value)
    onValueChange?.(value)
  }

  return (
    <TabsContext.Provider value={{ tabs }}>
      <BaseTabs {...baseTabsProps} onValueChange={handleValueChange} />
    </TabsContext.Provider>
  )
}

function TabsList(props: TabsListProps) {
  const { tabs } = useTabsContext()
  const triggers = tabs.map(renderTabTrigger)

  return <BaseTabsList {...props}>{triggers}</BaseTabsList>
}

function TabsContent(props: TabsContentProps) {
  return <BaseTabsContent {...props} />
}

const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Content: TabsContent,
})

export type { TabListItem, TabsContentProps, TabsListProps, TabsRootProps }
export { Tabs }
export default Tabs
