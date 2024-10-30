import '@/styles/component/homepagecard/homepagecard.css'

const HomepageCard = (props) => {
  return (
    <div className='homepage_card'>
      <h3 className='content_heading'>{props?.name}</h3>
      <p className="content_text">{props?.text}</p>
    </div>
  )
}

export default HomepageCard