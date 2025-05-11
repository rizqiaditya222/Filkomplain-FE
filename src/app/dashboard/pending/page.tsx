'use client'

import Table from "@/app/components/table";


const data = [
    {
        Username: "Wir Wir Wir Jawir",
        Title: "Ada anomali",
        Description: "Anomali meses..",
        Location: "Toilet Mushola",
        Phone: "08123456789",
    },
    {
        Username: "Bagasnegro",
        Title: "Ada anomali",
        Description: "Anomali meses..",
        Location: "Toilet Mushola",
        Phone: "08123456789",
    },
    {
        Username: "Murtadlo",
        Title: "Ada anomali",
        Description: "Anomali meses..",
        Location: "Toilet Mushola",
        Phone: "08123456789",
    },
    {
        Username: "Wir Wir Wir Jawir",
        Title: "Ada anomali",
        Description: "Anomali meses..",
        Location: "Toilet Mushola",
        Phone: "08123456789",
    },
];

export default function Pending() {

  return (
    <div className="p-20">
      <div className="bg-white p-8 shadow-xl rounded-xl">
      <h1 className="text-2xl font-bold mb-9 text-black">Laporan Diajukan</h1>
        <Table data={data} />
      </div>
    </div>
  );
}
