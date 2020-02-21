import React, { FC, memo } from "react";
import { Layout, Icon } from "antd";
import { useHistory } from "react-router-dom";
import InputFile from "../../components/InputFile";
import "./index.scss";

const { Content } = Layout;
const style: { [key: string]: React.CSSProperties } = {
  content: {
    height: "100vh"
  }
};

const SAT: FC = memo(() => {
  const history = useHistory();

  const handleInputFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files[0].path);
    e.target.value = null;
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e.dataTransfer.files[0].path);
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
