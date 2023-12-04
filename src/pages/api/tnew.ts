import type { APIRoute } from 'astro'
import axios from 'axios';

export const GET: APIRoute = async ({ params, request }) => {

	const API_ProductSearch = "TXN/Products/Search";

	const BASE_URL = import.meta.env.TESSITURA_URL
	const USERNAME = import.meta.env.TESSITURA_USERNAME
	const PASSWORD = import.meta.env.TESSITURA_PASSWORD

	const url = new URL(request.url)
	const urlParams = new URLSearchParams(url.search)

	const today = new Date(new Date().setHours(0, 0, 0, 0)).toISOString();

	const data = {
		"StartDateRange":today,
		"EndDateRange": today,
		"KeywordDescriptions": urlParams.get("keyword"),
		"ProductionSeasonId": urlParams.get("productseasonid"),
	  }
	  console.log(data)

	let vals = null;

    await axios.post(BASE_URL+API_ProductSearch, data, { auth: {
		username: USERNAME,
		password: PASSWORD
	  }})
	  .then(function (response) {
		vals = response.data;
	  })
	  .catch(function (error) {
		console.log(error);
	  });

  return new Response(
    JSON.stringify(vals),
  )
}

/*
{
  "ConstituentId": 1,
  "TitleId": 1,
  "StartDateRange": "2023-12-04T15:23:13.5304424+13:00",
  "EndDateRange": "2023-12-04T15:23:13.5304424+13:00",
  "TimeSlotId": 1,
  "ComposerId": 1,
  "LanguageId": 1,
  "ArtistId": 1,
  "KeywordId": 1,
  "FacilityId": 1,
  "OneOrAllPerformancesInPackage": "sample string 1",
  "DayOfWeek": "sample string 2",
  "SeasonIds": "sample string 3",
  "SeasonId": 1,
  "ModeOfSaleId": 1,
  "OnSaleOnly": true,
  "ShowGrossAvailability": true,
  "ShowConstituentAvailability": true,
  "BusinessUnitId": 1,
  "ProductionSeasonIds": "sample string 7",
  "ProductionSeasonId": 1,
  "PerformanceIds": "sample string 8",
  "PackageSeasonId": 1,
  "PackageIds": "sample string 9",
  "PackageId": 1,
  "PackageTypeId": 1,
  "StartDateRangePackage": "2023-12-04T15:23:13.5460618+13:00",
  "EndDateRangePackage": "2023-12-04T15:23:13.5460618+13:00",
  "Keywords": "sample string 10",
  "KeywordAndOr": 1,
  "KeywordDescriptions": "sample string 11",
  "ShowAll": true,
  "FullText": "sample string 13",
  "FullTextType": "sample string 14",
  "IsWebSearch": true
}
*/