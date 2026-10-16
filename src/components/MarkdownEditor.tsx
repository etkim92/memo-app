'use client'

import dynamic from 'next/dynamic'

// 브라우저 전용 라이브러리이므로 SSR 비활성화
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
  loading: () => (
    <div className="h-[360px] rounded-lg border border-gray-300 bg-gray-50 flex items-center justify-center text-sm text-gray-500">
      에디터를 불러오는 중...
    </div>
  ),
})

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
}

export default function MarkdownEditor({
  value,
  onChange,
}: MarkdownEditorProps) {
  return (
    <div data-color-mode="light" data-testid="markdown-editor">
      <MDEditor
        value={value}
        onChange={val => onChange(val ?? '')}
        preview="live"
        height={360}
        textareaProps={{
          id: 'content',
          placeholder: '마크다운으로 메모 내용을 입력하세요',
        }}
      />
    </div>
  )
}
