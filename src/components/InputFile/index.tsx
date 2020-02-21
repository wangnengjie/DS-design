import React, { FC, memo, useRef } from "react";
import { Icon } from "antd";
import "./index.scss";

interface InputFileProps {
  onInputFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileDrop: (e: React.DragEvent<HTMLDivElement>) => void;
}

const InputFile: FC<InputFileProps> = memo(
  ({ onInputFileChange, onFileDrop }: InputFileProps) => {
    const inputFile = useRef<HTMLInputElement>(null);
    return (
      <div
        className="inputCnfFile"
        onClick={() => inputFile.current.click()}
        onDrop={onFileDrop}
        onDragOver={e => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <input type="file" ref={inputFile} onChange={onInputFileChange} />
        <p className="inputIcon">
          <Icon type="inbox" />
        </p>
        <p className="description">点击选择.cnf文件或将.cnf文件拖入框中</p>
      </div>
    );
  }
);

export default InputFile;
