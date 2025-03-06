// "use client"
// import React from "react"
// import { CircularProgress } from "@mui/material"

// const supportsDvh = CSS.supports("height: 85dvh")
// const unit = supportsDvh ? "dvh" : "vh"

// const explorerClasses = {
// 	btnClass: "text-primary-inverse",
// }

// const explorerTitle = {
// 	previewTitle: "Image",
// 	cropViewTitle: "Crop Image",
// 	uploadViewTitle: "",
// }
// type Props = {
// 	handleDialogClose: () => void
// 	camera?: boolean
// 	autoOpenCamera?: boolean
// 	loader: boolean
// 	onSubmit: (files?: File[], text?: string, error?: boolean, errorMsg?: string) => void
// }

// const cameraFileInputCta = {
// 	cropCtaText: "Done",
// 	uploadCtaText: "Add Image",
// 	previewCtaText: "Upload",
// }

// const fileInputCta = {
// 	cropCtaText: "Done",
// 	uploadCtaText: "Browse Files",
// 	previewCtaText: "Upload",
// }
// export const ExternalInputPopup = ({
// 	handleDialogClose,
// 	onSubmit,
// 	camera = false,
// 	autoOpenCamera = false,
// 	loader = false,
// }: Props) => {
// 	const handleUploadClick = (type: string, data?: { files?: File[]; text?: string }) => {
// 		const { files, text } = data || {}
// 		if (files && files.length > 0) {
// 			onSubmit(files, text, false)
// 		} else {
// 			onSubmit([], "", true, "Select a file")
// 		}
// 		handleDialogClose()
// 	}
// 	const boundaryStyle = !isMobile() ? { width: "60vw", height: `90${unit}` } : { width: "95vw", height: `95${unit}` }
// 	const btnText = camera ? cameraFileInputCta : fileInputCta
// 	return (
// 		<div className="relative z-999" role="dialog" aria-modal="true">
// 			<div className="fixed inset-0 opacity-60 bg-neutral-light"></div>
// 			<div className="fixed inset-0 z-999 flex justify-center items-center">
// 				<div className="relative w-full flex" style={boundaryStyle}>
// 					{loader && (
// 						<div className="h-full w-full grid place-items-center bg-black-600 bg-opacity-50 absolute">
// 							<CircularProgress />
// 						</div>
// 					)}
// 					<FileUploadV2
// 						canCrop={true}
// 						maxLimits={FILE_LIMIT}
// 						camera={camera}
// 						autoOpenCamera={autoOpenCamera}
// 						uploadType={MEDIA_TYPE.FILE_EXP}
// 						handleClose={handleDialogClose}
// 						onUploadClick={handleUploadClick}
// 						desc={camera ? "Add Image" : ExternalInputPopupData.title}
// 						subDesc={camera ? "" : ExternalInputPopupData.subTitle}
// 						logEvent={logEvent}
// 						cssClasses={explorerClasses}
// 						title={explorerTitle}
// 						btnText={btnText}
// 					/>
// 				</div>
// 			</div>
// 		</div>
// 	)
// }

// export default ExternalInputPopup
