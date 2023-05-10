import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="bg-white dark:bg-gray-900 ">
      <div className="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
        <div className="wf-ull lg:w-1/2">
          <p className="text-sm font-medium text-blue-500 dark:text-blue-400">
            404 error
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
            Page not found
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            Sorry, the page you are looking for doesn&apos;t exist.
          </p>

          <div className="flex items-center mt-6 gap-x-3">
            <Link href={'/latest-photos'}>
              <button className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                Take me home
              </button>
            </Link>
          </div>
        </div>

        <div className="relative w-full mt-8 lg:w-1/2 lg:mt-0">
          <Image
            className=" w-full lg:h-[32rem] h-80 md:h-96 rounded-lg object-cover "
            src="/lost-in-space.png"
            alt="Lost in space"
            width={1920}
            height={1920}
          />
        </div>
      </div>
    </section>
  )
}
