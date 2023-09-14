import dayjs from 'dayjs'
export default function Date({ dateString }) {
  const date = dayjs(dateString).format('MMM D, YYYY')
  return <time dateTime={dateString}>{date}</time>
}
