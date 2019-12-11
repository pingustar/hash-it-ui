export interface UserInfo {
  username: string
  favorites: string[]
  created_at: Date
}

export interface ChatInfo {
  chat: string
  owner: string[]
  logo_url: string
  description: string
  created_at: Date
}
