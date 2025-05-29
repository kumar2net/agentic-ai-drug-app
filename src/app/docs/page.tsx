'use client'

import Link from 'next/link'

const sections = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Installation', href: '/docs/installation' },
      { title: 'Quick Start Guide', href: '/docs/quickstart' },
      { title: 'Basic Concepts', href: '/docs/concepts' }
    ]
  },
  {
    title: 'Core Features',
    items: [
      { title: 'Agent Configuration', href: '/docs/agent-config' },
      { title: 'Context Management', href: '/docs/context' },
      { title: 'Tool Integration', href: '/docs/tools' }
    ]
  },
  {
    title: 'Advanced Topics',
    items: [
      { title: 'Custom Tools', href: '/docs/custom-tools' },
      { title: 'State Management', href: '/docs/state' },
      { title: 'Error Handling', href: '/docs/errors' }
    ]
  },
  {
    title: 'API Reference',
    items: [
      { title: 'Agent API', href: '/docs/api/agent' },
      { title: 'Context API', href: '/docs/api/context' },
      { title: 'Tool API', href: '/docs/api/tools' }
    ]
  }
]

export default function DocsPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Documentation</h1>
        <p className="mt-2 text-gray-600">
          Comprehensive guides and API references for Agentic AI development.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {sections.map((section) => (
          <div key={section.title} className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{section.title}</h2>
            <ul className="space-y-3">
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-indigo-600 hover:text-indigo-700 flex items-center"
                  >
                    <span>{item.title}</span>
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="bg-indigo-50 p-6 rounded-xl">
        <h2 className="text-xl font-semibold text-indigo-900 mb-4">Need Help?</h2>
        <div className="space-y-4">
          <p className="text-indigo-700">
            If you can't find what you're looking for, check out these resources:
          </p>
          <ul className="list-disc list-inside space-y-2 text-indigo-700">
            <li>
              <Link href="/tutorials" className="hover:underline">
                Interactive Tutorials
              </Link>
            </li>
            <li>
              <Link href="/playground" className="hover:underline">
                Live Playground
              </Link>
            </li>
            <li>
              <a
                href="https://github.com/your-repo/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                GitHub Issues
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
} 