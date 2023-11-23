export const Resolution: Record<any, number[]> = {
	"SD": [640,480],
	"HD": [1280,720],
	"FHD": [1920,1080],
	"UHD": [3840,2160],
}

export const ResolutionWidth = (size: string, orientation: "H" | "V") => orientation == "H" ? Resolution[size][0] : Resolution[size][1]
export const ResolutionHeight = (size: string, orientation: "H" | "V") => orientation == "H" ? Resolution[size][1] : Resolution[size][0]