import React, { FC, memo, useState } from "react";
import { Layout, Icon, Button, Select, Row, Col, Spin } from "antd";
import { useHistory } from "react-router-dom";
import BSudoku from "../../utils/BSudoku";
import "./index.scss";

const { Content } = Layout;

const style: { [key: string]: React.CSSProperties } = {
  content: {
    height: "100vh"
  }
};

interface Block {
  value: number;
  preFill: boolean;
}

const SAT: FC = memo(() => {
  const history = useHistory();
  const [rank, setRank] = useState<number>(null);
  const [table, setTable] = useState<Block[][]>(null);
  const [solved, setSolved] = useState<boolean>(false);
  const [sudoku, setSudoku] = useState<BSudoku>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleRankChange = async (value: number) => {
    setLoading(true);
    const np = new BSudoku(value);
    const arr: Block[][] = new Array(value);
    const preFill = await np.generate();
    for (let i = 0; i < value; i++) {
      arr[i] = new Array(value)
        .fill(-1)
        .map(() => ({ value: 2, preFill: false }));
    }
    for (const v of preFill) {
      const row = Math.floor((Math.abs(v) - 1) / value);
      const col = (Math.abs(v) - 1) % value;
      arr[row][col] = { value: v > 0 ? 1 : 0, preFill: true };
    }
    setTable(arr);
    setRank(value);
    setSolved(false);
    setSudoku(np);
    setLoading(false);
  };

  const handleBlockClick = (row: number, col: number) => {
    const block = table[row][col];
    if (!block.preFill && !solved) {
      const nt = table.concat();
      nt[row][col].value = (block.value + 1) % 3;
      setTable(nt);
    }
  };

  const handleSolve = async () => {
    if (!solved && rank !== null && table !== null) {
      setLoading(true);
      const res = await sudoku.solve();
      const nt = table.concat();
      for (let i = 0; i < Math.pow(rank, 2); i++) {
        const row = Math.floor(i / rank);
        const col = i % rank;
        nt[row][col].value = res.lits[i] > 0 ? 1 : 0;
      }
      setTable(nt);
      setSolved(true);
      setLoading(false);
    }
  };

  return (
    <Spin size="large" spinning={loading}>
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
          <div style={{ padding: "75px 0 0 0", margin: "0 100px" }}>
            <Row type="flex" align="middle" justify="space-between">
              <Col>
                <Select
                  placeholder="请选择游戏难度"
                  onChange={handleRankChange}
                  style={{ width: "150px" }}
                >
                  {[4, 6, 8, 10, 12, 14].map(e => {
                    return (
                      <Select.Option
                        key={e}
                        value={e}
                      >{`${e}阶`}</Select.Option>
                    );
                  })}
                </Select>
              </Col>
              <Col>
                <Button type="primary" disabled={rank === null ? true : false}>
                  重置
                </Button>
              </Col>
              <Col>
                <Button type="primary" disabled={rank === null ? true : false}>
                  提交
                </Button>
              </Col>
              <Col>
                <Button
                  type="primary"
                  disabled={rank === null ? true : false}
                  onClick={handleSolve}
                >
                  求解
                </Button>
              </Col>
            </Row>
          </div>

          {table !== null && (
            <div
              id="sudokuBar"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center"
              }}
            >
              <div
                className="sudokuTable"
                style={{
                  gridTemplateRows: `repeat(${table.length}, ${
                    table.length > 8 ? 35 : 40
                  }px)`,
                  gridTemplateColumns: `repeat(${table.length}, ${
                    table.length > 8 ? 35 : 40
                  }px)`
                }}
              >
                {table.map((row, i) => {
                  return row.map((unit, j) => {
                    return (
                      <div
                        key={i.toString() + j.toString()}
                        onClick={() => handleBlockClick(i, j)}
                        className={unit.preFill ? "prefilled" : ""}
                      >
                        <span>{unit.value === 2 ? "" : unit.value}</span>
                      </div>
                    );
                  });
                })}
              </div>
            </div>
          )}
        </Content>
      </Layout>
    </Spin>
  );
});

export default SAT;
