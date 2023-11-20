import { allBlogs } from 'contentlayer/generated'

type Writing = {
  date: string
  publisher: string
  title: string
  description: string
  views: string
  comments: string
  url: string
  cover: string
  category: string
  author: string
  avatar: string
  external: boolean
  publisherUrl: string
}

const originals = allBlogs.map<Writing>((a) => ({
  date: a.publishedAt,
  publisher: '',
  title: a.title,
  description: a.description,
  views: '2300',
  comments: '26',
  url: `/blog/${a.slug}`,
  cover: a.cover,
  category: a.category,
  author: 'Mburu Warui',
  avatar: '/optimized/raw/portrait-sm.png',
  external: false,
  publisherUrl: '',
}))

const articles = originals
  .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))

export default articles
