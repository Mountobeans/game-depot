import {useState} from 'react'



const CrossWordCell = ({children, occupiedAll, index, firstCoordsArry}) => {

  // className = '{innerText == 0 ? blue : ''}'

  // ${innerText == 0 ? 'blue' : ''}

  const changeChildren = (e) => {
    console.log (e)
}
  

  return (
       <div 
                    style = {{fontSize: "12px"}}
                    onClick = {(e) => changeChildren(e)} 
                    className = {`${firstCoordsArry[index]} ${occupiedAll.includes(index) ? "" : 'invis'} cw-cell `}>
          {children}
       </div>
  )
}

export default CrossWordCell