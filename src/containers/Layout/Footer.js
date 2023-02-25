import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faCodeBranch,
  faCopyright,
} from "@fortawesome/free-solid-svg-icons";

const Footer = () => (
  <footer className=" d-flex flex-column flex-sm-row gap-2 gap-md-0 py-3 align-items-center justify-content-around ">
    <div className="d-flex align-items-center">
      <div>
        <FontAwesomeIcon className="text-light me-2" icon={faCodeBranch} />
        <span className="fs-7 text-light">Version: 1.0.0</span>
      </div>
    </div>
    <div className="d-flex align-items-center">
      <div>
        <FontAwesomeIcon icon={faCopyright} className="text-light me-2" />
        <span className="text-light">Copyright @ Rahul Deshar</span>
      </div>
    </div>
    <div className="d-flex align-items-center">
      <div>
        <FontAwesomeIcon icon={faCalendar} className="text-light me-2" />
        <span className="text-light">Release Date: 2023</span>
      </div>
    </div>
  </footer>
);

export default Footer;
