export interface GifDTO {
  id: string
  type: string
  slug: string
  giphyUrl: string
  title: string
  source_tld: string
  source_post_url: string
  import_datetime: string
  username: string
  images: {
    original: {
      width: number
      height: number
      url: string
    }
    small: {
      width: number
      height: number
      url: string
    }
  }
  user?: UserDTO
  tags: string[]
}

interface UserDTO {
  avatar_url: string
  banner_image: string
  banner_url: string
  profile_url: string
  username: string
  display_name: string
  is_verified: boolean
}
