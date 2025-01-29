import useApp from "@lib/useApp"

const useStyles = () => {
    const { language } = useApp()

    return {
        headingFont: language !== "ko" ? "font-heading" : "font-headingKorean"
    }
}

export default useStyles