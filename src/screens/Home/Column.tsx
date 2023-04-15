import React from 'react'

const Column: React.FC = (props) => {
  console.log(props)
  return (
    <div>
      <div {...props}>ADD NEW LANE</div>
    </div>
  )
}

export default Column
