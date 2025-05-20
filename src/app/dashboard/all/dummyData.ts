export interface Laporan {
  Username: string;
  Title: string;
  Description: string;
  Location: string;
  Phone: string;
  Status: string;
}

export const dummyData: Laporan[] = [
  {
    Username: "Mel",
    Title: "Ada anomali",
    Description: "Anomali meses..",
    Location: "Toilet Mushola",
    Phone: "08123456789",
    Status: "Selesai",
  },
  {
    Username: "Hari",
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
    Username: "Mel",
    Title: "Ada anomali",
    Description: "Anomali meses..",
    Location: "Toilet Mushola",
    Phone: "08123456789",
    Status: "Active",
  },
  {
    Username: "Ahmad",
    Title: "Kerusakan AC",
    Description: "AC tidak dingin",
    Location: "Ruang Rapat Lt.3",
    Phone: "08198765432",
    Status: "Diajukan",
  },
  {
    Username: "Budi Santoso",
    Title: "Kebocoran",
    Description: "Air bocor dari ceiling",
    Location: "Pantry",
    Phone: "08574839201",
    Status: "Diproses",
  },
  {
    Username: "Siti Aminah",
    Title: "Listrik Mati",
    Description: "Listrik padam di area selatan",
    Location: "Gudang",
    Phone: "08567123456",
    Status: "Selesai",
  },
  {
    Username: "Deni Wijaya",
    Title: "Kehilangan",
    Description: "Laptop hilang",
    Location: "Aula Utama",
    Phone: "08123987654",
    Status: "Diproses",
  },
  {
    Username: "Rina Agustina",
    Title: "Printer Error",
    Description: "Paper jam terus menerus",
    Location: "Ruang Admin",
    Phone: "08765432109",
    Status: "Selesai",
  },
  {
    Username: "Joko Widodo",
    Title: "Masalah WIFI",
    Description: "Koneksi lambat",
    Location: "Seluruh Gedung",
    Phone: "08765123490",
    Status: "Diproses",
  },
];
