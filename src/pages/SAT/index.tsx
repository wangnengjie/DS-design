import React, { FC, memo, useEffect } from "react";
import { Layout, Icon } from "antd";
import { useHistory } from "react-router-dom";
import InputFile from "../../components/InputFile";
import { ipcRenderer } from "electron";
import "./index.scss";

const { Content } = Layout;

const style: { [key: string]: React.CSSProperties } = {
  content: {
    height: "100vh"
  }
};

const SAT: FC = memo(() => {
  const history = useHistory();
  useEffect(() => {
    // const c = (event: IpcRendererEvent, v: any) => console.log(v);
    ipcRenderer.on("updateList", (event, args) => {
      console.log("received");
      console.log(args);
    });
    return () => {
      ipcRenderer.removeAllListeners("updateList");
    };
  }, []);

  const handleInputFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const path = e.target.files[0].path;
    ipcRenderer.send("addProblem", path.toString());
    e.target.value = null;
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const path = e.dataTransfer.files[0].path;
    ipcRenderer.send("addProblem", path.toString());
  };

  return (
    <>
      <Icon
        type="left-circle"
        style={{
          position: "absolute",
          top: "5vh",
          left: "5vw",
          fontSize: "24px",
          color: "#40a9ff"
        }}
        onClick={() => history.goBack()}
      />
      <Layout>
        <Content style={style.content}>
          <InputFile
            onFileDrop={handleDrop}
            onInputFileChange={handleInputFileChange}
          />
        </Content>
      </Layout>
    </>
  );
});

export default SAT;
