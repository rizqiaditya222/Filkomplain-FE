import IconProvider from "../common/IconProvider";

type SidebarComponentProps = {
  title: string;
  hoverColor: string;
  isClicked: boolean;
  onClick: () => void;
  iconName: string;
};

export default function SidebarComponent({ title, hoverColor, isClicked, onClick, iconName }: SidebarComponentProps) {
  // Map sidebar titles to appropriate Heroicon names
  const getIconName = () => {
    switch (title) {
      case "Semua":
        return "HomeIcon";
      case "Diajukan":
        return "ClipboardDocumentIcon";
      case "Diproses":
        return "ClockIcon";
      case "Selesai":
        return "CheckCircleIcon";
      case "Keluar":
        return "ArrowRightOnRectangleIcon";
      default:
        return "Squares2X2Icon";
    }
  };

  return (
    <div className={`w-full h-14 flex items-center justify-between gap-4 pl-4 pr-6 rounded-xl cursor-pointer transition-all duration-300 ease-in-out ${isClicked ? "bg-[#00608C]" : `hover:bg-[${hoverColor}]`}`} onClick={onClick}>
      <div className="flex items-center gap-4">
        <IconProvider icon={getIconName()} variant={isClicked ? "solid" : "outline"} className={`w-6 h-6 ${isClicked ? "text-white" : "text-[#9197B3]"}`} />
        <p className={isClicked ? "text-white" : "text-[#9197B3]"}>{title}</p>
      </div>
      <IconProvider icon="ChevronRightIcon" className={`w-5 h-5 ${isClicked ? "text-white" : "text-[#9197B3]"}`} />
    </div>
  );
}
