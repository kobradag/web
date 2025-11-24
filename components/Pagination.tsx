"use client"

import { Button } from "@/components/ui/button"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex justify-center items-center space-x-4 mt-6">
      <Button
        variant="default"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-gray-800 hover:bg-gray-700 text-white font-medium px-4 py-2"
      >
        Previous
      </Button>
      <span className="text-white bg-gray-900 px-4 py-2 rounded-md">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        variant="default"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="bg-gray-800 hover:bg-gray-700 text-white font-medium px-4 py-2"
      >
        Next
      </Button>
    </div>
  )
}
