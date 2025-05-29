'use client'

import { useState, useEffect } from 'react'
import { Agent } from '@/services/agent'

export default function Playground() {
  const [input, setInput] = useState('')
  const [context, setContext] = useState<string[]>([])
  const [response, setResponse] = useState('')
  const [agent] = useState(() => new Agent(5))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const agentResponse = await agent.processInput(input)
    setResponse(agentResponse)
    setContext(agent.getContext())
    setInput('')
  }

  const handleClearContext = () => {
    agent.clearContext()
    setContext([])
    setResponse('')
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Agent Playground</h1>
        <p className="mt-2 text-gray-600">
          Experiment with an AI agent and observe how it processes context and makes decisions.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Agent Input</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your message to the agent..."
              />
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  Send to Agent
                </button>
                <button
                  type="button"
                  onClick={handleClearContext}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                >
                  Clear Context
                </button>
              </div>
            </form>
          </div>

          {/* Context Window */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Context Window</h2>
            <div className="space-y-2">
              {context.map((item, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">{item}</p>
                </div>
              ))}
              {context.length === 0 && (
                <p className="text-gray-500 text-sm">No context items yet. Start a conversation!</p>
              )}
            </div>
          </div>
        </div>

        {/* Response Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Agent Response</h2>
          <div className="p-4 bg-gray-50 rounded-lg min-h-[200px]">
            {response ? (
              <pre className="whitespace-pre-wrap text-sm text-gray-700">{response}</pre>
            ) : (
              <p className="text-gray-500 text-sm">
                The agent's response will appear here. Try sending a message!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Learning Notes */}
      <div className="bg-indigo-50 p-6 rounded-xl">
        <h2 className="text-xl font-semibold text-indigo-900 mb-4">Learning Notes</h2>
        <ul className="list-disc list-inside space-y-2 text-indigo-700">
          <li>Notice how the agent maintains context from previous interactions</li>
          <li>Observe the context window size and how it affects responses</li>
          <li>Try different types of inputs to see how the agent processes them</li>
          <li>Use the "Clear Context" button to reset the agent's memory</li>
        </ul>
      </div>
    </div>
  )
} 