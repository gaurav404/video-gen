import axios, { AxiosInstance, AxiosResponse } from "axios";
import { getFileWithExtension } from "./fileUtil";
import { API_BASE_URL, API_URLS } from "@/constants/apiConstants";
let axiosInstance: AxiosInstance | undefined = undefined
const deviceType = ["web", "mweb", "ios-webview", "android-webview"]
export const detectDeviceType = () => {
	if (typeof window !== "undefined") {
		const details = navigator.userAgent
		const regexp = /android|iphone|kindle|ipad/i
		const isMobileDevice = regexp.test(details)
		if (isMobileDevice) {
			return deviceType[1]
		} else {
			return deviceType[0]
		}
	}
}

export const generateUUID = () => {
	let d = new Date().getTime()
	let d2 = (typeof performance !== "undefined" && performance.now && performance.now() * 1000) || 0 //Time in microseconds since page-load or 0 if unsupported
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
		let r = Math.random() * 16 //random number between 0 and 16
		if (d > 0) {
			//Use timestamp until depleted
			r = (d + r) % 16 | 0
			d = Math.floor(d / 16)
		} else {
			//Use microseconds since page-load if supported
			r = (d2 + r) % 16 | 0
			d2 = Math.floor(d2 / 16)
		}
		return (c === "x" ? r : (r & 0x3) | 0x8).toString(16)
	})
}

const headerParams = (default_headers: Record<string, string> = {}) => {
	const headers = default_headers
	headers["Content-Type"] = "application/json"
	headers["x-client-type"] = detectDeviceType() ?? "unknown"
	headers["accept"] = "application/json"
	if (typeof window !== "undefined") {
		let uuid = localStorage.getItem("uuid")
		if (!uuid) {
			uuid = generateUUID()
			localStorage?.setItem("uuid", uuid)
		}
		headers["x-device-id"] = uuid
	}
	return headers
}
export const setupAxiosInstance = (baseUrl: string) => {
	axiosInstance = axios.create({
		baseURL: baseUrl,
		timeout: 300000,
		headers: headerParams(),
	})
	//setupAxiosInstanceInterceptors()
	return axiosInstance
}

export const getAxiosInstance = () => {
	if (!axiosInstance) {
		throw new Error("Axios instance not initialized")
	}
	return axiosInstance
}
export const getPresignedUrl = async (fileType: string, fileSize: number) => {
	const currData = new Date()
	const file_name = getFileWithExtension(
		`${currData.getDate()}_${currData.getMonth()}_${currData.getFullYear()}_${currData.getTime()}`,
		fileType,
	)
	const data: { presigned_url: string; file_id: string } = await getAxiosInstance()
		.post(API_BASE_URL + API_URLS.GET_PRESIGNED, {
			file_type: fileType,
			file_name: file_name,
			file_size_in_bytes: fileSize,
		})
		.then((res: AxiosResponse<{ data: { presigned_url: string; file_id: string } }>) => {
			const data = res?.data?.data
			return data
		})
		.catch(() => {
			throw new Error("error while get presigned url")
		})
	return data
}

export const getUploadedUrl = async (fileId: string) => {
	const url = (API_BASE_URL + API_URLS.GET_FILE_URL).replace("FILE_ID", fileId)
	const data = await getAxiosInstance()
		.get(url)
		.then((res: AxiosResponse<{ data: { url: string } }>) => {
			const data = res?.data?.data
			if (data) {
				return data
			} else {
				throw new Error("error while get uploaed url")
			}
		})
		.catch(() => {
			// return 'presignedUrl'
			throw new Error("error while get uploaed url")
		})
	return data
}

export const submitQuestion = async (text: string, image: string) => {
	const url = (API_BASE_URL + API_URLS.SUBMIT_QUESTION)
	return getAxiosInstance()
		.post(url, {
			text: text,
			image: image
		})
		.then((res: AxiosResponse<{ data: { url: string } }>) => {
			const data = res?.data?.data
			if (data) {
				return data
			} else {
				throw new Error("error while get uploaed url")
			}
		})
}

export const getDoubtData = async (doubt_id: string) => {
	const url = (API_BASE_URL + API_URLS.FETCH_QUESTION)
	return getAxiosInstance()
		.post(url, {
			doubt_id: doubt_id
		})
		.then((res: AxiosResponse<{ data: { url: string } }>) => {
			const data = res?.data?.data
			if (data) {
				return data
			} else {
				throw new Error("error while get uploaed url")
			}
		})
}