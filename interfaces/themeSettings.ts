export interface ThemeSettings {
  contactInfo?: {
    phone: string
    email: string
    socials: Socials
  }
  logotype?: {
    id?: string
    uri?: string
  }
}

export interface GetThemeSettingsData {
  acfOptionsThemeSettings: {
    ThemeSettings: ThemeSettings
  }
}

export interface Socials {
  facebook?: string
  linkedin?: string
  fieldGroupName?: string
  instagram?: string
  twitter?: string
  vimeo?: string
  youtube?: string
}
