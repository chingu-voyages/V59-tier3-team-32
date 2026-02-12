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
    slug: "scrum_product_owner",
    description:
      "Backlog management, maximizing value, stakeholder management (Aligns with CSPO)",
  },
  {
    id: 2,
    title: "Scrum Master",
    icon: ScrumMasterIcon,
    slug: "scrum_master",
    description:
      "Servant leadership, coaching, removing impediments (Aligns with CSM)",
    questions: 20,
  },
  {
    id: 3,
    title: "UI/UX Designer",
    icon: DesignerIcon,
    slug: "ui_ux_designer",
    description: "Accessibility, Responsiveness, Design Thinking (No code)",
  },
  {
    id: 4,
    title: "Web Developer",
    icon: WebDevIcon,
    slug: "web_developer",
    description: "Web fundamentals + Data Structures & Algorithms (DSA)",
  },
  {
    id: 5,
    title: "Python Developer",
    icon: PyDevIcon,
    slug: "python_developer",
    description: "Python syntax + Data Structures & Algorithms (DSA)",
  },
];

export default roles;
