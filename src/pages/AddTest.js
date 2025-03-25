import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddTest = () => {
  const questionRef = useRef(null);
  const [options, setOptions] = useState(['', '', '']);
  const correctAnswerRef = useRef(null);
  const navigate = useNavigate();

  const navigationHook = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };
 
  const SubmittingForm = (froms) => {
    froms.preventDefault();
     // первый символ не пробел
     
  if (questionRef.current.value[0] === ' '|| correctAnswerRef.current.value[0] === ' '||options[0] === ' ') {
    alert('Название не должно начинаться с пробела');
    return;
  }
 
    const newTest = {
      question: questionRef.current.value,
      options: options,
      correctAnswer: correctAnswerRef.current.value,
    };

    axios.post("http://localhost:5000/tests", JSON.stringify(newTest), {
      headers: { "Content-Type": "application/json" }
    })
      .then(() => {
        
        navigate('/');
      })
      .catch(error => console.error("Ошибка создания:", error));
  };

  return (
    <form onSubmit={SubmittingForm} style={{ textAlign: 'center', padding: '20px' }}>
      <label>
        Вопрос:
        <input type="text" ref={questionRef} required />
      </label>
      <br />
      {options.map((option, index) => (
        <label key={index}>
          Вариант {index + 1}:
          <input
            type="text"
            value={option}
            onChange={(e) => navigationHook(index, e.target.value)}
            required
          />
        </label>
      ))}
      <br />
      <label>
        Правильный ответ:
        <input type="text" ref={correctAnswerRef} required />
      </label>
      <br />
      <button type="submit">Добавить тест</button>
    </form>
  );
};

export default AddTest;