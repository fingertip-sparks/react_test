import { useState } from 'react'
import { Button } from './components/ui/Button'
import { TextInput } from './components/ui/TextInput'
import { Modal } from './components/ui/Modal'
import { Tabs } from './components/ui/Tabs'

function App() {
  // モーダルの開閉
  const [isOpen, setIsOpen] = useState(false)

  return (
    <main style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Button size="small">Small</Button>
        <Button size="medium">Medium</Button>
        <Button size="large">Large</Button>
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Button disabled>Disabled</Button>
        <Button isLoading>Loading</Button>
      </div>
      <TextInput id="username" label="ユーザー名" type="text" />
      <TextInput id="email" label="メールアドレス" type="email" errorText="正しいメールアドレスを入力してください" invalid={true} />
      <button onClick={() => setIsOpen(true)}>モーダルを開く</button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="確認">
        <p>モーダルの中身です</p>
      </Modal>
      <Tabs
        tabs={[
          { tabId: 'tab-1', childrenId: 'panel-1', label: 'タブ1', children: <p>コンテンツ1</p> },
          { tabId: 'tab-2', childrenId: 'panel-2', label: 'タブ2', children: <p>コンテンツ2</p> },
          { tabId: 'tab-3', childrenId: 'panel-3', label: 'タブ3', children: <p>コンテンツ3</p> },
        ]}
      />
    </main>
  )
}

export default App
