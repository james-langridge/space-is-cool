import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="bg-white dark:bg-gray-900 ">
      <div className="container mx-auto min-h-screen px-6 py-12 lg:flex lg:items-center lg:gap-12">
        <div className="w-full lg:w-1/2">
          <p className="text-sm font-medium text-blue-500 dark:text-blue-400">
            404 error
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
            Lost in space
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            These are not the droids you are looking for...
          </p>
          <Link href={'/'}>
            <button className="mt-4 flex transform items-center rounded-lg bg-blue-600 px-4 py-2 font-medium tracking-wide text-white transition-colors duration-300 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
              Take me home.
            </button>
          </Link>
        </div>

        <div className="relative mt-8 w-full lg:mt-0 lg:w-1/2">
          <Image
            className=" h-80 w-full rounded-lg object-cover md:h-96 lg:h-[32rem] "
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
