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
  });
  return (
    <div ref={ref} className="card w-100 align-items-center p-2 mb-2 flex-row flex-wrap shadow-sm" style={{ minHeight: '8rem' }}>
      {visible && (
        <>
          <div className="fs-2 col-12 col-md-12">{title}</div>
          <div className="col-12 col-md-4 p-1">{description}</div>
          <div className="col-4 col-md-2 p-1">{FormatedDate}</div>
          <div className="col-4 col-md-1 p-1 text-center">{tag}</div>
          <div className="col-4 p-1 col-md-1 cursor-pointer text-end">{votes}<i role="presentation" onClick={() => updateVotes(id)} className="px-1 arrowUp fs-18 fas fa-arrow-circle-up text-success" /></div>
          <div className="col-6 col-md-2 px-2">
            <button onClick={() => editChallenges(id)} type="button" className="btn w-100 btn-secondary">
              {label.EDIT}
            </button>
          </div>
          <div className="col-6 col-md-2 px-2">
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
      ) : <div className="fs-3 row mx-0 h-100 align-items-center justify-content-center text-white-50 fw-bold text-center">{label.NO_RECORDS_FOUND}</div>}
    </>
  );
};

export default HomeComponent;