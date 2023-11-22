import style from './pagination.module.css'

function Pagination(props) {
    const { totalUsers, currentPage, pageSize, onPageChange} = props
    const totalPages = Math.ceil(totalUsers/pageSize)

    const handlePageChange = (newPage) => {
        if (newPage >=1 && newPage <= totalPages) {
            onPageChange(newPage)
        }
    }

    const prev = "<"
    const next = ">"

    return (  
        <div className={style.containerPages}>
            <button 
                onClick={() => handlePageChange(currentPage - 1)} 
                disabled={currentPage === 1}
            >
                {prev}
            </button>
            {totalPages > 1 ? <small>{currentPage} of {totalPages}</small> : null}
            <button 
                onClick={() => handlePageChange(currentPage + 1)} 
                disabled={currentPage === totalPages}
            >
                {next}
            </button>
        </div>
    );
}

export default Pagination;