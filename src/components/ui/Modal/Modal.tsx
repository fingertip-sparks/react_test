import { useRef, useEffect } from 'react'
import type { ReactNode } from 'react'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    // モーダルの表示・非表示の管理
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLButtonElement
      // フォーカス可能な要素を取得するクエリ
      const focusable = dialogRef.current?.querySelector<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
      focusable?.focus()
    } else {
      triggerRef.current?.focus()
    }

    // keydownイベントを監視する
    const handleKeyDown = (e: KeyboardEvent) => {
      // e.keyが'Escape'のとき、onClose()を呼ぶ
      if (e.key === 'Escape') onClose()

      // Tabキーの処理をここに追加する
      if (e.key === 'Tab') {
        // モーダル内のフォーカス可能な要素を全て取得する
        const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
        if (!focusableElements || focusableElements.length === 0) return

        const first = focusableElements[0]
        const last = focusableElements[focusableElements.length - 1]

        // shiftキーと同時押しのとき（逆方向）
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault()
            last.focus()
          }
        } else {
          // 通常のTab（順方向）
          if (document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
        }
      }
    }

    // イベントリスナーを登録・解除する
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <h2 id="modal-title">{title}</h2>
      <div>{children}</div>
      <button onClick={onClose}>閉じる</button>
    </div>
  )
}
