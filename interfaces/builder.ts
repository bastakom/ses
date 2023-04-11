export interface BuilderType {
  __typename: string
  id: string
  settings: {
    /* Cover / Video */
    coverHeight: number
    justifyContent: string
    contentNoContent: number
    imageVideo: number
  }

  /* Image Text */
  settingsImageText: {
    textRightTextLeft: string
  }

  image?: {
    sourceUrl: string
  }
  video?: {
    mediaItemUrl: string
  }
  title: string
  presentationInfo: string
  subtitle: string
  textRightTextLeft: string
  text: string
  context: {
    title: string
    button: { title: string; url: string }
  }
  altText: string

  // Accordion
  tables: {
    content: string
    titleButton: [
      {
        title: string
        link: { button: { title: string; url: string } }
      }
    ]
  }


  // column
  chooseHowManyColumns: number
}
