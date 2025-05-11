// components/ReportTable.tsx
'use client'

import React from 'react';

type Laporan = {
  Username: string;
  Title: string;
  Description: string;
  Location: string;
  Phone: string;
};

type Props = {
  data: Laporan[];
};

export default function Table({ data }: Props) {
  return (
    <table className="w-full text-left text-sm text-gray-500 font-Satoshi">
      <thead className="text-gray-400 border-b">
        <tr className="border-b border-[#E0E0E0]">
          <th className="pb-4">Nama Pengguna</th>
          <th className="pb-4">Judul</th>
          <th className="pb-4">Deskripsi</th>
          <th className="pb-4">Lokasi</th>
          <th className="pb-4">Phone Number</th>
        </tr>
      </thead>
      <tbody className="text-black font-medium font-Satoshi">
        {data.map((item, idx) => (
          <tr key={idx} className="border-b border-[#E0E0E0]">
            <td className="py-7">{item.Username}</td>
            <td>{item.Title}</td>
            <td>{item.Description}</td>
            <td>{item.Location}</td>
            <td>{item.Phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
