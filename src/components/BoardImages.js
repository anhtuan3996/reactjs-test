import React, { useState, useEffect } from "react";

import ImageService from "../services/image.service";
import EventBus from "../common/EventBus";

const BoardImages = () => {
    const [content, setContent] = useState([]);

    useEffect(() => {
        ImageService.getImages().then(
            (response) => {
                const content =  response.data.map((res) => {
                    return (
                        <div className="col-lg-2 col-md-6 mb-4" key={res.id} >
                            <img className="card-img-top" src={res.download_url} alt="Card image cap" />
                        </div>
                    )
                });
                setContent(content);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setContent(_content);

                if (error.response && error.response.status === 401) {
                    EventBus.dispatch("logout");
                }
            }
        );
    }, []);

    return (
        <div className="row d-flex justify-content-center">
            {content}
        </div>
    );
};

export default BoardImages;
