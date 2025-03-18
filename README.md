이번에는 React로 javascript의 끝말잇기를 만들어보았습니다.

### 주요 기능

1. **첫 번째 단어를 설정**: `firstWord` prop으로 첫 번째 단어가 입력됩니다.
2. **단어 입력 받기**: 사용자가 입력한 단어가 유효한지 확인합니다.
3. **끝말잇기 체크**: 입력한 단어가 이전 단어의 마지막 문자로 시작하는지 확인합니다.
4. **결과 메시지**: 맞는 단어를 입력하면 "정답입니다"라는 메시지, 아니면 "다시 입력하세요"라는 메시지를 표시합니다.
5. **입력 필드와 버튼**: Enter 키나 버튼 클릭으로 단어를 확인할 수 있습니다.

### App.jsx 코드

```jsx
import WordGame from "./assets/components/WordGame"

function App() {

  return (
    <div>
      <WordGame firstWord={'사과'}/>
    </div>
  )
}

export default App

```

### WordGame.jsx 코드

```jsx
import React, { useRef, useState } from 'react';
import './WordGame.scss';

const WordGame = ({ firstWord }) => {
    // 상태 관리
    const [word, setWord] = useState(firstWord); // 현재 단어
    const [userInput, setUserInput] = useState(''); // 사용자 입력
    const [message, setMessage] = useState('끝말잇기 시작'); // 상태 메시지

    const inputRef = useRef(null); // 입력 필드에 포커스

    // 입력 값 변경 처리
    const handleChange = (e) => {
        setUserInput(e.target.value);
    };

    // 단어 확인 처리
    const checkWord = () => {
        const trimmedWord = userInput.trim(); // 입력값 앞뒤 공백 제거

        if (!trimmedWord) {
            setMessage('단어를 입력하세요');
            return;
        }

        const lastChar = word[word.length - 1]; // 이전 단어의 마지막 문자
        const firstChar = trimmedWord[0]; // 입력한 단어의 첫 문자

        // 끝말잇기 규칙 체크
        if (lastChar !== firstChar) {
            setMessage(`'${lastChar}'(으)로 시작하는 단어를 입력하세요.`);
            setUserInput('');
        } else {
            setMessage('정답입니다. 다음 단어를 입력하세요.');
            setWord(trimmedWord); // 새로운 단어로 갱신
            setUserInput('');
        }

        inputRef.current.focus(); // 입력 필드에 다시 포커스
    };

    return (
        <div className='game-container'>
            <h2>끝말잇기 게임</h2>
            <p className="current-word">{word}</p>
            <input
                value={userInput}
                type="text"
                ref={inputRef}
                onChange={handleChange}
                placeholder="단어를 입력하세요"
                onKeyUp={(e) => e.key === 'Enter' && checkWord()} // Enter키로도 단어 확인
            />
            <button onClick={checkWord}>확인</button>
            <p className="message">{message}</p>
        </div>
    );
};

export default WordGame;

```

### WordGame.scss 코드

```scss

$m-color: rgb(50, 50, 150);
$hv-color: rgb(1, 7, 87);
$bdr-color: #aaaaaa;
$t-color:#818181;

$fs-large: 32px;
$fs-medium: 24px;
$fs-small: 16px;
$bdr-radius: 5px;
$pd-small: 10px;
$pd-default: 20px;
$mg-default: 20px;

.game-container {
    background-color: #fff;
    padding: $pd-default;
    border-radius: $bdr-radius;
    box-shadow: 0 0 10px #0000001f;
    text-align: center;

    h2 {
        font-size: $fs-medium;
        color: $m-color
    }
    h2:hover {
        color: $hv-color;
        cursor: pointer;
    }
    .current-word {
        font-size: $fs-large;
        font-weight: bold;
        color: $t-color;
        padding: $pd-small 0;
    }
    input {
        width: 200px;
        padding: $pd-small;
        border: 2px solid $bdr-color;
        border-radius: $bdr-radius;
        transition: border .3s;
        outline: none;
        &:focus {
            border-color: $m-color;
        }
    }
    button {
        margin-left: 10px;
        border: none;
        padding: $pd-small $pd-small*2;
        font-size: $fs-small;
        background-color: $m-color;
        color: #fff;
        border-radius: $bdr-radius;
        cursor: pointer;
        transition: background .3s;
        &:hover {
            background-color: $hv-color;
        }
    }
    .message {
        margin-top: $mg-default;
        font-size: $fs-small;
        color: $t-color;
    }

}

```

### 코드 설명

1. **상태 관리 (`useState`)**
    - `word`: 현재 단어를 저장합니다.
    - `userInput`: 사용자가 입력한 단어를 저장합니다.
    - `message`: 게임의 진행 상황이나 오류 메시지를 표시합니다.
2. **입력 필드**
    - `inputRef`를 사용하여 입력 필드에 포커스를 맞출 수 있습니다.
    - `onChange`: 입력이 바뀔 때마다 `userInput` 상태를 업데이트합니다.
    - `onKeyUp`: 사용자가 Enter 키를 누르면 `checkWord()` 함수를 호출합니다.
3. **단어 확인 (`checkWord`)**
    - 사용자가 입력한 단어가 규칙에 맞는지 확인합니다.
    - 끝말잇기 규칙에 맞으면 메시지를 "정답입니다"로 변경하고, 새로운 단어를 설정합니다.
    - 규칙에 맞지 않으면 오류 메시지를 표시하고 입력 필드를 초기화합니다.
4. **스타일**: `.game-container`, `.current-word`, `.message` 클래스는 `WordGame.scss` 파일에서 스타일링을 담당합니다.
