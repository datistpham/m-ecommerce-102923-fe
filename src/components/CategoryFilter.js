import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'

function CategoryFilter() {
  const navigate = useNavigate()
  const categories = ['all', 'Tivi', 'Tablet', 'Mobile', 'Laptop']
  const filterHandler = (category) => {
    if(category=== "all" ) {
      navigate("/")
      return
    }
    navigate('/?category=' + category)
  }

  return (
    <>
      {categories.map((category) => (
        <Button key={category} variant='outline-secondary' onClick={() => filterHandler(category)}>
          {(category === '' && 'Tất cả') || (category === 'Mobile' && 'Điện thoại') || category}
        </Button>
      ))}
    </>
  )
}

export default CategoryFilter
