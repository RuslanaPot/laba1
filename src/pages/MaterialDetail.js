import React, { useRef, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const MaterialDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [material, setMaterial] = useState({});
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    loadMaterial();
  }, []);

  const loadMaterial = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/materials/${id}`);
      setMaterial(response.data);
    } catch (error) {
      console.error("Ошибка загрузки:", error);
    }
  };

  const SubmittingForm = (froms) => {
    froms.preventDefault();
    const updatedMaterial = {
      title: titleRef.current.value,
      content: contentRef.current.value,
    };

    axios.put(`http://localhost:5000/materials/${id}`, JSON.stringify(updatedMaterial), {
      headers: { "Content-Type": "application/json" }
    })
      .then(() => {
        navigate('/');
      })
      .catch(error => console.error("Ошибка обновления:", error));
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Редактирование материала</h1>
      <form onSubmit={SubmittingForm}>
        <label>
          Название:
          <input type="text" ref={titleRef} defaultValue={material.title} required />
        </label>
        <br />
        <label>
          Содержание:
          <textarea ref={contentRef} defaultValue={material.content} required />
        </label>
        <br />
        <button type="submit">Сохранить</button>
      </form>
    </div>
  );
};

export default MaterialDetail;