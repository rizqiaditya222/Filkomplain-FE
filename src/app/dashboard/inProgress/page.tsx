'use client';

import Table from "@/app/components/table";
import { dummyData, Laporan } from "../all/dummyData";

const data: Laporan[] = dummyData;


export default function Done() {
  return (
    <div className="px-20 py-10">
      <div className="bg-white p-8 shadow-xl rounded-xl">
        <h1 className="text-2xl font-bold mb-9 text-black">Laporan Diproses</h1>
        <Table data={data} filterStatus="Diproses" />
      </div>
    </div>
  );
}
