import React, { useEffect, useState } from "react";
import { accuWeatherApiKey } from "../../../consts";
import { fetchApiGet } from "../../../services/api";
import {
  DailyForecast,
  FiveDaysForecasts,
} from "../../../types/fiveDaysForecasts";
import DailyWeather from "./dailyForecast/dailyForecast";

import "./fiveDaysWeather.scss";

interface FiveDaysWeatherProps {
  cityLocationKey: string;
}

const FiveDaysWeather: React.FC<FiveDaysWeatherProps> = (props) => {
  const [fiveDaysForecasts, setFiveDaysForecasts] = useState<FiveDaysForecasts>(
    {
      Headline: {
        EffectiveDate: new Date(),
        EffectiveEpochDate: 1650646800,
        Severity: 7,
        Text: "Mild Friday night",
        Category: "heat",
        EndDate: new Date(),
        EndEpochDate: 1650690000,
        MobileLink:
          "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?lang=en-us",
        Link: "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?lang=en-us",
      },
      DailyForecasts: [
        {
          Date: new Date(),
          EpochDate: 1650600000,
          Temperature: {
            Minimum: {
              Value: 63,
              Unit: "F",
              UnitType: 18,
            },
            Maximum: {
              Value: 75,
              Unit: "F",
              UnitType: 18,
            },
          },
          Day: {
            Icon: 6,
            IconPhrase: "Mostly cloudy",
            HasPrecipitation: false,
          },
          Night: {
            Icon: 35,
            IconPhrase: "Partly cloudy",
            HasPrecipitation: false,
          },
          Sources: ["AccuWeather"],
          MobileLink:
            "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us",
          Link: "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us",
        },
        {
          Date: new Date(),
          EpochDate: 1650600000,
          Temperature: {
            Minimum: {
              Value: 63,
              Unit: "F",
              UnitType: 18,
            },
            Maximum: {
              Value: 75,
              Unit: "F",
              UnitType: 18,
            },
          },
          Day: {
            Icon: 6,
            IconPhrase: "Mostly cloudy",
            HasPrecipitation: false,
          },
          Night: {
            Icon: 35,
            IconPhrase: "Partly cloudy",
            HasPrecipitation: false,
          },
          Sources: ["AccuWeather"],
          MobileLink:
            "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us",
          Link: "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us",
        },
        {
          Date: new Date(),
          EpochDate: 1650600000,
          Temperature: {
            Minimum: {
              Value: 63,
              Unit: "F",
              UnitType: 18,
            },
            Maximum: {
              Value: 75,
              Unit: "F",
              UnitType: 18,
            },
          },
          Day: {
            Icon: 6,
            IconPhrase: "Mostly cloudy",
            HasPrecipitation: false,
          },
          Night: {
            Icon: 35,
            IconPhrase: "Partly cloudy",
            HasPrecipitation: false,
          },
          Sources: ["AccuWeather"],
          MobileLink:
            "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us",
          Link: "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us",
        },
        {
          Date: new Date(),
          EpochDate: 1650600000,
          Temperature: {
            Minimum: {
              Value: 63,
              Unit: "F",
              UnitType: 18,
            },
            Maximum: {
              Value: 75,
              Unit: "F",
              UnitType: 18,
            },
          },
          Day: {
            Icon: 6,
            IconPhrase: "Mostly cloudy",
            HasPrecipitation: false,
          },
          Night: {
            Icon: 35,
            IconPhrase: "Partly cloudy",
            HasPrecipitation: false,
          },
          Sources: ["AccuWeather"],
          MobileLink:
            "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us",
          Link: "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us",
        },
        {
          Date: new Date(),
          EpochDate: 1650600000,
          Temperature: {
            Minimum: {
              Value: 63,
              Unit: "F",
              UnitType: 18,
            },
            Maximum: {
              Value: 75,
              Unit: "F",
              UnitType: 18,
            },
          },
          Day: {
            Icon: 6,
            IconPhrase: "Mostly cloudy",
            HasPrecipitation: false,
          },
          Night: {
            Icon: 35,
            IconPhrase: "Partly cloudy",
            HasPrecipitation: false,
          },
          Sources: ["AccuWeather"],
          MobileLink:
            "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us",
          Link: "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us",
        },
      ],
    }
  );

  useEffect(() => {
    getFiveDaysForecasts();
  }, [props.cityLocationKey]);

  const getFiveDaysForecasts = async () => {
    // const newFiveDaysForecasts: FiveDaysForecasts = await fetchApiGet(
    //   `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${props.cityLocationKey}?apiKey=${accuWeatherApiKey}`
    // );
    const newFiveDaysForecasts: FiveDaysForecasts = await fetchApiGet(
      "http://dataservice.accuweather.com/forecasts/v1/daily/5day/215854?apikey=zMNPiORpciVYF0n5Z12HKGjPIPsxnW9W&metric=true"
    );
    setFiveDaysForecasts(newFiveDaysForecasts);
  };

  return (
    <div className="fiveDaysWeatherContainer">
      <h1 className="homeMainHeader">Five Days Forecasts</h1>
      <div className="homeDaysWeatherRow">
        {fiveDaysForecasts.DailyForecasts.map(
          (dailyForecast: DailyForecast, i: number) => {
            return <DailyWeather key={i} dailyForecast={dailyForecast} />;
          }
        )}
      </div>
    </div>
  );
};

export default FiveDaysWeather;
