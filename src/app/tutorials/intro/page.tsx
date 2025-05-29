'use client'

import Link from 'next/link'

export default function IntroTutorialPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Introduction to Agentic AI</h1>
        <p className="mt-2 text-gray-600">
          Learn the fundamental concepts of Agentic AI and its applications.
        </p>
      </div>

      <div className="prose prose-indigo max-w-none">
        <h2>What is Agentic AI?</h2>
        <p>
          Agentic AI refers to artificial intelligence systems that can act autonomously to achieve specific goals.
          Unlike traditional AI systems that simply respond to inputs, agentic AI systems can:
        </p>
        <ul>
          <li>Make decisions based on their current context</li>
          <li>Take actions to achieve their objectives</li>
          <li>Learn from their experiences</li>
          <li>Adapt to new situations</li>
        </ul>

        <h2>Key Components</h2>
        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Context Awareness</h3>
            <p className="text-gray-600">
              The ability to understand and maintain relevant information about the current state and environment.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Decision Making</h3>
            <p className="text-gray-600">
              The process of evaluating options and choosing the best course of action based on available information.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Tool Usage</h3>
            <p className="text-gray-600">
              The capability to utilize various tools and resources to accomplish tasks and achieve goals.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Learning & Adaptation</h3>
            <p className="text-gray-600">
              The ability to improve performance over time through experience and feedback.
            </p>
          </div>
        </div>

        <h2>Practical Applications</h2>
        <p>
          Agentic AI has numerous practical applications across various domains:
        </p>
        <ul>
          <li>Intelligent assistants that can help with complex tasks</li>
          <li>Automated systems that can make decisions in real-time</li>
          <li>Learning platforms that adapt to individual needs</li>
          <li>Problem-solving systems that can tackle complex challenges</li>
        </ul>

        <div className="bg-indigo-50 p-6 rounded-xl my-8">
          <h3 className="text-xl font-semibold text-indigo-900 mb-4">Try It Yourself</h3>
          <p className="text-indigo-700 mb-4">
            Ready to see Agentic AI in action? Visit our playground to experiment with a simple agent:
          </p>
          <Link
            href="/playground"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Go to Playground
          </Link>
        </div>

        <div className="flex justify-between items-center mt-8 pt-8 border-t">
          <Link
            href="/tutorials"
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            ← Back to Tutorials
          </Link>
          <Link
            href="/tutorials/context"
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Next: Understanding Model Context Protocol →
          </Link>
        </div>
      </div>
    </div>
  )
} 