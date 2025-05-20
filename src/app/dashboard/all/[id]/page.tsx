'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { dummyData } from '../dummyData';
import Image from 'next/image';

const statusOptions = ["Diajukan", "Diproses", "Selesai", "Active"];

export default function DetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const index = Number(id);
  const report = dummyData[index];

  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState(report?.Status || '');

  useEffect(() => {
    if (!report) {
      alert("Data tidak ditemukan!");
      router.push('/dashboard/all');
    }
  }, [report, router]);

  if (!report) return null;

  return (
    <div className="flex flex-row h-full pr-40 p-10">
      <Image
        src="/icon/backButton.png"
        alt="Back"
        width={56}
        height={56}
        className="h-14 mr-10 cursor-pointer"
        onClick={() => router.back()}
      />

      <div className="flex flex-col w-full h-full mb-10">
        <p className="text-2xl font-semibold text-black mb-2">{report.Title}</p>

        <div className="flex w-full">
          <p className="text-[#9197B3] mr-2.5 text-sm">Tanggal laporan</p>
          <p className="text-black text-sm">12 April 2025</p>
        </div>

        <div className="flex items-center w-full justify-center py-10">
          <div className="w-2xl h-2xl rounded-2xl bg-amber-200 overflow-hidden">
            <Image
              src="/sidebar/logo.png"
              alt="Gambar Laporan"
              width={400}
              height={250}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="w-full border-2 p-5 rounded-2xl flex flex-row">
          {/* Label */}
          <div className="mr-5">
            <Text color="#ABABC4" text="Nama Pengguna" />
            <Text color="#ABABC4" text="Deskripsi" />
            <Text color="#ABABC4" text="Lokasi" />
            <Text color="#ABABC4" text="Nomor Telepon" />
            <Text color="#ABABC4" text="Status" />
          </div>

          {/* Value */}
          <div>
            <Text color="#000000" text={report.Username} />
            <Text color="#000000" text={report.Description} />
            <Text color="#000000" text={report.Location} />
            <Text color="#000000" text={report.Phone} />
            {isEditing ? (
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mx-5 w-40 h-8 px-2 rounded border text-sm text-black"
              >
                {statusOptions.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            ) : (
              <span className={`mx-5 w-20 h-8 flex justify-center items-center rounded-[5px] text-sm font-semibold ${getStatusStyle(status)}`}>
                {status}
              </span>
            )}
          </div>
        </div>

        <div
          className="mt-5 ml-auto flex flex-row items-center bg-[#AF3904] text-white px-4 py-2 rounded-md cursor-pointer w-fit gap-2"
          onClick={() => setIsEditing(!isEditing)}
        >
          <img src="/icon/edit.png" alt="Edit" className="w-5" />
          <p>{isEditing ? 'Simpan' : 'Edit Status'}</p>
        </div>
      </div>
    </div>
  );
}

function Text({ color, text }: { color: string; text: string }) {
  return (
    <p style={{ color }} className="text-lg my-7 mx-5">
      {text}
    </p>
  );
}

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
      return 'bg-gray-200 text-gray-600';
  }
}
