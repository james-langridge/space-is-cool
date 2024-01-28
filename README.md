## About The Project

This is a user interface to view, search, and save photos taken by
NASA&apos;s rovers on Mars, which are made public via the [Mars Rovers Photos API](https://api.nasa.gov/#mars-rover-photos), made with Next.js 14 (App Router), React Server Components, Tailwind CSS, and TypeScript.
## Routes
┌ ○ /  
├ ○ /favourites  
├ λ /manifests  
├ λ /manifests/[rover]  
├ λ /manifests/[rover]/photos  
├ λ /photo/[id]  
├ λ /photo/favourites  
├ ○ /search  
├ λ /search/[rover]  
├ λ /search/[rover]/[date]  
└ λ /search/[rover]/[date]/[camera]

○  (Static)   prerendered as static content  
λ  (Dynamic)  server-rendered on demand using Node.js

[View demo](https://space-is-cool.vercel.app/).

## Screenshots from mobile device

<img src="public/search-form.PNG" width="31%" height="auto" alt="Search form screenshot">&nbsp;
<img src="public/search-results.PNG" width="31%" height="auto" alt="Search results screenshot">&nbsp;
<img src="public/full.PNG" width="31%" height="auto" alt="Full size photo screenshot">
<br>
<img src="public/info.PNG" width="31%" height="auto" alt="Photo info screenshot">&nbsp;
<img src="public/manifest-summary.PNG" width="31%" height="auto" alt="Rover manifest summary">&nbsp;
<img src="public/manifest-full.PNG" width="31%" height="auto" alt="Rover manifest full">

## Run it locally

### Prerequisites

- Get a [NASA developer key](https://api.nasa.gov/#signUp).

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/james-langridge/space-is-cool.git
   ```

2. Install NPM packages
   ```sh
   npm install
   ```

3. Copy `.env.local.example` to `.env.local` and add your API key.
    ```sh
    cp .env.local.example .env.local
    ```

6. Start the development server:
    ```sh
    npm run dev
    ```

## Deploy your own

You can clone and deploy this project on Vercel using the button below.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fjames-langridge%2Fspace-is-cool&env=NASA_API_KEY,NASA_BASE_URL&envDescription=API%20key%20and%20base%20url%20for%20NASA%20photos&envLink=https%3A%2F%2Fgithub.com%2Fjames-langridge%2Fspace-is-cool%23run-it-locally&demo-title=Space%20is%20Cool&demo-description=A%20UI%20to%20view%2C%20search%2C%20and%20save%20photos%20taken%20by%20NASA's%20rovers%20on%20Mars.&demo-url=https%3A%2F%2Fspace-is-cool.vercel.app%2F&demo-image=https%3A%2F%2Fspace-is-cool.vercel.app%2Fsearch.PNG)

See the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## License

Code distributed under the [MIT License](https://github.com/james-langridge/space-is-cool/blob/main/LICENSE).
