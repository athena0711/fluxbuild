import { Settings } from "lucide-react";

const ProjectSidebarItems = [
  {
    title: "Settings",
    icon: Settings,
  },
];

export const ProjectSidebarFeatures = () => {
  return (
    <div className="space-y-2 mt-2 mx-2.5 w-full">
      <div className="flex justify-center pb-2 mb-5 border-b border-b-gray-500">
        <h1 className="text-sm text-card-fluxbuildBlack">Projects</h1>
      </div>
      <ul>
        {ProjectSidebarItems.map((item, index) => (
          <li
            key={index}
            className="flex items-center justify-center space-x-2"
          >
            <item.icon className="h-4 w-4" />
            <p className="text-md">{item.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
