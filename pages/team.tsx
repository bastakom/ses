import Image from 'next/image'
import { GetStaticProps } from 'next'
import { Team } from 'interfaces/team'
import { getTeams } from '@/graphql/PostTypes/teams'
import placeholder from '../assets/images/placeholder.jpeg'
import Link from 'next/link'
import { getOptions } from '@/graphql/Templates/FETCHOptions'

type Props = {
  teams?: Team[]
}

const Home: React.FC<Props> = ({ teams }) => {
  return (
    <div className="bg-white py-24 sm:py-32 mt-3">
      <div className="mx-auto grid max-w-7xl gap-y-20 gap-x-8 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Meet our leadership
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Libero fames augue nisl porttitor nisi, quis. Id ac elit
            odio vitae elementum enim vitae ullamcorper suspendisse.
          </p>
        </div>
        <ul
          role="list"
          className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
        >
          {teams.map((data) => {
            const ifTeam = data?.Team
            return (
              <Link href={`${data.uri}`} key={data.id}>
                <div className="flex items-center gap-x-6">
                  {ifTeam.portrait?.sourceUrl ? (
                    <Image
                      className="h-16 w-16 rounded-full"
                      src={`${ifTeam.portrait.sourceUrl}`}
                      width={100}
                      height={100}
                      alt=""
                      loading="lazy"
                    />
                  ) : (
                    <Image
                      className="h-16 w-16 rounded-full"
                      width={100}
                      height={100}
                      src={placeholder}
                      alt=""
                      loading="lazy"
                    />
                  )}
                  <div>
                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                      {data.title}
                    </h3>
                    <p className="text-sm font-semibold leading-6 text-grey-600">
                      {ifTeam.role}
                    </p>
                  </div>
                </div>
              </Link>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const options = await getOptions()
  const teams = await getTeams()

  return {
    props: {
      teams,
      options
    }
  }
}

export default Home
