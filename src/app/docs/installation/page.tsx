'use client'

import Link from 'next/link'

export default function InstallationPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Installation Guide</h1>
        <p className="mt-2 text-gray-600">
          Get started with Agentic AI by setting up your development environment.
        </p>
      </div>

      <div className="prose prose-indigo max-w-none">
        <h2>Prerequisites</h2>
        <p>
          Before you begin, make sure you have the following installed:
        </p>
        <ul>
          <li>Node.js (version 18 or higher)</li>
          <li>npm (comes with Node.js) or yarn</li>
          <li>Git (for version control)</li>
        </ul>

        <h2>Installation Steps</h2>
        <div className="bg-gray-50 p-4 rounded-lg my-4">
          <h3 className="text-lg font-semibold mb-2">1. Clone the Repository</h3>
          <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
            <code>git clone https://github.com/your-repo/agent-learn.git
cd agent-learn</code>
          </pre>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg my-4">
          <h3 className="text-lg font-semibold mb-2">2. Install Dependencies</h3>
          <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
            <code>npm install
# or
yarn install</code>
          </pre>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg my-4">
          <h3 className="text-lg font-semibold mb-2">3. Set Up Environment Variables</h3>
          <p className="mb-2">Create a `.env.local` file in the root directory:</p>
          <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
            <code>NEXT_PUBLIC_API_URL=your_api_url
OPENAI_API_KEY=your_api_key</code>
          </pre>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg my-4">
          <h3 className="text-lg font-semibold mb-2">4. Start the Development Server</h3>
          <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
            <code>npm run dev
# or
yarn dev</code>
          </pre>
        </div>

        <h2>Verifying the Installation</h2>
        <p>
          After starting the development server, you should be able to access:
        </p>
        <ul>
          <li>Main application: <code>http://localhost:3000</code></li>
          <li>Playground: <code>http://localhost:3000/playground</code></li>
          <li>Documentation: <code>http://localhost:3000/docs</code></li>
        </ul>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Make sure to keep your API keys secure and never commit them to version control.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-8 pt-8 border-t">
          <Link
            href="/docs"
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            ← Back to Documentation
          </Link>
          <Link
            href="/docs/quickstart"
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Next: Quick Start Guide →
          </Link>
        </div>
      </div>
    </div>
  )
} 