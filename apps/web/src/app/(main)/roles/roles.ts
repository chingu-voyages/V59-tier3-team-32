import DesignerImage from "@/components/roleSvgs/DesignerImage";
import OwnerImage from "@/components/roleSvgs/OwnerImage";
import PyDevImage from "@/components/roleSvgs/PyDevImage";
import ScrumMasterImage from "@/components/roleSvgs/ScrumMasterImage";
import WebDevImage from "@/components/roleSvgs/WebDevImage";

const roles = [
  {
    id: 1,
    title: "Product Owner",
    icon: OwnerImage,
    slug: "scrum_product_owner",
    description:
      "Backlog management, maximizing value, stakeholder management (Aligns with CSPO)",
  },
  {
    id: 2,
    title: "Scrum Master",
    icon: ScrumMasterImage,
    slug: "scrum_master",
    description:
      "Servant leadership, coaching, removing impediments (Aligns with CSM)",
    questions: 20,
  },
  {
    id: 3,
    title: "UI/UX Designer",
    icon: DesignerImage,
    slug: "ui_ux_designer",
    description: "Accessibility, Responsiveness, Design Thinking (No code)",
  },
  {
    id: 4,
    title: "Web Developer",
    icon: WebDevImage,
    slug: "web_developer",
    description: "Web fundamentals + Data Structures & Algorithms (DSA)",
  },
  {
    id: 5,
    title: "Python Developer",
    icon: PyDevImage,
    slug: "python_developer",
    description: "Python syntax + Data Structures & Algorithms (DSA)",
  },
];

export default roles;
