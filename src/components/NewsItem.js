import React, { Component } from 'react'

export class NewsItem extends Component {

    render() {
        let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
        return (
            <div className='my-3'>
                <div className="card">
                    <span className='position-absolute translate-middle badge rounded-pill bg-danger' style={{top: '1px', left: '92%', zIndex: '1' }}>{source}
                    </span>
                    <img src={!imageUrl ? "https://www.devdiscourse.com/remote.axd?https://devdiscourse.blob.core.windows.net/devnews/24_12_2022_20_32_57_3774539.jpg?width=920&format=jpeg" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
                        <a rel="noreferrer" href={newsUrl} target="_blenk" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div >
        )
    }
}

export default NewsItem
