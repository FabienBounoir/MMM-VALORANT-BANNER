/*
 *
 * MagicMirror Module: MMM-VALORANT-BANNER
 *
 * Author: FabienBounoir
 * License: MIT
 *
 * Node Helper:
 */

var NodeHelper = require("node_helper");
const https = require("https");

module.exports = NodeHelper.create({
  // Override socketNotificationReceived method.
  socketNotificationReceived: function (notification, payload) {
    let self = this;
    switch (notification) {
      case "MMM-VALORANT-BANNER-REQUEST-DATA":
        {
          const options = {
            hostname: "esports-api.service.valorantesports.com",
            port: 443,
            path: `/persisted/val/getSchedule?hl=en-US&sport=val&leagueId=${payload.leagueIds}`,
            method: "GET",
            rejectUnauthorized: false,
            headers: {
              "x-api-key": payload.apiKey
            }
          };
          
          const request = https.request(options, (res) => {
            const body = [];
            res.on("data", (chunk) => {
              body.push(chunk);
            });
            res.on("end", () => {
              try {
                const data = JSON.parse(Buffer.concat(body).toString());
                // Success - send data back to global module
                self.sendSocketNotification(
                  "MMM-VALORANT-BANNER-RECEIVE-DATA",
                  data
                );
              } catch (e) {
                console.error("Error parsing API response:", e);
                // Error - send null back to global module
                self.sendSocketNotification(
                  "MMM-VALORANT-BANNER-RECEIVE-DATA",
                  null
                );
              }
            });
          });
          
          request.on("error", (error) => {
            console.error("API request error:", error);
            // Error - send null back to global module
            self.sendSocketNotification(
              "MMM-VALORANT-BANNER-RECEIVE-DATA",
              null
            );
          });

          request.end();
        }
        break;
      default: {
        break;
      }
    }
  }
});
