const maxDate = new Date(8640000000000000);
const minDate = new Date(-8640000000000000);
const maxDateISOString = maxDate.toISOString();
const minDateISOString = minDate.toISOString();

const Resolution: Record<any, number[]> = {
	"SD": [640,480],
	"HD": [1280,720],
	"FHD": [1920,1080],
	"UHD": [3840,2160],
}

const ResolutionWidth = (size: string, orientation: "H" | "V" | "horizontal" | "vertical") => orientation == "H" ? Resolution[size][0] : Resolution[size][1]
const ResolutionHeight = (size: string, orientation: "H" | "V" | "horizontal" | "vertical") => orientation == "H" ? Resolution[size][1] : Resolution[size][0]

function isPreview():boolean {
	return import.meta.env.STORYBLOK_IS_PREVIEW === 'yes'
}

function isDisplayable(blok:any):boolean {

	//If Preview mode return OK
	if(isPreview()) return true;

	//Not preview mode below..
	let validFrom = false;
	let validTo = false;

	const dateNow = Date.now();

	//Check if publish dates are null or empty and cmapre to Now
	if(Date.parse(blok.publishFrom === "" ? minDateISOString : blok.publishFrom ?? minDateISOString) <= dateNow) validFrom = true;
	if(Date.parse(blok.publishTo === "" ? maxDateISOString : blok.publishTo ?? maxDateISOString) >= dateNow) validTo = true;

	return validFrom && validTo;
}

export{
    isPreview,
	isDisplayable,
	Resolution,
	ResolutionWidth,
	ResolutionHeight,
	maxDate,
	minDate,
	maxDateISOString,
	minDateISOString,
}
