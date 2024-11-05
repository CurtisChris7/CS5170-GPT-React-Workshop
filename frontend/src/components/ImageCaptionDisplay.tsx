import { FaRobot } from "react-icons/fa6";
import "./AICaption.css";

interface Props {
  img: Blob;
  caption: string;
}

/**
 *
 * @param img
 * @param caption
 * @returns
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

//<img src={"http://localhost:8080/image"} height={200} width={300}></img>
