import React, { FC, memo } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Button } from "antd";

export interface FModuleProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  img: any;
  info: string;
  targetPath: string;
}

const FModule: FC<FModuleProps> = memo(
  ({ img, info, targetPath }: FModuleProps) => {
    const history = useHistory();
    return (
      <Row type="flex" style={{ flexDirection: "column" }} align="middle">
        <Col>
          <img style={{ height: "80px", margin: "30px 0" }} src={img} />
        </Col>
        <Col>
          <Button type="primary" onClick={() => history.push(targetPath)}>
            {info}
          </Button>
        </Col>
      </Row>
    );
  }
);

export default FModule;
