import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-surface-0">
          <div className="max-w-md mx-auto text-center p-6">
            <h1 className="text-xl font-semibold text-ink-900 mb-2">
              Something went wrong on our side
            </h1>
            <p className="text-ink-700 mb-4">
              Reload the page or go back home.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-action-500 text-black rounded-full font-medium hover:bg-action-600 focus:outline-none focus:ring-2 focus:ring-action-500 focus:ring-offset-2"
              >
                Reload page
              </button>
              <a
                href="/"
                className="px-4 py-2 border border-brand-800 text-brand-800 rounded-full font-medium hover:bg-brand-100 focus:outline-none focus:ring-2 focus:ring-action-500 focus:ring-offset-2"
              >
                Go home
              </a>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
