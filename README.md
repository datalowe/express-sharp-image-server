# Simple image server using Express and sharp

This is a project for running a very simple [Express](https://expressjs.com/) image server, which enables resizing and compression of images with [sharp](https://sharp.pixelplumbing.com/). It only returns webp-formatted images, though modifying this would require small changes to the code.

## Run

```sh
npm install
npm run start
```

In e.g. a browser, visit `localhost:3000/image`, providing `filebase`, `width`, `height` and `quality` query parameters, say `http://localhost:3000/image?filebase=programmer_with_screens&width=1200&height=700&quality=60`.

## Preexisting images

All images have Creative Commons or similar licenses. If you plan on using them yourselves, please check the individual images' licenses and attribute the original sources if possible.

- flaticon cap (used for "logo.png"): https://www.flaticon.com/free-icons/cap
- Photos
  - Programmer by whiteboard: https://pixabay.com/de/photos/frau-arbeit-b%C3%BCro-whiteboard-4702060/
  - Programmer at computer: https://pixabay.com/de/photos/frau-computers-b%C3%BCro-arbeiten-5653501/
  - Code on screen: https://www.pexels.com/photo/html-270366/
- Logos
  - Docker: https://logos-world.net/wp-content/uploads/2021/02/Docker-Emblem.png
  - Angular: https://freebiesupply.com/logos/angular-logo/
  - WebAssembly: https://seeklogo.com/vector-logo/411853/webassembly
  - Rust: https://commons.wikimedia.org/wiki/File:Rust_programming_language_black_logo.svg
  - Django: https://creazilla.com/nodes/3253694-django-icon
