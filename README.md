# MMM-VALORANT-BANNER

A MagicMirror Module to display Valorant Esports matches as a continuous scrolling ticker banner.

## Features

- 📺 Displays Valorant Esports matches in a horizontal scrolling ticker
- 🔄 Continuous scroll animation - shows all matches in succession
- 🏆 Shows match details: teams, scores, date and time
- 🎯 Filter matches by specific team codes
- ⚙️ Highly configurable: number of matches, time format, etc.
- 🌍 Multi-language support (English, Spanish, French)
- 🎨 Minimalist design - grayscale only (white to black)

## Preview

![Banner Preview](banner.png)

**📌 Recommended Position**: For the best visual experience, use `top_bar` or `bottom_bar` positions. The horizontal scrolling banner is designed to span the full width of your mirror.

## Installation

1. Navigate to your MagicMirror modules folder:
```bash
cd ~/MagicMirror/modules
```

2. Clone this repository:
```bash
git clone https://github.com/FabienBounoir/MMM-VALORANT-BANNER.git
```

3. No dependencies required (uses native Node.js https module)

## Getting an API Key

1. Visit the [Valorant Esports API documentation](https://developer.riotgames.com/)
2. Register for a developer account
3. Generate an API key for the Esports API
4. Keep your API key secure and add it to your config.js

**⚠️ IMPORTANT**: Never commit your API key to version control. Always use your config.js file to provide the key.

## Configuration

Add the module to your `config.js`:

```javascript
{
  module: "MMM-VALORANT-BANNER",
  position: "top_bar",  // Recommended: top_bar or bottom_bar
  config: {
    updateInterval: 60,           // Update API data every X minutes
    apiKey: "YOUR_API_KEY_HERE",  // Get from Valorant Esports API
    leagueIds: ["106109559530232966"], // VCT EMEA
    numberOfFutureGames: 10,      // Number of upcoming matches to display
    numberOfPastGames: 2,         // Number of past matches to display
    use24HourTime: false,         // 24-hour format (true) or 12-hour (false)
    useTeamFullName: false,       // Show team full name or code
    teamCodes: []                 // Filter by team codes (empty = all teams)
  }
}
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `updateInterval` | number | 60 | Update frequency in minutes |
| `apiKey` | string | "" | API key for esports data (required) |
| `leagueIds` | array | ["106109559530232966"] | League identifiers |
| `numberOfFutureGames` | number | 10 | Maximum upcoming matches to show |
| `numberOfPastGames` | number | 2 | Maximum past matches to show |
| `use24HourTime` | boolean | false | Time format (24h or 12h) |
| `useTeamFullName` | boolean | false | Display full team name instead of code |
| `teamCodes` | array | [] | Filter by team codes (empty = all teams) |

## Usage Examples

### Show only FNC and G2 matches:
```javascript
config: {
  teamCodes: ["FNC", "G2"]
}
```

### Show team full names with 24-hour time:
```javascript
config: {
  useTeamFullName: true,
  use24HourTime: true
}
```

## API Information

This module uses the official Valorant Esports API:
- **Endpoint**: `esports-api.service.valorantesports.com`
- **Default League**: VCT EMEA (ID: 106109559530232966)

Other available leagues:
- VCT Americas: `109974795266458277`
- VCT Pacific: `109976391920118180`

## Display Format

The banner displays matches in a continuous horizontal scroll:

```
Mon 14:30 | FNC 2 vs 1 G2 | Tue 19:00 | KC vs M8 | ...
```

Format per match:
- **Line 1**: Day and Time (or "LIVE" if match is ongoing)
- **Line 2**: Team1 CODE [score] vs [score] Team2 CODE

## Styling

The module uses a minimalist Magic Mirror design:
- Grayscale only (white, light gray, dark gray, black)
- No colored borders or backgrounds
- Transparent background
- Horizontal scroll animation
- Suitable for all Magic Mirror themes

## Languages

Supported languages:
- English (en)
- Spanish (es)
- French (fr)

## License

MIT License - See LICENSE file for details

## Author

FabienBounoir

## Credits

- Valorant Esports API
- MagicMirror Project
