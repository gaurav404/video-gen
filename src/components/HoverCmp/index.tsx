import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
const HoverCmp = ({ children, icon, onClick}: {children: React.ReactElement, icon: string, onClick : () => void}) => {
    return (
        <div className="relative w-fit rounded-md">
            {children}
            {<>
                <div className="absolute opacity-50 inset-0 rounded-md flex items-center justify-center"
                    onClick={onClick}
                >
                    { icon === "PLAY" && <PlayCircleIcon fontSize="large" color='success'/>}
                    { icon === "OPEN" && <OpenInNewIcon fontSize="large" color='success'/> }
                </div>
            </>}
        </div>
    )
}

export default HoverCmp;