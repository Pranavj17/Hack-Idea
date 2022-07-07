import React, { useState } from "react";
import HomeComponent from "../components/home";
import label from "../label";
import Modal from "../components/Modal";

const Tags = [
  { key: 'feature', value: 'Feature' },
  { key: 'tech', value: 'Tech' },
];
const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [challenges, setChallenges] = useState(() => {
    const challenges = JSON.parse(window.sessionStorage.getItem('challenges'));
    return challenges || {};
  });
  const handleNewEntry = () => {
    setIsOpen(true);
  };
  const onSave = () => {
    const date = new Date();
    const id = date.getTime();
    const createdDate = date;
    const title = document.getElementById('floatingInput').value;
    const description = document.getElementById('floatingTextarea').value;
    const tag =  document.getElementById('floatingSelect').value;
    const votes = 0;
    setIsOpen(false);
    const dataToSend = {
      id,
      title,
      description,
      tag,
      createdDate,
      updatedDate: createdDate,
      FormatedDate: date.toISOString().slice(0, 10),
      votes
    };
    console.log('dataToSend', dataToSend);
    challenges[id] = { ...dataToSend };
    setChallenges({ ...challenges });
    window.sessionStorage.setItem('challenges', JSON.stringify({ ...challenges }))
  };

  const updateChallenges = (id) => {
    challenges[id] = {
      ...challenges[id],
      updatedDate: new Date(),
      votes: challenges[id]?.votes + 1
    };
    setChallenges({ ...challenges });
    window.sessionStorage.setItem('challenges', JSON.stringify({ ...challenges }))
  };
  console.log('chale', challenges);
  const onClose = () => {
    setIsOpen(false);
  };

  const sortChallenges = (key) => {
    let obj = {};
    if (key === 'default') {
      obj = JSON.parse(window.sessionStorage.getItem('challenges'));
      setChallenges(obj);
    } else {
      const [order, type] = key.split('-');
      const list = Object.values(challenges || {}).sort((a, b) => {
        if (order === 'asc') {
          return a[type] - b[type];
        }
        return b[type] - a[type];
      });
      list.forEach((a) => {
        obj[a.id] = a
      });
      setChallenges(obj);
    }
  };
  return (
    <>
      <HomeComponent
        handleNewEntry={handleNewEntry}
        challenges={challenges}
        updateChallenges={updateChallenges}
        isOpen={isOpen}
        sortChallenges={sortChallenges}
      />
      {isOpen && (
        <Modal
          title={label.ADD_IDEAS_CHALLENGES}
          onClose={onClose}
          onSave={onSave}
        >
          <div className="w-100">
            <div className="form-floating mb-3">
              <input type="text" className="form-control" id="floatingInput" placeholder="title" />
              <label for="floatingInput">Title</label>
            </div>
            <div className="form-floating mb-3">
              <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
              <label for="floatingTextarea">Comments</label>
            </div>
            <div className="form-floating mb-3">
              <select className="form-select" id="floatingSelect" aria-label="Floating label select example">
                {Tags.map(({ key, value}) => {
                  return (
                    <option id={key} value={key}>{value}</option>
                  );
                })}
              </select>
              <label for="floatingSelect">TAGS</label>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Home;