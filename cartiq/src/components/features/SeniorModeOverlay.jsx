import { useEffect } from 'react'
import { Phone, MessageCircle, X } from 'lucide-react'
import { useState } from 'react'
import useUIStore from '../../store/uiStore'

const SeniorModeOverlay = () => {
  const { isSeniorMode, toggleSeniorMode } = useUIStore()
  const [showHelpModal, setShowHelpModal] = useState(false)

  useEffect(() => {
    // Add/remove senior class from html element
    if (isSeniorMode) {
      document.documentElement.classList.add('senior')
    } else {
      document.documentElement.classList.remove('senior')
    }
  }, [isSeniorMode])

  if (!isSeniorMode) return null

  return (
    <>
      {/* Simplified Shopping Mode Banner */}
      <div className="fixed top-16 left-0 right-0 bg-amber-100 border-b-2 border-amber-300 py-3 px-4 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <p className="text-amber-900 font-semibold text-lg">
            Simplified Shopping Mode Active
          </p>
          <button
            onClick={toggleSeniorMode}
            className="text-amber-900 underline hover:text-amber-700 font-medium"
          >
            Turn off
          </button>
        </div>
      </div>

      {/* Need Help Floating Button */}
      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={() => setShowHelpModal(true)}
          className="bg-[#1E3A5F] text-white px-6 py-4 rounded-full shadow-lg hover:bg-[#2D5986] transition-colors flex items-center gap-2 text-lg font-semibold"
        >
          <Phone size={24} />
          Need Help?
        </button>
      </div>

      {/* Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#1E3A5F]">Need Help?</h2>
              <button
                onClick={() => setShowHelpModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={28} />
              </button>
            </div>

            <div className="space-y-4">
              <button className="w-full bg-[#1E3A5F] text-white py-4 px-6 rounded-xl text-lg font-semibold hover:bg-[#2D5986] transition-colors flex items-center justify-center gap-3">
                <Phone size={24} />
                Call Support: 1800-XXX-XXXX
              </button>

              <button className="w-full bg-green-600 text-white py-4 px-6 rounded-xl text-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-3">
                <MessageCircle size={24} />
                Chat with us
              </button>

              <p className="text-gray-600 text-center text-lg mt-4">
                Our support team is available 24/7 to assist you.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SeniorModeOverlay
