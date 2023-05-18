## About The Project

This is a user interface to view, search, and save photos taken by
NASA&apos;s rovers on Mars, which are made public via the [Mars Rovers Photos API](https://api.nasa.gov/#mars-rover-photos), made with Next.js 13, React Server Components, React Query, Tailwind CSS, and TypeScript.

[View demo](https://space-is-cool.vercel.app/).

- **/latest-photos** and **/manifests** routes use react server components and [generateStaticParams with dynamic route segments](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes) to statically generate the dynamic segments at build time (SSG). The cached data in these static routes is [revalidated](https://nextjs.org/docs/app/building-your-application/data-fetching/revalidating#background-revalidation) once a day.
- **/search** route is a client component to search the photo database via the NASA api, and fetch and cache the photos using React Query.
- **/favourites** route displays photos that have been saved to local browser storage.
- **/manifests** route uses the [parallel data fetching pattern](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching#parallel-data-fetching) to avoid client-server waterfalls when fetching the data to generate the manifests table.

## Screenshots from mobile device

![home_screenshot](public/home.PNG) ![latest_screenshot](public/latest.PNG) ![search_screenshot](public/search.PNG)

![favourites_screenshot](public/favs.PNG) ![full_size_screenshot](public/full.PNG) ![photo_info_screenshot](public/info.PNG)


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

3. Copy `.env.example` to `.env.local` and add your API key.
    ```sh
    cp .env.example .env.local
    ```

6. Start the development server:
    ```sh
    npm run dev
    ```

## Deploy your own

You can clone and deploy this project on Vercel using the button below.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fjames-langridge%2Fspace-is-cool&env=NEXT_PUBLIC_API_KEY,NEXT_PUBLIC_BASE_URL&envDescription=API%20keys%20needed%20for%20the%20application.&envLink=https%3A%2F%2Fgithub.com%2Fjames-langridge%2Fspace-is-cool%23readme)

See the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## License

Code distributed under the [MIT License](https://github.com/james-langridge/space-is-cool/blob/main/LICENSE).
