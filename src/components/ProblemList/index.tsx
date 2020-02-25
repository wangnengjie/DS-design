import React, { FC, memo, useState, useEffect } from "react";
import { Icon, List, Avatar, Typography } from "antd";
import { ipcRenderer } from "electron";
import fs from "fs";
import { Problem } from "../../utils/DpllCenter";
import ResModal from "../ResModal";

interface ProblemListProps {
  problemList: Problem[];
}

const { Item } = List;

const ProblemList: FC<ProblemListProps> = memo(
  ({ problemList }: ProblemListProps) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [readPath, setReadPath] = useState<string>("");

    const downloadRes = (p: Problem) => {
      let a: HTMLAnchorElement = document.createElement("a");
      const url = window.URL.createObjectURL(
        new Blob([fs.readFileSync(p.resFile)])
      );
      a.href = url;
      a.download =
        p.filePath
          .split("\\")
          .slice(-1)[0]
          .split(".")[0] + ".res";
      console.log(a.download);
      a.click();
      window.URL.revokeObjectURL(url);
      a = null;
    };

    const actions = (p: Problem) => {
      return [
        <Icon
          type="read"
          key="read"
          onClick={() => {
            setReadPath(p.resFile);
            setVisible(true);
          }}
        />,
        <Icon
          type="download"
          key="download"
          onClick={() => {
            downloadRes(p);
          }}
        />,
        <Icon
          type="delete"
          key="delete"
          onClick={() => ipcRenderer.send("removeProblem", p.id)}
        />
      ];
    };

    return (
      <>
        <ResModal
          visible={visible}
          readPath={readPath}
          onClose={() => setVisible(false)}
        />
        <List
          dataSource={problemList}
          itemLayout="horizontal"
          size="small"
          style={{
            padding: "10px",
            margin: "0 75px",
            maxHeight: "55vh",
            overflowY: "scroll"
          }}
          renderItem={item => {
            return (
              <Item
                key={item.id}
                actions={item.resFile === null ? [] : actions(item)}
              >
                <Item.Meta
                  avatar={
                    item.resFile === null ? (
                      <Avatar
                        style={{ backgroundColor: "transparent" }}
                        icon={
                          <Icon type="sync" style={{ color: "#40a9ff" }} spin />
                        }
                      />
                    ) : (
                      <Avatar
                        style={{ backgroundColor: "transparent" }}
                        icon={
                          <Icon type="check" style={{ color: "#40a9ff" }} />
                        }
                      />
                    )
                  }
                  title={item.filePath.split("\\").slice(-1)[0]}
                  description={
                    <Typography.Text type="secondary">{`变元数：${item.litSize}\t子句数：${item.clauseSize}`}</Typography.Text>
                  }
                />
              </Item>
            );
          }}
        />
      </>
    );
  }
);

export default ProblemList;
