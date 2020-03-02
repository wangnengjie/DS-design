import React, { FC, memo, useEffect, useState } from "react";
import { Layout, Icon } from "antd";
import { useHistory } from "react-router-dom";
import InputFile from "../../components/InputFile";
import ProblemList from "../../components/ProblemList";
import { Problem } from "../../utils/DpllCenter";
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
  const [problemList, setProblemList] = useState<Problem[]>([]);

  useEffect(() => {
    ipcRenderer.send("getProblems");
  }, []);

  useEffect(() => {
    ipcRenderer.on("updateList", (event, args: Problem[]) => {
      setProblemList(args.concat());
    });
    return () => {
      ipcRenderer.removeAllListeners("updateList");
    };
  }, []);

  const handleInputFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    ipcRenderer.send("addProblem", e.target.files[0].path);
    e.target.value = null;
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    ipcRenderer.send("addProblem", e.dataTransfer.files[0].path);
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
          <ProblemList problemList={problemList} />
        </Content>
      </Layout>
    </>
  );
});

export default SAT;
