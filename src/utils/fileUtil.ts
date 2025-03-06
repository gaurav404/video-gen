const extensionMappings = {
	"image/jpeg": ".jpeg",
	"image/png": ".png",
	"image/gif": ".gif",
	"image/bmp": ".bmp",
	"image/tiff": ".tiff",
	"image/svg+xml": ".svg",
	"image/webp": ".webp",
	"image/x-icon": ".ico",
	"audio/mpeg": ".mp3",
	"audio/wav": ".wav",
	"audio/ogg": ".ogg",
	"audio/aac": ".aac",
	"audio/midi": ".midi",
	"audio/webm": ".webm",
}
export function getFileSize(file: File, preciseUpto: number = 2) {
    let size = file.size
    const sizeRes = {
      byte: size,
      kb: (size = size / 1024),
      mb: (size = size / 1024),
      gb: (size = size / 1024),
    }
    const entries = Object.entries(sizeRes)
    for (const [key, value] of entries) {
     // @ts-expect-error "now"
      sizeRes[key] = parseFloat(value.toFixed(preciseUpto))
    }
    return sizeRes
}

export const isValidImageFile = (fileType: string) => /^image\/.*/.test(fileType)

export const getFileWithExtension = (fileName: string, fileType: string) => {
	const extension = extensionMappings[fileType as keyof typeof extensionMappings]
	if (extension) {
		return fileName + extension
	}
	return fileName
}