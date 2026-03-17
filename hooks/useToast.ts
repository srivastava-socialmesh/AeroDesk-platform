'use client'

import { toast } from 'react-hot-toast'

export function useToast() {
  const showSuccess = (message: string) => {
    toast.success(message)
  }

  const showError = (message: string) => {
    toast.error(message)
  }

  const showInfo = (message: string) => {
    toast(message)
  }

  const showWarning = (message: string) => {
    toast(message, {
      icon: '⚠️',
      style: {
        background: '#FEF3C7',
        color: '#92400E',
      },
    })
  }

  const showPromise = async <T,>(
    promise: Promise<T>,
    messages: {
      loading: string
      success: string
      error: string
    }
  ) => {
    return toast.promise(promise, messages)
  }

  const dismiss = () => {
    toast.dismiss()
  }

  const dismissAll = () => {
    toast.remove()
  }

  return {
    success: showSuccess,
    error: showError,
    info: showInfo,
    warning: showWarning,
    promise: showPromise,
    dismiss,
    dismissAll,
  }
}