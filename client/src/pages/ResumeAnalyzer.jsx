import React, { useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ArrowLeft, ScanSearch, Loader2, RotateCcw } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../configs/api'
import ScoreRing from '../components/analyzer/ScoreRing'
import KeywordChips from '../components/analyzer/KeywordChips'
import SuggestionsList from '../components/analyzer/SuggestionsList'
import AnalysisHistory from '../components/analyzer/AnalysisHistory'

const ResumeAnalyzer = () => {
  const { resumeId } = useParams()
  const { token } = useSelector((state) => state.auth)

  const [jobDescription, setJobDescription] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState(null)
  const [history, setHistory] = useState([])
  const [isLoadingHistory, setIsLoadingHistory] = useState(true)
  const [resumeTitle, setResumeTitle] = useState('Your Resume')

  const authHeaders = { Authorization: token }

  useEffect(() => {
    const fetchTitle = async () => {
      try {
        const { data } = await api.get(`/api/resumes/get/${resumeId}`, { headers: authHeaders })
        if (data.resume?.title) setResumeTitle(data.resume.title)
      } catch {
        // non-critical
      }
    }
    fetchTitle()
  }, [resumeId])

  const loadHistory = useCallback(async () => {
    setIsLoadingHistory(true)
    try {
      const { data } = await api.get(`/api/analyzer/history/${resumeId}`, { headers: authHeaders })
      setHistory(data.history || [])
    } catch {
      // history is optional
    } finally {
      setIsLoadingHistory(false)
    }
  }, [resumeId, token])

  useEffect(() => {
    loadHistory()
  }, [loadHistory])

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      toast.error('Please paste a job description first.')
      return
    }
    if (jobDescription.trim().split(/\s+/).length < 30) {
      toast.error('Job description seems too short. Please paste the full JD.')
      return
    }

    setIsAnalyzing(true)
    setResult(null)

    try {
      const { data } = await api.post(
        '/api/analyzer/analyze',
        { resumeId, jobDescription },
        { headers: authHeaders }
      )
      setResult(data)
      toast.success('Analysis complete!')
      loadHistory()
    } catch (err) {
      const msg = err?.response?.data?.message || 'Analysis failed. Please try again.'
      toast.error(msg)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleLoadHistoryItem = async (analysisId) => {
    try {
      const { data } = await api.get(`/api/analyzer/result/${analysisId}`, { headers: authHeaders })
      if (data.analysis) {
        setResult(data.analysis)
        setJobDescription(data.analysis.jobDescription || '')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    } catch {
      toast.error('Could not load that analysis. Please try again.')
    }
  }

  const handleReset = () => {
    setResult(null)
    setJobDescription('')
  }

  const getScoreBg = (score) => {
    if (score >= 75) return 'from-green-50 to-emerald-50 border-green-200'
    if (score >= 50) return 'from-yellow-50 to-amber-50 border-yellow-200'
    return 'from-red-50 to-rose-50 border-red-200'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to={`/app/builder/${resumeId}`}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft size={18} className="text-gray-600" />
            </Link>
            <div>
              <h1 className="text-sm font-semibold text-gray-900">Job Match Analyzer</h1>
              <p className="text-xs text-gray-500">{resumeTitle}</p>
            </div>
          </div>
          {result && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 transition-colors"
            >
              <RotateCcw size={13} /> New Analysis
            </button>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left — Input + History */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-1">Paste Job Description</h2>
              <p className="text-xs text-gray-400 mb-3">
                Copy the full JD from LinkedIn, Indeed, or the company's careers page.
              </p>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={10}
                placeholder="Paste the job description here..."
                className="w-full text-sm text-gray-700 border border-gray-200 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition placeholder-gray-300"
                disabled={isAnalyzing}
              />
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !jobDescription.trim()}
                className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                {isAnalyzing ? (
                  <><Loader2 size={15} className="animate-spin" /> Analyzing...</>
                ) : (
                  <><ScanSearch size={15} /> Analyze Match</>
                )}
              </button>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-3">Past Analyses</h2>
              {isLoadingHistory ? (
                <div className="flex justify-center py-4">
                  <Loader2 size={18} className="animate-spin text-gray-300" />
                </div>
              ) : (
                <AnalysisHistory history={history} onSelect={handleLoadHistoryItem} />
              )}
            </div>
          </div>

          {/* Right — Results */}
          <div className="lg:col-span-2">
            {!result && !isAnalyzing && (
              <div className="flex flex-col items-center justify-center h-full min-h-64 text-center bg-white rounded-xl border border-dashed border-gray-200 p-12">
                <ScanSearch size={40} className="mb-3 text-gray-300" />
                <p className="text-sm font-medium text-gray-500">Your analysis results will appear here</p>
                <p className="text-xs mt-1 text-gray-400">Paste a job description and click "Analyze Match" to get started.</p>
              </div>
            )}

            {isAnalyzing && (
              <div className="flex flex-col items-center justify-center h-full min-h-64 bg-white rounded-xl border border-gray-200 p-12">
                <Loader2 size={36} className="animate-spin text-blue-500 mb-4" />
                <p className="text-sm font-semibold text-gray-700">Analyzing your resume...</p>
                <p className="text-xs text-gray-400 mt-1">This usually takes 5–10 seconds.</p>
              </div>
            )}

            {result && !isAnalyzing && (
              <div className="space-y-6">
                {/* Score Card */}
                <div className={`bg-gradient-to-br ${getScoreBg(result.matchScore)} border rounded-xl p-6`}>
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex-1">
                      <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1">Match Score</p>
                      <p className="text-2xl font-bold text-gray-900">{result.jobTitle || 'This Position'}</p>
                      <p className="text-sm text-gray-500 mt-2 max-w-sm leading-relaxed">{result.analysisSummary}</p>
                    </div>
                    <ScoreRing score={result.matchScore} />
                  </div>
                </div>

                {/* Keywords */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                  <h3 className="text-sm font-semibold text-gray-800 mb-4">Keyword Analysis</h3>
                  <KeywordChips matched={result.matchedKeywords} missing={result.missingKeywords} />
                </div>

                {/* Suggestions */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                  <h3 className="text-sm font-semibold text-gray-800 mb-4">Improvement Suggestions</h3>
                  <SuggestionsList suggestions={result.suggestions} />
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default ResumeAnalyzer
