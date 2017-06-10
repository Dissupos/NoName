import { findWithRegex } from './findWithRegex'

export const hashtagStrategy = (contentBlock, callback, contentState) => {
  findWithRegex(/#[\w\u0590-\u05ff]+/g, contentBlock, callback)
}

export const urlStrategy = (contentBlock, callback, contentState) => {
  findWithRegex(
    (new RegExp('(http|ftp|https)://[\\w-]+(\\.[\\w-]+)+([\\w-.,@?^=%&:/~+#-]*[\\w@?^=%&;/~+#-])?', 'g')),
    contentBlock,
    callback
  )
}
