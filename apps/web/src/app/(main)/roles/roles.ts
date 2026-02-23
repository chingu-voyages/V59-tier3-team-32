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
    description: `A Product Owner defines the vision of a product,
      prioritizes features, and ensures the team builds what users need.`,
  },
  {
    id: 2,
    title: "Scrum Master",
    icon: ScrumMasterImage,
    slug: "scrum_master",
    description: `A Scrum Master is a facilitator and coach who ensures the scrum
      framework is followed and helps teams improve their workflows.`,
    questions: 20,
  },
  {
    id: 3,
    title: "UI/UX Designer",
    icon: DesignerImage,
    slug: "ui_ux_designer",
    description: `A User Experience(UX)/User Interface(UI) designer creates
      intuitive and visually appealing digital products and services such as
      websites, apps, and software.`,
  },
  {
    id: 4,
    title: "Web Developer",
    icon: WebDevImage,
    slug: "web_developer",
    description: `A Web Developer builds and maitains websites using programming languages.`,
  },
  {
    id: 5,
    title: "Python Developer",
    icon: PyDevImage,
    slug: "python_developer",
    description: `A Python Developer codes, designs, deploys, and debugs
      development projects, typically on the backend.`,
  },
];

export default roles;
