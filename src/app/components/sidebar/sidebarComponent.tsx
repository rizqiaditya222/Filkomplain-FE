type SidebarComponentProps = {
  src: string; 
  title: string;
  hoverColor: string;
  isClicked: boolean;
  onClick: () => void;
};


export default function SidebarComponent({ src, title, hoverColor, isClicked, onClick }: SidebarComponentProps) {
  let imageSrc = "/sidebar/dashboard.png"

  switch (title) {
    case "Diajukan":
        imageSrc = "/sidebar/diajukan.png"
        break;
    case "Diproses":
        imageSrc = "/sidebar/proses.png"
        break;
    case "Selesai":
        imageSrc = "/sidebar/selesai.png"
        break;
    case "Keluar":
        imageSrc = "/sidebar/keluar.png"
        break;
    default:
        imageSrc = "/sidebar/dashboard.png"
        break;
  }

  imageSrc = isClicked ? imageSrc.replace(".png", "_active.png") : imageSrc;

  return (
    <div
className={`w-full h-14 flex items-center justify-between gap-4 pl-4 pr-6 rounded-xl cursor-pointer transition-all duration-300 ease-in-out ${
  isClicked ? "bg-[#00608C]" : `hover:bg-[${hoverColor}]`
}`}

      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <img src={imageSrc} alt={title} className="w-6 h-6" />
        <p className={isClicked ? "text-white" : "text-[#9197B3]"}>{title}</p>
      </div>
      <span className={`${isClicked ? "text-white" : "text-[#9197B3]"} text-lg`}>→</span>
    </div>
  );
}
