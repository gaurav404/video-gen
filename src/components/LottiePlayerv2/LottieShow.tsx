import LottieViewer from "."

const LottieShow = () => {
    return (
        <LottieViewer
            autoplay
            loop={true} // Loop indefinitely if iterationCount is null
            src={"https://res.cloudinary.com/dpzpn3dkw/raw/upload/v1722834728/Allen_bot_searching_2_ufbbox.json"}
            className={"w-fit h-fit"}
        />
    )
}

export default LottieShow