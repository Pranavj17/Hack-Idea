import React, { useRef, useState, useEffect, Suspense, lazy } from "react";
import label from "../label";
import Modal from "../components/Modal";
const HomeComponent = lazy(() => import('../components/home'));
const Tags = [
  { key: 'feature', value: 'Feature' },
  { key: 'tech', value: 'Tech' },
];
const sort = [
  { key: 'default', value: 'Default'},
  { key: 'asc-votes', value: 'Votes: low to high' },
  { key: 'desc-votes', value: 'Votes: high to low' },
  { key: 'asc-id', value: 'Date: last' },
  { key: 'desc-id', value: 'Date: recent' },
];

const generateString = (length = 5) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let result = '';
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editId, setEditId] = useState('');
  const [challenges, setChallenges] = useState(() => {
    const challenges = JSON.parse(window.sessionStorage.getItem('challenges'));
    return challenges || {};
  });

  useEffect(() => {
    const obj = {};
    for (let i=0; i< 1000; i++) {
      const date = new Date();
      const createdDate = date;
      const data = {
        id: `${date.getTime()}${i}`,
        title: generateString(Math.floor(Math.random() * 10)),
        description: generateString(Math.floor(Math.random() * 45)),
        tag: i % 2 === 0 ? 'feature' : 'tech',
        createdDate,
        updatedDate: createdDate,
        FormatedDate: date.toISOString().slice(0, 10),
        votes: Math.floor(Math.random() * 1000)
      };
      obj[data.id] = data;
    }
    setChallenges(obj);
    window.sessionStorage.setItem('challenges', JSON.stringify(obj));
  }, []);
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
    const storedChallenges = JSON.parse(window.sessionStorage.getItem('challenges'));
    storedChallenges[id] = challenges[id] = { ...dataToSend };
    setChallenges({ ...challenges });
    window.sessionStorage.setItem('challenges', JSON.stringify({ ...storedChallenges }))
  };

  const updateChallenges = (id) => {
    const title = document.getElementById('form-title').value;
    const description = document.getElementById('form-description').value;
    const tag =  document.getElementById('form-tags').value;
    const storedChallenges = JSON.parse(window.sessionStorage.getItem('challenges'));
    storedChallenges[id] = challenges[id] = {
      ...challenges[id],
      updatedDate: new Date(),
      title,
      description,
      tag
    };
    setChallenges({ ...challenges });
    setEditId('');
    setIsOpen(false);
    window.sessionStorage.setItem('challenges', JSON.stringify({ ...storedChallenges }))
  };
  const updateVotes = (id) => {
    const storedChallenges = JSON.parse(window.sessionStorage.getItem('challenges'));
    storedChallenges[id] = challenges[id] = {
      ...challenges[id],
      updatedDate: new Date(),
      votes: storedChallenges[id]?.votes + 1
    };
    setChallenges({ ...challenges });
    window.sessionStorage.setItem('challenges', JSON.stringify({ ...storedChallenges }))
  };
  const onClose = () => {
    setEditId('');
    setIsOpen(false);
  };

  const sortChallenges = (key) => {
    let obj = {};
    if (key === 'default') {
      obj = Object.values(challenges || {}).sort((a, b) => {
        return a.id - b.id;
      });
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
    delete challenges[id];
    window.sessionStorage.setItem('challenges', JSON.stringify({ ...storedChallenges }))
    setChallenges({ ...challenges });
  };
  
  let timeoutRef = useRef(null);
  const filterChallenges = (string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
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
    }, 200);
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
    }, 0);
  };
  return (
    <div className="h-100 w-100">
      <div className="h-10 color-yellow fs-2 fw-bold align-items-center justify-content-center d-flex">
        {label.HACK_IDEAS}
        <i className="fas fa-lightbulb lightBulb px-2" />
      </div>
      <div className="h-10 row mx-0 align-content-center justify-content-end p-2">
        <button
          type="button"
          className="btn btn-success w-25 p-2"
          disabled={isOpen}
          onClick={() => handleNewEntry()}
        >
          {label.ADD_IDEAS_CHALLENGES}
        </button>
      </div>
      <div className="h-10 d-flex flex-wrap px-2 justify-content-between">
        <div className="w-25 form-floating">
          <input
            type="search"
            name="search"
            id="search"
            className="form-control"
            onChange={(e) => filterChallenges(e.target.value)}
          />
          <label htmlFor="search">{label.SEARCH}</label>
        </div>
        <div className="form-floating w-25">
          <select
            className="form-select"
            id="sortSelect"
            disabled={Object.values(challenges).length === 0}
            aria-label="Floating label select example"
            onChange={(e) => sortChallenges(e.target.value)}
          >
            {sort.map(({ key, value}) => {
              return (
                <option
                  id={key}
                  key={key}
                  value={key}
                >
                  {value}
                </option>
              );
            })}
          </select>
          <label htmlFor="sortSelect">Sort</label>
        </div>
      </div>
      <div className="h-70 col-12 col-md-10 mx-auto overflowY">
        <Suspense fallback={<div className="h-100 w-100 d-flex align-items-center justify-content-center text-secondary fs-2">Loading...</div>}>
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
        </Suspense>
      </div>
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
                    <option key={key} id={key} value={key}>{value}</option>
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
                className="btn btn-success w-100"
                onClick={() => editId ? updateChallenges(editId): onSave()}
              >
                {editId ? label.UPDATE : label.SAVE}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Home;