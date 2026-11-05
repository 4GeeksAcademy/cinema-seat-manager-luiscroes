# Cinema Seat Manager

A seat reservation system for a small independent cinema with 8 rows and
10 seats per row, built in TypeScript. Staff can see which seats are taken,
reserve seats and quickly find two free seats together.

**Live website:** https://cinema-seat-manager-luiscroes.vercel.app/

## What it includes

- `src/cinema.ts`: the seat logic, shared by both versions
- `src/main.ts`: the console program, with four test scenarios
- `src/web.ts` and `index.html`: the optional web seat map (HTML and Tailwind)

## What it does

- Shows the room with row and column numbers: `X` is occupied, `L` is free
- Reserves a seat by row and column
- Counts occupied and available seats
- Finds the first two free seats next to each other in the same row

## How it behaves

- Seats are stored in a single two-dimensional array: `1` is occupied,
  `0` is free. The project uses no objects or classes.
- Every action shows a clear message, such as a confirmed reservation, a seat
  that is already taken, or adjacent seats found.
- Reserving an occupied seat fails, and the seat stays as it was.
- If no two seats are free together, the program says so.
- The console program tests four rooms: empty, partly occupied, almost full
  with only single seats left, and completely full.
- On the website, click a free seat to reserve it. **Buscar asientos
  contiguos** highlights the first free pair, and **Reiniciar sala** clears
  the room.
- Reservations are not saved, so reloading the website empties the room.

## Setup

Requires Node.js, or open the repository in GitHub Codespaces.

```bash
npm install
npm run console   # run the console program
npm run dev       # start the website on port 5173
npm run build     # create the production build
```
