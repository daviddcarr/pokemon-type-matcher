import { useEffect } from "react"
import { RiMobileDownloadLine } from "react-icons/ri"
import useApp from "@lib/useApp"
import useLanguage from "@lib/useLanguage"

function InstallButton() {
  const {deferredPrompt, setDeferredPrompt} = useApp()
  const { install } = useLanguage()

  useEffect(() => {
    const handler = (e: BeforeInstallPromptEvent) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    window.addEventListener("beforeinstallprompt", handler)

    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [setDeferredPrompt])

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      deferredPrompt.userChoice.then((choice) => {
        if (choice.outcome === "accepted") {
          console.log("PWA installed!")
        }
        setDeferredPrompt(null)
      })
    }
  }

  if (!deferredPrompt) return null

  return (
      <button onClick={handleInstall} className="install-button text-slate-900 dark:text-white flex items-center gap-1">
       <RiMobileDownloadLine /> { install }
      </button>
  )
}

export default InstallButton
