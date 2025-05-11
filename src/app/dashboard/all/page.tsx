'use client'

import React, { useState } from 'react';

const data: Laporan[] = [
    {
        Username: "Wir Wir Wir Jawir",
        Title: "Ada anomali",
        Description: "Anomali meses..",
        Location: "Toilet Mushola",
        Phone: "08123456789",
        Status: "Selesai",
    },
    {
        Username: "Bagasnegro",
        Title: "Ada anomali",
        Description: "Anomali meses..",
        Location: "Toilet Mushola",
        Phone: "08123456789",
        Status: "Diajukan",
    },
    {
        Username: "Murtadlo",
        Title: "Ada anomali",
        Description: "Anomali meses..",
        Location: "Toilet Mushola",
        Phone: "08123456789",
        Status: "Diproses",
    },
    {
        Username: "Wir Wir Wir Jawir",
        Title: "Ada anomali",
        Description: "Anomali meses..",
        Location: "Toilet Mushola",
        Phone: "08123456789",
        Status: "Active",
    },
];

function getStatusStyle(status: string) {
    switch (status) {
        case "Selesai":
            return "bg-[#a6e7d8] text-[#048464] border border-[#048464]";
        case "Diajukan":
            return "bg-[#fccccc] text-[#de1010] border border-[#de1010]";
        case "Diproses":
            return "bg-[#fbd3b4] text-[#e88c22] border border-[#e88c22]";
        case "Active":
            return "bg-[#a6e7d8] text-[#048464] border border-[#048464]";
        default:
            return "";
    }
}

export default function All() {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortStatus, setSortStatus] = useState('');

    const filteredData = data.filter((item) => {
        const matchesSearch = item.Username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              item.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              item.Description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = sortStatus === 'Semua' || sortStatus === '' ? true : item.Status === sortStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <div>
            <p className="text-2xl font-bold text-black mb-2">Hello User</p>
            <div className="p-20">
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
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <select
                                className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#16C098]"
                                value={sortStatus}
                                onChange={(e) => setSortStatus(e.target.value)}
                            >
                                <option value="" disabled hidden>Urutkan</option>
                                <option value="Semua">Semua</option>
                                <option value="Selesai">Selesai</option>
                                <option value="Diproses">Diproses</option>
                                <option value="Diajukan">Diajukan</option>
                                <option value="Active">Active</option>
                            </select>
                        </div>
                    </div>

                    <table className="w-full text-left text-sm text-gray-500 font-Satoshi">
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
                        <tbody className="text-black font-medium font-Satoshi">
                            {filteredData.map((item, idx) => (
                                <tr key={idx} className="border-b border-[#E0E0E0]">
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
                </div>
            </div>
        </div>
    );
}
