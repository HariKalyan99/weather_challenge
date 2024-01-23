import "./styles.css";
import Appbar from "./Appbar";
import LocationSearch from "./Locationsearch";
import { useEffect, useState } from "react";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";

export default function Weatherapp() {
  const [getLocation, setLocation] = useState("");
  const [debounceTimer, setDebounceTimer] = useState(0);
  const [weatherData, setWeatherData] = useState({});
  const [getApi, setApi] = useState(false);
  const [noMatch, setNoMatch] = useState(false);

  const performApiSearch = async (location) => {
    let url =
      "https://api.weatherapi.com/v1/current.json?key=9193231c702c4bbab12104946232812&q";
    try {
      if (location.length !== 0) {
        const response = await axios.get(`${url}=${location}`);
        const { data } = response;
        if (response.status === 200) {
          setApi(true);
          setWeatherData({ ...data });
        }
      } else {
        setApi(false);
        setNoMatch(false);
      }
    } catch (error) {
      setApi(false);
      if (error.response) {
        if (error.response.status === 400) {
          enqueueSnackbar(`"No Results found for "${getLocation}`, {
            variant: "error",
            autoHideDuration: 2000,
          });
          return setNoMatch(true);
        } else {
          console.log(error.response);
        }
      }
    }
  };

  const handleChange = (e) => {
    setLocation(e.target.value);
    console.log(e.target.value);
  };

  useEffect(() => {
    if (debounceTimer !== 0) {
      clearTimeout(debounceTimer);
    }

    const newTimer = setTimeout(async () => {
      await performApiSearch(getLocation);
    }, 600);

    setDebounceTimer(newTimer);
  }, [getLocation]);

  return (
    <>
      <div className="App">
        <Appbar />
      </div>
      <div className="weatherCard">
        <LocationSearch searchText={getLocation} onChangeInput={handleChange} />
        {getApi ? (
          <>
            <h1>{`${weatherData.location.name}, ${weatherData.location.country}`}</h1>
            <Card sx={{ minWidth: 350 }}>
              <CardContent>
                <Box sx={{ backgroundColor: "black", borderRadius: "0.4rem" }}>
                  <img src={weatherData.current.condition.icon} alt="icon" />
                </Box>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid xs={6}>
                    <Typography>Temparature</Typography>
                    <Typography>Condition</Typography>
                    <Typography>Wind Speed</Typography>
                    <Typography>Humidity</Typography>
                    <Typography>Cloud Coverage</Typography>
                    <Typography>Last Updated</Typography>
                  </Grid>
                  <Grid xs={6} sx={{ textAlign: "end" }}>
                    <Typography
                      sx={{ fontWeight: "bolder" }}
                    >{`${weatherData.current["temp_c"]}°C/${weatherData.current["temp_f"]}°F`}</Typography>
                    <Typography sx={{ fontWeight: "bolder" }}>
                      {weatherData.current.condition.text}
                    </Typography>
                    <Typography sx={{ fontWeight: "bolder" }}>
                      {weatherData.current["wind_kph"]}Km/h
                    </Typography>
                    <Typography sx={{ fontWeight: "bolder" }}>
                      {weatherData.current.humidity}%
                    </Typography>
                    <Typography sx={{ fontWeight: "bolder" }}>
                      {weatherData.current.cloud}%
                    </Typography>
                    <Typography sx={{ fontWeight: "bolder" }}>
                      {weatherData.current["last_updated"]}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </>
        ) : (
          noMatch && (
            <h1 style={{ color: "red" }}>No matching location found</h1>
          )
        )}
      </div>
    </>
  );
}
