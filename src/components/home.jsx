import React from "react";
import label from "../label";

const tableHead = [
  { key: '#', value: '#' },
  { key: 'title', value: 'Title' },
  { key: 'description', value: 'Description' },
  { key: 'upVote', value: 'Votes' },
  { key: 'createdDate', value: 'Created At' },
]
const HomeComponent = ({
  handleNewEntry,
  challenges,
  updateChallenges,
  isOpen,
}) => {
  return (
    <div className="w-100 h-100">
      <div className="h-5 text-white align-items-center justify-content-center d-flex bg-primary">
        {label.HACK_IDEAS}
      </div>
      <div className="h-10 row mx-0 align-content-center justify-content-end p-2">
        <button
          type="button"
          className="btn btn-primary w-25"
          disabled={isOpen}
          onClick={() => handleNewEntry()}
        >
          {label.ADD_IDEAS_CHALLENGES}
        </button>
      </div>
      <div className="h-85 w-100">
        {Object.values(challenges)?.length > 0 ? (
          <div className="border rounded m-2 p-2">
            <table className="table text-center">
              <thead>
                <tr>
                  {tableHead?.map(({ key, value }) => {
                    return (
                      <th key={key} id={key} scope="col-3">{value}</th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="table-group-divider text-break">
                {Object.values(challenges).map(({
                  title,
                  description,
                  votes,
                  id,
                  FormatedDate
                }, index) => {
                  return (
                    <tr key={id}>
                      <th scope="row">{index + 1}</th>
                      <td>{title}</td>
                      <td>{description}</td>
                      <td
                        role="presentation"
                        className="cursor-pointer"
                        onClick={() => updateChallenges(id)}
                      >
                        {votes}<i className="fas fa-arrow-up" />
                      </td>
                      <td>{FormatedDate}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : <div className="fs-1 row mx-0 h-100 align-items-center justify-content-center text-danger fw-bold text-center">{label.NO_RECORDS_FOUND}</div>}
      </div>
    </div>
  );
};

export default HomeComponent;