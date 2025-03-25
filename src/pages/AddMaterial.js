import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddMaterial = () => {
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const navigate = useNavigate();

  const SubmittingForm = (forms) => {
    forms.preventDefault();
     // Проверяем, что первый символ не пробел
     if (titleRef.current.value[0] === ' ' || contentRef.current.value[0] === ' ') {
      alert('Название не должно начинаться с пробела');
      return;
    }
    
    const newMaterial = {
      title: titleRef.current.value,
      content: contentRef.current.value,
    };

    axios.post("http://localhost:5000/materials", JSON.stringify(newMaterial), {
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
        Название:
        <input type="text"  ref={titleRef} required />
      </label>
      <br />
      <label>
        Содержание:
        <textarea ref={contentRef} required />
      </label>
      <br />
      <button type="submit">Добавить материал</button>
    </form>
  );
};

export default AddMaterial;