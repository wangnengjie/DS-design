import React, { FC, memo } from "react";
import { Layout, Typography, Row, Col } from "antd";
import FModule, { FModuleProps } from "../../components/FModule";
import sudoku from "../../assets/img/sudoku.png";
import cnf from "../../assets/img/cnf.png";
const { Content, Footer } = Layout;
const { Title, Text, Paragraph } = Typography;

const style: { [key: string]: React.CSSProperties } = {
  content: {
    height: "100vh",
    paddingTop: "20px"
  },
  title: {
    textAlign: "center",
    color: "rgb(24,144,255)",
    marginTop: "0.5em"
  },
  feature: {
    padding: "50px 40px 20px 40px"
  }
};

const feature: FModuleProps[] = [
  {
    img: cnf,
    info: "SAT求解",
    targetPath: "/SAT"
  },
  {
    img: sudoku,
    info: "数独游戏",
    targetPath: "/sudoku"
  }
];

const Head: FC = () => {
  return (
    <>
      <Title level={1} style={style.title}>
        SAT solver
      </Title>
      <Paragraph style={style.title}>Based on DPLL algorithm</Paragraph>
    </>
  );
};

const Feature: FC = () => {
  return (
    <Row
      style={style.feature}
      type="flex"
      justify="space-around"
      align="middle"
    >
      {feature.map(f => {
        return (
          <Col key={f.info}>
            <FModule {...f} />
          </Col>
        );
      })}
    </Row>
  );
};

const Index: FC = memo(() => {
  return (
    <Layout style={style.content}>
      <Content>
        <Head />
        <Feature />
      </Content>
      <Footer>
        <Paragraph>
          <Text underline type="secondary">
            written by panda
          </Text>
        </Paragraph>
      </Footer>
    </Layout>
  );
});

export default Index;
