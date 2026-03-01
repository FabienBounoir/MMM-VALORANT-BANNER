# MMM-VALORANT-BANNER

A MagicMirror Module to display Valorant Esports matches as a scrolling banner.

## Features

- 📺 Displays Valorant Esports matches in a horizontal scrolling banner
- 🔄 Automatic rotation through upcoming and past matches
- 🏆 Shows match details: teams, logos, time, and status (LIVE/FINISHED)
- 🎯 Filter matches by specific team codes
- ⚙️ Highly configurable: number of matches, scroll speed, time format, etc.
- 🌍 Multi-language support (English, Spanish, French)

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

## Configuration

Add the module to your `config.js`:

```javascript
{
  module: "MMM-VALORANT-BANNER",
  position: "top_center",
  config: {
    updateInterval: 60,           // Update API data every X minutes
    apiKey: "YOUR_API_KEY_HERE",  // Get from Valorant Esports API
    leagueIds: ["106109559530232966"], // VCT EMEA
    numberOfFutureGames: 10,      // Number of upcoming matches to display
    numberOfPastGames: 2,         // Number of past matches to display
    use24HourTime: false,         // 24-hour format (true) or 12-hour (false)
    useTeamFullName: false,       // Show team full name or code
    scrollSpeed: 30,              // Seconds per match display
    teamCodes: []                 // Filter by team codes (empty = all teams)
                                  // Example: ["FNC", "G2", "FNATIC"]
  }
}
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `updateInterval` | number | 60 | Update frequency in minutes |
| `apiKey` | string | Valorant API key | API key for esports data |
| `leagueIds` | array | VCT EMEA | League identifiers |
| `numberOfFutureGames` | number | 10 | Maximum upcoming matches to show |
| `numberOfPastGames` | number | 2 | Maximum past matches to show |
| `use24HourTime` | boolean | false | Time format (24h or 12h) |
| `useTeamFullName` | boolean | false | Display full team name instead of code |
| `scrollSpeed` | number | 30 | Seconds each match is displayed |
| `teamCodes` | array | [] | Filter by team codes (empty = all teams) |

## Usage Examples

### Show only Gentlemate and Karmine Corp matches:
```javascript
config: {
  teamCodes: ["M8", "KC"]
}
```

### Change scroll speed to 20 seconds per match:
```javascript
config: {
  scrollSpeed: 20
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
- VCT EMEA: [See documentation]
- VCT Pacific: [See documentation]

## Display Format

The banner shows one match at a time in this layout:

```
[Day] | [Team1 Logo] Team1 vs Team2 [Team2 Logo] | [Status]
      | [HH:MM]      [Code]        [Code]
```

## Styling

The module includes a dark Valorant-themed design with:
- Pink accent color (#ff0484)
- Dark background gradient
- Responsive logo sizing
- LIVE indicator with animation
- Finished match badge

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
- Original concept inspired by other esports modules