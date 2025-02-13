export interface Vijest {
    id?: string
    title: string
    content: string
    summary: string
    slug?: string
    author: string
    pictureUrl: string
    category: string
    publishedDate: string
    views: number
    isFeatured: boolean
    tags: string[]
  }