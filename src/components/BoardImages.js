import React, { useState, useEffect } from "react";

import ImageService from "../services/image.service";
import EventBus from "../common/EventBus";
// import GoogleImage from "google-images"

const BoardImages = () => {
    const [name, setName] = React.useState("");

    const [content, setContent] = useState([]);

    const [selectedId, setSelectedId] = useState('');

    const [item, setItem] = useState({});

    useEffect(() => {
        ImageService.getImages().then(
            (response) => {
                const content =  response.data
                setContent(content);
            },
            (error) => {
                console.log(error)
            }
        );
    }, []);

    React.useEffect(() => {
        setTimeout(() => {
            ImageService.getItems({ name}).then(
                (response) => {
                    const content =  response.data
                    setItem(content[0]);
                },
                (error) => {
                    if (error.response && error.response.status === 401) {
                        EventBus.dispatch("logout");
                    }
                }
            );
        }, 2000)
    }, [name])

    const handleChooseItem = id => {
        // TODO: update API params
        if (id == selectedId) {
            setSelectedId('')
        }else {
            setSelectedId(id)
            ImageService.updateItem(id, {
                status: 'PD',
                "image_url": 'test'
            }).then(
                (response) => {
                    ImageService.getImages({ status: 'AC' }).then(
                        (response) => {
                            const content =  response.data
                            setContent(content);
                        })
                },
                (error) => {
                    if (error.response && error.response.status === 401) {
                        EventBus.dispatch("logout");
                    }
                }
            );
        }
    };

    const handleSkip = () => {
        if (selectedId) {
            ImageService.updateItem(selectedId, {
                status: 'AC',
                "image_url": null
            }).then(
                (response) => {
                    ImageService.getImages({ status: 'AC' }).then(
                        (response) => {
                            const content =  response.data
                            setContent(content);
                        })
                },
                (error) => {
                    if (error.response && error.response.status === 401) {
                        EventBus.dispatch("logout");
                    }
                }
            );
        }

        console.log('handleSkip')
    };

    const handleSave = () => {
        // TODO: Call API
        console.log('handleSave')
    };

    return (
        <>
            <div className="row">
                <div className="col-3">
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Item name" onChange={(event) => setName(event.target.value)} />
                    </div>
                </div>
            </div>
            <div className="row d-flex justify-content-center">
                { content.map((res) => {

                    return (
                        <div  className={selectedId == res.id ? 'border-img col-lg-2 col-md-6 mb-4 pt-1 mr-1' : 'col-lg-2 col-md-6 mb-4 border-1 pt-1 mr-1'} key={res.id} onClick={() => { handleChooseItem(res.id)}} >
                            <img className="card-img-top" src={res.download_url} alt={res.name} />
                            <p className="text-center">{res.name || res.author}</p>
                        </div>
                    )
                })
                }
            </div>
            <div className="d-flex justify-content-between">
                <button type="button" className="btn btn-warning" onClick={handleSkip}>Skip</button>

                <button type="button" className="btn btn-primary" onClick={handleSave}>Save</button>

            </div>
        </>

    );
};

export default BoardImages;
