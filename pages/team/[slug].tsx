import { GetStaticPaths, GetStaticProps } from 'next'
import { gql } from '@apollo/client'
import client from '@/lib/apollo-client'
import { Team } from 'interfaces/team'
import { getThemeSettings } from '@/graphql/Settings/themeSettings'
import { getOptions } from '@/graphql/Templates/FETCHOptions'

type Props = {
  team?: Team
}

const TeamPage: React.FC<Props> = ({ team }) => {
  return (
    <div
      key={team.id}
      className="container mx-auto flex flex-col items-center gap-20 mt-20"
    >
      <div className="">
        <h2 className="text-center text-6xl  uppercase">
          {team.title}
        </h2>
      </div>
      <div className="max-w-md p-1">
        <p>{team.Team.description}</p>
        <div className="pt-10">
          <p>{team.Team.email}</p>
          <p>{team.Team.phone}</p>
        </div>
      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query({
    query: gql`
      query GetTeamSlugs {
        teams {
          nodes {
            slug
          }
        }
      }
    `
  })

  const paths = data.teams.nodes.map((team: Team) => ({
    params: { slug: team.slug }
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<Props> = async ({
  params
}) => {
  const options = await getOptions()
  const ThemeSettings = await getThemeSettings()
  const { data } = await client.query({
    query: gql`
      query GetTeamBySlug($slug: String!) {
        teamBy(slug: $slug) {
          title
          id
          Team {
            description
            email
            phone
          }
        }
      }
    `,

    variables: { slug: params?.slug }
  })

  return {
    props: {
      team: data?.teamBy,
      options,
      allSettings: ThemeSettings?.props
    }
  }
}

export default TeamPage
