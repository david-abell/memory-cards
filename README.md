# Memory card game built with Vite.js, React, and Typescript

See it live at []()

## Project goals

- Build a grid of card pairs with numbers hidden face down. Cards can be clicked to reveal the hidden number. If two cards are revealed and they match, they are removed from the grid. Else, they are hidden again.

## Technology used

- Vite.js
- React.js
- Typescript
- CSS modules
- EsLint
- Prettier

## Lessons learned/ problems encountered

- Animations were a good reminder of Z index is affected by CSS stacking context. Because the card animation is not performed on the outermost card element, there is now way to define that the animated card should be on top of other animated cards. Instead, cards earlier in the board will be underneath those farther down on the grid.
- I had stale state problems with the new game feature until I remembered that a rerender could be easily forced by defining the card grid with a key prop so that React could tell that new game would trigger a new component.

## Installation

```
npm install
```

## Available scripts

```
npm run dev
npm run build
npm run preview
```

## Credits

Inspiration for the project came from [Front end eval Memory Game project](https://frontendeval.com/questions/memory-game?tab=question)
