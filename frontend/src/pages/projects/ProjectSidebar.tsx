import { Settings, LayoutTemplate, QrCode } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { projectPage } from "@/constants";

const ProjectSidebarItems = [
  {
    title: "About",
    icon: QrCode,
    tab: "about",
  },
  {
    title: "Settings",
    icon: Settings,
    tab: "settings",
  },
  {
    title: "Templates",
    icon: LayoutTemplate,
    tab: "templates",
  },
];

interface ProjectSidebarT {
  sectionId: string;
}

export const ProjectSidebarFeatures: React.FC<ProjectSidebarT> = () => {
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();

  const handleSidebarClick = (tab: string) => {
    navigate(`${projectPage}/${projectId}/${tab}`);
  };
  return (
    <div className="space-y-2 mt-2 mx-2.5 w-full">
      <div className="flex justify-left pb-2 mb-5 border-b-2 border-b-neutral-100">
        <h1 className="text-sm font-medium text-card-fluxbuildBlack">
          Projects
        </h1>
      </div>
      <ul className="space-y-2 cursor-pointer">
        {ProjectSidebarItems.map((item, index) => (
          <li
            key={index}
            className="flex items-center justify-left space-x-2"
            onClick={() => handleSidebarClick(item.tab)}
          >
            <item.icon className="h-4 w-4" />
            <p className="text-md">{item.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
