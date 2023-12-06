import React from 'react'
import {useLocation, useParams} from 'react-router-dom'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  const location = useLocation()
  const params= useParams()
  const category = params.category

  const redirectUrl = (x) => {
    if (isAdmin) {
      if (keyword) {
        return `/admin/products/search/${keyword}/page/${x + 1}`
      } else {
        return `/admin/products/page/${x + 1}`
      }
    } else {
      if (keyword) {
        if(category ) {
          return `/search/${keyword}/page/${x + 1}/${category}`
        }
        return `/search/${keyword}/page/${x + 1}`

      } else {
        if(category ) {
          return `/page/${x + 1}${`${category}`}`
        }
        
        return `/page/${x + 1}${``}`
      }
    }
  }

  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={redirectUrl(x)}
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  )
}

export default Paginate