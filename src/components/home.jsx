import React, { useRef, useLayoutEffect, Fragment } from "react";
import { useState } from "react";
import label from "../label";

const List = ({
  data,
  updateVotes,
  editChallenges,
  deleteChallenges,
}) => {
  const {
    title,
    description,
    votes,
    tag,
    id,
    FormatedDate,
  } = data;
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const handleObserver = (entries) => {
    entries.forEach((entry, observe) => {
      if (entry.isIntersecting) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    });
  }
  const options = {
    root: document.querySelector('#root'),
    rootMargin: '0px',
    threshold: [0.1, 0.9]
  };
  useLayoutEffect(() => {
    const observer = new IntersectionObserver(handleObserver, options);
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, []);
  return (
    <div ref={ref} className="card w-100 align-items-center p-2 mb-2 flex-row flex-wrap shadow-sm">
      {visible && (
        <>
          <div className="fs-2 w-100">{title}</div>
          <div className="w-40">{description}</div>
          <div className="w-10">{FormatedDate}</div>
          <div className="w-10">{tag}</div>
          <div role="presentation" onClick={() => updateVotes(id)} className="w-10 cursor-pointer">{votes}<i className="px-1 arrow fas fa-arrow-circle-up text-success" /></div>
          <div className="w-15 px-2">
            <button onClick={() => editChallenges(id)} type="button" className="btn w-100 btn-secondary">
              {label.EDIT}
            </button>
          </div>
          <div className="w-15 px-2">
            <button onClick={() => deleteChallenges(id)} type="button" className="btn w-100 btn-danger">
              {label.DELETE}
            </button>
          </div>
          </>
        )}
    </div>
  );
};
const HomeComponent = ({
  challenges,
  updateVotes,
  editChallenges,
  deleteChallenges,
}) => {
  return (
    <>
      {Object.values(challenges)?.length > 0 ? (
        <div className="p-2">
          {Object.values(challenges || {}).map((data) => {
            const { 
              id,
            } = data
            return (
              <Fragment key={id}>
                <List
                  data={data}
                  updateVotes={updateVotes}
                  editChallenges={editChallenges}
                  deleteChallenges={deleteChallenges}
                />
              </Fragment>
            );
          })}
        </div>
      ) : <div className="fs-3 row mx-0 h-100 align-items-center justify-content-center text-danger fw-bold text-center">{label.NO_RECORDS_FOUND}</div>}
    </>
  );
};

export default HomeComponent;