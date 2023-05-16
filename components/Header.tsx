export default function Header({string}: {string: string}) {
  const words = string.split(' ')

  return (
    <section className="min-h-full w-full">
      <div className="container relative mx-auto flex flex-col px-5 pt-5 ">
        <section className="flex flex-1 items-center">
          <h1 className="text-center text-5xl font-extrabold lg:text-7xl flex w-full flex-wrap justify-center">
            <span className="bg-gradient-to-br from-teal-500 via-indigo-500 to-sky-500 bg-clip-text text-transparent dark:from-teal-200 dark:via-indigo-300 dark:to-sky-500">
              {words[0]}
            </span>
            {words[1] && (
              <span className="bg-gradient-to-tr from-blue-500 via-pink-500 to-red-500 bg-clip-text text-transparent dark:from-sky-300 dark:via-pink-300 dark:to-red-500">
                {words[1]}
              </span>
            )}
          </h1>
        </section>
      </div>
    </section>
  )
}
