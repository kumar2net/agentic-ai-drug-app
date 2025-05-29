import Link from 'next/link'

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-6xl">
          Learn Agentic AI and Model Context Protocol
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Master the fundamentals of Agentic AI and Model Context Protocol through interactive examples, hands-on tutorials, and real-world applications.
        </p>
        <div className="flex justify-center gap-4">
          <Link 
            href="/playground"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Try Agent Playground
          </Link>
          <Link
            href="/tutorials"
            className="px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition"
          >
            Start Learning
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="p-6 bg-white rounded-xl shadow-sm border">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Interactive Playground</h3>
          <p className="text-gray-600">
            Experiment with live AI agents and see how they make decisions in real-time.
          </p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm border">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Step-by-Step Tutorials</h3>
          <p className="text-gray-600">
            Learn at your own pace with our comprehensive tutorial series on AI concepts.
          </p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm border">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Practical Examples</h3>
          <p className="text-gray-600">
            See real-world applications of Agentic AI and Model Context Protocol in action.
          </p>
        </div>
      </section>

      {/* Getting Started Section */}
      <section className="bg-gray-50 p-8 rounded-xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Getting Started</h2>
        <div className="space-y-4">
          <p className="text-gray-600">
            Begin your journey into Agentic AI and Model Context Protocol with these resources:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Introduction to Agentic AI concepts</li>
            <li>Understanding Model Context Protocol</li>
            <li>Building your first AI agent</li>
            <li>Implementing context management</li>
          </ul>
          <Link
            href="/docs/introduction"
            className="inline-block mt-4 text-indigo-600 hover:text-indigo-700"
          >
            Read the documentation →
          </Link>
        </div>
      </section>
    </div>
  )
}
