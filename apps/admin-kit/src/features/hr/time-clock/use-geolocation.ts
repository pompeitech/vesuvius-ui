import { useCallback, useState } from 'react'

export type GeolocationState =
  | { status: 'idle' }
  | { status: 'locating' }
  | { status: 'success'; position: GeolocationPosition }
  | { status: 'denied' }
  | { status: 'timeout' }
  | { status: 'unsupported' }
  | { status: 'error'; message: string }

/**
 * A small wrapper around the browser Geolocation API as a `status` machine
 * instead of a bare callback pair — every real-world outcome (still
 * deciding, no `navigator.geolocation` at all, the permission prompt was
 * denied, it timed out, some other failure) is its own state so the UI can
 * show the right message and recovery action for each, not just "worked" /
 * "didn't".
 */
export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({ status: 'idle' })

  const locate = useCallback(() => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setState({ status: 'unsupported' })
      return
    }

    setState({ status: 'locating' })
    navigator.geolocation.getCurrentPosition(
      position => setState({ status: 'success', position }),
      error => {
        if (error.code === error.PERMISSION_DENIED) {
          setState({ status: 'denied' })
        } else if (error.code === error.TIMEOUT) {
          setState({ status: 'timeout' })
        } else {
          setState({
            status: 'error',
            message: error.message || "Couldn't determine your location."
          })
        }
      },
      { enableHighAccuracy: true, timeout: 10_000, maximumAge: 0 }
    )
  }, [])

  const reset = useCallback(() => setState({ status: 'idle' }), [])

  return { state, locate, reset }
}
