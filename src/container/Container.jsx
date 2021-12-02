import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BoardList from "../component/BoardList";
import BoardNew from "../component/BoardNew";
import { boardRemove, boardSave, boardSelectRow } from "../module/boardReducer";

import styled from "styled-components";

function Container() {
  // State
  const [inputData, setInputData] = useState({
    boardId: "",
    boardTitle: "",
    boardContent: "",
  });

  //dispatch
  const dispatch = useDispatch();

  const onRemove = (boardId) => dispatch(boardRemove(boardId));
  const onSave = (saveData) => dispatch(boardSave(saveData));

  //reducer state의 selectRowData field를 가져온 뒤 subscribe(구독)
  const { selectRowData } = useSelector((state) => state.boardReducer);

  //User Function
  const onRowClick = (boardId) => {
    //dispatch를 하고
    dispatch(boardSelectRow(boardId));

    // inputData에 selectRowData의 값을 반영합니다.
    if (JSON.stringify(selectRowData) !== "{}") {
      setInputData({
        boardId: selectRowData.boardId,
        boardTitle: selectRowData.boardTitle,
        boardContent: selectRowData.boardContent,
      });
    }
  };

  const changeInput = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setInputData({
      boardId: "",
      boardTitle: "",
      boardContent: "",
    });
  };

  //reducer state의 boards filed를 가져온 뒤 subscribe (구독)
  const { boards } = useSelector((state) => state.boardReducer);

  return (
    <div>
      <div>
        <table border="1">
          <tbody>
            <tr align="center">
              <td width="50">번호</td>
              <td width="100">제목</td>
              <td width="200">내용</td>
            </tr>
            {boards.map((row, i) => (
              <BoardList
                key={row.boardId}
                boardId={row.boardId}
                boardTitle={row.boardTitle}
                boardContent={row.boardContent}
                onRemove={onRemove}
                onRowClick={onRowClick}
              />
            ))}
          </tbody>
        </table>
      </div>
      <BoardNew
        onSave={onSave}
        changeInput={changeInput}
        inputData={inputData}
        resetForm={resetForm}
      />
    </div>
  );
}

const ContainerBlock = styled.div``;

export default Container;
