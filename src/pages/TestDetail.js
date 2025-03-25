import React, { useRef, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TestDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState({});
  const questionRef = useRef(null);
  const [options, setOptions] = useState(['', '', '']);
  const correctAnswerRef = useRef(null);

  useEffect(() => {
    loadTest();
  }, []);

  const loadTest = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/tests/${id}`);
      setTest(response.data);
      setOptions(response.data.options);
    } catch (error) {
      console.error("Ошибка загрузки:", error);
    }
  };

  const navigationHook = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const SubmittingForm = (forms) => {
    forms.preventDefault();
    const updatedTest = {
      question: questionRef.current.value,
      options: options,
      correctAnswer: correctAnswerRef.current.value,
    };

    axios.put(`http://localhost:5000/tests/${id}`, JSON.stringify(updatedTest), {
      headers: { "Content-Type": "application/json" }
    })
      .then(() => {
        navigate('/');
      })
      .catch(error => console.error("Ошибка обновления:", error));
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Редактирование теста</h1>
      <form onSubmit={SubmittingForm}>
        <label>
          Вопрос:
          <input type="text" ref={questionRef} defaultValue={test.question} required />
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
          <input type="text" ref={correctAnswerRef} defaultValue={test.correctAnswer} required />
        </label>
        <br />
        <button type="submit">Сохранить</button>
      </form>
    </div>
  );
};

export default TestDetail;