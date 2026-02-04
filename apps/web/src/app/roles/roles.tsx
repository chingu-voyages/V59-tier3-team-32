import DesignerIcon from "@/components/icons/DesignerIcon";
import PyDevIcon from "@/components/icons/PyDevIcon";
import WebDevIcon from "@/components/icons/WebDevIcon";
import ScrumMasterIcon from "@/components/icons/ScrumMasterIcon";
import OwnerIcon from "@/components/icons/OwnerIcon";

const roles = [
  {
    id: 1,
    title: "Product Owner",
    icon: OwnerIcon,
    description:
      "Backlog management, maximizing value, stakeholder management (Aligns with CSPO)",
  },
  {
    id: 2,
    title: "Scrum Master",
    icon: ScrumMasterIcon,
    description:
      "Servant leadership, coaching, removing impediments (Aligns with CSM)",
    questions: 20,
  },
  {
    id: 3,
    title: "UI/UX Designer",
    icon: DesignerIcon,
    description: "Accessibility, Responsiveness, Design Thinking (No code)",
  },
  {
    id: 4,
    title: "Web Developer",
    icon: WebDevIcon,
    description: "Web fundamentals + Data Structures & Algorithms (DSA)",
  },
  {
    id: 5,
    title: "Python Developer",
    icon: PyDevIcon,
    description: "Python syntax + Data Structures & Algorithms (DSA)",
  },
];

export default roles;
