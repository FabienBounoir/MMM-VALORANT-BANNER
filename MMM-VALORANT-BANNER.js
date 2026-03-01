/*
 *
 * MagicMirror Module: MMM-VALORANT-BANNER
 *
 * Author: FabienBounoir
 * License: MIT
 *
 * Global Module:
 */
Module.register("MMM-VALORANT-BANNER", {
  // default module configuration
  defaults: {
    updateInterval: 60, // minutes
    apiKey: "", // Set your API key in config.js
    leagueIds: ["106109559530232966"], // VCT EMEA
    numberOfFutureGames: 10,
    numberOfPastGames: 2,
    use24HourTime: false,
    useTeamFullName: false,
    teamCodes: [], // Empty = all teams, or filter like ["FNC", "G2"]
  },
  // Required version of MagicMirror
  requiresVersion: "2.1.0",
  // Module properties
  matches: [],
  
  // Define translations
  getTranslations: function () {
    return {
      en: "translations/en.json",
      es: "translations/es.json",
      fr: "translations/fr.json"
    };
  },
  
  // Define stylesheets
  getStyles: function () {
    return ["MMM-VALORANT-BANNER.css"];
  },
  
  // Define scripts
  getScripts: function () {
    return [];
  },
  
  // Define Nunjucks template
  getTemplate: function () {
    return "templates/MMM-VALORANT-BANNER.njk";
  },
  
  // Define data that is sent to template
  getTemplateData: function () {
    return {
      config: this.config,
      matches: this.matches
    };
  },
  
  // Runs on initialization
  start: function () {
    Log.log(this.name + " is starting...");
    
    // Get initial API data
    this.getData();

    // Schedule update poll
    var self = this;
    setInterval(function () {
      self.getData();
    }, self.config.updateInterval * 60 * 1000); // ms
  },
  
  // Fetch data request is sent to node helper with provided parameters
  getData: function () {
    this.sendSocketNotification("MMM-VALORANT-BANNER-REQUEST-DATA", {
      apiKey: this.config.apiKey,
      leagueIds: this.config.leagueIds
    });
  },
  
  // Process schedule data
  getSchedulesData: function (data) {
    if (!data || !data.hasOwnProperty("data")) {
      return []; // Wrong league id most likely
    }
    if (!data["data"]["schedule"] || !data["data"]["schedule"]["events"]) {
      return []; // No events for league id
    }
    
    const events = data["data"]["schedule"]["events"];
    const now = new Date();
    
    // Separate past and future matches
    const pastMatches = [];
    const futureMatches = [];
    
    events.forEach((event) => {
      if (event.type !== "match") return;
      
      const startTime = new Date(event.startTime);
      
      // Check if match should be included based on team filter
      if (this.config.teamCodes && this.config.teamCodes.length > 0) {
        const team1Code = event.match.teams[0].code;
        const team2Code = event.match.teams[1].code;
        const hasTeam = this.config.teamCodes.includes(team1Code) || this.config.teamCodes.includes(team2Code);
        if (!hasTeam) return;
      }
      
      if (startTime <= now && event.state !== "inProgress") {
        pastMatches.push(event);
      } else {
        futureMatches.push(event);
      }
    });
    
    // Sort past matches by most recent first, take the configured number
    pastMatches.sort((a, b) => new Date(b.startTime) - new Date(a.startTime));
    const selectedPastMatches = pastMatches.slice(0, this.config.numberOfPastGames);
    
    // Sort future matches by earliest first, take the configured number
    futureMatches.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
    const selectedFutureMatches = futureMatches.slice(0, this.config.numberOfFutureGames);
    
    // Combine: past matches first (in reverse order for natural flow), then future
    const allMatches = [...selectedPastMatches.reverse(), ...selectedFutureMatches];
    
    // Enrich matches with formatted data
    this.matches = allMatches.map((event) => {
      return this.enrichMatch(event);
    });
    
    // Reset scroll index if it goes out of bounds
    if (this.matches.length === 0) {
      this.updateDom(500);
      return;
    }
    
    this.updateDom(500);
  },
  
  // Enrich match with formatted display data
  enrichMatch: function (event) {
    const startTimeDate = new Date(event.startTime);
    
    // Day of week
    const dayOfWeek = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
    event.displayDayOfWeek = this.translate(dayOfWeek[startTimeDate.getDay()]);
    
    // Is today/tomorrow
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (startTimeDate.toDateString() === today.toDateString()) {
      event.displayDayOfWeek = this.translate("TODAY");
    } else if (startTimeDate.toDateString() === tomorrow.toDateString()) {
      event.displayDayOfWeek = this.translate("TOMORROW");
    }
    
    // Time formatting
    let hours = startTimeDate.getHours();
    let minutes = startTimeDate.getMinutes();
    
    if (!this.config.use24HourTime) {
      event.displayPeriod = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
    }
    
    event.displayHour = String(hours).padStart(2, '0');
    event.displayMinute = String(minutes).padStart(2, '0');
    
    // Check if live
    event.isLive = event.state === "inProgress";
    
    // Check if finished
    event.isFinished = event.state === "completed";
    
    return event;
  },
  
  // Fetched data response is coming back from node helper
  socketNotificationReceived: function (notification, payload) {
    switch (notification) {
      case "MMM-VALORANT-BANNER-RECEIVE-DATA":
        {
          this.getSchedulesData(payload);
        }
        break;
      default: {
        break;
      }
    }
  },
  
  // Cleanup on stop
  stop: function() {
    // Cleanup if needed
  }
});
