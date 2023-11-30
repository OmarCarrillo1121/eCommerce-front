import { useState, useEffect } from "react";

export const usePaginate = (totalCountries) => {
    const [currentPage, setCurrentPage] = useState(1)
    const countriesPerPage = 8  
    const totalPages = Math.ceil(totalCountries?.length / 8)
    const lastIndex = currentPage * countriesPerPage
    const firstIndex = lastIndex - countriesPerPage
    return { firstIndex, lastIndex, currentPage, totalPages, setCurrentPage }
}

export const usePaginatePerPage = (currentPage, totalPages, setCurrentPage)  => {
    const [paginates, setPaginates] = useState([])
    const previous = currentPage > 1 ? currentPage - 1 : null;
    const next = totalPages > currentPage ?  currentPage + 1 : null;

    useEffect(() => {
        setPaginates([previous, currentPage ,next])
        if (currentPage > totalPages) setCurrentPage(totalPages)
        if (totalPages === 0) return
        else if (currentPage === 0) setCurrentPage(1)
    },[currentPage, totalPages, setCurrentPage, previous, next])

    return { paginates }
}