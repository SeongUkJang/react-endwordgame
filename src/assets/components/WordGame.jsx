    import React, { useRef, useState } from 'react'
    import './WordGame.scss'


    const WordGame = ({firstWord}) => {
        const [word, setWord] = useState(firstWord)
        const [userInput,setUserInput] = useState('')
        const [message, setMessage] = useState('끝말잇기 시작')
        const inputRef = useRef(null)
        const handleChange = (e) =>{
            setUserInput(e.target.value)
        }
        const checkWord = ()=> {
            const trimedWord = userInput.trim()
            if(!trimedWord){
                setMessage('단어를 입력하세요')
                return
            }
            const lastChar = word[word.length-1]
            const firstChar = trimedWord[0]

            if(lastChar!==firstChar){
                setMessage(`'${lastChar}'(으)로 시작하는 단어를 입력하세요.`)
                setUserInput('')
            }
            else{
                setMessage('정답입니다. 다음 단어를 입력하세요.')
                setUserInput('')
                setWord(trimedWord)
            }
            inputRef.current.focus()
        }
        // console.log(firstWord)
    return (
        <div className='game-container'>
        <h2>끝말잇기 게임</h2>
        <p className="current-word">{word}</p>
        <input 
        value={userInput}
        type="text"
        ref={inputRef}
        onChange={handleChange}
        placeholder='단어를 입력하세요'
        onKeyUp={(e)=>e.key==='Enter'&& checkWord()}
        />
        <button onClick={checkWord}>확인</button>
        <p className="message">{message}</p>
        </div>
    )
    }

    export default WordGame
