# PocketWeather

A modern, responsive weather application that provides real-time weather information with dynamic visual backgrounds and weekly forecasts.

## Features

- **Current Weather Display**: Shows real-time temperature, humidity, wind speed, and weather conditions
- **Location Search**: Search for weather data by city or location name
- **Dynamic Backgrounds**: Automatically switches between day and night video backgrounds based on local time
- **Weekly Forecast**: View 7-day weather forecast with min/max temperatures and weather conditions
- **Sunrise/Sunset Times**: Displays daily sunrise and sunset times
- **Real-time Clock**: Shows current time with date display
- **Responsive Design**: Mobile-friendly layout using Tailwind CSS

## Tech Stack

- **HTML5**: Semantic markup
- **Vanilla JavaScript**: No frameworks, pure JavaScript for logic
- **Tailwind CSS v4.3.0**: Utility-first CSS framework for styling
- **Google Fonts**: Orbitron and Quantico fonts for modern typography

## APIs Used

- **OpenWeatherMap Geocoding API**: Converts location names to latitude/longitude coordinates
- **Open-Meteo API**: Provides comprehensive weather data including current conditions and forecasts

## Project Structure

```
pocketWeather/
├── index.html              # Main HTML file
├── main.js                 # Core JavaScript logic
├── env.js                  # Environment configuration (API key - gitignored)
├── package.json            # Node.js dependencies
├── .gitignore              # Git ignore rules
└── src/
    ├── input.css           # Tailwind CSS input with custom fonts
    ├── output.css          # Compiled CSS output
    └── assets/
        ├── img/            # Static images (forecast backgrounds)
        └── vid/            # Video backgrounds (day/night)
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pocketWeather
```

2. Install dependencies:
```bash
npm install
```

3. Set up your API key:
   - Create an `env.js` file in the root directory
   - Add your OpenWeatherMap API key:
```javascript
let apiKey = "YOUR_OPENWEATHERMAP_API_KEY";
```

   To get an API key, sign up at [OpenWeatherMap](https://openweathermap.org/api)

4. Build the CSS:
```bash
npx tailwindcss -i ./src/input.css -o ./src/output.css
```

## Usage

1. Open `index.html` in a web browser
2. The app will automatically load weather for the default location (Jos)
3. Enter a city name in the search field and click "Search" to get weather for a different location
4. Scroll down to view the weekly forecast

## Weather Conditions

The app displays weather conditions using the WMO weather code system, including:
- Clear sky, partly cloudy, overcast
- Fog and mist
- Drizzle (light, moderate, dense)
- Rain (slight, moderate, heavy, freezing)
- Snowfall (slight, moderate, heavy)
- Showers (rain and snow)
- Thunderstorms (with and without hail)

## Customization

### Fonts
The app uses Google Fonts:
- **Orbitron**: For main headings and display text
- **Quantico**: Available as an additional font option

### Colors
The app uses a custom color palette:
- Background: `#C2CDD5` (light gray-blue)
- Accent: `#FF9103` (orange for sunrise icon)
- Text: `#8A8B87` (gray for secondary text)

## Development

To rebuild the CSS during development:
```bash
npx tailwindcss -i ./src/input.css -o ./src/output.css --watch
```

## Browser Compatibility

Works in all modern browsers that support:
- ES6 JavaScript
- CSS Grid and Flexbox
- HTML5 video elements
- Fetch API

## License

This project is open source and available for educational purposes.

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.
