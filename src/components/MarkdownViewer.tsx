'use client'

import dynamic from 'next/dynamic'

const MarkdownPreview = dynamic(
  () => import('@uiw/react-md-editor').then(mod => mod.default.Markdown),
  { ssr: false }
)

const BASE_CLASS =
  '!bg-transparent !text-gray-700 [&_ul]:list-disc [&_ol]:list-decimal'

// 카드 미리보기용: 글자와 제목 크기를 줄이고 제목 밑줄/여백을 없앤다
const COMPACT_CLASS =
  '!text-sm [&_h1]:!text-base [&_h2]:!text-sm [&_h3]:!text-sm [&_h4]:!text-sm [&_h5]:!text-sm [&_h6]:!text-sm ' +
  '[&_h1]:!border-0 [&_h2]:!border-0 [&_h1]:!pb-0 [&_h2]:!pb-0 [&_h1]:!mt-0 [&_h2]:!mt-2 [&_h1]:!mb-1 [&_h2]:!mb-1 ' +
  '[&_p]:!mb-1 [&_ul]:!mb-1 [&_ol]:!mb-1 [&_pre]:!mb-1 [&_table]:!mb-1'

interface MarkdownViewerProps {
  source: string
  compact?: boolean
}

export default function MarkdownViewer({
  source,
  compact = false,
}: MarkdownViewerProps) {
  return (
    <div
      data-color-mode="light"
      data-testid={compact ? 'markdown-preview' : 'markdown-viewer'}
    >
      <MarkdownPreview
        source={source}
        className={compact ? `${BASE_CLASS} ${COMPACT_CLASS}` : BASE_CLASS}
      />
    </div>
  )
}
