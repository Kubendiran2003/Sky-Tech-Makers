import { useState } from 'react'
import { motion } from 'framer-motion'
import { formatJson } from '../services/tools'
import { FiCode, FiCopy } from 'react-icons/fi'

export default function Tools() {
  const [jsonInput, setJsonInput] = useState('')
  const [formattedJson, setFormattedJson] = useState('')
  const [error, setError] = useState('')

  const handleFormat = async () => {
    try {
      const result = await formatJson(jsonInput)
      setFormattedJson(result)
      setError('')
    } catch (err) {
      setError('Invalid JSON format')
      setFormattedJson('')
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedJson)
  }

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold mb-4">Developer Tools</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Useful tools to make your development workflow easier
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-lg shadow-sm"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FiCode className="mr-2" /> JSON Formatter
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="json-input" className="block text-sm font-medium text-gray-700 mb-1">
                  Input JSON
                </label>
                <textarea
                  id="json-input"
                  rows={10}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary font-mono text-sm"
                  placeholder='{"key": "value"}'
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                />
              </div>
              <button
                onClick={handleFormat}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Format JSON
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white p-6 rounded-lg shadow-sm"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Formatted Output</h2>
              {formattedJson && (
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  <FiCopy className="mr-2" /> Copy
                </button>
              )}
            </div>
            {error ? (
              <div className="text-red-600 p-4 bg-red-50 rounded-md">{error}</div>
            ) : formattedJson ? (
              <pre className="p-4 bg-gray-50 rounded-md overflow-auto max-h-96 font-mono text-sm">
                {formattedJson}
              </pre>
            ) : (
              <div className="p-4 bg-gray-50 rounded-md text-gray-500">
                Formatted JSON will appear here
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}