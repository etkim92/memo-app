'use client'

import { useState } from 'react'
import { Memo } from '@/types/memo'
import { summarizeMemo } from '@/app/actions/memoActions'

interface MemoSummaryPanelProps {
  memo: Memo
}

// 상세 보기에서 Gemini로 메모를 요약한다. 결과는 저장하지 않으며,
// 부모에서 key를 바꾸면(다른 메모/수정) 상태가 초기화된다.
export default function MemoSummaryPanel({ memo }: MemoSummaryPanelProps) {
  const [summary, setSummary] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSummarize = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await summarizeMemo(memo.id)
      if ('error' in result) {
        setError(result.error)
        return
      }
      setSummary(result.summary)
    } catch (err) {
      console.error('Failed to request memo summary:', err)
      setError('요약 생성에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="mb-5 rounded-lg border border-indigo-100 bg-indigo-50 p-4"
      data-testid="memo-summary-panel"
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-indigo-800">✨ AI 요약</h3>
        <button
          type="button"
          onClick={handleSummarize}
          disabled={loading}
          className="px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 rounded-md transition-colors"
          data-testid="memo-summary-btn"
        >
          {loading ? '요약 중...' : summary ? '다시 요약' : '요약하기'}
        </button>
      </div>

      {summary && (
        <p
          className="mt-3 text-sm leading-relaxed text-gray-800 whitespace-pre-wrap"
          data-testid="memo-summary-result"
        >
          {summary}
        </p>
      )}
      {error && (
        <p
          className="mt-3 text-sm text-red-600"
          role="alert"
          data-testid="memo-summary-error"
        >
          {error}
        </p>
      )}
    </div>
  )
}
