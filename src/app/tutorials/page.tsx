'use client'

import Link from 'next/link'

const tutorials = [
  {
    id: 'intro',
    title: 'Introduction to Agentic AI',
    description: 'Learn the fundamental concepts of Agentic AI and its applications.',
    duration: '15 minutes',
    level: 'Beginner'
  },
  {
    id: 'context',
    title: 'Understanding Model Context Protocol',
    description: 'Master the principles of context management in AI systems.',
    duration: '20 minutes',
    level: 'Intermediate'
  },
  {
    id: 'implementation',
    title: 'Building Your First AI Agent',
    description: 'Step-by-step guide to creating a basic AI agent with context awareness.',
    duration: '30 minutes',
    level: 'Intermediate'
  },
  {
    id: 'advanced',
    title: 'Advanced Agent Patterns',
    description: 'Explore advanced patterns and best practices for agent development.',
    duration: '45 minutes',
    level: 'Advanced'
  }
]

export default function TutorialsPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Tutorials</h1>
        <p className="mt-2 text-gray-600">
          Learn about Agentic AI and Model Context Protocol through our structured tutorials.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {tutorials.map((tutorial) => (
          <div key={tutorial.id} className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold text-gray-900">{tutorial.title}</h2>
              <span className="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">
                {tutorial.level}
              </span>
            </div>
            <p className="text-gray-600 mb-4">{tutorial.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">{tutorial.duration}</span>
              <Link
                href={`/tutorials/${tutorial.id}`}
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Start Tutorial →
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-indigo-50 p-6 rounded-xl">
        <h2 className="text-xl font-semibold text-indigo-900 mb-4">Learning Path</h2>
        <div className="space-y-4">
          <p className="text-indigo-700">
            Follow our recommended learning path to master Agentic AI and Model Context Protocol:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-indigo-700">
            <li>Start with the Introduction to understand basic concepts</li>
            <li>Learn about Model Context Protocol to understand context management</li>
            <li>Build your first agent to get hands-on experience</li>
            <li>Explore advanced patterns to enhance your understanding</li>
          </ol>
        </div>
      </div>
    </div>
  )
} 