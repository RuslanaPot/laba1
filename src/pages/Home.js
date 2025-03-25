import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [materials, setMaterials] = useState([]);
  const [tests, setTests] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const contentMaterials = await axios.get("http://localhost:5000/materials");
      const contentTests = await axios.get("http://localhost:5000/tests");
      setMaterials(contentMaterials.data);
      setTests(contentTests.data);
      
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
    }
  };

  const deleteMaterial = (id) => {
    axios.delete(`http://localhost:5000/materials/${id}`)
      .then(() => {
        setMaterials(materials.filter(material => material.id !== id));
      })
      .catch(error => console.error("Ошибка удаления:", error));
  };

  const deleteTest = (id) => {
    axios.delete(`http://localhost:5000/tests/${id}`)
      .then(() => {
        setTests(tests.filter(test => test.id !== id));
      })
      .catch(error => console.error("Ошибка удаления:", error));
  };

  
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Информирование и тестирование о Черезвычайных ситуациях</h1>
      
      <h2>Полезная информация</h2>
      <ul>
        {materials.map(material => (
          <li key={material.id}>
            <Link to={`/material/${material.id}`}>{material.title}</Link>
            <button onClick={() => deleteMaterial(material.id)}>Удалить</button>
          </li>
        ))}
      </ul>
      <Link to="/add-material">Добавить полезную информацию</Link>

      <h2>Тесты</h2>
      <ul>
        {tests.map(test => (
          <li key={test.id}>
            <Link to={`/test/${test.id}`}>{test.question}</Link>
            <button onClick={() => deleteTest(test.id)}>Удалить</button>
          </li>
        ))}
      </ul>
      <Link to="/add-test">Добавить тест</Link>
    </div>
  );
};

export default Home;