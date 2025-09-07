User Guide: Modern Web-Based Pong Game

1. Getting Started
This modern Pong game, built with HTML5 Canvas, CSS, and JavaScript, features single-player gameplay against an AI with adjustable difficulty, neon visuals, high score tracking, and pause/play functionality. It meets Unicaf’s Project 2 requirements, serving as an educational tool for game development, AI, and web technologies.

2. System Requirements
•	Browser: Chrome, Firefox, MicrosoftEdge.
•	OS: Any supporting these browsers (Windows, macOS, Linux).
•	Hardware: Computer with keyboard.
•	Internet: Optional; runs offline locally.
•	Resolution: 800x600+ recommended.

3. Installation and Setup
Local Setup
1.	Download index.html, style.css, and game.js into one folder.
2.	Open index.html in a browser or use a local server: 
o	Install Node.js (nodejs.org).
o	Run npx http-server -p 8080 in the folder.
o	Access at http://localhost:8080.

Online Hosting
1.	Upload files to GitHub Pages.
2.	Enable Pages in repository settings.
3.	Access via the provided URL.
   
4. Usage
•	Start: Select difficulty (Easy, Medium, Hard) from the menu.
•	Gameplay: Hit the ball past the AI’s paddle to score; block the AI’s shots.
•	Controls: 
  o	Arrow Up/Down: Move paddle.
  o	Spacebar or Pause/Play button: Toggle pause.
•	Goal: Achieve a high score, tracked via localStorage.
•	End: Close tab or refresh to restart.

5. Features
•	AI Opponent: Tracks ball at speeds: Easy (1 pixel/frame), Medium (2 pixels/frame), Hard (3 pixels/frame).
•	Neon Styling: Cyan paddles, magenta ball, glowing effects.
•	High Score: Persists via localStorage, shown top-right.
•	Pause/Play: Toggle with Spacebar/button.
•	Compatibility: Runs on Chrome, Firefox, Edge.
•	Deferred: Sound effects planned for future updates.

6. Troubleshooting
•	Game Not Loading: Ensure files are in one folder; try local server.
•	Lags: Update browser; enable hardware acceleration (Firefox: about:config > layers.acceleration.force-enabled = true).
•	Collision Issues: Refresh page; optimized for most devices.
•	No AI Movement: Select difficulty first.
•	High Score Not Saving: Check localStorage settings.
•	Try another browser if issues persist.

7. Educational Notes
•	Explore game loops, collision detection, AI, and web APIs.
•	Source code in Appendices for study or modification (e.g., adjust AI speeds).

8. Credits
•	Developed for Unicaf Computer Science project.
•	Tools: VS Code, Node.js, Google Fonts (Orbitron).
•	References: Gregory (2014), Freedman (2018), W3C (2014), Russell & Norvig (2020).
