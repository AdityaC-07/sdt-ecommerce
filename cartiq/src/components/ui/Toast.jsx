import { CheckCircle, XCircle, Info } from 'lucide-react'
import useUIStore from '../../store/uiStore'

const Toast = () => {
  const { toastMessage } = useUIStore()

  if (!toastMessage) return null

  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <XCircle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
  }

  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-indigo-500',
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-in">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-white ${colors[toastMessage.type]}`}
      >
        {icons[toastMessage.type]}
        <span className="font-medium">{toastMessage.message}</span>
      </div>
    </div>
  )
}

export default Toast
