/**
 * This file contains the defition and logic for the creating an image-caption pair display component.
 * @author Christopher Curtis
 */
import { FaRobot } from "react-icons/fa6";
import "./AICaption.css";

interface Props {
  img: Blob;
  caption: string;
}

/**
 * Creates a container component displaying an image and caption pair
 * @param img image to be displayed
 * @param caption caption to be displayed
 * @returns container component containing an image-caption pair
 */
const ImageCaptionDisplay = ({ img, caption }: Props) => {
  return (
    <div className="mx-1 text-center">
      <h3>Original Image</h3>
      <div className="GenCaption">
        <img src={URL.createObjectURL(img)} height={400} width={600} />

        <div style={{ padding: "5px" }}>
          <FaRobot size={50} />
          <div>
            <label className="form-label">AI Caption:</label>
            <p>{caption}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCaptionDisplay;
