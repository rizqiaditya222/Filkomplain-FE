'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import IconProvider from './common/IconProvider';

type Laporan = {
  Username: string;
  Title: string;
  Description: string;
  Location: string;
  Phone: string;
  Status?: string;
};

type Props = {
  data: Laporan[];
  itemsPerPage?: number;
  filterStatus?: string;
};

export default function Table({ data, itemsPerPage = 8, filterStatus }: Props) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = data
    .filter((item) =>
      !filterStatus || item.Status === filterStatus
    )
    .filter((item) =>
      item.Username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="flex justify-end mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Cari laporan..."
            className="pl-10 px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#16C098]"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          <IconProvider 
            icon="MagnifyingGlassIcon" 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
          />
        </div>
      </div>

      <table className="w-full text-left text-sm text-gray-500 font-satoshi">
        <thead className="text-gray-400 border-b">
          <tr className="border-b border-[#E0E0E0]">
            <th className="pb-4">Nama Pengguna</th>
            <th className="pb-4">Judul</th>
            <th className="pb-4">Deskripsi</th>
            <th className="pb-4">Lokasi</th>
            <th className="pb-4">Phone Number</th>
          </tr>
        </thead>
        <tbody className="text-black font-medium font-satoshi">
          {currentItems.map((item, idx) => (
            <tr
              key={idx}
              onClick={() => router.push(`all/${indexOfFirstItem + idx}`)}
              className="border-b border-[#E0E0E0] cursor-pointer hover:bg-gray-50"
            >
              <td className="py-7">{item.Username}</td>
              <td>{item.Title}</td>
              <td>{item.Description}</td>
              <td>{item.Location}</td>
              <td>{item.Phone}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-gray-500 flex items-center">
            <IconProvider icon="DocumentTextIcon" className="w-4 h-4 mr-1" />
            Menampilkan {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredData.length)} dari {filteredData.length} laporan
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md flex items-center ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <IconProvider icon="ChevronLeftIcon" className="w-4 h-4 mr-1" />
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === number
                    ? "bg-[#16C098] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {number}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md flex items-center ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Next
              <IconProvider icon="ChevronRightIcon" className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
