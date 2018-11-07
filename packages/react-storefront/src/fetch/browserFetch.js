
import fetch from 'isomorphic-unfetch'

export default function browserFetch(path) {
  if (window.moov) {
    const version = encodeURIComponent(window.moov.appVersion)
    path = path.indexOf('?') === -1 ? `${path}?${version}` : `${path}&${version}`
  }
}