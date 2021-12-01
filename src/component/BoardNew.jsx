import React from "react";
import styled from "styled-components";

function BoardNew({ onSave, changeInput, inputData, resetForm }) {
  const saveBtnClick = (e) => {
    e.preventDefault();
    onSave(inputData);
    resetForm();
  };

  return (
    <form onSubmit={saveBtnClick}>
      <div>
        제목 :
        <input
          type="text"
          name="boardTitle"
          onChange={changeInput}
          value={inputData.boardTitle}
        />
      </div>
      <div>
        내용 :
        <input
          type="text"
          name="boardContent"
          onChange={changeInput}
          value={inputData.boardContent}
        />
        <button type="submit">신규 게시글 저장</button>
      </div>
    </form>
  );
}

const BoardBlock = styled.div``;

export default BoardNew;
