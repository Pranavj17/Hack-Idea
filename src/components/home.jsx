import React from "react";
import label from "../label";

const tableHead = [
  { key: '#', value: '#' },
  { key: 'title', value: 'Title' },
  { key: 'description', value: 'Description' },
  { key: 'tag', value: 'Tag' },
  { key: 'createdDate', value: 'Created At' },
  { key: 'upVote', value: 'Votes' },
  { key: 'actions', value: 'Actions' },
];

const sort = [
  { key: 'default', value: 'Default'},
  { key: 'asc-votes', value: 'Votes: low to high' },
  { key: 'desc-votes', value: 'Votes: high to low' },
  { key: 'asc-id', value: 'Date: last' },
  { key: 'desc-id', value: 'Date: recent' },
];

const HomeComponent = ({
  handleNewEntry,
  challenges,
  updateVotes,
  sortChallenges,
  filterChallenges,
  editChallenges,
  deleteChallenges,
}) => {
  return (
    <div className="w-100 h-100">
      <div className="h-5 fs-2 fw-bold text-white align-items-center justify-content-center d-flex bg-primary">
        {label.HACK_IDEAS}
      </div>
      <div className="h-10 row mx-0 align-content-center justify-content-end p-2">
        <button
          type="button"
          className="btn btn-primary w-25 p-2"
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
      <div className="h-75 col-12 col-md-10 mx-auto overflowY">
        {Object.values(challenges)?.length > 0 ? (
          <div className="p-2">
            {Object.values(challenges || {}).map(({
              title,
              description,
              votes,
              tag,
              id,
              FormatedDate
            }) => {
              return (
                <div className="card w-100 align-items-center p-2 mb-2 flex-row flex-wrap shadow-sm">
                  <div className="fs-2 w-100">{title}</div>
                  <div className="w-40">{description}</div>
                  <div className="w-10">{FormatedDate}</div>
                  <div className="w-10">{tag}</div>
                  <div role="presentation" onClick={() => updateVotes(id)} className="w-10 cursor-pointer">{votes}<i className="px-1 fas fa-arrow-circle-up text-success" /></div>
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
                </div>
              );
            })}
            {/* <table className="table table-bordered m-0 text-center table-responsive table-striped">
              <thead>
                <tr>
                  {tableHead?.map(({ key, value }) => {
                    return (
                      <th key={key} id={key} scope="col">{value}</th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="table-group-divider text-break">
                {Object.values(challenges).map(({
                  title,
                  description,
                  votes,
                  tag,
                  id,
                  FormatedDate
                }, index) => {
                  return (
                    <tr key={id}>
                      <th scope="row">{index + 1}</th>
                      <td>{title}</td>
                      <td>{description}</td>
                      <td>{tag}</td>
                      <td>{FormatedDate}</td>
                      <td
                        role="presentation"
                        className="cursor-pointer"
                        onClick={() => updateVotes(id)}
                      >
                        {votes}
                        <i className="px-1 fas fa-arrow-circle-up text-success" />
                      </td>
                      <td
                        className="d-flex justify-content-between"
                      >
                        <i role="presentation" onClick={() => editChallenges(id)} className="cursor-pointer fas fa-edit" />
                        <i role="presentation" onClick={() => deleteChallenges(id)} className="cursor-pointer fas fa-trash" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table> */}
          </div>
        ) : <div className="fs-1 row mx-0 h-100 align-items-center justify-content-center text-danger fw-bold text-center">{label.NO_RECORDS_FOUND}</div>}
      </div>
    </div>
  );
};

export default HomeComponent;