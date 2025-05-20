'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { dummyData } from './dummyData';

interface Laporan {
  Username: string;
  Title: string;
  Description: string;
  Location: string;
  Phone: string;
  Status: string;
}

const data: Laporan[] = dummyData;

function getStatusStyle(status: string) {
  switch (status) {
    case 'Selesai':
      return 'bg-[#a6e7d8] text-[#048464] border border-[#048464]';
    case 'Diajukan':
      return 'bg-[#fccccc] text-[#de1010] border border-[#de1010]';
    case 'Diproses':
      return 'bg-[#fbd3b4] text-[#e88c22] border border-[#e88c22]';
    case 'Active':
      return 'bg-[#a6e7d8] text-[#048464] border border-[#048464]';
    default:
      return '';
  }
}

export default function All() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortStatus, setSortStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredData = data.filter((item) => {
    const matchesSearch =
      item.Username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      sortStatus === 'Semua' || sortStatus === ''
        ? true
        : item.Status === sortStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col h-full px-20 py-10">
      <p className="text-2xl font-bold text-black mb-10">Hello User</p>

      <div className="bg-white w-full h-full py-10 px-10 shadow-xl rounded-2xl">
        <div className="flex flex-row justify-between items-center pb-10">
          <div className="flex-col">
            <p className="text-2xl font-bold text-black mb-2">Semua Laporan</p>
            <p className="text-[#16C098]">Detail Laporan</p>
          </div>

          <div className="flex flex-row gap-4">
            <input
              type="text"
              placeholder="Cari laporan..."
              className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#16C098]"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            <select
              className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#16C098]"
              value={sortStatus}
              onChange={(e) => {
                setSortStatus(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="" disabled hidden>
                Urutkan
              </option>
              <option value="Semua">Semua</option>
              <option value="Selesai">Selesai</option>
              <option value="Diproses">Diproses</option>
              <option value="Diajukan">Diajukan</option>
              <option value="Active">Active</option>
            </select>
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
              <th className="pb-4">Status</th>
            </tr>
          </thead>
          <tbody className="text-black font-medium font-satoshi">
            {currentItems.map((item, idx) => (
              <tr
                key={idx}
                className="border-b border-[#E0E0E0] cursor-pointer hover:bg-gray-50"
                onClick={() => router.push(`all/${indexOfFirstItem + idx}`)}
              >
                <td className="py-7">{item.Username}</td>
                <td>{item.Title}</td>
                <td>{item.Description}</td>
                <td>{item.Location}</td>
                <td>{item.Phone}</td>
                <td>
                  <span
                    className={`w-20 h-8 flex justify-center items-center rounded-[5px] text-sm font-semibold ${getStatusStyle(
                      item.Status
                    )}`}
                  >
                    {item.Status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-6">
            <div className="text-sm text-gray-500">
              Menampilkan {indexOfFirstItem + 1} -{' '}
              {Math.min(indexOfLastItem, filteredData.length)} dari{' '}
              {filteredData.length} laporan
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === number
                        ? 'bg-[#16C098] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {number}
                  </button>
                )
              )}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-md ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
