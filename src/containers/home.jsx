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
  const [editId, setEditId] = useState('');
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
    const title = document.getElementById('form-title').value;
    const description = document.getElementById('form-description').value;
    const tag =  document.getElementById('form-tags').value;
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
    challenges[id] = { ...dataToSend };
    setChallenges({ ...challenges });
    window.sessionStorage.setItem('challenges', JSON.stringify({ ...challenges }))
  };

  const updateChallenges = (id) => {
    const title = document.getElementById('form-title').value;
    const description = document.getElementById('form-description').value;
    const tag =  document.getElementById('form-tags').value;
    const storedChallenges = JSON.parse(window.sessionStorage.getItem('challenges'));
    storedChallenges[id] = {
      ...storedChallenges[id],
      updatedDate: new Date(),
      title,
      description,
      tag
    };
    setChallenges({ ...storedChallenges });
    setEditId('');
    setIsOpen(false);
    window.sessionStorage.setItem('challenges', JSON.stringify({ ...storedChallenges }))
  };
  const updateVotes = (id) => {
    const storedChallenges = JSON.parse(window.sessionStorage.getItem('challenges'));
    storedChallenges[id] = {
      ...storedChallenges[id],
      updatedDate: new Date(),
      votes: storedChallenges[id]?.votes + 1
    };
    setChallenges({ ...storedChallenges });
    window.sessionStorage.setItem('challenges', JSON.stringify({ ...storedChallenges }))
  };
  const onClose = () => {
    setEditId('');
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

  const deleteChallenges = (id) => {
    const storedChallenges = JSON.parse(window.sessionStorage.getItem('challenges'));
    delete storedChallenges[id];
    window.sessionStorage.setItem('challenges', JSON.stringify({ ...storedChallenges }))
    setChallenges({ ...storedChallenges });
  };
  
  const filterChallenges = (string) => {
    let obj = {};
    const storedChallenges = JSON.parse(window.sessionStorage.getItem('challenges'));
    if (string.length > 0) {
      const list = Object.values(storedChallenges || {}).filter((e) => {
        return e.title.toLowerCase().includes(string.toLowerCase());
      });
      list.forEach((a) => {
        obj[a.id] = a;
      });
      setChallenges(obj);  
    } else {
      obj = {...storedChallenges};
      setChallenges(obj);
    }    
  };

  const editChallenges = (id) => {
    setIsOpen(true);
    setEditId(id);
    setTimeout(() => {
      const reqChallenge = challenges[id];
      const title = document.getElementById('form-title');
      const description = document.getElementById('form-description');
      const tag =  document.getElementById('form-tags');
      title.value = reqChallenge.title;
      description.value = reqChallenge.description;
      tag.value = reqChallenge.tag;
      console.log(title);
    }, 0);
  };
  return (
    <>
      <HomeComponent
        handleNewEntry={handleNewEntry}
        challenges={challenges}
        updateVotes={updateVotes}
        sortChallenges={sortChallenges}
        filterChallenges={filterChallenges}
        editChallenges={editChallenges}
        deleteChallenges={deleteChallenges}
        isOpen={isOpen}
      />
      {isOpen && (
        <Modal
          title={label.ADD_IDEAS_CHALLENGES}
        >
          <div className="w-100 h-90">
            <div className="form-floating mb-3">
              <input type="text" className="form-control" id="form-title" placeholder="title" />
              <label for="form-title">Title</label>
            </div>
            <div className="form-floating mb-3">
              <textarea style={{ minHeight: '180px' }} className="form-control" placeholder="Leave a comment here" id="form-description"></textarea>
              <label for="form-description">Description</label>
            </div>
            <div className="form-floating mb-3">
              <select className="form-select" id="form-tags" aria-label="Floating label select example">
                {Tags.map(({ key, value}) => {
                  return (
                    <option id={key} value={key}>{value}</option>
                  );
                })}
              </select>
              <label for="form-tags">TAGS</label>
            </div>
          </div>
          <div className="w-100 row mx-0 h-10 align-items-center">
            <div className="w-50 px-2">
              <button
                type="button"
                className="btn btn-secondary w-100"
                onClick={() => onClose()}
              >
                {label.CLOSE}
              </button>
            </div>
            <div className="w-50 px-2">
              <button
                type="button"
                className="btn btn-primary w-100"
                onClick={() => editId ? updateChallenges(editId): onSave()}
              >
                {editId ? label.UPDATE : label.SAVE}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Home;