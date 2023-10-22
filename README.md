## About The Project

This is a user interface to view, search, and save photos taken by
NASA&apos;s rovers on Mars, which are made public via the [Mars Rovers Photos API](https://api.nasa.gov/#mars-rover-photos), made with Next.js 13, React Server Components, Tailwind CSS, and TypeScript.

[View demo](https://space-is-cool.vercel.app/).

- **/latest-photos** and **/manifests** routes use react server components and [generateStaticParams with dynamic route segments](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes) to statically generate the dynamic segments at build time (SSG). The cached data in these static routes is [revalidated](https://nextjs.org/docs/app/building-your-application/data-fetching/revalidating#background-revalidation) once a day.
- **/search** route is a client component to search the photo database via the NASA api, and fetch and cache the photos using React Query.
- **/favourites** route displays photos that have been saved to local browser storage.
- **/manifests** route uses the [parallel data fetching pattern](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching#parallel-data-fetching) to avoid client-server waterfalls when fetching the data to generate the manifests table.
- **/photo/[id]** route is all client side to render interactive full-screen photos, either from local storage for favourites, or from the React Query cache for search results. As the **/latest-photos** route is statically generated at build time, if a user clicks a photo thumbnail, React Query will fetch and cache all the rover's latest photos on the client at runtime to display them in the **/photo/[id]** route. The NASA API does not allow fetching individual photos by id. This means the first full-screen latest photo will load a little slower, and then all the rover's full-screen latest photos will be cached.  
- **TODO**: statically generate the full-screen latest photos, as there are not that many.

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

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fjames-langridge%2Fspace-is-cool&env=NEXT_PUBLIC_API_KEY,NEXT_PUBLIC_BASE_URL&envDescription=API%20keys%20needed%20for%20the%20application.&envLink=https%3A%2F%2Fgithub.com%2Fjames-langridge%2Fspace-is-cool%23readme)

See the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## License

Code distributed under the [MIT License](https://github.com/james-langridge/space-is-cool/blob/main/LICENSE).
