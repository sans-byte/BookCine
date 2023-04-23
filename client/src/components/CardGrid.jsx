import { useNavigate } from "react-router-dom";
import React from "react";
import { Card, List } from "antd";
import moment from "moment";

const { Meta } = Card;

function CardGrid({ moviesData }) {
  const navigate = useNavigate();

  return (
    <div className="vw-100 container p-3">
      <div className="row gx-3 gy-4">
        {moviesData.map((movie) => (
          <div className="col-3 d-flex justify-content-center align-items-center">
            <Card
              hoverable
              style={{
                width: 240,
              }}
              cover={<img alt="Poster" src={movie.moviePosterURL} />}
            >
              <Meta
                title={movie.movieName}
                description={
                  <div>
                    <button
                      className="btn btn-sm btn-outline-danger w-100"
                      onClick={() =>
                        navigate(
                          `/movie/${movie._id}?date=${moment().format(
                            "YYYY-MM-DD"
                          )}`
                        )
                      }
                    >
                      Book
                    </button>
                  </div>
                }
              />
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardGrid;
