export interface GetPostsResponse {
  totalCount: number
  pageSize: number
  items: Item[]
  totalUsers: number
}

export interface GetPostsArgs {
  pageSize: number
}

export interface Item {
  id: number
  userName: string
  description: string
  location?: any
  images: Image[]
  createdAt: string
  updatedAt: string
  avatarOwner?: string
  ownerId: number
  owner: Owner
  likesCount: number
  isLiked: boolean
}

export interface Owner {
  firstName?: string
  lastName?: string
}

export interface Image {
  url: string
  width: number
  height: number
  fileSize: number
  createdAt: string
  uploadId: string
}

export interface GetUserProfileResponse {
  id: number
  userName: string
  firstName?: any
  lastName?: any
  city?: any
  dateOfBirth?: any
  aboutMe?: any
  createdAt: string
  avatars: any[]
}

export interface UpdateUserProfileArgs {
  userName: string
  firstName: string
  lastName: string
  city?: string
  dateOfBirth?: string
  aboutMe?: string
}
