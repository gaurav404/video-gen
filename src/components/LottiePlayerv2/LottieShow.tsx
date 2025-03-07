import LottieViewer from "."

const LottieShow = ({url}: {url: string}) => {
    return (
        <LottieViewer
            autoplay
            loop={true} // Loop indefinitely if iterationCount is null
            src={url}
            className={"w-3/4 h-3/4"}
        />
    )
}

export default LottieShow