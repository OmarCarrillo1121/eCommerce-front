import React from 'react'
import Style from './PaginatesSlide.module.css'
import { usePaginatePerPage } from '../../../util/hook/games/usePaginate'

const PaginatesSlide = ({currentPage, setCurrentPage, totalPages}) => {
    const { paginates } = usePaginatePerPage(currentPage, totalPages, setCurrentPage)
    return (
      <div className={Style.paginate_list}>
        {paginates?.map((p) => {
          return p !== null && (
          <h2 key={p} 
          className={`${p === currentPage 
          ? Style.paginate_list_current
          : Style.paginate_list_select}`}
          onClick={() => setCurrentPage(p)}>{p}</h2>
          )
        })}
          <h2 className={Style.paginate_list_total}
          onClick={() => setCurrentPage(totalPages)}>...<span>{totalPages}</span></h2>
      </div>
    )
  }

export default PaginatesSlide