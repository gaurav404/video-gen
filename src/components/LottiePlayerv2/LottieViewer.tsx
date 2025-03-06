import React from "react"
import { DotLottieCommonPlayer, DotLottiePlayer, PlayerEvents, PlayerState } from "@dotlottie/react-player"

const LottiePlayer = React.forwardRef<DotLottieCommonPlayer, React.ComponentPropsWithoutRef<typeof DotLottiePlayer>>(
  (props, ref) => {
    return <DotLottiePlayer ref={ref} {...props}></DotLottiePlayer>
  },
)

// Add display name to fix lint error
LottiePlayer.displayName = 'LottiePlayer'

export { DotLottieCommonPlayer, PlayerEvents, PlayerState }
export default LottiePlayer
