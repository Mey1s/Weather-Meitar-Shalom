import { NavItem } from "./types/navItem";

//accuWeather
export const accuWeatherApiKey = "zMNPiORpciVYF0n5Z12HKGjPIPsxnW9W";

//nav items
export const navItems: NavItem[] = [
  { title: "Home", link: "/" },
  { title: "Favorites", link: "/favorites" },
];

//initial values
export const currentWeatherInitial = {
  LocalObservationDateTime: new Date(),
  EpochTime: 0,
  WeatherText: "",
  WeatherIcon: 0,
  HasPrecipitation: false,
  PrecipitationType: null,
  IsDayTime: false,
  Temperature: {
    Metric: {
      Value: 0,
      Unit: "",
      UnitType: 0,
    },
    Imperial: {
      Value: 0,
      Unit: "0",
      UnitType: 0,
    },
  },
  MobileLink:
    "",
  Link: "",
};

export const fiveDaysForecastsInitial =     {
  Headline: {
    EffectiveDate: new Date(),
    EffectiveEpochDate: 0,
    Severity: 0,
    Text: "",
    Category: "",
    EndDate: new Date(),
    EndEpochDate: 0,
    MobileLink:
      "",
    Link: "",
  },
  DailyForecasts: [
    {
      Date: new Date(),
      EpochDate: 0,
      Temperature: {
        Minimum: {
          Value: 0,
          Unit: "",
          UnitType: 0,
        },
        Maximum: {
          Value: 0,
          Unit: "0",
          UnitType: 0,
        },
      },
      Day: {
        Icon: 0,
        IconPhrase: "",
        HasPrecipitation: false,
      },
      Night: {
        Icon: 0,
        IconPhrase: "",
        HasPrecipitation: false,
      },
      Sources: [""],
      MobileLink:
        "",
      Link: "",
    },
    {
      Date: new Date(),
      EpochDate: 0,
      Temperature: {
        Minimum: {
          Value: 0,
          Unit: "",
          UnitType: 0,
        },
        Maximum: {
          Value: 0,
          Unit: "0",
          UnitType: 0,
        },
      },
      Day: {
        Icon: 0,
        IconPhrase: "",
        HasPrecipitation: false,
      },
      Night: {
        Icon: 0,
        IconPhrase: "",
        HasPrecipitation: false,
      },
      Sources: [""],
      MobileLink:
        "",
      Link: "",
    },
    {
      Date: new Date(),
      EpochDate: 0,
      Temperature: {
        Minimum: {
          Value: 0,
          Unit: "",
          UnitType: 0,
        },
        Maximum: {
          Value: 0,
          Unit: "0",
          UnitType: 0,
        },
      },
      Day: {
        Icon: 0,
        IconPhrase: "",
        HasPrecipitation: false,
      },
      Night: {
        Icon: 0,
        IconPhrase: "",
        HasPrecipitation: false,
      },
      Sources: [""],
      MobileLink:
        "",
      Link: "",
    },
    {
      Date: new Date(),
      EpochDate: 0,
      Temperature: {
        Minimum: {
          Value: 0,
          Unit: "",
          UnitType: 0,
        },
        Maximum: {
          Value: 0,
          Unit: "0",
          UnitType: 0,
        },
      },
      Day: {
        Icon: 0,
        IconPhrase: "",
        HasPrecipitation: false,
      },
      Night: {
        Icon: 0,
        IconPhrase: "",
        HasPrecipitation: false,
      },
      Sources: [""],
      MobileLink:
        "",
      Link: "",
    },
    {
      Date: new Date(),
      EpochDate: 0,
      Temperature: {
        Minimum: {
          Value: 0,
          Unit: "",
          UnitType: 0,
        },
        Maximum: {
          Value: 0,
          Unit: "0",
          UnitType: 0,
        },
      },
      Day: {
        Icon: 0,
        IconPhrase: "",
        HasPrecipitation: false,
      },
      Night: {
        Icon: 0,
        IconPhrase: "",
        HasPrecipitation: false,
      },
      Sources: [""],
      MobileLink:
        "",
      Link: "",
    },
  ],
};