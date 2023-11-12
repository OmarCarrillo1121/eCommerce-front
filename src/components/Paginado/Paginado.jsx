import React from 'react'
import Style from './paginate.module.css'
import PaginatesSlide from './paginatesSlide/PaginatesSlide'

export default function Paginate ({currentPage, setCurrentPage, totalPages}) {
  return (
    <div className={Style.paginate}>
      {currentPage === 1 || currentPage === 0
      ? <button disabled className={Style.prev}>{'<'}</button> 
      : <button 
          className={Style.prev} 
          onClick={() => setCurrentPage(currentPage - 1)}>{'<'}</button>}
        <PaginatesSlide 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}/>
        {currentPage === totalPages 
        ? <button disabled className={Style.next}>{'>'}</button>
        : <button className={Style.next} 
          onClick={() => setCurrentPage(currentPage + 1)}>{'>'}</button>}
    </div>
    )
}