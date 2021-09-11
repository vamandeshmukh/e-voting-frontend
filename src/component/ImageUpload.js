import React from "react";
import axios from "axios";
import "./Home.css";

class ImageUpload extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedFile: null,
    };
  }

  formData = new FormData();

  render() {
    return (
      <div>
        {/* {console.log(this.state.selectedFile)} */}
        <div>
          <input
            type="file"
            onChange={(e) => {
              this.setState({ selectedFile: e.target.files[0], loaded: 0 });
            }}
          />
          <button
            onClick={() => {
              const data = new FormData();
              data.append(
                "myFile",
                this.state.selectedFile
                // this.state.selectedFile.name
              );
              console.log(data)
              // axios
              //   .post("http://localhost:9090/upload", data, {})
              //   .then((res) => {
              //     console.log(res);
              //   })
              //   .catch((error) => {
              //     console.log(error);
              //   });
            }}
          >
            Upload!
          </button>
        </div>
        {this.state.selectedFile ? (
          <p>File Name: {this.state.selectedFile.name}</p>
        ) : (
          "No files selected"
        )}
      </div>
    );
  }
}

export default ImageUpload;
