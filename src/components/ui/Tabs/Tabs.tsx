import { useState, useRef } from 'react'
import type { ReactNode } from 'react'

type Tab = {
  tabId: string
  childrenId: string
  label: string
  children: ReactNode
}

type TabsProps = {
  tabs: Tab[]
}

export function Tabs({ tabs }: TabsProps) {
  // アクティブなタブのidを状態として持つ
  const [activeTabId, setActiveTabId] = useState(tabs[0].tabId)

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    // 次のタブのindex（最後なら最初に戻る）
    const nextIndex = (index + 1) % tabs.length

    // 前のタブのindex（最初なら最後に戻る）
    const prevIndex = (index - 1 + tabs.length) % tabs.length

    const firstIndex = 0
    const lastIndex = tabs.length - 1

    if (e.key === 'ArrowRight') {
      // nextIndexのタブにフォーカスを移してアクティブにする
      tabRefs.current[nextIndex]?.focus()
      setActiveTabId(tabs[nextIndex].tabId)
    } else if (e.key === 'ArrowLeft') {
      // prevIndexのタブにフォーカスを移してアクティブにする
      tabRefs.current[prevIndex]?.focus()
      setActiveTabId(tabs[prevIndex].tabId)
    } else if (e.key === 'Home') {
      tabRefs.current[firstIndex]?.focus()
      setActiveTabId(tabs[firstIndex].tabId)
    } else if (e.key === 'End') {
      tabRefs.current[lastIndex]?.focus()
      setActiveTabId(tabs[lastIndex].tabId)
    }
  }

  return (
    <div>
      <div role="tablist">
        {tabs.map((tab, index) => (
          <button
            ref={(el) => {
              tabRefs.current[index] = el
            }}
            onKeyDown={(e) => handleKeyDown(e, index)}
            key={tab.tabId}
            onClick={() => setActiveTabId(tab.tabId)}
            role="tab"
            aria-selected={activeTabId === tab.tabId}
            aria-controls={tab.childrenId}
            id={tab.tabId}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab) => (
        <div role="tabpanel" id={tab.childrenId} key={tab.tabId} aria-labelledby={tab.tabId} hidden={activeTabId !== tab.tabId}>
          {tab.children}
        </div>
      ))}
    </div>
  )
}
