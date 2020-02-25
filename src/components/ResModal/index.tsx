import React, { FC, memo, useEffect, useState } from "react";
import { Modal, Typography, Divider } from "antd";
import { SolveResult } from "../../utils/DpllCenter";
import { readRes } from "../../utils/res";
import "./index.scss";

interface ResModal {
  visible: boolean;
  onClose: () => void;
  readPath: string;
}

const { Paragraph, Title } = Typography;

const ResModal: FC<ResModal> = memo(
  ({ visible, readPath, onClose }: ResModal) => {
    const [res, setRes] = useState<SolveResult>({
      state: 1,
      time: 0,
      lits: []
    });

    useEffect(() => {
      setRes(readRes(readPath));
    }, [readPath]);

    return (
      <Modal visible={visible} footer={null} onCancel={onClose}>
        <Title level={4}>结果</Title>
        <Divider />
        <Paragraph>
          {res.state === 1
            ? "满足"
            : res.state === 0
            ? "不满足"
            : "超时（>7200s）"}
        </Paragraph>

        <Title level={4}>用时</Title>
        <Divider />
        <Paragraph>{`${res.time} ms`}</Paragraph>

        {res.state === 1 && (
          <>
            <Title level={4}>解</Title>
            <Divider />
            <div id="reslits">
              {res.lits.map(v => (
                <div key={v}>{v}</div>
              ))}
            </div>
          </>
        )}
      </Modal>
    );
  }
);

export default ResModal;
