import Image from 'next/image'

export default function NotFound() {
  return (
    <section className="bg-white dark:bg-gray-900 ">
      <div className="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
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
          {/*TODO: get Link or button back to home working*/}
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
