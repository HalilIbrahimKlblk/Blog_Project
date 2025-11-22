import React from 'react'
import Event_Card from '../../components/Event_Card/Event_Card'
import { work_datas } from "../../data/data";
import './Events.css'

const Events = () => {
    return (
        <div className="container">
            <div className="masonry">
                {[...work_datas].map(([id, data]) => (
                    <div className="masonry-item" key={id}>
                        <Event_Card
                            img={data.img}
                            title={data.title}
                            description={data.description}
                            date={data.date}
                            links={data.links}
                            likeSum={data.likeSum}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Events;