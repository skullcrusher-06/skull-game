# Random Joke Generator

A fun and interactive random joke generator built with HTML, CSS, and JavaScript. The app fetches jokes from the free JokeAPI and displays them with a beautiful, modern UI.

## Features

- 🎭 **Multiple Joke Types**
  - General jokes
  - Programming jokes
  - Knock-knock jokes

- 📋 **Copy to Clipboard** - Easily share your favorite jokes
- 📊 **Joke Counter** - Track how many jokes you've loaded (persisted in localStorage)
- 🎨 **Beautiful UI** - Modern gradient design with smooth animations
- 📱 **Responsive Design** - Works perfectly on desktop and mobile devices
- ⚡ **Loading State** - Visual feedback while fetching jokes
- 🔔 **Toast Notifications** - Feedback messages for user actions

## How to Use

1. Open `joke-generator.html` in your web browser
2. Select your preferred joke type from the dropdown
3. Click "Get Joke" to fetch a random joke
4. Click "Copy Joke" to copy the joke to your clipboard
5. The joke counter at the bottom tracks how many jokes you've viewed

## API Used

This application uses the free **JokeAPI** (https://jokeapi.dev/)

### API Endpoints:
- General jokes: `https://v2.jokeapi.dev/joke/Any`
- Programming jokes: `https://v2.jokeapi.dev/joke/Programming`
- Knock-Knock jokes: `https://v2.jokeapi.dev/joke/Knock-Knock`

## Technical Details

### Technologies Used:
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with gradients and animations
- **JavaScript (ES6+)** - Async/await for API calls, DOM manipulation
- **Fetch API** - For making HTTP requests
- **LocalStorage API** - For persisting joke counter

### Key Features:
- Error handling for failed API requests
- NSFW content filtering
- Support for both single-line and two-part jokes
- Smooth animations and transitions
- Mobile-responsive design

## Files

- `joke-generator.html` - Main HTML file
- `joke-style.css` - Styling and animations
- `joke-script.js` - JavaScript logic and API integration
- `README-JOKE.md` - This file

## Customization

You can easily customize this project:

1. **Change colors** - Edit the gradient colors in `joke-style.css`
2. **Add more joke categories** - Add new API endpoints to the `APIs` object in `joke-script.js`
3. **Modify animations** - Adjust CSS animations for different visual effects
4. **Change fonts** - Update the font-family in the CSS file

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

Free to use and modify for personal or commercial projects.

## Credits

- Jokes provided by [JokeAPI](https://jokeapi.dev/)
- Icons/emojis from Unicode
