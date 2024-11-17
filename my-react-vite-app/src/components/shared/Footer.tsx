import { FaGithub } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const socials = [
  {
    name: "GitHub",
    icon: <FaGithub />,
    color: "#fafbfc",
  },
  {
    name: "Facebook",
    icon: <FaFacebook />,
    color: "#1877F2",
  },
  {
    name: "Instagram",
    icon: <FaInstagram />,
    color: "#e56969",
  },
  {
    name: "Twitter",
    icon: <FaXTwitter />,
    color: "#fafbfc",
  },
];

function Footer() {
  return (
    <footer className="max-w-5xl w-full">
      <div className="py-10 flex flex-col items-center gap-5">
        <h4 className="text-[#f1f1f1]/20">
          &copy;{new Date().getFullYear()} Mark Guyada
        </h4>
        <div className="flex gap-3 text-2xl">
          {socials.map((logo) => (
            <div
              key={logo.name}
              className="hover:scale-125 transition duration-200 delay-75 cursor-pointer opacity-20"
              // style={{ color: `${logo.color}` }}
            >
              {logo.icon}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
