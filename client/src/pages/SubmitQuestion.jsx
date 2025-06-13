import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { submitQuestion } from '../services/questions'

export default function SubmitQuestion() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    company: '',
    difficulty: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    setLoading(true)

    try {
      await submitQuestion(formData)
      setSuccess(true)
      setFormData({
        question: '',
        answer: '',
        company: '',
        difficulty: ''
      })
      setTimeout(() => navigate('/questions'), 1500)
    } catch (err) {
      console.error(err)
      setError('Failed to submit question. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 bg-white p-8 rounded shadow">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Submit Interview Question</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-600 mb-4">Question submitted successfully!</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Question</label>
            <textarea
              name="question"
              value={formData.question}
              onChange={handleChange}
              required
              rows={3}
              className="w-full border rounded px-3 py-2 focus:ring-primary focus:border-primary"
              placeholder="Enter the interview question"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Answer</label>
            <textarea
              name="answer"
              value={formData.answer}
              onChange={handleChange}
              required
              rows={3}
              className="w-full border rounded px-3 py-2 focus:ring-primary focus:border-primary"
              placeholder="Enter the answer"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Company</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 focus:ring-primary focus:border-primary"
              placeholder="e.g., Amazon, Infosys"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Difficulty</label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 focus:ring-primary focus:border-primary"
            >
              <option value="">Select difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition"
            >
              {loading ? 'Submitting...' : 'Submit Question'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
